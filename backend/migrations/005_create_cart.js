export async function up(knex) {
  await knex.schema.createTable('cart_items', (t) => {
    t.increments('id').primary();
    t.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.integer('product_id').notNullable().references('id').inTable('products').onDelete('CASCADE');
    t.integer('quantity').notNullable().defaultTo(1);
    t.timestamps(true, true);

    t.unique(['user_id', 'product_id']);
    t.index('user_id');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('cart_items');
}
