import { useLoaderData } from "react-router";
import { OrdersTable } from "~/components/ordersTable/OrdersTable";
import { OrderInterface } from "~/models/Order";

export default function OrdersPage() {
  const orders = useLoaderData() as OrderInterface[];
  console.log(orders);
  return (
    <main className="p-4">
      <OrdersTable data={orders} />
    </main>
  );
}
