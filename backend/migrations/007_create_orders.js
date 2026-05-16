export async function up(knex) {
  await knex.schema.createTable('orders', (t) => {
    t.increments('id').primary();
    t.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
    t.enu('status', ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']).defaultTo('pending');
    t.decimal('total_amount', 10, 2).notNullable();
    t.string('shipping_name', 200);
    t.text('shipping_address');
    t.string('shipping_city', 100);
    t.string('shipping_state', 100);
    t.string('shipping_pincode', 10);
    t.string('shipping_phone', 20);
    t.enu('payment_method', ['cod', 'online', 'upi']).defaultTo('cod');
    t.enu('payment_status', ['pending', 'paid', 'failed', 'refunded']).defaultTo('pending');
    t.text('notes');
    t.timestamps(true, true);

    t.index('user_id');
    t.index('status');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('orders');
}
