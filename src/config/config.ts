<<<<<<< HEAD
const config = {
  env: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || "30",
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || "30",
  },
};

export default config;
=======
const config = {
  env: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || "30",
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || "30",
  },
  chapa: {
    secretKey: process.env.CHAPA_SECRET_KEY || "your-secret-key",
  },
};

export default config;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
