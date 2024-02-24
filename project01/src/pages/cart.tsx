/**
 * v0 by Vercel.
 * ~see https://v0.dev/t/PIDfer5bBUW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { TrashIcon } from "lucide-react";
import { ChevronLeftIcon } from "~/components/Icons";
import { IndexHeader } from "~/components/IndexHeader";
import { CartItem } from "~/components/CartItem";

export default function cart() {
  const data = [
    {
      name: "asd",
      properties: "1 2 3",
      picture: "/cat.jpg",
      price: 30,
    },
    {
      name: "asd",
      properties: "1 2 3",
      picture: "/cat.jpg",
      price: 30,
    },
  ];
  return (
    <>
      <IndexHeader />
      <Card className="grid gap-4 md:grid-cols-[300px_1fr]">
        <CardHeader className="pb-0">
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border">
            <div className="border-b bg-gray-100 px-4 py-2 dark:bg-gray-800">
              <div className="grid grid-cols-3 text-sm font-medium">
                <div className="pb-1">Product</div>
                <div className="pb-1 text-center">Price</div>
                <div className="pb-1 text-right">Total</div>
              </div>
            </div>
            <div className="divide-y">
              {data.map((el) => {
                return <CartItem data={el} />;
              })}
            </div>
            <div className="flex flex-col gap-2 px-4 py-2 md:grid md:grid-cols-4 md:items-start lg:gap-6">
              <Link
                className="flex items-center gap-4 underline underline-offset-2"
                href="/collection"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Continue Shopping
              </Link>
              <div className="text-2xl font-semibold md:col-span-2 md:flex md:justify-end md:text-right">
                Total: $148.00
              </div>
              <Button className="w-full md:col-span-1 md:w-auto" size="lg">
                Update Cart
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" size="lg">
            Continue to Checkout
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
