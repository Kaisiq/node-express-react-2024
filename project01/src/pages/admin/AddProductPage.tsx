import { AddProduct } from "~/components/AddProduct";

export default function AddProductPage() {
  const nullProduct = {
    name: "",
    description: "",
    price: null as unknown as number,
    sellPercent: 0,
    category: "",
    condition: "",
    sex: "",
    size: "",
    status: "",
    _id: "",
    images: [],
  };
  return (
    <main className="p-10">
      <h1 className="text-lg font-semibold md:text-2xl">Add new product</h1>
      <AddProduct {...nullProduct} />
    </main>
  );
}
