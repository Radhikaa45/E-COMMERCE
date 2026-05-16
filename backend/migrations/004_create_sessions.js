export async function up(knex) {
  await knex.schema.createTable('refresh_sessions', (t) => {
    t.increments('id').primary();
    t.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.string('token_hash', 500).notNullable().unique();
    t.timestamp('expires_at').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.index('user_id');
    t.index('token_hash');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('refresh_sessions');
}
