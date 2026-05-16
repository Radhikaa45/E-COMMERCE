import dotenv from 'dotenv';
import http from 'http';
dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    const { default: db } = await import('./DB/knex.js');

    // Run migrations on every start (safe — knex tracks applied migrations)
    await db.migrate.latest();
    console.log('✅ Migrations up to date');

    // Fix broken Unsplash image URLs (idempotent — only updates rows that still have the dead URL)
    const IMG = {
      brokenRice:    'https://images.unsplash.com/photo-1586201375362-ce7e78b5de09?w=600&auto=format&fit=crop&q=80',
      brokenAlmonds: 'https://images.unsplash.com/photo-1508222720893-62a0e5a9fb69?w=600&auto=format&fit=crop&q=80',
      brokenCashews: 'https://images.unsplash.com/photo-1562771154-e8a7c62e2f8a?w=600&auto=format&fit=crop&q=80',
      fixRice:    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
      fixAlmonds: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=600&auto=format&fit=crop&q=80',
      fixCashews: 'https://images.unsplash.com/photo-1590080874088-eec64895b423?w=600&auto=format&fit=crop&q=80',
    };
    await Promise.all([
      db('products').where('image_url', IMG.brokenRice).update({ image_url: IMG.fixRice }),
      db('products').where('image_url', IMG.brokenAlmonds).update({ image_url: IMG.fixAlmonds }),
      db('products').where('image_url', IMG.brokenCashews).update({ image_url: IMG.fixCashews }),
      db('categories').where('image_url', IMG.brokenRice).update({ image_url: IMG.fixRice }),
    ]);

    // Always ensure admin user exists (idempotent — safe in production)
    const adminSeeder = await import('./seeds/03_admin_user.js');
    await adminSeeder.seed(db);
    console.log('✅ Admin user ensured');

    // Seed categories + products only when table is empty (first-run / fresh DB)
    const { count } = await db('products').count('id as count').first();
    if (Number(count) === 0) {
      const [completed] = await db.seed.run();
      if (completed.length) {
        console.log(`🌱 Seeded: ${completed.map(f => f.split(/[\\/]/).pop()).join(', ')}`);
      }
    }

    const { default: app } = await import('./app.js');
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 NEEKZ Special API running on http://localhost:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    const shutdown = (sig) => {
      console.log(`\n${sig} received — graceful shutdown`);
      server.close(() => {
        db.destroy();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (err) {
    console.error('❌ Failed to start:', err.message);
    if (process.env.NODE_ENV === 'development') console.error(err);
    process.exit(1);
  }
};

start();
