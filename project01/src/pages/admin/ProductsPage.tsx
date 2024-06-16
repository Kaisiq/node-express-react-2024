import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ProductsList } from "~/components/ProductsList";
import { Button } from "~/components/ui/button";
import { type ProductInterface } from "~/models/Product";

export default function ProductsPage() {
  const { products } = useLoaderData() as { products: ProductInterface[] };
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center gap-3 p-4">
      <div className="flex flex-row gap-4 items-center">
        <Link to="/admin/products/add">
          <Button
            variant={"outline"}
            className="text-lg"
            size={"lg"}
          >
            Добавяне на продукт
          </Button>
        </Link>
        <Button
          variant={"outline"}
          className="text-lg"
          size={"lg"}
          onClick={() => navigate("/admin/products/featured", { state: products })}
        >
          Промяна на избрани продукти
        </Button>
      </div>
      <ProductsList products={products} />
    </main>
  );
}
