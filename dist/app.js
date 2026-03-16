"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = require("./utils/errorController");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
//  cros to allow some origin to our site
app.use((0, cors_1.default)({
    origin: "*",
}));
// helmete ,compration xxc, encodeded, rate limiter in production
// cookie parser ,jwt(), joi
//  ******* for post body data ************
app.use(express_1.default.json());
// Serve static files from /public so uploaded images are accessible
// Example URL: http://<host>:<port>/public/uploads/<filename>
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "public", "uploads")));
// **** login and save the login in access.log file
const logStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log"), {
    flags: "a",
});
app.use((0, morgan_1.default)("combined", { stream: logStream }));
// app.use(morgan.successHandler);
// app.use(morgan.errorHandler);
// Swagger documentation
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// use routes using middleware
app.use("/api/v1", routes_1.default);
app.all("*", (_req, _res, next) => {
    return next(new appError_1.default("Page is not found", 404));
});
app.use(errorController_1.errHandling);
exports.default = app;
//# sourceMappingURL=app.js.map