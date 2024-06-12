import { type OrderInterface } from "~/models/Order";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function OrdersTable({ data }: { data: OrderInterface[] }) {
  return (
    <div className="mx-0 w-full py-10 md:container md:mx-auto">
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
