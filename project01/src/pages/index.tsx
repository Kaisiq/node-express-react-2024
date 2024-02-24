/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8lUIAiMxj5e
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { IndexHeader } from "~/components/IndexHeader";
import { BookMarkedIcon } from "~/components/Icons";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <IndexHeader />
      <main className="flex-1">
        <section className="w-full">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            <div className="flex items-center justify-center overflow-hidden rounded-t-lg">
              <img
                alt="Hero"
                className="aspect-video w-full object-cover object-top"
                height="400"
                src="/placeholder.svg"
                width="1200"
              />
            </div>
            <div className="grid gap-4 px-4 md:px-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Handpicked Vintage Treasures
                </h1>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover a curated collection of unique and stylish vintage
                  clothing and accessories. Each piece tells a story and adds a
                  touch of retro charm to your wardrobe.
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/collection"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full border-t py-12 md:py-16 lg:py-20 xl:py-24">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Sustainable Fashion Choices
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Embrace eco-friendly style with our carefully curated selection
                of sustainable fashion choices. Each item is timeless, and by
                choosing vintage, youre reducing waste and making a positive
                impact on the environment.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full border-t py-12 md:py-16 lg:py-20 xl:py-24">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Affordable Retro Finds
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Uncover hidden gems and score amazing deals with our collection
                of affordable retro finds. From classic tees to statement
                pieces, weve got everything you need to add a vintage touch to
                your wardrobe without breaking the bank.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12">
          <div className="container grid gap-6 px-4 md:gap-8 md:px-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
              <div className="grid gap-1">
                <h1 className="text-2xl font-bold tracking-tight">
                  Featured Products
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Explore our handpicked selection of vintage clothing and
                  accessories.
                </p>
              </div>
              <Button
                className="shrink-0 md:ml-auto"
                size="lg"
                variant="outline"
              >
                View all
              </Button>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-4 sm:flex-row sm:py-6 md:px-6">
        <div className="flex items-center gap-2">
          <BookMarkedIcon className="h-6 w-6" />
          <span className="text-sm font-semibold tracking-wide">
            Retro Threads
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          123 Vintage Ave, Retroville, 54321
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            About Us
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Contact
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            FAQs
          </Link>
        </nav>
      </footer>
    </div>
  );
}
