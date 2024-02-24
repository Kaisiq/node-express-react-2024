import { createElement } from "react";
import { ClothingSlot } from "./ClothingSlot";

// TODO: fetch data from DB and add it
export function ClothingSlotsList() {
  const data = [
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
  const div = createElement("div");
  return (
    <>
      {data.map((el, index) => {
        return <ClothingSlot key={index} product={el} />;
      })}
    </>
  );
}
