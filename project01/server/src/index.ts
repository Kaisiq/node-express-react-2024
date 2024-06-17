import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import { mongooseConnect } from "./lib/mongoose";
import productRoutes from "./routes/productRoutes";
import passport from "./config/passport";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();

const corsOptions = {
  origin: ["http://localhost:3000"], // explicitly allow the front-end origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); // Ensure CORS is applied before other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

mongooseConnect();

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {},
  })
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
