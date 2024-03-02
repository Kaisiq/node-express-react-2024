import { createElement } from "react";
import { ClothingSlot, EmptyClothingSlot } from "./ClothingSlot";

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
    <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-6 md:grid-cols-2 md:gap-8 md:py-12 lg:grid-cols-3">
      {data.map((el, index) => {
        return <ClothingSlot key={index} product={el} />;
      })}
    </div>
  );
}

export function EmptyClothingSlotsList(n: number) {
  let clotingslotlist = [];
  for (let i = 0; i < n; i++) {
    clotingslotlist.push(<EmptyClothingSlot key={i} />);
  }
  return (
    <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-6 md:grid-cols-2 md:gap-8 md:py-12 lg:grid-cols-3">
      {clotingslotlist}
    </div>
  );
}
