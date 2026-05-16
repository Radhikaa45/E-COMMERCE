import bcrypt from 'bcryptjs';

export async function seed(knex) {
  const existing = await knex('users').where('email', 'admin@neekz.com').first();
  if (existing) return; // don't overwrite

  const password_hash = await bcrypt.hash('Admin@123', 12);
  await knex('users').insert({
    name: 'Admin',
    email: 'admin@neekz.com',
    password_hash,
    role: 'admin',
    is_active: true,
  });
  console.log('✓ Admin user created: admin@neekz.com / Admin@123');
}
