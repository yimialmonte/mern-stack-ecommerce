import express from "express";
import path from 'path'
import dotenv from "dotenv";
import cors from "cors";
import colors from 'colors'
import connectDB from "./config/db.js";
import productRouter from './routers/product.js'
import userRouter from './routers/userRoute.js'
import orderRouter from './routers/orderRoute.js'
import uploadRouter from './routers/uploadRouters.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
});

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
