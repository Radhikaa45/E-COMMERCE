export async function up(knex) {
  const hasCol = await knex.schema.hasColumn('products', 'image_data');
  if (!hasCol) {
    await knex.schema.alterTable('products', (t) => {
      t.text('image_data');
      t.string('image_mime', 50);
    });
  }
}

export async function down(knex) {
  const hasCol = await knex.schema.hasColumn('products', 'image_data');
  if (hasCol) {
    await knex.schema.alterTable('products', (t) => {
      t.dropColumn('image_data');
      t.dropColumn('image_mime');
    });
  }
}
