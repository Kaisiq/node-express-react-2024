import { Order, OrderModel } from "~/models/Order";
import { OrderInterface } from "~/pages/api/orders";

export class OrderService{

    async updateOrder(input: OrderInterface){
        const {_id,...rest} = input
        
       const result =  await (Order as OrderModel).findOneAndUpdate({_id}, {rest});

        



       return {message: result ? "success" : "error"};


    }
}