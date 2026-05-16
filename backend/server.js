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

    // Seed only in development on first run
    if (process.env.NODE_ENV === 'development') {
      const [completed] = await db.seed.run();
      if (completed.length) {
        console.log(`🌱 Seeded: ${completed.map(f => f.split('\\').pop()).join(', ')}`);
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
