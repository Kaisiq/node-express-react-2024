// import { type GetServerSidePropsContext } from "next";
import { useLocation } from "react-router";
import ClothingCollectionWithFilter from "~/components/ClothingCollectionWithFilter";
import CustomHead from "~/components/CustomHead";
import { mongooseConnect } from "~/lib/mongoose";
import { ProductService } from "~/services/ProductService";

export default function Collection() {
  // props: { products: string; page: number; maxPages: number }
  const location = useLocation();
  return (
    <>
      <CustomHead
        title={`Две Трети | Колекция | Мъжко`}
        description={`Онлайн магазин за дрехи втора употреба`}
        image={`/b.webp?height=800&width=1600`}
        link={`${location.pathname}`}
        type="web"
        domain={`${location.pathname}`}
      />
      <main>
        <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">Мъжко</h1>
        {/* <ClothingCollectionWithFilter {...props} /> */}
      </main>
    </>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const page = context.query.page ?? 1;
//   const pageNumber = Number(page);
//   await mongooseConnect();
//   const productService = new ProductService();
//   const maxPages = Math.ceil(
//     await productService.countPages({
//       $or: [{ sex: "male" }, { sex: "both" }],
//     })
//   );
//   const products = await productService.getAllMaleProducts(pageNumber);
//   return {
//     props: { products: JSON.stringify(products), page: pageNumber, maxPages },
//   };
// }
