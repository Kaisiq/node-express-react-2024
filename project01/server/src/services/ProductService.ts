import axios from "axios";
import { Product, type ProductModel, type ProductInterface } from "../models/Product";
import mongoose from "mongoose";

function linksToFileKeys(links: string[] | undefined) {
  if (!links) return "";
  const fileKeys: string[] = [];
  links.forEach((link) => {
    if (link) {
      const splittedLink = link.split("/");

      const fk: string | undefined = splittedLink ? splittedLink.at(-1) : "";
      if (!!fk) {
        fileKeys.push(fk);
      }
    }
  });
  return fileKeys;
}

export class ProductService {
  productsPerPage = 24;

  async deleteImages(imagesArr: string[] | undefined) {
    const fileKeys = linksToFileKeys(imagesArr);
    const bearer = process.env.UPLOADTHING_SECRET;
    const options = {
      method: "POST",
      url: "https://uploadthing.com/api/deleteFile",
      headers: {
        "Content-Type": "application/json",
        "X-Uploadthing-Api-Key": bearer,
        "X-Uploadthing-Version": "6.5.0",
      },
      data: { fileKeys: fileKeys },
    };
    await axios.request(options);
  }

  async getImages(productID: string) {
    const data = await (Product as ProductModel).findOne({
      _id: productID,
    });
    if (!data) {
      return undefined;
    }
    return data.images;
  }

  async deleteProcess(input: string) {
    try {
      const images = await this.getImages(input);
      await this.deleteImages(images);
      await (Product as ProductModel).deleteOne({ _id: input });
      return { message: "success" };
    } catch (error) {
      console.error(error);
      return { message: error };
    }
  }

  async updateProduct(input: ProductInterface) {
    const { _id, ...rest } = input;
    const result = await (Product as ProductModel).findOneAndUpdate(
      { _id },
      { ...rest },
      { new: true }
    );
    return { message: result ? "success" : "error" };
  }

  async createProduct(input: ProductInterface) {
    const result = await (Product as ProductModel).create(input);
    return { message: result ? "success" : "error" };
  }

  async deleteProduct(input: string | string[]) {
    if (Array.isArray(input)) {
      for await (const el of input) {
        const result = await this.deleteProcess(el);
        if (!result) {
          return { message: "error" };
        }
      }
      return { message: "success" };
    } else {
      const res = await this.deleteProcess(input);
      return { message: res };
    }
  }

  /* eslint-disable */
  async getProduct(input: string | string[]) {
    if (Array.isArray(input)) {
      const result = (await (Product as ProductModel).find({
        _id: input,
      })) as ProductInterface[];
      return result;
    } else {
      return await this.getSingleProduct(input);
    }
  }

  async getSingleProduct(input: string) {
    try {
      const _id = new mongoose.Types.ObjectId(input);
      const result = (await (Product as ProductModel).findById(_id).lean()) as ProductInterface; // Use lean query
      if (!result) {
        console.log("Product not found");
        return null;
      } else {
        return result;
      }
    } catch (err) {
      console.error("Error retrieving product:", err);
      return null;
    }
  }
  /* eslint-enable */

  stringFilterToObj = (filter: string) => {
    let actualFilter = {};
    if (filter === "male") {
      actualFilter = { $or: [{ sex: "male" }, { sex: "both" }] };
    } else if (filter === "female") {
      actualFilter = { $or: [{ sex: "female" }, { sex: "both" }] };
    } else if (filter === "sale") {
      actualFilter = { sellPercent: { $gt: 0 } };
    }
    return actualFilter;
  };

  async getAllProducts(page: number, filter: string) {
    const actualPage = page - 1;
    const actualFilter = this.stringFilterToObj(filter);
    const results = (await (Product as ProductModel)
      .find(actualFilter)
      .skip(actualPage * this.productsPerPage)
      .limit(this.productsPerPage)) as ProductInterface[];
    return results;
  }

  async removeAllFeatured() {
    const result = await (Product as ProductModel).updateMany(
      { featured: true },
      { $set: { featured: false } }
    );
    return result;
  }

  async setNewFeatured(newFeaturedIds: string[]) {
    const result = await (Product as ProductModel).updateMany(
      { _id: { $in: newFeaturedIds } },
      { $set: { featured: true } }
    );
    return result;
  }

  async getFeatured() {
    const result = (await (Product as ProductModel)
      .find({
        featured: true,
      })
      .limit(10)) as ProductInterface[];
    return result;
  }

  async countPages(filterParams: string) {
    const actualFilter = this.stringFilterToObj(filterParams);
    const count = await (Product as ProductModel).find(actualFilter).countDocuments();
    return count / this.productsPerPage;
  }

  async getNewestProducts(n: number) {
    const results = (await (Product as ProductModel)
      .find({}, null, {
        sort: { updatedAt: -1 },
      })
      .limit(n)) as ProductInterface[];
    return results;
  }

  async getNewestStatusProducts(status: string, n: number) {
    const results = (await (Product as ProductModel)
      .find({ status: status }, null, {
        sort: { updatedAt: -1 },
      })
      .limit(n)) as ProductInterface[];
    if (n === 1) {
      return results[0];
    }
    return results;
  }

  async getCategory(category: string) {
    const results = (await (Product as ProductModel)
      .find({
        category: category,
      })
      .limit(50)) as ProductInterface[];
    return results;
  }

  async getCategoryN(category: string, n: number) {
    const results = (await (Product as ProductModel)
      .find({
        category: category,
      })
      .limit(n)) as ProductInterface[];
    return results;
  }
}
