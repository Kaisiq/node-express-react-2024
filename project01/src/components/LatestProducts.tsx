import type { ProductInterface } from "@/models/Product";
import { ClothingSlotsList } from "./ClothingSlotsList";

export function LatestProducts({ products }: { products: ProductInterface[] }) {
  return (
    <section className="pt-2">
      <h1 className="mb-5 text-center text-3xl font-bold">Най-новите ни продукти</h1>
      <ClothingSlotsList data={products} />
    </section>
  );
}
