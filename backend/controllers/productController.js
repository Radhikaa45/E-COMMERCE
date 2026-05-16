import db from '../DB/knex.js';

const PRODUCT_FIELDS = [
  'p.id', 'p.name', 'p.slug', 'p.description', 'p.price',
  'p.original_price', 'p.image_url', 'p.weight', 'p.badge',
  'p.in_stock', 'p.featured', 'p.sort_order', 'p.stock_count',
  'c.name as category_name', 'c.slug as category_slug',
];

export async function getProducts(req, res, next) {
  try {
    const {
      category, search, featured,
      sort = 'featured',
      limit = 20, offset = 0,
      min_price, max_price, badge,
    } = req.query;

    let query = db('products as p')
      .leftJoin('categories as c', 'p.category_id', 'c.id')
      .select(...PRODUCT_FIELDS)
      .where('p.in_stock', true);

    if (category) query = query.where('c.slug', category);
    if (featured === 'true') query = query.where('p.featured', true);
    if (search) query = query.whereILike('p.name', `%${search}%`);
    if (badge) query = query.where('p.badge', badge);
    if (min_price) query = query.where('p.price', '>=', Number(min_price));
    if (max_price) query = query.where('p.price', '<=', Number(max_price));

    if (sort === 'price_asc') query = query.orderBy('p.price', 'asc');
    else if (sort === 'price_desc') query = query.orderBy('p.price', 'desc');
    else if (sort === 'newest') query = query.orderBy('p.created_at', 'desc');
    else query = query.orderBy('p.sort_order', 'asc').orderBy('p.featured', 'desc');

    const products = await query.limit(Math.min(Number(limit), 100)).offset(Number(offset));
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

export async function getFeatured(req, res, next) {
  try {
    const products = await db('products as p')
      .leftJoin('categories as c', 'p.category_id', 'c.id')
      .select(...PRODUCT_FIELDS)
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
      .select('p.*', 'c.name as category_name', 'c.slug as category_slug')
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
