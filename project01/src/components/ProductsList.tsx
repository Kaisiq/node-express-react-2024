import { ProductCardAdmin } from "./ProductCardAdmin";
import { type ProductInterface } from "~/models/Product";

export function ProductsList({ products }: { products: ProductInterface[] }) {
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product: ProductInterface) => {
        return (
          <div
            key={product._id}
            className="h-full"
          >
            <ProductCardAdmin {...product} />
          </div>
        );
      })}
    </div>
  );
}
