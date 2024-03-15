import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
export function AccountHeaderNav() {
	const { data: session } = useSession();
	return (
		<>
			<header className="flex items-center gap-4">
				{session?.user?.image && (
					<Image
						alt="User Profile Picture"
						className="rounded-full"
						height="64"
						src={session.user.image}
						style={{
							aspectRatio: "64/64",
							objectFit: "cover",
						}}
						width="64"
					/>
				)}
				<h1 className="text-2xl font-bold">{session?.user.name}</h1>
			</header>
			<nav className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
				<Link
					className="border-b-2 border-transparent pb-2 transition-colors hover:border-gray-500 dark:hover:border-gray-400"
					href="#"
				>
					Order History
				</Link>
				<Link
					className="border-b-2 border-transparent pb-2 transition-colors hover:border-gray-500 dark:hover:border-gray-400"
					href="#"
				>
					Account Information
				</Link>
			</nav>
		</>
	);
}
