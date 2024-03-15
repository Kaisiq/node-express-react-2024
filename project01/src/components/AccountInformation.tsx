import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { UserInterface } from "~/pages/api/users";

export function AccountInformation() {
	const [userData, setUserData] = useState<UserInterface>();
	const { data: session, status } = useSession();
	useEffect(() => {
		if (!session || status !== "authenticated") {
			return;
		}
		const input = session.user.email;
		axios
			.get(`/api/users?email=${input}`)
			.then((res: AxiosResponse<UserInterface>) => {
				setUserData(res.data);
			})
			.catch((err) => {
				console.log(err);
				return;
			});
	}, []);
	return (
		<section>
			<h2 className="mb-4 text-xl font-semibold">Account Information</h2>
			<div className="grid gap-4">
				<div className="flex items-center justify-between rounded-md bg-white p-4 shadow dark:bg-gray-800">
					<div>
						<p className="text-gray-700 dark:text-gray-300">Name</p>
						<p className="text-gray-500 dark:text-gray-400">{userData?.name}</p>
					</div>
					<Button variant="outline">Edit</Button>
				</div>
				<div className="flex items-center justify-between rounded-md bg-white p-4 shadow dark:bg-gray-800">
					<div>
						<p className="text-gray-700 dark:text-gray-300">Email</p>
						<p className="text-gray-500 dark:text-gray-400">
							{userData?.email}
						</p>
					</div>
					<Button variant="outline">Edit</Button>
				</div>
				<div className="flex items-center justify-between rounded-md bg-white p-4 shadow dark:bg-gray-800">
					<div>
						<p className="text-gray-700 dark:text-gray-300">Address</p>
						<p className="text-gray-500 dark:text-gray-400">
							{userData?.city}
							{userData?.city && userData?.address ? ", " : ""}
							{userData?.address}
						</p>
					</div>
					<Button variant="outline">Edit</Button>
				</div>
				<div className="flex items-center justify-between rounded-md bg-white p-4 shadow dark:bg-gray-800">
					<div>
						<p className="text-gray-700 dark:text-gray-300">Phone</p>
						<p className="text-gray-500 dark:text-gray-400">{userData?.tel}</p>
					</div>
					<Button variant="outline">Edit</Button>
				</div>
			</div>
		</section>
	);
}
