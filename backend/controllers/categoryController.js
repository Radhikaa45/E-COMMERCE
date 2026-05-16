import db from '../DB/knex.js';

export async function getCategories(req, res, next) {
  try {
    const categories = await db('categories')
      .select('id', 'name', 'slug', 'description', 'image_url', 'sort_order')
      .orderBy('sort_order', 'asc');

    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}
