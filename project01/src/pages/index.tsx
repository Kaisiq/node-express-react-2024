import { Layout } from "~/components/Layout";
import { FeaturedProduct } from "~/components/FeaturedProduct";
import { LatestProducts } from "~/components/LatestProducts";
import { Separator } from "~/components/ui/separator";
import { HeroSection } from "~/components/HeroSection";
import { IndexAbout } from "~/components/IndexAbout";

export default function Home() {
	return (
		<Layout>
			<main className="flex-1">
				<HeroSection />
				<Separator className="mt-6" />
				<FeaturedProduct />
				<Separator className="mb-4" />
				<LatestProducts n={3} />
				<IndexAbout />
			</main>
		</Layout>
	);
}
