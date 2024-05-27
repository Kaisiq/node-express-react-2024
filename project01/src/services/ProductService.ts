import axios from "axios";
import { Product, type ProductModel } from "~/models/Product";
import type { ProductInterface } from "~/models/Product";
import { mongooseConnect } from "~/lib/mongoose";

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
    await mongooseConnect();
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
    await mongooseConnect();
    const { _id, ...rest } = input;
    const result = await (Product as ProductModel).findOneAndUpdate(
      { _id },
      { ...rest },
      { new: true }
    );
    return { message: result ? "success" : "error" };
  }

  async createProduct(input: ProductInterface) {
    await mongooseConnect();
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
    await mongooseConnect();
    if (Array.isArray(input)) {
      const result = (await (Product as ProductModel).find({
        _id: input,
      })) as ProductInterface[];
      return result;
    } else {
      const result = (await (Product as ProductModel).find({
        _id: input,
      })) as ProductInterface[];
      return result[0];
    }
  }
  /* eslint-enable */

  async getAllProducts(page: number) {
    await mongooseConnect();
    const actualPage = page - 1;
    const results = (await (Product as ProductModel)
      .find()
      .skip(actualPage * this.productsPerPage)
      .limit(this.productsPerPage)) as ProductInterface[];
    return results;
  }

  async countPages(filterParams: object) {
    await mongooseConnect();
    const count = await (Product as ProductModel).find(filterParams).countDocuments();
    return count / this.productsPerPage;
  }

  async getAllMaleProducts(page: number) {
    await mongooseConnect();
    const actualPage = page - 1;

    const results = (await (Product as ProductModel)
      .find({ $or: [{ sex: "male" }, { sex: "both" }] })
      .skip(actualPage * this.productsPerPage)
      .limit(this.productsPerPage)) as ProductInterface[];
    return results;
  }

  async getAllFemaleProducts(page: number) {
    await mongooseConnect();
    const actualPage = page - 1;

    const results = (await (Product as ProductModel)
      .find({ $or: [{ sex: "female" }, { sex: "both" }] })
      .skip(actualPage * this.productsPerPage)
      .limit(this.productsPerPage)) as ProductInterface[];
    return results;
  }

  async getAllOnSale(page: number) {
    await mongooseConnect();
    const actualPage = page - 1;

    const results = (await (Product as ProductModel)
      .find({ sellPercent: { $gt: 0 } })
      .skip(actualPage * this.productsPerPage)
      .limit(this.productsPerPage)) as ProductInterface[];
    return results;
  }

  async getNewestProducts(n: number) {
    await mongooseConnect();
    const results = (await (Product as ProductModel)
      .find({}, null, {
        sort: { updatedAt: -1 },
      })
      .limit(n)) as ProductInterface[];
    return results;
  }

  async getNewestStatusProducts(status: string, n: number) {
    await mongooseConnect();
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
    await mongooseConnect();
    const results = (await (Product as ProductModel)
      .find({
        category: category,
      })
      .limit(50)) as ProductInterface[];
    return results;
  }

  async getCategoryN(category: string, n: number) {
    await mongooseConnect();
    const results = (await (Product as ProductModel)
      .find({
        category: category,
      })
      .limit(n)) as ProductInterface[];
    return results;
  }
}
