import { ChevronLeftIcon } from "./Icons";
import { ChevronRightIcon } from "./Icons";
import { Button } from "./ui/button";
import { ClothingSlot } from "./ClothingSlot";

interface Product {
  name: string;
  description: string;
  price: string;
  picture: string;
  link: string;
}

// TODO: fetch data from DB and add it
export function ScrollableClotingSlotsList({ data }: { data: Product[] }) {
  return (
    <div className="mx-auto my-20 flex h-min w-auto max-w-3xl items-center">
      <Button className="h-8 w-8 rounded-full p-0 shadow-sm" variant="ghost">
        <ChevronLeftIcon className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>
      <div className="flex shrink-0 flex-row flex-nowrap overflow-x-scroll">
        {data.map((el, index) => {
          return <ClothingSlot key={index} product={el} />;
        })}
      </div>
      <Button className="h-8 w-8 rounded-full p-0 shadow-sm" variant="ghost">
        <ChevronRightIcon className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  );
}
