import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import type { ProductInterface } from "~/models/Product";
import { useContext } from "react";
import { CartContext } from "./CartContextProvider";

export function CartItem({ data }: { data: ProductInterface }) {
  const { removeProduct } = useContext(CartContext);

  return (
    <div className="flex items-center gap-4 px-4 py-2 md:grid md:grid-cols-3 md:items-start lg:gap-6">
      <div className="flex items-start gap-4 text-sm md:col-span-2">
        <Image
          alt="Thumbnail"
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
              removeProduct(data._id);
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
