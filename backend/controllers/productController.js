import db from '../DB/knex.js';

export async function getProducts(req, res, next) {
  try {
    const { category, search, featured, limit = 20, offset = 0 } = req.query;

    let query = db('products as p')
      .leftJoin('categories as c', 'p.category_id', 'c.id')
      .select(
        'p.id', 'p.name', 'p.slug', 'p.description', 'p.price',
        'p.original_price', 'p.image_url', 'p.weight', 'p.badge',
        'p.in_stock', 'p.featured', 'p.sort_order',
        'c.name as category_name', 'c.slug as category_slug'
      )
      .where('p.in_stock', true)
      .orderBy('p.sort_order', 'asc');

    if (category) query = query.where('c.slug', category);
    if (featured === 'true') query = query.where('p.featured', true);
    if (search) {
      query = query.whereILike('p.name', `%${search}%`);
    }

    const products = await query.limit(Math.min(Number(limit), 50)).offset(Number(offset));
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

export async function getFeatured(req, res, next) {
  try {
    const products = await db('products as p')
      .leftJoin('categories as c', 'p.category_id', 'c.id')
      .select(
        'p.id', 'p.name', 'p.slug', 'p.description', 'p.price',
        'p.original_price', 'p.image_url', 'p.weight', 'p.badge',
        'c.name as category_name', 'c.slug as category_slug'
      )
      .where({ 'p.featured': true, 'p.in_stock': true })
      .orderBy('p.sort_order', 'asc')
      .limit(8);

    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { slug } = req.params;
    const product = await db('products as p')
      .leftJoin('categories as c', 'p.category_id', 'c.id')
      .select(
        'p.*',
        'c.name as category_name', 'c.slug as category_slug'
      )
      .where('p.slug', slug)
      .first();

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}
