export async function up(knex) {
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('name', 200).notNullable();
    t.string('email', 200).notNullable().unique();
    t.string('password_hash', 500).notNullable();
    t.enu('role', ['customer', 'admin']).defaultTo('customer');
    t.boolean('is_active').defaultTo(true);
    t.timestamps(true, true);

    t.index('email');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}
