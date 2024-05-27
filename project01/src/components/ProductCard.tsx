import type { ProductInterface } from "@/models/Product";
// import Image from "next/image";
import { Button } from "./ui/button";
import { useContext } from "react";
import { CartContext } from "./CartContextProvider";
import { Empty, Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Badge } from "./ui/badge";
import SingleProductModal from "./SingleProductModal";

export function ProductCard({ product }: { product: ProductInterface }) {
  const { addProduct } = useContext(CartContext);
  const screenSize = useScreenSize();
  return (
    <Card
      className="self-stretch"
      key={product._id}
    >
      <div className="group relative overflow-hidden rounded-lg">
        <SingleProductModal product={product}>
          <span className="sr-only">View</span>
          <div className="relative">
            {product?.images?.[0] ? (
              <img
                alt="Product 1"
                className="aspect-[4/3] h-[400px] object-cover lg:h-[500px]"
                width={screenSize < 780 ? screenSize : screenSize / 2}
                height={screenSize / 2 + 100}
                src={product.images[0]}
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <Skeleton className="aspect-[4/3] h-[400px] object-cover lg:h-[500px]" />
            )}
            {product.status === "sold" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
                <span className="text-3xl font-bold text-white drop-shadow-md">Изчерпано</span>
              </div>
            )}
          </div>
        </SingleProductModal>
        <div className="justify-space-between flex">
          <div className="flex flex-1 flex-col justify-between bg-white p-4 dark:bg-gray-950">
            <div className="grid gap-1">
              {product.sellPercent && product.sellPercent > 0 && (
                <Badge
                  className="w-min"
                  variant={"secondary"}
                >
                  Намалено
                </Badge>
              )}
              <h3 className="text-lg font-semibold md:text-2xl">{product.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Размер: {product.size}
                {product.fit ? `, ${product.fit}` : ""}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цвят: {product.color}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Материали: {product.materials}
              </p>
            </div>
            {product.sellPercent ? (
              <div className="flex gap-2">
                <h4 className="md:text-lg text-base font-normal text-neutral-600 line-through">
                  {product.price}лв
                </h4>
                <h4 className="md:text-lg text-base font-semibold">
                  {product.price - (product.price * product.sellPercent) / 100}
                  лв
                </h4>
              </div>
            ) : (
              <h4 className="md:text-lg text-base font-semibold">{product.price}лв</h4>
            )}
          </div>
          <div className="mr-5 flex flex-col gap-3 pt-4">
            <SingleProductModal product={product}>
              <Button variant="outline">Разгледай</Button>
            </SingleProductModal>
            {product.status !== "sold" && (
              <Button
                onClick={() => {
                  if (product._id) addProduct(product._id);
                }}
              >
                Добави в количката
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function SkeletonProductCard() {
  return (
    <Card className="self-stretch">
      <div className="group relative overflow-hidden rounded-lg">
        <div className="relative">
          <Skeleton className="aspect-[4/3] h-[400px] object-cover lg:h-[500px]" />
        </div>
        <div className="justify-space-between flex">
          <div className="flex flex-1 flex-col justify-between bg-white p-4 dark:bg-gray-950">
            <div className="mb-1 grid gap-1">
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-3 w-[300px]" />
              <Skeleton className="h-3 w-[350px]" />
              <Skeleton className="h-3 w-[350px]" />
            </div>
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <div className="mr-5 flex flex-col gap-3 pt-4">
            <Skeleton>
              <Button
                className="w-[100px]"
                variant="link"
              />
            </Skeleton>
            <Skeleton>
              <Button
                className="w-[100px]"
                variant="link"
              />
            </Skeleton>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function EmptyProductCard() {
  return (
    <Card className="self-stretch">
      <div className="group relative overflow-hidden rounded-lg">
        <div className="relative">
          <Skeleton className="aspect-[4/3] h-[400px] object-cover lg:h-[500px]" />
        </div>
        <div className="justify-space-between flex">
          <div className="flex flex-1 flex-col justify-between bg-white p-4 dark:bg-gray-950">
            <div className="mb-1 grid gap-1">
              <Empty className="h-5 w-[200px]" />
              <Empty className="h-3 w-[300px]" />
              <Empty className="h-3 w-[350px]" />
              <Empty className="h-3 w-[350px]" />
            </div>
            <Empty className="h-4 w-[50px]" />
          </div>
          <div className="mr-5 flex flex-col gap-3 pt-4">
            <Empty>
              <Button
                className="w-[100px]"
                variant="link"
              />
            </Empty>
            <Empty>
              <Button
                className="w-[100px]"
                variant="link"
              />
            </Empty>
          </div>
        </div>
      </div>
    </Card>
  );
}
