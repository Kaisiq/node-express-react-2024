import { Layout } from "~/components/Layout";
import { ProductCollection } from "~/components/ProductCollection";

export default function footwear() {
	return (
		<Layout>
			<h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
				Обувки
			</h1>
			<ProductCollection category="footwear" n={12} />
		</Layout>
	);
}
