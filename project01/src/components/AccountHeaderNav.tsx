import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { AuthService } from "~/services/AuthService";

export function AccountHeaderNav() {
	const { data: session } = useSession();
	const router = useRouter();
	const authService = new AuthService();
	return (
		<>
			<header className="flex items-center justify-between">
				<div className="flex items-center gap-4">
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
				</div>
				<Button
					onClick={async () => {
						await signOut();
						await router.push("/");
					}}
					variant="outline"
				>
					Излизане
				</Button>
			</header>
			<nav className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
				<Link
					className="border-b-2 border-transparent pb-2 transition-colors hover:border-gray-500 dark:hover:border-gray-400"
					href="#history"
				>
					История на Поръчки
				</Link>
				<Link
					className="border-b-2 border-transparent pb-2 transition-colors hover:border-gray-500 dark:hover:border-gray-400"
					href="#account"
				>
					Информация за акаунта
				</Link>
				{session?.user?.email && authService.isAdmin(session.user.email) && (
					<Link
						className="border-b-2 border-transparent pb-2 transition-colors hover:border-gray-500 dark:hover:border-gray-400"
						href="/admin"
					>
						Админски панел
					</Link>
				)}
			</nav>
		</>
	);
}
