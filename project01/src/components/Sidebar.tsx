import Link from "next/link";
import { Button } from "./ui/button";
import { BellIcon } from "~/components/Icons";
import { HomeIcon } from "~/components/Icons";
import { ShoppingCartIcon } from "~/components/Icons";
import { LineChartIcon } from "~/components/Icons";
import { PackageIcon } from "~/components/Icons";
import { useRouter } from "next/router";

export function Sidebar() {
	const router = useRouter();
	const pathname: string = router?.pathname;
	const inactiveLink =
		"flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";
	const activeLink =
		"flex items-center gap-3 rounded-lg bg-gray-200 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50";
	return (
		<div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-[60px] items-center border-b px-6">
					<Link className="flex items-center gap-2 font-semibold" href="/admin">
						<Link href="/">
							<div className="flex items-center space-x-2">
								<div className="flex-col font-Rubik text-xl font-light leading-[0.5rem] tracking-tighter md:text-2xl md:leading-4 lg:text-[1.75rem] lg:leading-3">
									<span>две</span>
									<hr className="relative left-[16%] h-[0.5px] w-[50%] rotate-[135deg] border-0 bg-black" />
									<span className="ml-[40px] lg:ml-[60px]">трети</span>
								</div>
							</div>
						</Link>
					</Link>
					<Button className="ml-auto h-8 w-8" size="icon" variant="outline">
						<BellIcon className="h-4 w-4" />
						<span className="sr-only">Toggle notifications</span>
					</Button>
				</div>
				<div className="flex-1 overflow-auto py-2">
					<nav className="grid items-start px-4 text-sm font-medium">
						<Link
							className={pathname === "/admin" ? activeLink : inactiveLink}
							href="/admin"
						>
							<HomeIcon className="h-4 w-4" />
							Home
						</Link>
						<Link
							className={
								pathname.includes("/admin/orders") ? activeLink : inactiveLink
							}
							href="/admin/orders"
						>
							<ShoppingCartIcon className="h-4 w-4" />
							Orders
						</Link>
						<Link
							className={
								pathname.includes("/admin/products") ? activeLink : inactiveLink
							}
							href="/admin/products"
						>
							<PackageIcon className="h-4 w-4" />
							Products
						</Link>
						<Link
							className={
								pathname.includes("/admin/analytics")
									? activeLink
									: inactiveLink
							}
							href="/admin/analytics"
						>
							<LineChartIcon className="h-4 w-4" />
							Analytics
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
}
