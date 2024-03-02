import { ClothingSlotsList } from "~/components/ClothingSlotsList";
import { Layout } from "~/components/Layout";

export default function accessories() {
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
    <Layout>
      <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
        Аксесоари
      </h1>
      <ClothingSlotsList data={products} />
    </Layout>
  );
}
