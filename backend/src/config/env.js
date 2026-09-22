const requiredEnvVariables = ["MONGO_URL", "JWT_SECRET_KEY"];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

if (process.env.JWT_SECRET_KEY.length < 32) {
  throw new Error("JWT_SECRET_KEY must be at least 32 characters long");
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  mlServicesUrl: process.env.ML_SERVICES_URL,
  nodeEnv: process.env.NODE_ENV || "development",
};
