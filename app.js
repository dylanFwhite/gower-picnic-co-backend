import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./utils/errorHandlers.js";
import productRouter from "./routes/productRoutes.js";
import customerRouter from "./routes/customerRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import supplierRouter from "./routes/supplierRoutes.js";
import authRouter from "./routes/authRouter.js";
import { authenticateUser } from "./middleware/auth.js";

const app = express();

// Default Middleware attachments ======================
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Custom Middleware attachments =======================
// Attach request date to request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes =============================================
app.use("/api/v1/products", productRouter);
app.use("/api/v1/customers", authenticateUser, customerRouter);
app.use("/api/v1/orders", authenticateUser, orderRouter);
app.use("/api/v1/suppliers", supplierRouter);
app.use("/api/v1/auth", authRouter);

// Handlers ============================================
// Handle un-captured requests - Must appear after all other Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`));
});

// Global error handler
app.use(globalErrorHandler);

export default app;
