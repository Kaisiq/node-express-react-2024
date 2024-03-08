import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon } from "./Icons";
import { MenuIcon } from "lucide-react";
import { useState, useContext } from "react";
import { CartContext } from "./CartContextProvider";

export function IndexHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartProducts }: { cartProducts: string[] } = useContext(CartContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-col items-center px-4 py-4 lg:flex-row lg:justify-between lg:px-6 lg:py-6">
      <div className="flex w-full items-center justify-between lg:w-auto">
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
        {/* Hamburger menu button for mobile */}
        <button
          className="block lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        {/* End of Hamburger menu button */}
      </div>
      {/* Navigation menu */}
      <nav
        className={`${
          isMenuOpen ? "mt-4 flex flex-col items-center" : "hidden"
        } lg:flex lg:flex-row lg:gap-4 xl:gap-6`}
      >
        <Link
          className="underline-offset-4 hover:underline sm:block lg:mt-0"
          href="/"
        >
          Начало
        </Link>
        <Link
          className="underline-offset-4 hover:underline sm:block lg:mt-0"
          href="/collection/clothing"
        >
          Дрехи
        </Link>
        <Link
          className="underline-offset-4 hover:underline sm:block lg:mt-0"
          href="/collection/accessories"
        >
          Аксесоари
        </Link>
        <Link
          className="underline-offset-4 hover:underline sm:block lg:mt-0"
          href="/collection/footwear"
        >
          Обувки
        </Link>
        <Link
          className="underline-offset-4 hover:underline sm:block lg:mt-0"
          href="/account"
        >
          Акаунт
        </Link>
        <Link
          className="underline-offset-4 hover:underline sm:block lg:mt-0"
          href="/cart"
        >
          <div className="flex">
            <ShoppingCartIcon /> {cartProducts.length}
          </div>
        </Link>
      </nav>
      {/* End of Navigation menu */}
    </header>
  );
}
