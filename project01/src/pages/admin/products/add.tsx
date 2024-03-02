import { AddProduct } from "~/components/AddProduct";
import { AdminLayout } from "~/components/AdminLayout";

export default function Component() {
  return (
    <AdminLayout>
      <main className="p-10">
        <AddProduct />
      </main>
    </AdminLayout>
  );
}
