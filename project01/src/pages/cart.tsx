import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon } from "~/components/Icons";
import { CartItem, CartItemSkeleton } from "~/components/CartItem";
import { Layout } from "~/components/Layout";
import { useSession } from "next-auth/react";
import { LoginPage } from "../components/LoginPage";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "~/components/CartContextProvider";
import axios from "axios";
import type { ProductInterface } from "~/models/Product";
import { CheckoutSection } from "~/components/CheckoutSection";

export default function Cart() {
  const { cartProducts } = useContext(CartContext);
  const [data, setData] = useState<ProductInterface[]>([]);
  const [productNames, setProductNames] = useState<string[]>([]);
  function updateCart() {
    if (cartProducts.length > 0) {
      axios
        .post("/api/products", { ids: cartProducts })
        .then((res) => {
          setData(res.data as ProductInterface[]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setData([] as ProductInterface[]);
    }
  }
  useEffect(() => {
    updateCart();
  }, [cartProducts]);

  let totalPrice = 0;
  data.forEach((el) => {
    totalPrice += el.price;
  });

  const { data: session } = useSession();
  if (!session) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Card className="grid gap-4 md:grid-cols-[300px_1fr]">
        <CardHeader className="pb-0">
          <CardTitle>Вашата Количка</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border">
            <div className="border-b bg-gray-100 px-4 py-2 dark:bg-gray-800">
              <div className="grid grid-cols-3 text-sm font-medium">
                <div className="pb-1">Продукт</div>
                <div className="pb-1 text-center"></div>
                <div className="pb-1 text-right md:flex md:justify-end">
                  Цена
                </div>
              </div>
            </div>
            <div className="divide-y">
              {data
                ? data.map((el, index) => {
                    return <CartItem key={index} data={el} />;
                  })
                : cartProducts.map((el) => {
                    return <CartItemSkeleton key={el} />;
                  })}
            </div>
            <div className="flex flex-col gap-2 px-4 py-2 md:grid md:grid-cols-4 md:items-start lg:gap-6">
              <Link
                className="flex items-center gap-4 underline underline-offset-2"
                href="/collection"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Обратно към магазина
              </Link>
              <div className="text-2xl font-semibold md:col-span-2 md:flex md:justify-end md:text-right">
                общо: {totalPrice}лв
              </div>
              <CheckoutSection />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={updateCart} className="w-full" size="lg">
            Обновяване на Количката
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
}
