export function validateEnv() {
  const requiredEnvVars = ["DATABASE_URL", "PORT"];

  const missing = requiredEnvVars.filter(
    (key) => !process.env[key]
  );

  if (missing.length) {
    throw new Error(
      `Missing environment variables: ${missing.join(", ")}`
    );
  }

  console.log("Environment variables loaded");
}