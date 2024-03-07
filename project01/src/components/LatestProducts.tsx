import type { ProductInterface } from "~/models/Product";
import Link from "next/link";
import Image from "next/image";

export function LatestProducts({ products }: { products: ProductInterface[] }) {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Най-нови продукти</h1>
      <section className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2 md:p-6 lg:grid-cols-3">
        {products.map((product) => {
          return (
            <div className="flex flex-col" key={product._id}>
              <div className="group relative overflow-hidden rounded-lg">
                <Link
                  className="absolute inset-0 z-10"
                  href={"/product/" + product._id}
                >
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  alt="Product 1"
                  className="h-60 w-full object-cover"
                  height={400}
                  src={product?.images?.[0] ? product.images[0] : "/cat.jpg"}
                  style={{
                    aspectRatio: "500/400",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <div className="flex flex-1 flex-col justify-between bg-white p-4 dark:bg-gray-950">
                  <div className="grid gap-1">
                    <h3 className="text-lg font-semibold md:text-xl">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Размер: {product.size}
                    </p>
                  </div>
                  <h4 className="text-base font-semibold md:text-lg">
                    {product.price}лв
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
