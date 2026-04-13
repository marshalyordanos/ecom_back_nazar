<<<<<<< HEAD
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        roles: string[];
      };
      shopId?: string;
    }
  }
}

export {};
=======
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
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
