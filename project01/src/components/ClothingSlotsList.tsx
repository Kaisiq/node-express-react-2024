import { createElement } from "react";
import { ClothingSlot } from "./ClothingSlot";

interface Product {
  name: string;
  description: string;
  price: string;
  picture: string;
  link: string;
}

// TODO: fetch data from DB and add it
export function ClothingSlotsList({ data }: { data: Product[] }) {
  return (
    <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-6 md:gap-8 md:py-12 lg:grid-cols-3">
      {data.map((el, index) => {
        return <ClothingSlot key={index} product={el} />;
      })}
    </div>
  );
}
