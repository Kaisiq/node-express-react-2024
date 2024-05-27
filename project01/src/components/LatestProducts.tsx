import type { ProductInterface } from "@/models/Product";
import { ClothingSlotsList, EmptyClothingSlotsList } from "./ClothingSlotsList";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";

export function LatestProducts({ n }: { n: number }) {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  useEffect(() => {
    axios
      .get(`/api/products?newest=${n}`)
      .then((res: AxiosResponse<ProductInterface[]>) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [n]);
  if (products && products.length > 0) {
    return (
      <section className="pt-2">
        <h1 className="mb-5 text-center text-3xl font-bold">Най-новите ни продукти</h1>
        <ClothingSlotsList data={products} />
      </section>
    );
  } else {
    return (
      <section className="pt-2">
        <h1 className="mb-5 text-center text-3xl font-bold">Най-новите ни продукти</h1>
        <EmptyClothingSlotsList n={3} />
      </section>
    );
  }
}

export function SkeletonLatestProducts() {
  return (
    <section className="pt-2 lg:mx-[5vw]">
      <h1 className="text-center text-3xl font-bold">Най-новите ни продукти</h1>
      <div className="mx-20 grid grid-cols-1 gap-10 p-10 md:grid-cols-2 md:p-6 lg:grid-cols-3">
        <EmptyClothingSlotsList n={3} />
      </div>
    </section>
  );
}
