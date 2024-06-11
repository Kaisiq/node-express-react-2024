import authRoutes, { loginWithPass } from "./routes/authRoutes";
import { mongooseConnect } from "./lib/mongoose";
import { DELETE, GET, POST, PUT } from "./products";
import { ProductService } from "./services/ProductService";
import { Request, Response } from "express";
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
const productService = new ProductService();

app.get("/products/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const document = await productService.getProduct(_id);
    const exists = !!document;
    res.json({ exists });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app
  .route("/products")
  .get(async (req: Request, res: Response) => {
    await GET(req, res);
  })
  .put(async (req: Request, res: Response) => {
    await PUT(req, res);
  })
  .post(async (req: Request, res: Response) => {
    await POST(req, res);
  })
  .delete(async (req: Request, res: Response) => {
    await DELETE(req, res);
  });

app.use("/auth", authRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
