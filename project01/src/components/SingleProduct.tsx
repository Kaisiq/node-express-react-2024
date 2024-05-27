import { useContext, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { type ProductInterface } from "@/models/Product";
// import Image from "next/image";
import { CartContext } from "~/components/CartContextProvider";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "~/components/ui/carousel";

export default function SingleProduct(product: ProductInterface) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { addProduct } = useContext(CartContext);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const finalPrice = product.price - (product.price * (product.sellPercent ?? 0)) / 100;
  return (
    <div className="mx-auto grid max-w-6xl gap-[5%] px-4 py-12 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <div className="rounded-xl">
          <div className="block rounded-lg">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {product.images.map((image) => {
                  return (
                    <CarouselItem key={image}>
                      <div className="relative">
                        {image ? (
                          <img
                            alt={image}
                            className="aspect-square rounded-lg object-cover"
                            height={600}
                            src={image ? image : ""}
                            width={600}
                          />
                        ) : (
                          <Skeleton className="aspect-square h-[600px] w-[600px] rounded-lg object-cover" />
                        )}
                        {product.status === "sold" && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black bg-opacity-50">
                            <span className="text-3xl font-bold text-white drop-shadow-md md:text-4xl">
                              Изчерпано
                            </span>
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex" />
              <CarouselNext className="hidden lg:flex" />
            </Carousel>
          </div>
        </div>
        {current && count ? (
          <div className="py-2 text-center text-sm text-muted-foreground">
            Снимка {current} от {count}
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl lg:text-4xl">{product.name}</h1>
          <div className="font-bold md:text-2xl lg:text-4xl">
            {product.status === "sold" && "Изчерпано"}
            {product.status !== "sold" && product.sellPercent ? (
              <div className="flex flex-col">
                <span className="font-medium text-neutral-600 line-through">{product.price}лв</span>
                <div className="flex gap-3">
                  <span>
                    {finalPrice}
                    лв
                  </span>
                  <span className="text-md md:text-lg font-normal lg:text-2xl">
                    (-{product.sellPercent}%)
                  </span>
                </div>
              </div>
            ) : (
              product.status !== "sold" && <span>{finalPrice}лв</span>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-2xl font-bold">Описание</h2>
          <p className="text-gray-500 dark:text-gray-400">{product.description}</p>
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-bold">Детайли за продукта</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="text-lg mb-1 font-medium">Размер</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {product.size}
                {product.fit ? `, ${product.fit}` : ""}
              </p>
            </div>
            <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="text-lg mb-1 font-medium">Състояние</h3>
              <p className="text-gray-500 dark:text-gray-400">{product.condition}</p>
            </div>
            <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="text-lg mb-1 font-medium">Цвят</h3>
              <p className="text-gray-500 dark:text-gray-400">{product.color}</p>
            </div>
            <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="text-lg mb-1 font-medium">Материали</h3>
              <p className="text-gray-500 dark:text-gray-400">{product.materials}</p>
            </div>
          </div>
        </div>
        {product.status !== "sold" && (
          <Button
            onClick={(ev) => {
              ev.preventDefault();
              addProduct(product._id);
            }}
            size="lg"
          >
            Добавяне в количката
          </Button>
        )}
      </div>
    </div>
  );
}
