import Link from "next/link";
import { ShoppingCartIcon } from "./Icons";
import { MenuIcon } from "lucide-react";
import { useState, useContext } from "react";
import { CartContext } from "./CartContextProvider";
import { useSession } from "next-auth/react";

export function IndexHeader() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { cartProducts }: { cartProducts: string[] } = useContext(CartContext);
	const { data: session } = useSession();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="flex flex-col items-center px-4 py-4 lg:flex-row lg:justify-between lg:px-6 lg:py-6">
			<div className="flex w-full items-center justify-between">
				<Link href="/">
					<div className="flex items-center space-x-2">
						<div className="flex-col font-Rubik text-xl leading-[0.5rem] tracking-tighter md:text-2xl md:leading-4 lg:text-[2rem] lg:leading-3">
							<span>две</span>
							<hr className="relative left-[16%] h-[0.5px] w-[50%] rotate-[135deg] border-0 bg-black" />
							<span className="ml-[40px] lg:ml-[60px]">трети</span>
						</div>
					</div>
				</Link>
				{/* Hamburger menu button for mobile */}
				<button
					className="hidden sm:block md:block lg:hidden xl:hidden"
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
					isMenuOpen ? "mt-4 grid grid-cols-3 items-center gap-5" : "hidden"
				} lg:flex lg:flex-row lg:gap-4 lg:gap-6`}
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
					{session ? "Акаунт" : "Влизане"}
				</Link>

				<Link
					className="underline-offset-4 hover:underline sm:block lg:mt-0"
					href="/cart"
				>
					<div className="flex">
						<ShoppingCartIcon /> {"(" + cartProducts.length + ")"}
					</div>
				</Link>
			</nav>
			{/* End of Navigation menu */}
		</header>
	);
}
