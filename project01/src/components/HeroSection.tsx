import Link from "next/link";
import { Button } from "./ui/button";
export function HeroSection() {
	return (
		<section className="relative flex h-[50vh] min-h-[350px] flex-col items-center justify-center bg-[url('/cat.jpg?height=800&width=1600')] bg-cover bg-center">
			<div className="z-10 max-w-[800px] px-4 text-center">
				<h1 className="mb-4 text-5xl font-bold leading-tight text-white md:text-7xl">
					По-добри от{" "}
					<span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
						втора употреба
					</span>
				</h1>
				<p className="mb-8 text-xl text-gray-200 md:text-2xl">
					Спести време и пари с нашата селекция от едни от най-качествените
					марки. Превърни пазаруването си в приятно изживяване с нас!
				</p>
				<div className="flex justify-center gap-4">
					<Button variant="outline">
						<Link href="/collection" className="text-lg">
							Разгледай колекцията от дрехи
						</Link>
					</Button>
				</div>
			</div>
			<div className="absolute inset-0 z-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.4)]" />
		</section>
	);
}
