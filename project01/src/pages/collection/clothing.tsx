import { Layout } from "~/components/Layout";
import { ProductCollection } from "~/components/ProductCollection";

export default function Component() {
	return (
		<Layout>
			<h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
				Дрехи
			</h1>
			<ProductCollection category="clothing" n={12} />
		</Layout>
	);
}
