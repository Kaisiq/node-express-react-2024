import { mongooseConnect } from "./lib/mongoose";
import { DELETE, GET, POST, PUT } from "./products";
import { ProductService } from "./services/ProductService";
import { Request, Response } from "express";

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const User = require("./model/dataSchema.js");

app.use(express.json());
app.use(cors());

// // DB config
// const db = require("./config/keys").MongoURI;
// mongoose.set("strictQuery", true);

// // connect to mongo
// mongoose
//   .connect(db, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((error) => console.log(error));
mongooseConnect();
const productService = new ProductService();

// bodyparser gets the req.body
app.use(express.urlencoded({ extended: false }));

app.get(
  "/product/:_id",
  async (req: { params: { _id: string } }, res: { json: (arg0: { exists: boolean }) => void }) => {
    const { _id }: { _id: string } = req.params;
    const document = await productService.getProduct(_id);
    const exists = !!document;
    res.json({ exists });
  }
);

app
  .route("/product")
  .get((req: Request, res: Response) => {
    GET(req, res);
  })
  .put((req: any, res: any) => {
    PUT(req, res);
  })
  .post((req: any, res: any) => {
    POST(req, res);
  })
  .delete((req: any, res: any) => {
    DELETE(req, res);
  });

// app.post("/insert", async (req, res) => {
//   const walletAddress = req.body.walletAddress;

//   const formData = new User({
//     walletAddress,
//   });

//   try {
//     await formData.save();
//     res.send("inserted data..");
//   } catch (err) {
//     console.log(err);
//   }
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
