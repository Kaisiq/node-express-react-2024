import LinkImageWithText from "./LinkImageWithText";
export function HeroSection() {
  return (
    <section className="relative flex h-fit min-h-[350px] flex-col items-center justify-center bg-[url('https://utfs.io/f/15b3b1f1-3e84-477b-baf2-b37a7bd5c5bf-2q.webp?height=800&width=1600')] bg-cover bg-center py-7">
      <div className="z-10 max-w-[800px] px-4 text-center">
        <h1 className="mb-4 text-5xl font-bold leading-tight text-white md:text-7xl">
          По-добри от{" "}
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            втора употреба
          </span>
        </h1>
        <p className="mb-8 text-xl text-gray-200 md:text-2xl">
          Спести време и пари с нашата селекция от едни от най-качествените марки. Превърни
          пазаруването си в приятно изживяване с нас!
        </p>
        <div className="flex justify-center gap-8">
          <LinkImageWithText
            image={"https://utfs.io/f/92ba3f13-c28c-4a66-a1d7-83d7b4e6675d-1ppszq.jpg"}
            text={"Мъжко"}
          />
          <LinkImageWithText
            image={"https://utfs.io/f/911d233c-718e-4b01-aa4b-d748fc99b033-g0qlw9.png"}
            text={"Дамско"}
          />
        </div>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.6)]" />
    </section>
  );
}
