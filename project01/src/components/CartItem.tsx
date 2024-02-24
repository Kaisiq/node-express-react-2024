import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";

interface Item {
  name: string;
  properties: string;
  picture: string;
  price: number;
}

export function CartItem({ data }: { data: Item }) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 md:grid md:grid-cols-3 md:items-start lg:gap-6">
      <div className="flex items-start gap-4 text-sm md:col-span-2">
        <img
          alt="Thumbnail"
          className="aspect-video rounded-md border object-cover"
          height="200"
          src={data.picture}
          width="150"
        />
        <div>
          <h2 className="font-semibold">{data.name}</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {data.properties.split(" ").map((el) => {
              return <p>{el}</p>;
            })}
          </div>
          <Button size="icon" variant="ghost">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
      <div className="text-right md:flex md:justify-end">{data.price}лв</div>
    </div>
  );
}
