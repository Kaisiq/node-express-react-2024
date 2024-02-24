import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon } from "./Icons";

export function IndexHeader() {
  return (
    <header className="flex items-center px-4 py-4 lg:px-6 lg:py-6">
      <Link href="/">
        <div className="flex items-center space-x-2">
          <Image
            alt="Logo"
            className="rounded-full"
            height="40"
            src="/cat.jpg"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          />
          <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
            Две/Трети
          </h1>
        </div>
      </Link>
      <nav className="ml-auto hidden gap-4 text-sm font-medium lg:flex xl:gap-6">
        <Link
          className="underline-offset-4 hover:underline"
          href="/collection/clothing"
        >
          Clothing
        </Link>
        <Link
          className="underline-offset-4 hover:underline"
          href="/collection/accessories"
        >
          Accessories
        </Link>
        <Link
          className="underline-offset-4 hover:underline"
          href="/collection/footwear"
        >
          Footwear
        </Link>
        <Link className="underline-offset-4 hover:underline" href="/cart">
          <ShoppingCartIcon />
        </Link>
      </nav>
    </header>
  );
}
