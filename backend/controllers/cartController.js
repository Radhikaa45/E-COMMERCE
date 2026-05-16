import db from '../DB/knex.js';

export async function getCart(req, res, next) {
  try {
    const items = await db('cart_items as ci')
      .join('products as p', 'ci.product_id', 'p.id')
      .where('ci.user_id', req.user.id)
      .select(
        'ci.id', 'ci.quantity',
        'p.id as product_id', 'p.name', 'p.slug', 'p.price',
        'p.original_price', 'p.image_url', 'p.weight', 'p.in_stock'
      );

    const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

    res.json({ success: true, data: { items, total: Number(total.toFixed(2)), count: items.length } });
  } catch (err) {
    next(err);
  }
}

export async function addToCart(req, res, next) {
  try {
    const { product_id, quantity = 1 } = req.body;

    if (!product_id || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Valid product_id and quantity are required.' });
    }

    const product = await db('products').where({ id: product_id, in_stock: true }).first();
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found or out of stock.' });
    }

    const existing = await db('cart_items').where({ user_id: req.user.id, product_id }).first();

    if (existing) {
      await db('cart_items')
        .where({ id: existing.id })
        .update({ quantity: existing.quantity + quantity, updated_at: new Date() });
    } else {
      await db('cart_items').insert({ user_id: req.user.id, product_id, quantity });
    }

    res.json({ success: true, message: 'Added to cart.' });
  } catch (err) {
    next(err);
  }
}

export async function updateCartItem(req, res, next) {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1.' });
    }

    const item = await db('cart_items').where({ id: itemId, user_id: req.user.id }).first();
    if (!item) {
      return res.status(404).json({ success: false, message: 'Cart item not found.' });
    }

    await db('cart_items').where({ id: itemId }).update({ quantity, updated_at: new Date() });
    res.json({ success: true, message: 'Cart updated.' });
  } catch (err) {
    next(err);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    const { itemId } = req.params;
    const deleted = await db('cart_items').where({ id: itemId, user_id: req.user.id }).del();

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Cart item not found.' });
    }
    res.json({ success: true, message: 'Removed from cart.' });
  } catch (err) {
    next(err);
  }
}

export async function clearCart(req, res, next) {
  try {
    await db('cart_items').where({ user_id: req.user.id }).del();
    res.json({ success: true, message: 'Cart cleared.' });
  } catch (err) {
    next(err);
  }
}
