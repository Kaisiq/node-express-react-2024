import { Sidebar } from "~/components/Sidebar";
import { Header } from "~/components/Header";
import { OrdersTable } from "~/components/OrdersTable";

export default function orders() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex-1 bg-gray-100/40 dark:bg-gray-800/40">
        <Header />
        <main className="p-4">
          <OrdersTable />
        </main>
      </div>
    </div>
  );
}
