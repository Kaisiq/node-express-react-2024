import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "~/components/ui/sheet";
import { Input } from "~/components/ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Textarea } from "./ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContextProvider";
import axios, { type AxiosResponse } from "axios";
import type { ProductInterface } from "~/pages/api/products";
import { useRouter } from "next/router";
import { UserInterface } from "~/pages/api/users";

const FormSchema = z.object({
	flname: z.string().min(2, {
		message: "Моля не оставяйте полето празно",
	}),
	tel: z
		.string()
		.min(10, {
			message: "Моля напишете валиден телефонен номер",
		})
		.max(13, {
			message: "Моля напишете валиден телефонен номер",
		}),
	address: z.string().min(2, {
		message: "Моля въведете адрес",
	}),
	info: z.string(),
	city: z.string().min(1, {
		message: "Моля въведете валиден град",
	}),
});

export function CheckoutSection() {
	const { cartProducts, setCartProducts } = useContext(CartContext);
	const { data: session, status } = useSession();
	const [reserveProducts, setReserveProducts] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (reserveProducts) {
			getUserInformation();
			setProductStatus("selling").catch((err) => {
				console.log(err);
			});
		} else {
			setProductStatus("ok").catch((err) => {
				console.log(err);
			});
		}
	}, [reserveProducts]);

	useEffect(() => {
		setProductStatus("ok").catch((err) => {
			console.log(err);
		});
	}, [router.query, router.pathname]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			flname: "",
			city: "",
			address: "",
			tel: "",
			info: "",
		},
	});

	async function setProductStatus(status: string) {
		for await (const product of cartProducts) {
			const result: AxiosResponse<ProductInterface> = await axios.get(
				"/api/products?id=" + product,
			);
			if (result.data.status != "sold") {
				result.data.status = status;
			}
			await axios.put("/api/products", result.data);
		}
	}

	async function getUserInformation() {
		if (session && status === "authenticated") {
			const input = session.user.email;
			try {
				const res: AxiosResponse<UserInterface> = await axios.get(
					`/api/users?email=${input}`,
				);
				form.setValue("flname", res.data.name);
				form.setValue("city", res.data.city);
				form.setValue("address", res.data.address);
				form.setValue("tel", res.data.tel);
			} catch (err) {
				console.log(err);
			}
		}
	}

	async function getProductInfo() {
		const productNames: string[] = [];
		let price = 0;
		for await (const product of cartProducts) {
			const result: AxiosResponse<ProductInterface> = await axios.get(
				"/api/products?id=" + product,
			);
			productNames.push(result.data.name);
			price += result.data.price;
		}
		return { productNames, price };
	}

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await setProductStatus("sold");
		const { productNames, price } = await getProductInfo();

		const order = {
			flname: data.flname,
			tel: data.tel,
			email: session?.user.email ?? "",
			address: data.address,
			info: data.info,
			city: data.city,
			price,
			status: "new",
			productIDs: cartProducts,
			productNames,
		};
		console.log(productNames);
		await axios.post("/api/orders", order);
		let description =
			"Скоро ще получите имейл с потвърждение за поръчката на следният продукт: " +
			productNames.join("");
		if (productNames.length > 1) {
			description =
				"Скоро ще получите имейл с потвърждение за поръчката на продуктите: " +
				productNames.join(" ,");
		}
		toast({
			title: "Покупката беше завършена!",
			description,
		});
		setCartProducts([]);
	}
	return (
		<Sheet
			onOpenChange={(open) => {
				setReserveProducts(open);
			}}
		>
			<SheetTrigger className="h-10 w-[100%] rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
				Продължаване към Плащане
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Информация за поръчката:</SheetTitle>
					<SheetDescription>
						За момента изпращаме всички поръчки чрез Еконт/Спиди. Ако имате
						предпочитание към някой от куриерите, моля уведомете ни в полето за
						допълнителна информация
					</SheetDescription>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6"
					>
						<FormField
							control={form.control}
							name="flname"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Име и Фамилия на получател</FormLabel>
									<FormControl>
										<Input placeholder="Име Фамилия" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Телефонен номер</FormLabel>
									<FormControl>
										<Input placeholder="Вашият телефонен номер" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Град за доставка</FormLabel>
									<FormControl>
										<Input placeholder="Град" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Адрес за доставка</FormLabel>
									<FormControl>
										<Input placeholder="Адрес" {...field} />
									</FormControl>
									<FormDescription>
										Ако адреса е офис на Еконт/Спиди, моля напишете това в
										допълнителната информация
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="info"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Допълнителна информация</FormLabel>
									<FormControl>
										<Textarea placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
