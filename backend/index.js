import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./config/connectDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
import cartRouter from "./router/cartRouter.js";
import menuRouter from "./router/menuRouter.js";
import favRouter from "./router/favRouter.js";
import orderRouter from "./router/orderRouter.js";

// app Config
const app = express();
dotenv.config();
connectDB();
connectCloudinary()



//midlleware
app.use(express.json());
app.use(cors({
  origin: '*',  // Allow all origins for testing
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


//sending request
app.get("/", (req, res) => {
  res.send("Api is working");
});

//api endpoint
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/menu",menuRouter);
app.use("/api/fav",favRouter);
app.use("/api/order",orderRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
