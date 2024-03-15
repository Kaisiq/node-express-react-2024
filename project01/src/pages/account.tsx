import { Layout } from "~/components/Layout";
import { OrdersInformation } from "~/components/OrdersInformation";
import { AccountInformation } from "~/components/AccountInformation";
import { AccountHeaderNav } from "~/components/AccountHeaderNav";
import { useSession } from "next-auth/react";
import LoginForm from "~/components/LoginForm";

export default function Home() {
	const { data: session } = useSession();
	if (session?.user)
		return (
			<Layout>
				<main className="mx-auto flex w-[80%] flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
					<AccountHeaderNav />
					<OrdersInformation />
					<AccountInformation />
				</main>
			</Layout>
		);
	else {
		return (
			<Layout>
				<LoginForm />
			</Layout>
		);
	}
}
