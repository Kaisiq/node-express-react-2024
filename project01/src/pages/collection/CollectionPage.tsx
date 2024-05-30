import { useLoaderData, useLocation } from "react-router";
import ClothingCollectionWithFilter from "~/components/ClothingCollectionWithFilter";
import CustomHead from "~/components/CustomHead";
import { ProductInterface } from "~/models/Product";

export default function CollectionPage() {
  const location = useLocation();
  const pathSplit = location.pathname.split("/");
  const name = pathSplit.at(pathSplit.length - 1);
  console.log(name);
  const props = useLoaderData() as { products: ProductInterface[]; page: number; maxPages: number };
  return (
    <>
      <CustomHead
        title={`Две Трети | Колекция | ${
          name === "males"
            ? "Мъжко"
            : name === "females"
            ? "Дамско"
            : name === "sale"
            ? "Намалени"
            : "Всички"
        }`}
        description={`Онлайн магазин за дрехи втора употреба`}
        image={`/b.webp?height=800&width=1600`}
        link={`${location.pathname}`}
        type="web"
        domain={`${location.pathname}`}
      />
      <main>
        <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          {name === "males"
            ? "Мъжко"
            : name === "females"
            ? "Дамско"
            : name === "sale"
            ? "Намалени"
            : "Всички"}
        </h1>
        <ClothingCollectionWithFilter {...props} />
      </main>
    </>
  );
}
