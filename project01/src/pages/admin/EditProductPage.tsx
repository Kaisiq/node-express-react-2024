import { AddProduct } from "~/components/AddProduct";
import type { ProductInterface } from "~/models/Product";
import { useLocation } from "react-router";

export default function Component() {
  const location = useLocation();
  const productInfo = location.state as ProductInterface;
  return (
    <main className="p-10">
      <h1 className="text-lg font-semibold md:text-2xl">
        editing product with id: {productInfo._id}
      </h1>
      <AddProduct {...productInfo} />
    </main>
  );
}
