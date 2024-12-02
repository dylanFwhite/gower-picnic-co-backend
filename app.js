import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import mongoSanitise from "express-mongo-sanitize";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./utils/errorHandlers.js";
import productRouter from "./routes/productRoutes.js";
import customerRouter from "./routes/customerRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import supplierRouter from "./routes/supplierRoutes.js";
import authRouter from "./routes/authRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";
import { authenticateUser } from "./middleware/auth.js";
import { webhookHandler } from "./controllers/checkoutController.js";

const app = express();

// Default Middleware attachments ======================
app.use(cors({ origin: "https://gower-picnic-company.co.uk/" }));
app.options("*", cors());

app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 30 * 60 * 1000,
  message: "Too many requests from this IP, please try again in 30 mins",
});
app.use("/api", limiter);

// Stripe Webhook handler - Needs to occur before JSON parser
app.post("/webhook", express.raw({ type: "application/json" }), webhookHandler);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(
  morgan(
    "[:date[clf]] :remote-addr :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"
  )
);

app.use(mongoSanitise());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["type", "createdAt", "price"],
  })
);

// Custom Middleware attachments =======================
// Attach request date to request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes =============================================
app.use("/api/v1/products", productRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/orders", authenticateUser, orderRouter);
app.use("/api/v1/suppliers", supplierRouter);
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/checkout", checkoutRouter);

// Handlers ============================================
// Handle un-captured requests - Must appear after all other Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`));
});

// Global error handler
app.use(globalErrorHandler);

export default app;
