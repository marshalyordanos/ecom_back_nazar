const config = {
  env: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || "30",
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || "30",
  },
};

export default config;
