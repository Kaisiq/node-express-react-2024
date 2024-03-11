import { Product, ProductInterface, ProductModel } from "~/models/Product";

export class ProductService{
    async updateProduct(input: ProductInterface){
        const {_id, ...rest} = input;
        const result = await (Product as ProductModel).findOneAndUpdate({_id}, {rest});
        return {message: result ? "success" : "error"}
    }
    async createProduct(input: ProductInterface){
        const result = await (Product as ProductModel).create(input);
        return {message: result ? "success" : "error"}
    }
    async deleteProduct(input : string){
        const result = await (Product as ProductModel).findOneAndDelete({_id: input});
        return {message: result ? "success" : "error"}
    }
    async getProduct(input:string | string[]){
        const result = await (Product as ProductModel).find({_id:input});
        return result;
    }
    async getAllProducts(){
        const result = await (Product as ProductModel).find().limit(50);
        return result;
    }
}