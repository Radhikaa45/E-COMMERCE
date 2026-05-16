import db from '../DB/knex.js';

const DELIVERY_FEE   = 79;
const FREE_THRESHOLD = 499;

export async function createOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const {
      shipping_name, shipping_phone, shipping_email,
      shipping_address, shipping_city, shipping_state,
      shipping_pincode, payment_method, notes, items,
    } = req.body;

    // Basic validation
    const missing = ['shipping_name', 'shipping_phone', 'shipping_address',
      'shipping_city', 'shipping_state', 'shipping_pincode', 'payment_method']
      .filter((k) => !req.body[k]);

    if (missing.length) {
      return res.status(400).json({ success: false, message: `Missing: ${missing.join(', ')}` });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty.' });
    }

    const VALID_METHODS = ['cod', 'upi', 'card'];
    if (!VALID_METHODS.includes(payment_method)) {
      return res.status(400).json({ success: false, message: 'Invalid payment method.' });
    }

    // Calculate totals
    const subtotal   = items.reduce((s, i) => s + Number(i.price) * Number(i.quantity), 0);
    const delivery   = subtotal >= FREE_THRESHOLD ? 0 : DELIVERY_FEE;
    const totalAmount = subtotal + delivery;

    // Map payment for DB (card → online)
    const dbPaymentMethod = payment_method === 'card' ? 'online' : payment_method;
    const isPaid          = payment_method !== 'cod';

    const [order] = await db('orders').insert({
      user_id:          userId,
      status:           isPaid ? 'confirmed' : 'pending',
      total_amount:     totalAmount,
      shipping_name:    shipping_name.trim(),
      shipping_address: shipping_address.trim(),
      shipping_city:    shipping_city.trim(),
      shipping_state:   shipping_state.trim(),
      shipping_pincode: shipping_pincode.trim(),
      shipping_phone:   shipping_phone.trim(),
      payment_method:   dbPaymentMethod,
      payment_status:   isPaid ? 'paid' : 'pending',
      notes:            notes?.trim() || null,
    }).returning('*');

    // Insert order items
    await db('order_items').insert(
      items.map((item) => ({
        order_id:      order.id,
        product_id:    item.product_id || null,
        product_name:  item.name,
        product_image: item.image_url || null,
        quantity:      Number(item.quantity),
        price:         Number(item.price),
      }))
    );

    // Optionally store shipping email in notes if provided
    res.status(201).json({
      success: true,
      data: {
        orderId:      order.id,
        status:       order.status,
        totalAmount:  order.total_amount,
        paymentStatus: order.payment_status,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await db('orders as o')
      .leftJoin('users as u', 'o.user_id', 'u.id')
      .select('o.*', 'u.name as customer_name', 'u.email as customer_email')
      .where('o.id', id)
      .first();

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Only owner or admin can view
    if (order.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const orderItems = await db('order_items').where('order_id', id).orderBy('id', 'asc');

    res.json({ success: true, data: { ...order, items: orderItems } });
  } catch (err) {
    next(err);
  }
}

export async function getUserOrders(req, res, next) {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const [orders, [{ count }]] = await Promise.all([
      db('orders')
        .where('user_id', userId)
        .orderBy('created_at', 'desc')
        .limit(Number(limit))
        .offset(offset),
      db('orders').where('user_id', userId).count('id as count'),
    ]);

    const orderIds = orders.map((o) => o.id);
    let items = [];
    if (orderIds.length > 0) {
      items = await db('order_items').whereIn('order_id', orderIds);
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
