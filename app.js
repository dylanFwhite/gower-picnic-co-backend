import express from "express";
import morgan from "morgan";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./utils/errorHandlers.js"
import productRouter from "./routes/productRoutes.js"
import customerRouter from "./routes/customerRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import supplierRouter from "./routes/supplierRoutes.js"

const app = express()

// Default Middleware attachments ======================
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Custom Middleware attachments =======================
// Attach request date to request object
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Routes =============================================
app.use('/api/v1/products', productRouter)
app.use('/api/v1/customers', customerRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/suppliers', supplierRouter)

// Handlers ============================================
// Handle un-captured requests - Must appear after all other Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl}`))
})

// Global error handler
app.use(globalErrorHandler)



export default app