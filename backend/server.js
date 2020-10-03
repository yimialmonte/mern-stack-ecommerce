import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from 'colors'
import connectDB from "./config/db.js";
import productRouter from './routers/product.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
