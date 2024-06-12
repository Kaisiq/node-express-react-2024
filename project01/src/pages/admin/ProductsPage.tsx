import { Link, useLoaderData } from "react-router-dom";
import { ProductsList } from "~/components/ProductsList";
import { Button } from "~/components/ui/button";
import { type ProductInterface } from "~/models/Product";

export default function ProductsPage() {
  const { products } = useLoaderData() as { products: ProductInterface[] };
  return (
    <main className="flex flex-col items-center gap-3 p-4">
      <Link to="/admin/products/add">
        <Button
          variant={"outline"}
          className="text-lg"
          size={"lg"}
        >
          Добавяне на продукт
        </Button>
      </Link>
      <ProductsList products={products} />
    </main>
  );
}
