import authRoutes from "./routes/authRoutes";
import { mongooseConnect } from "./lib/mongoose";
import productRoutes from "./routes/productRoutes";
import passport from "./config/passport";
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000", // explicitly allow the front-end origin
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

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
