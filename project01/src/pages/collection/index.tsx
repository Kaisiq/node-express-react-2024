import { Button } from "../../components/ui/button";
import Link from "next/link";
import { IndexHeader } from "../IndexHeader";
import { ClothingSlot } from "./ClothingSlot";
import { ChevronRightIcon } from "~/components/Icons";
import { ChevronLeftIcon } from "~/components/Icons";

export default function collection() {
  //fetch 3 lists of data
  const data1 = [
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
      picture: "",
      link: "#",
    },
  ];
  return (
    <>
      <IndexHeader />
      <div className="mx-auto flex w-full max-w-3xl items-center space-x-4">
        <Button className="h-8 w-8 rounded-full p-0 shadow-sm" variant="ghost">
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <div className="overflow-x-auto rounded-xl border dark:border-gray-800">
          <div className="flex px-6 py-4">
            {data1.map((el) => {
              return <ClothingSlot product={el} />;
            })}
          </div>
        </div>
        <Button className="h-8 w-8 rounded-full p-0 shadow-sm" variant="ghost">
          <ChevronRightIcon className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </>
  );
}
