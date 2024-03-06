import { AddProduct } from "~/components/AddProduct";
import { AdminLayout } from "~/components/AdminLayout";

export default function Component() {
  const nullProduct = {
    name: "",
    description: "",
    price: null as unknown as number,
    category: "",
    size: "",
    status: "",
    _id: "",
    images: [],
  };
  return (
    <AdminLayout>
      <main className="p-10">
        <h1 className="text-lg font-semibold md:text-2xl">Add new product</h1>
        <AddProduct {...nullProduct} />
      </main>
    </AdminLayout>
  );
}
