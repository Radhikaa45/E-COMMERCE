export async function up(knex) {
  await knex.schema.createTable('order_items', (t) => {
    t.increments('id').primary();
    t.integer('order_id').notNullable().references('id').inTable('orders').onDelete('CASCADE');
    t.integer('product_id').references('id').inTable('products').onDelete('SET NULL');
    t.string('product_name', 200).notNullable();
    t.string('product_image', 500);
    t.integer('quantity').notNullable();
    t.decimal('price', 10, 2).notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.index('order_id');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('order_items');
}
