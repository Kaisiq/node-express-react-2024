import { FeaturedProduct } from "~/components/FeaturedProduct";
import { LatestProducts } from "~/components/LatestProducts";
import { Separator } from "@/components/ui/separator";
import { HeroSection } from "@/components/HeroSection";
import { ProductCollection } from "@/components/ProductCollection";
import { ProductService } from "@/services/ProductService";
import type { ProductInterface } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import CustomHead from "@/components/CustomHead";
import { useLocation } from "react-router-dom";
import LinkImageWithText from "@/components/LinkImageWithText";
import { useLoaderData } from "react-router-dom";

export default function IndexPage() {
  // const props = useLoaderData() as { featured: string; newest: string };
  // // props: { featured: string; newest: string };

  // const parsedFeatured = JSON.parse(props.featured) as ProductInterface;
  // const parsedNewest = JSON.parse(props.newest) as ProductInterface[];
  const location = useLocation();

  return (
    <>
      <CustomHead
        title={`Две Трети`}
        description={`Онлайн магазин за дрехи втора употреба | начална страница`}
        image={`/b.webp?height=800&width=1600`}
        link={`${location.pathname}`}
        type="web"
        domain={`${location.pathname}`}
      />
      <main className="flex-1">
        <HeroSection />
        {/* <FeaturedProduct product={parsedFeatured} /> */}
        <Separator className="mb-4" />
        <section className="w-full pt-12 md:pt-16 lg:pt-20 xl:pt-24">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-justify md:px-6">
            <div className="space-y-3">
              <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Устойчиви модни избори
              </h2>
              <p className="mx-auto text-gray-500 dark:text-gray-400 md:max-w-[70vw] md:text-xl/relaxed lg:max-w-[40vw] lg:text-base/relaxed xl:text-xl/relaxed">
                Нашата внимателно подбрана селекция от устойчиви модни продукти е идеалният начин да
                откриете вашият екологичен стил. Всеки артикул е неподвластен на времето, а като
                избирате винтидж, намалявате отпадъците и оказвате положително въздействие върху
                околната среда.
              </p>
            </div>
          </div>
        </section>
        <LatestProducts n={3} />
        <section className="w-full pt-12 md:pt-16 lg:pt-20 xl:pt-24">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-justify md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ретро находки на достъпни цени
              </h2>
              <p className="mx-auto text-gray-500 dark:text-gray-400 md:max-w-[70vw] md:text-xl/relaxed lg:max-w-[40vw] lg:text-base/relaxed xl:text-xl/relaxed">
                Нашата колекция от ретро находки в момента е в разпродажба! От типични тениски до
                открояващи се аксесоари - предлагаме широка гама от артикули за всеки вкус. Придайте
                винтидж нотка на гардероба си, без да прахосвате пари, с нашите достъпни
                предложения.
              </p>
            </div>
          </div>
        </section>
        <ProductCollection
          category=""
          n={12}
        />
        <section className="m-3 mx-auto flex w-[90%] flex-col items-center justify-center gap-3 md:w-[80%]">
          <h2 className="text-3xl">Разгледай още:</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            <LinkImageWithText
              image={"/males.jpg"}
              text={"Мъжко"}
            />
            <LinkImageWithText
              image={"/females.png"}
              text={"Дамско"}
            />
            <LinkImageWithText
              image={"/males.jpg"}
              text={"Намалени"}
            />
            <LinkImageWithText
              image={"/males.jpg"}
              text={"Всичко"}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export async function indexPageLoader() {
  // const productService = new ProductService();
  // const products = (await productService.getNewestStatusProducts("ok", 3)) as ProductInterface[];
  // const newestProducts = await productService.getNewestProducts(3);
  const randomNumber = Math.floor(Math.random() * 3);
  return {
    props: {
      featured: JSON.stringify("products[randomNumber]"),
      newest: JSON.stringify("newestProducts"),
    },
  };
}
