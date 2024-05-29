import { Order, type OrderModel, OrderInterface } from "../models/Order";
import { Product, type ProductModel } from "../models/Product";
import { ProductService } from "./ProductService";
import mongoose from "mongoose";

// const timeToDeletion = 50400000; // 14h
const timeToDeletion = 30000; // 30s
const productService = new ProductService();

export class OrderService {
  async createOrder(input: OrderInterface) {
    const result = await (Order as OrderModel).create(input);
    return { message: result ? "success" : "error" };
  }
  /* eslint-disable */
  async getOrder(input: string | string[]) {
    if (Array.isArray(input)) {
      const result = (await (Order as OrderModel).find({
        _id: input,
      })) as OrderInterface[];
      return result;
    } else {
      return await this.getSingleOrder(input);
    }
  }

  async getLatestNOrders(n: number) {
    const result = (await (Order as OrderModel)
      .find({}, null, {
        sort: { updatedAt: -1 },
      })
      .limit(n)) as OrderInterface[];
    return result;
  }

  async getSingleOrder(input: string) {
    try {
      const _id = new mongoose.Types.ObjectId(input);
      const result = await (Order as OrderModel)
        .findById(_id)
        .lean() // Use lean query
        .exec();

      if (!result) {
        console.log("Order not found");
        return null;
      } else {
        return result;
      }
    } catch (err) {
      console.error("Error retrieving order:", err);
      return null;
    }
  }

  async getOrdersOf(input: string) {
    const result = (await (Order as OrderModel)
      .find({
        email: input,
      })
      .sort({ createdAt: -1 })) as OrderInterface[];
    return result;
  }
  /* eslint-enable */
  async getAllOrders() {
    const result = (await (Order as OrderModel)
      .find()
      .sort({ createdAt: -1 })
      .limit(50)) as unknown as OrderInterface[];
    return result;
  }

  async removePicturesFromOrderProducts(order: OrderInterface) {
    if (order.status !== "complete") return false;
    try {
      for await (const productId of order.productIDs) {
        const images = await productService.getImages(productId);
        await productService.deleteImages(images);
        return true;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async patchOrder(_id: string, input: object) {
    const result = (await (Order as OrderModel).findOneAndUpdate({ _id }, input, { new: true })) as
      | OrderInterface
      | undefined;
    if (!result) return { message: "error" };
    for await (const id of result.productIDs) {
      if (["new", "shipped", "completed"].includes(result.status)) {
        if (result.status === "completed") {
          setTimeout(() => {
            this.removePicturesFromOrderProducts(result).catch((err) => {
              console.log(err);
            });
          }, timeToDeletion);
        }
        const res = await (Product as ProductModel).updateOne({ _id: id }, { status: "sold" });
        if (!res) return { message: "error" };
      } else if (result.status === "canceled") {
        const res = await (Product as ProductModel).updateOne({ _id: id }, { status: "ok" });
        setTimeout(() => {
          this.deleteOrder(_id).catch((err) => {
            console.log(err);
          });
        }, timeToDeletion);
        if (!res) return { message: "error" };
      }
    }
    return { message: "success" };
  }

  async updateOrder(input: OrderInterface) {
    const { _id, ...rest } = input;
    if (!input._id) return { message: "error", description: "No order ID" };
    const result = (await (Order as OrderModel).findOneAndUpdate(
      { _id },
      { ...rest },
      { new: true }
    )) as OrderInterface | undefined;
    if (!result) return { message: "error" };
    for await (const _id of rest.productIDs) {
      if (["new", "shipped", "completed"].includes(rest.status)) {
        if (result.status === "completed") {
          setTimeout(() => {
            this.removePicturesFromOrderProducts(result).catch((err) => {
              console.log(err);
            });
          }, timeToDeletion);
        }
        const res = await (Product as ProductModel).updateOne({ _id }, { status: "sold" });
        if (!res) return { message: "error" };
      }
      if (rest.status === "canceled") {
        const res = await (Product as ProductModel).updateOne({ _id }, { status: "ok" });
        setTimeout(() => {
          this.deleteOrder(input._id!).catch((err) => {
            console.log(err);
          });
        }, timeToDeletion);
        if (!res) return { message: "error" };
      }
    }
    return { message: "success" };
  }

  async deleteOrder(input: string) {
    const orderToDelete = await this.getSingleOrder(input);
    if (!orderToDelete || orderToDelete?.status !== "canceled") {
      return { message: "error" };
    }
    await (Order as OrderModel).deleteOne({
      _id: input,
    });
    if (!orderToDelete) return { message: "error" };
    for await (const _id of orderToDelete.productIDs) {
      const res = await (Product as ProductModel).updateOne({ _id }, { status: "ok" });
      if (!res) return { message: "error" };
    }
    return { message: "success" };
  }
}
