import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useContext, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";
import type { ProductInterface } from "~/models/Product";
import axios from "axios";
import type { AxiosResponse } from "axios";
import Image from "next/image";
import { Layout } from "~/components/Layout";
import { CartContext } from "~/components/CartContextProvider";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "~/components/ui/carousel";

export function ProductPagePhone({
  productInfo,
  children,
}: {
  productInfo: ProductInterface;
  children: React.ReactNode;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [imageToShow, setImageToShow] = useState("");
  useEffect(() => {
    const toShow = productInfo?.images?.[0]
      ? productInfo?.images?.[0]
      : imageToShow;
    setImageToShow(toShow);
    if (api) {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }
  }, [api]);
  return (
    <div className="flex md:hidden">
      <div className="order-1 grid items-start gap-3">
        <div className="flex items-start">
          <div className="grid gap-4">
            <h1 className="text-2xl font-bold sm:text-3xl">
              {productInfo.name}
            </h1>
            <div>
              <p>{productInfo.description}</p>
            </div>
          </div>
          <div className="ml-auto text-4xl font-bold">
            {productInfo.price}лв
          </div>
        </div>
      </div>
      {children}
      {/* Only for phone */}
      <div className="flex rounded-lg md:hidden">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {productInfo.images.map((image) => {
              return (
                <CarouselItem>
                  {image ? (
                    <Image
                      alt={image}
                      className="aspect-square rounded-lg object-cover"
                      height={600}
                      src={image ? image : ""}
                      width={600}
                    />
                  ) : (
                    <Skeleton className="h-[600] w-[600]" />
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Снимка {current} от {count}
        </div>
      </div>
    </div>
  );
}
