import { Button } from "./ui/button";
export function IndexAbout() {
  return (
    <>
      <section className="w-full border-t py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Sustainable Fashion Choices
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Embrace eco-friendly style with our carefully curated selection of sustainable fashion
              choices. Each item is timeless, and by choosing vintage, youre reducing waste and
              making a positive impact on the environment.
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
              Uncover hidden gems and score amazing deals with our collection of affordable retro
              finds. From classic tees to statement pieces, weve got everything you need to add a
              vintage touch to your wardrobe without breaking the bank.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12">
        <div className="container grid gap-6 px-4 md:gap-8 md:px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Featured Products</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Explore our handpicked selection of vintage clothing and accessories.
              </p>
            </div>
            <a
              href="/collection"
              className="shrink-0 md:ml-auto"
            >
              <Button
                size="lg"
                variant="outline"
              >
                View all
              </Button>
            </a>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
        </div>
      </section>
    </>
  );
}
