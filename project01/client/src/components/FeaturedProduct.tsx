import { Button } from "./ui/button";
import { useContext } from "react";
import type { ProductInterface } from "@/models/Product";
import { CartContext } from "./CartContextProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useSizeLTMd } from "@/hooks/useScreenSize";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router";

export function FeaturedProduct({ product }: { product: ProductInterface }) {
  const navigate = useNavigate();
  const { addProduct } = useContext(CartContext);
  const isMDOrLess = useSizeLTMd();
  function addToCart() {
    if (product) if (product._id) addProduct(product._id);
  }
  if (!product) {
    return (
      <section className="w-full py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px] xl:gap-16">
            <Skeleton className="mx-auto aspect-video w-full object-center" />
            <div className="space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <Badge>Препоръчанo</Badge>
                <Skeleton className="h-12 w-[65%] md:w-[250px]" />
                <Skeleton className="h-3 w-[70%] md:w-[400px]" />
                <Skeleton className="h-3 w-[80%] md:w-[500px]" />
                <Skeleton className="h-3 w-[80%] md:w-[400px]" />
                <Skeleton className="h-5 w-[20%] md:w-[50px]" />
              </div>
              <Skeleton className="inline-flex h-10">
                <Button
                  variant="link"
                  className="px-16"
                />
              </Skeleton>
              <Skeleton className="ml-3 inline-flex h-10">
                <Button
                  variant="link"
                  className="px-16"
                />
              </Skeleton>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px] xl:gap-16">
          {product?.images?.[0] && (
            <img
              onClick={() => navigate(`/product/${product._id}`, { state: product })}
              alt="FeaturedProduct"
              className={`mx-auto ${
                isMDOrLess ? "aspect-[4/3]" : "aspect-[3/4]"
              } overflow-hidden rounded-xl object-cover object-center md:h-[400px] lg:h-[500px]`}
              height="500"
              src={product.images[0]}
              width="500"
            />
          )}
          <div className="space-y-4 text-center lg:text-left">
            <div className="space-y-2">
              <div className="flex justify-center gap-1">
                <Badge>Препоръчанo</Badge>
                {product.sellPercent && product.sellPercent > 0 && <Badge>Намалено</Badge>}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{product.name}</h2>
              <div className="flex flex-col text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                <p>Описание: {product.description}</p>
                <p>
                  Размер: {product.size}
                  {product.fit ? `, ${product.fit}` : ""}
                </p>
                <p>Цвят: {product.color}</p>
                <p>Материали: {product.materials}</p>
                {product.sellPercent ? (
                  <div className="align-center flex flex-row items-center justify-center gap-2">
                    Цена:
                    <p className="text-neutral-450 font-normal line-through">{product.price}лв</p>
                    <p className="font-semibold">
                      {product.price - (product.price * product.sellPercent) / 100}
                      лв
                    </p>
                  </div>
                ) : (
                  <p>Цена: {product.price}лв</p>
                )}
              </div>
            </div>
            <div
              onClick={() => navigate(`/product/${product._id}`, { state: product })}
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            >
              Разгледай
            </div>
            <Button
              variant="default"
              className="ml-3 inline-flex h-10 items-center justify-center px-8"
              onClick={addToCart}
            >
              Добави в количката
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
