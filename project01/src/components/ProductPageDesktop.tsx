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

export function ProductPageDesktop({
  productInfo,
  children,
}: {
  productInfo: ProductInterface;
  children: React.ReactNode;
}) {
  const [imageToShow, setImageToShow] = useState("");
  useEffect(() => {
    const toShow = productInfo?.images?.[0]
      ? productInfo?.images?.[0]
      : imageToShow;
    setImageToShow(toShow);
  }, []);
  return (
    <div className="hidden md:block">
      <div className="flex items-start">
        <div className="grid gap-4">
          <h1 className="text-3xl font-bold lg:text-4xl">{productInfo.name}</h1>
          <div>
            <p>{productInfo.description}</p>
          </div>
        </div>
        <div className="ml-auto text-4xl font-bold">{productInfo.price}лв</div>
      </div>
      {children}
      <div className="hidden gap-4 md:grid">
        {productInfo?.images?.[0] || imageToShow ? (
          <Image
            alt="Product Image"
            className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            height={600}
            src={
              imageToShow
                ? imageToShow
                : productInfo?.images?.[0]
                  ? productInfo?.images?.[0]
                  : ""
            }
            width={600}
          />
        ) : (
          <Skeleton className="h-[600] w-[600] rounded-lg" />
        )}
        <div className="hidden items-start gap-4 md:flex ">
          {productInfo.images.map((image) => {
            return (
              <button
                onClick={() => {
                  setImageToShow(image);
                }}
                key={image}
                className="overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50"
              >
                <Image
                  alt={image}
                  className="aspect-square object-cover"
                  height={100}
                  src={image}
                  width={100}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
