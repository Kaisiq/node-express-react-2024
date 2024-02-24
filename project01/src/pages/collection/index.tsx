import { Button } from "~/components/ui/button";
import { IndexHeader } from "~/components/IndexHeader";
import { ClothingSlot } from "~/components/ClothingSlot";
import { ChevronRightIcon } from "~/components/Icons";
import { ChevronLeftIcon } from "~/components/Icons";
import { ClothingSlotsList } from "~/components/ClothingSlotsList";
import { ScrollableClotingSlotsList } from "~/components/ScrollableClothingSlotsList";

export default function collection() {
  //fetch 3 lists of data
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
      <ScrollableClotingSlotsList data={data1} />
      <ScrollableClotingSlotsList data={data2} />
      <ScrollableClotingSlotsList data={data3} />
    </>
  );
}
