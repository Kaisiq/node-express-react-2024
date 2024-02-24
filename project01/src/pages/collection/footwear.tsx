/**
 * v0 by Vercel.
 * @see https://v0.dev/t/w9VqQyJzXZS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { IndexHeader } from "~/components/IndexHeader";
import { ClothingSlotsList } from "~/components/ClothingSlotsList";

export default function footwear() {
  //TODO: fetch data from db
  const products = [
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
      <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
        Обувки
      </h1>
      <ClothingSlotsList data={products} />
    </>
  );
}
