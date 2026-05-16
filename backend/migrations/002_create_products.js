export async function up(knex) {
  await knex.schema.createTable('products', (t) => {
    t.increments('id').primary();
    t.string('name', 200).notNullable();
    t.string('slug', 200).notNullable().unique();
    t.text('description');
    t.decimal('price', 10, 2).notNullable();
    t.decimal('original_price', 10, 2);
    t.string('image_url', 500);
    t.integer('category_id').references('id').inTable('categories').onDelete('SET NULL');
    t.string('weight', 50);
    t.string('badge', 50);
    t.boolean('in_stock').defaultTo(true);
    t.integer('stock_count').defaultTo(100);
    t.boolean('featured').defaultTo(false);
    t.integer('sort_order').defaultTo(0);
    t.timestamps(true, true);

    t.index('category_id');
    t.index('featured');
    t.index('slug');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('products');
}
