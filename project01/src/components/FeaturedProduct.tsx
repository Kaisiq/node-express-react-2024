import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useContext } from "react";
import type { ProductInterface } from "~/models/Product";
import { CartContext } from "./CartContextProvider";

export function FeaturedProduct({ product }: { product: ProductInterface }) {
  const { addProduct } = useContext(CartContext);
  function addToCart() {
    addProduct(product._id);
  }
  return (
    <section className="w-full py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px] xl:gap-16">
          <Image
            alt="Smartphone"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            height="700"
            src={product?.images?.[0] ? product.images[0] : ""}
            width="700"
          />
          <div className="space-y-4 text-center lg:text-left">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Featured
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {product.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                описание: {product.description}
              </p>
              <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                размер: {product.size}
              </p>
              <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                цена: {product.price}лв
              </p>
            </div>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href={"/product/" + product._id}
            >
              Разгледай
            </Link>
            <Button
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium text-black shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              onClick={addToCart}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
