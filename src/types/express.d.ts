import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      roles: string[];
      isSuperAdmin: boolean;
    }

    interface Request {
      user?: User;
    }
  }
}