import db from '../DB/knex.js';

function makeSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uniqueSlug(table, base, excludeId = null) {
  let slug = base;
  let suffix = 0;
  while (true) {
    let q = db(table).where('slug', slug);
    if (excludeId) q = q.whereNot('id', excludeId);
    const existing = await q.first();
    if (!existing) break;
    slug = `${base}-${++suffix}`;
  }
  return slug;
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export async function getDashboardStats(req, res, next) {
  try {
    const [prodRow, catRow, orderRow, pendingRow, revRow, recentOrders, lowStock] =
      await Promise.all([
        db('products').count('id as count').first(),
        db('categories').count('id as count').first(),
        db('orders').count('id as count').first(),
        db('orders').where('status', 'pending').count('id as count').first(),
        db('orders').where('payment_status', 'paid').sum('total_amount as total').first(),
        db('orders as o')
          .leftJoin('users as u', 'o.user_id', 'u.id')
          .select(
            'o.id', 'o.status', 'o.total_amount', 'o.created_at',
            'o.payment_status', 'o.payment_method',
            'u.name as customer_name', 'u.email as customer_email',
          )
          .orderBy('o.created_at', 'desc')
          .limit(5),
        db('products')
          .where('stock_count', '<=', 10)
          .select('id', 'name', 'stock_count', 'in_stock')
          .orderBy('stock_count', 'asc')
          .limit(5),
      ]);

    res.json({
      success: true,
      data: {
        totalProducts: Number(prodRow.count),
        totalCategories: Number(catRow.count),
        totalOrders: Number(orderRow.count),
        pendingOrders: Number(pendingRow.count),
        totalRevenue: Number(revRow?.total ?? 0),
        recentOrders,
        lowStock,
      },
    });
  } catch (err) {
    next(err);
  }
}

// ── Admin Products ────────────────────────────────────────────────────────────
export async function adminGetProducts(req, res, next) {
  try {
    const { search, category, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let q = db('products as p')
      .leftJoin('categories as c', 'p.category_id', 'c.id')
      .select(
        'p.id', 'p.name', 'p.slug', 'p.description', 'p.price',
        'p.original_price', 'p.image_url', 'p.weight', 'p.badge',
        'p.in_stock', 'p.featured', 'p.sort_order', 'p.stock_count',
        'p.category_id', 'p.created_at',
        'c.name as category_name', 'c.slug as category_slug',
      )
      .orderBy('p.created_at', 'desc');

    let cq = db('products as p').leftJoin('categories as c', 'p.category_id', 'c.id');

    if (search) {
      q = q.whereILike('p.name', `%${search}%`);
      cq = cq.whereILike('p.name', `%${search}%`);
    }
    if (category) {
      q = q.where('c.slug', category);
      cq = cq.where('c.slug', category);
    }

    const [products, [{ count }]] = await Promise.all([
      q.limit(Number(limit)).offset(offset),
      cq.count('p.id as count'),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        total: Number(count),
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(Number(count) / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function adminCreateProduct(req, res, next) {
  try {
    const {
      name, description, price, original_price, image_url,
      category_id, weight, badge, in_stock, featured, sort_order, stock_count,
    } = req.body;

    if (!name || price === undefined || price === null) {
      return res.status(400).json({ success: false, message: 'Name and price are required.' });
    }

    const slug = await uniqueSlug('products', makeSlug(name));

    const [product] = await db('products').insert({
      name: name.trim(),
      slug,
      description: description || null,
      price: Number(price),
      original_price: original_price ? Number(original_price) : null,
      image_url: image_url || null,
      category_id: category_id ? Number(category_id) : null,
      weight: weight || null,
      badge: badge || null,
      in_stock: in_stock !== false && in_stock !== 'false',
      featured: !!featured,
      sort_order: Number(sort_order) || 0,
      stock_count: Number(stock_count) || 100,
    }).returning('*');

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

export async function adminUpdateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await db('products').where('id', id).first();
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const {
      name, description, price, original_price, image_url,
      category_id, weight, badge, in_stock, featured, sort_order, stock_count,
    } = req.body;

    const updates = {};
    if (name !== undefined) {
      updates.name = name.trim();
      if (name.trim() !== existing.name) {
        updates.slug = await uniqueSlug('products', makeSlug(name), id);
      }
    }
    if (description !== undefined) updates.description = description || null;
    if (price !== undefined) updates.price = Number(price);
    if (original_price !== undefined) updates.original_price = original_price ? Number(original_price) : null;
    if (image_url !== undefined) updates.image_url = image_url || null;
    if (category_id !== undefined) updates.category_id = category_id ? Number(category_id) : null;
    if (weight !== undefined) updates.weight = weight || null;
    if (badge !== undefined) updates.badge = badge || null;
    if (in_stock !== undefined) updates.in_stock = in_stock !== false && in_stock !== 'false';
    if (featured !== undefined) updates.featured = !!featured;
    if (sort_order !== undefined) updates.sort_order = Number(sort_order);
    if (stock_count !== undefined) updates.stock_count = Number(stock_count);

    if (Object.keys(updates).length === 0) {
      return res.json({ success: true, data: existing });
    }

    const [updated] = await db('products').where('id', id).update(updates).returning('*');
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function adminDeleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await db('products').where('id', id).first();
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    await db('products').where('id', id).delete();
    res.json({ success: true, message: 'Product deleted.' });
  } catch (err) {
    next(err);
  }
}

// ── Admin Categories ──────────────────────────────────────────────────────────
export async function adminGetCategories(req, res, next) {
  try {
    const categories = await db('categories as c')
      .select('c.*', db.raw('count(p.id) as product_count'))
      .leftJoin('products as p', 'p.category_id', 'c.id')
      .groupBy('c.id')
      .orderBy('c.sort_order', 'asc');

    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}

export async function adminCreateCategory(req, res, next) {
  try {
    const { name, description, image_url, sort_order } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }

    const slug = await uniqueSlug('categories', makeSlug(name));

    const [category] = await db('categories').insert({
      name: name.trim(),
      slug,
      description: description || null,
      image_url: image_url || null,
      sort_order: Number(sort_order) || 0,
    }).returning('*');

    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

export async function adminUpdateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await db('categories').where('id', id).first();
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }

    const { name, description, image_url, sort_order } = req.body;
    const updates = {};

    if (name !== undefined) {
      updates.name = name.trim();
      if (name.trim() !== existing.name) {
        updates.slug = await uniqueSlug('categories', makeSlug(name), id);
      }
    }
    if (description !== undefined) updates.description = description || null;
    if (image_url !== undefined) updates.image_url = image_url || null;
    if (sort_order !== undefined) updates.sort_order = Number(sort_order);

    if (Object.keys(updates).length === 0) {
      return res.json({ success: true, data: existing });
    }

    const [updated] = await db('categories').where('id', id).update(updates).returning('*');
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function adminDeleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await db('categories').where('id', id).first();
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    await db('products').where('category_id', id).update({ category_id: null });
    await db('categories').where('id', id).delete();
    res.json({ success: true, message: 'Category deleted.' });
  } catch (err) {
    next(err);
  }
}

// ── Admin Orders ──────────────────────────────────────────────────────────────
export async function adminGetOrders(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let q = db('orders as o')
      .leftJoin('users as u', 'o.user_id', 'u.id')
      .select('o.*', 'u.name as customer_name', 'u.email as customer_email')
      .orderBy('o.created_at', 'desc');

    let cq = db('orders as o').leftJoin('users as u', 'o.user_id', 'u.id');

    if (status && status !== 'all') {
      q = q.where('o.status', status);
      cq = cq.where('o.status', status);
    }

    const [orders, [{ count }]] = await Promise.all([
      q.limit(Number(limit)).offset(offset),
      cq.count('o.id as count'),
    ]);

    const orderIds = orders.map((o) => o.id);
    let items = [];
    if (orderIds.length > 0) {
      items = await db('order_items as oi')
        .select('oi.*')
        .whereIn('oi.order_id', orderIds);
    }

    const result = orders.map((o) => ({
      ...o,
      items: items.filter((i) => i.order_id === o.id),
    }));

    res.json({
      success: true,
      data: result,
      pagination: {
        total: Number(count),
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(Number(count) / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function adminUpdateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, payment_status } = req.body;

    const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    const PAY_STATUSES = ['pending', 'paid', 'failed', 'refunded'];

    const existing = await db('orders').where('id', id).first();
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const updates = {};
    if (status && STATUSES.includes(status)) updates.status = status;
    if (payment_status && PAY_STATUSES.includes(payment_status)) updates.payment_status = payment_status;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid status provided.' });
    }

    const [updated] = await db('orders').where('id', id).update(updates).returning('*');
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}
