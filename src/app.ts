import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import AppError from "./utils/appError";
import { errHandling } from "./utils/errorController";
import routes from "./routes";

const app = express();

//  cros to allow some origin to our site
app.use(
  cors({
    origin: "*",
  })
);

// helmete ,compration xxc, encodeded, rate limiter in production
// cookie parser ,jwt(), joi
//  ******* for post body data ************
app.use(express.json());

// Serve static files from /public so uploaded images are accessible
// Example URL: http://<host>:<port>/public/uploads/<filename>
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);
// **** login and save the login in access.log file
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(morgan("combined", { stream: logStream }));
// app.use(morgan.successHandler);
// app.use(morgan.errorHandler);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// use routes using middleware

app.use("/api/v1", routes);

app.all("*", (_req: Request, _res: Response, next: NextFunction) => {
  return next(new AppError("Page is not found", 404));
});

app.use(errHandling);

export default app;
