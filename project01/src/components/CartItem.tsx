import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
// import Image from "next/image";
import type { ProductInterface } from "~/models/Product";
import { useContext } from "react";
import { CartContext } from "./CartContextProvider";
import { Skeleton } from "./ui/skeleton";

export function CartItemSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-2 md:grid md:grid-cols-3 md:items-start lg:gap-6">
      <div className="flex w-5/6 flex-wrap items-start gap-4 text-sm md:col-span-2">
        <Skeleton className="h-[85px] w-[50%] bg-gray-200 md:w-[150px]" />
        <div className="w-[40%]">
          <div className="space-y-2">
            <Skeleton className="w-1/1 h-4 bg-gray-200 md:w-[200px]" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/5 bg-gray-200 md:w-[350px]" />
              <Skeleton className="h-4 w-2/5 bg-gray-200 md:w-[300px]" />
            </div>
          </div>
          {/* <Skeleton className="h-10 px-4 py-2" /> */}
          <Button
            size="icon"
            variant="ghost"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Skeleton className="h-4 w-[10%] bg-gray-200 md:flex md:justify-self-end" />
    </div>
  );
}

export function CartItem({ data }: { data: ProductInterface }) {
  const { removeProduct } = useContext(CartContext);

  return (
    <div className="flex items-center gap-4 px-4 py-2 md:grid md:grid-cols-3 md:items-start lg:gap-6">
      <div className="flex items-start gap-4 text-sm md:col-span-2">
        <img
          alt="Thumbnail"
          // priority
          className="aspect-video rounded-md border object-cover"
          height="200"
          src={data?.images?.[0] ? data.images[0] : ""}
          width="150"
        />
        <div>
          <h2 className="font-semibold">{data.name}</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {/* {data.properties.split(" ").map((el, index) => {
              return <p key={index}>{el}</p>;
            })} */}
            {data.description}
          </div>
          <Button
            onClick={() => {
              if (data._id) removeProduct(data._id);
            }}
            size="icon"
            variant="ghost"
          >
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
      <div className="text-right md:flex md:justify-end">{data.price}лв</div>
    </div>
  );
}
