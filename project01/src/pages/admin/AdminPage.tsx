import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { type OrderInterface } from "~/models/Order";
import { type ProductInterface } from "~/models/Product";

export default function AdminPage() {
  const { orders, products, totalRevenue, salesCount, notShippedCount } = useLoaderData() as {
    orders: OrderInterface[];
    products: ProductInterface[];
    totalRevenue: number;
    salesCount: number;
    notShippedCount: number;
  };
  const newestOrders = orders;
  const newestProducts = products;
  return (
    <main className="grid flex-1 gap-6 p-4 md:p-6">
      <div className="grid h-min gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link
              className="text-sm font-medium text-primary hover:underline"
              to="/admin/orders"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newestOrders?.map((order) => {
                const orderDate = new Date(Date.parse(order.createdAt!));
                return (
                  <div
                    key={order._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <ShoppingCartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{order.productNames}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Placed at {orderDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">{order.price}лв</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Latest Products</CardTitle>
            <Link
              className="text-sm font-medium text-primary hover:underline"
              to="/admin/products"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newestProducts?.map((product) => {
                return (
                  <div
                    key={product._id}
                    className="flex items-center gap-4"
                  >
                    <img
                      alt="Product"
                      className="rounded-lg"
                      height={64}
                      src={product.images[0]}
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width={64}
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{product.price}лв</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Analytics</CardTitle>
            <Link
              className="text-sm font-medium text-primary hover:underline"
              to="/admin/analytics"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold">{totalRevenue}</p>
                </div>
                <DollarSignIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Orders to ship</p>
                  <p className="text-2xl font-bold">{notShippedCount}</p>
                </div>
                <UsersIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total Finished Orders</p>
                  <p className="text-2xl font-bold">{salesCount}</p>
                </div>
                <CreditCardIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
