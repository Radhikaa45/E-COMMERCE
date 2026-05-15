import dotenv from "dotenv";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const { default: app } = await import("./app.js");

    console.log("⏳ Starting server...");
    console.log("Database:", process.env.DB_DATABASE);

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();