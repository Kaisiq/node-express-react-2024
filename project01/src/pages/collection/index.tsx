import { Button } from "~/components/ui/button";
import { IndexHeader } from "~/components/IndexHeader";
import { ClothingSlot } from "~/components/ClothingSlot";
import { ChevronRightIcon } from "~/components/Icons";
import { ChevronLeftIcon } from "~/components/Icons";
import { ClothingSlotsList } from "~/components/ClothingSlotsList";
import { ScrollableClotingSlotsList } from "~/components/ScrollableClothingSlotsList";
import Link from "next/link";

export default function collection() {
  //fetch 3 lists of data
  // max 6 elements
  const data1 = [
    {
      name: "product 1",
      description: "Lorem ipsum dolor sit amet",
      price: "12",
      picture: "/cat.jpg",
      link: "#",
    },
    {
      name: "1",
      description: "asdasdasd",
      price: "122",
      picture: "",
      link: "#",
    },
    {
      name: "1",
      description: "asdasdasd",
      price: "900",
      picture: "/cat.jpg",
      link: "#",
    },
    {
      name: "product 1",
      description: "Lorem ipsum dolor sit amet",
      price: "12",
      picture: "/cat.jpg",
      link: "#",
    },
    {
      name: "1",
      description: "asdasdasd",
      price: "122",
      picture: "",
      link: "#",
    },
    {
      name: "1",
      description: "asdasdasd",
      price: "900",
      picture: "",
      link: "#",
    },
  ];
  const data2 = [
    {
      name: "product 1",
      description: "Lorem ipsum dolor sit amet",
      price: "12",
      picture: "",
      link: "#",
    },
    {
      name: "1",
      description: "asdasdasd",
      price: "122",
      picture: "/cat.jpg",
      link: "#",
    },
    {
      name: "1",
      description: "asdasdasd",
      price: "900",
      picture: "",
      link: "#",
    },
  ];
  const data3 = [
    {
      name: "product 1",
      description: "Lorem ipsum dolor sit amet",
      price: "12",
      picture: "",
      link: "#",
    },
    {
      name: "1",
      description: "asdasdasd",
      price: "122",
      picture: "",
      link: "#",
    },
    {
      name: "1",
      description: "asdasdasd",
      price: "900",
      picture: "/cat.jpg",
      link: "#",
    },
  ];
  return (
    <>
      <IndexHeader />
      <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
        Дрехи
      </h1>
      <ClothingSlotsList data={data1} />
      <Link className="flex flex-col items-center" href="/collection/clothing">
        <Button>Още дрехи</Button>
      </Link>
      <h1 className="mt-20 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
        Аксесоари
      </h1>
      <ClothingSlotsList data={data2} />
      <Link
        className="flex flex-col items-center"
        href="/collection/accessories"
      >
        <Button>Още аксесоари</Button>
      </Link>
      <h1 className="mt-20 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
        Обувки
      </h1>
      <ClothingSlotsList data={data3} />
      <Link className="flex flex-col items-center" href="/collection/footwear">
        <Button>Още обувки</Button>
      </Link>
    </>
  );
}
