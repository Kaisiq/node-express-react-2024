import { Layout } from "~/components/Layout";
import { FeaturedProduct } from "~/components/FeaturedProduct";
import { mongooseConnect } from "~/lib/mongoose";
import { Product, ProductModel } from "~/models/Product";
import { LatestProducts } from "~/components/LatestProducts";
import { Separator } from "~/components/ui/separator";
import { HeroSection } from "~/components/HeroSection";
import { IndexAbout } from "~/components/IndexAbout";
import { ProductInterface } from "~/models/Product";

export default function Home({
  featuredProduct,
  newProducts,
}: {
  featuredProduct: ProductInterface;
  newProducts: ProductInterface[];
}) {
  return (
    <Layout>
      <main className="flex-1">
        <HeroSection />
        <Separator className="mt-6" />
        <FeaturedProduct product={featuredProduct} />
        <Separator className="mb-4" />
        <LatestProducts products={newProducts} />
        <IndexAbout />
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const featuredProductID = "65e758495fa65d0b43824843";
    await mongooseConnect();
    const featuredProduct = await (Product as ProductModel).findById(
      featuredProductID,
    );
    const latestProducts = await (Product as ProductModel)
      .find({}, null, {
        sort: { _id: -1 },
      })
      .limit(3);
    return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(latestProducts)),
      },
    };
  } catch (err) {
    console.log(err);
  }
}
