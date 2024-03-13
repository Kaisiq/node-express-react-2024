import { Layout } from "~/components/Layout";
import { FeaturedProduct } from "~/components/FeaturedProduct";
import { LatestProducts } from "~/components/LatestProducts";
import { Separator } from "~/components/ui/separator";
import { HeroSection } from "~/components/HeroSection";
import { IndexAbout } from "~/components/IndexAbout";
import type { ProductInterface } from "./api/products";
import { ProductService } from "~/services/ProductService";

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

const productService = new ProductService();

export async function getServerSideProps() {
	try {
		const featuredProductID = "65e72fe03188c9b2c3a8ba27";
		const featuredProduct = await productService.getProduct(featuredProductID);
		const latestProducts = await productService.getNewestProducts(3);
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
