import Image from "next/image";
import Link from "next/link";
export function HeroSection() {
	return (
		<section className="w-full">
			<div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
				<div className="flex items-center justify-center overflow-hidden rounded-t-lg">
					<Image
						alt="Hero"
						className="aspect-video w-full object-cover object-top"
						height="400"
						src="/cat.jpg"
						width="1200"
					/>
				</div>
				<div className="grid gap-4 px-4 md:px-6">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
							По-добри от{" "}
							<span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
								втора употреба
							</span>
						</h1>
						<p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Спестеи време и пари с нашата селекция от най-качествените марки.
							Превърни пазаруването си в приятно изживяване с нас!
						</p>
					</div>
					<Link
						className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
						href="/collection"
					>
						Разгледай колекцията от дрехи
					</Link>
				</div>
			</div>
		</section>
	);
}
