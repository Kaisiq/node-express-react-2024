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

  async getCompleteOrders() {
    const result = (await (Order as OrderModel).countDocuments({
      status: { $eq: "completed" },
    })) as number;
    return result;
  }

  async getIncompleteOrders() {
    const result = (await (Order as OrderModel)
      .find({
        $and: [{ status: { $ne: "completed" } }, { status: { $ne: "canceled" } }],
      })
      .countDocuments()) as number;
    return result;
  }

  async getTotalRevenue() {
    const now = new Date();
    const oneMonthAgo = new Date(now);
    const currentDay = now.getDate();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    if (oneMonthAgo.getDate() !== currentDay) {
      oneMonthAgo.setDate(0);
    }
    const result = await (Order as OrderModel).aggregate([
      {
        $match: {
          status: { $ne: "canceled" },
        },
      },
      {
        $group: {
          _id: null,
          total_sales: {
            $sum: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const lastMonth = await (Order as OrderModel).aggregate([
      {
        $match: {
          status: { $ne: "canceled" },
          createdAt: {
            $lt: oneMonthAgo,
          },
        },
      },
      {
        $group: {
          _id: null,
          total_sales: {
            $sum: "$price",
          },
        },
      },
    ]);

    if (result.length > 0 && lastMonth.length > 0) {
      const percentage = `+${(lastMonth[0].total_sales / result[0].total_sales) * 100}%`;
      return { total_count: result[0].count, total_sales: result[0].total_sales, percentage };
    } else {
      return 0;
    }
  }

  getRevenueBetweenDatesWithPercentage = async (now: Date, oneBefore: Date, twoBefore: Date) => {
    const result = await (Order as OrderModel).aggregate([
      {
        $match: {
          status: { $ne: "canceled" },
          createdAt: {
            $gte: oneBefore,
            $lt: now,
          },
        },
      },
      {
        $group: {
          _id: null,
          total_sales: {
            $sum: "$price",
          },
        },
      },
    ]);

    const lastMonth = await (Order as OrderModel).aggregate([
      {
        $match: {
          status: { $ne: "canceled" },
          createdAt: {
            $gte: twoBefore,
            $lt: oneBefore,
          },
        },
      },
      {
        $group: {
          _id: null,
          total_sales: {
            $sum: "$price",
          },
        },
      },
    ]);
    if (result.length > 0 && lastMonth.length > 0) {
      if (lastMonth[0].total_sales > result[0].total_sales) {
        const percentage = `-${(result[0].total_sales / lastMonth[0].total_sales) * 100}%`;
        return { total_sales: result[0].total_sales, percentage };
      } else {
        const percentage = `+${(lastMonth[0].total_sales / result[0].total_sales) * 100}%`;
        return { total_sales: result[0].total_sales, percentage };
      }
    } else if (result.length === 0) {
      return { total_sales: 0, percentage: "-100%" };
    } else if (lastMonth.length === 0) {
      return { total_sales: result[0].total_sales, percentage: "+100%" };
    } else {
      return { total_sales: 0, percentage: "+0%" };
    }
  };

  async getTotalRevenueLastMonth() {
    const now = new Date();
    const oneMonthAgo = new Date(now);
    const twoMonthsAgo = new Date(now);
    const currentDay = now.getDate();

    oneMonthAgo.setMonth(now.getMonth() - 1);
    twoMonthsAgo.setMonth(now.getMonth() - 2);

    if (oneMonthAgo.getDate() !== currentDay) {
      oneMonthAgo.setDate(0);
    }
    if (twoMonthsAgo.getDate() !== currentDay) {
      twoMonthsAgo.setDate(0);
    }
    const result = await this.getRevenueBetweenDatesWithPercentage(now, oneMonthAgo, twoMonthsAgo);
    return result;
  }

  async getWeeklyRevenue() {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(oneWeekAgo.getTime() - 7 * 24 * 60 * 60 * 1000);
    const result = await this.getRevenueBetweenDatesWithPercentage(now, oneWeekAgo, twoWeeksAgo);
    return result;
  }

  async getDailyRevenue() {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const result = await this.getRevenueBetweenDatesWithPercentage(now, yesterday, twoDaysAgo);
    return result;
  }

  async getTotalSales() {}
}
