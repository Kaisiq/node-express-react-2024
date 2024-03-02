import { OrdersTable } from "~/components/OrdersTable";
import { AdminLayout } from "~/components/AdminLayout";

export default function orders() {
  return (
    <AdminLayout>
      <main className="p-4">
        <OrdersTable />
      </main>
    </AdminLayout>
  );
}
