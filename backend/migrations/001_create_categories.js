export async function up(knex) {
  await knex.schema.createTable('categories', (t) => {
    t.increments('id').primary();
    t.string('name', 100).notNullable();
    t.string('slug', 100).notNullable().unique();
    t.text('description');
    t.string('image_url', 500);
    t.integer('sort_order').defaultTo(0);
    t.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('categories');
}
