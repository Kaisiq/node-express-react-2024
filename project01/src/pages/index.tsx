import { Layout } from "~/components/Layout";
import { FeaturedProduct } from "~/components/FeaturedProduct";
import { mongooseConnect } from "~/lib/mongoose";
import { Product, type ProductModel } from "~/models/Product";
import { LatestProducts } from "~/components/LatestProducts";
import { Separator } from "~/components/ui/separator";
import { HeroSection } from "~/components/HeroSection";
import { IndexAbout } from "~/components/IndexAbout";
import type { ProductInterface } from "~/models/Product";

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
    const featuredProductID = "65e72fe03188c9b2c3a8ba27";
    await mongooseConnect();
    const featuredProduct = await (Product as ProductModel).findById(
      featuredProductID,
    );
    const latestProducts = await (Product as ProductModel)
      .find({}, null, {
        sort: { updatedAt: -1 },
      })
      .limit(3);
    /* eslint-disable */
    return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(latestProducts)),
      } as {
        featuredProduct: ProductInterface | null;
        newProducts: ProductInterface[];
      },
      /* eslint-enable */
    };
  } catch (err) {
    console.log(err);
  }
}
