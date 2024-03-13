import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import { ProductCollection } from "~/components/ProductCollection";

export default function collection() {
	//fetch 3 lists of data
	// max 6 elements
	return (
		<Layout>
			<h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
				Дрехи
			</h1>
			<ProductCollection category={"clothing"} n={3} />
			<Link className="flex flex-col items-center" href="/collection/clothing">
				<Button>Още дрехи</Button>
			</Link>

			<h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
				Аксесоари
			</h1>
			<ProductCollection category={"accessories"} n={3} />
			<Link
				className="flex flex-col items-center"
				href="/collection/accessories"
			>
				<Button>Още аксесоари</Button>
			</Link>

			<h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
				Обувки
			</h1>
			<ProductCollection category={"footwear"} n={3} />
			<Link className="flex flex-col items-center" href="/collection/footwear">
				<Button>Още обувки</Button>
			</Link>
		</Layout>
	);
}
