import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string | null;
      roles: string[];
      isSuperAdmin: boolean;
      locationId?: string | null;
    }

    interface Request {
      user?: User;
      shopId?: string;
    }
  }
}

export {};
