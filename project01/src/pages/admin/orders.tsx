import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { OrdersTable } from "./OrdersTable";

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
