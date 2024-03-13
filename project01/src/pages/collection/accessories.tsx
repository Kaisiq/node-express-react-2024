import { Layout } from "~/components/Layout";
import { ProductCollection } from "~/components/ProductCollection";

export default function accessories() {
	return (
		<Layout>
			<h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
				Аксесоари
			</h1>
			<ProductCollection category="accessories" n={12} />
		</Layout>
	);
}
