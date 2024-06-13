import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ChevronLeftIcon } from "~/components/Icons";
import { CartItem } from "~/components/CartItem";
import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "~/components/CartContextProvider";
import type { ProductInterface } from "~/models/Product";
import { CheckoutSection } from "~/components/CheckoutSection";
import CustomHead from "~/components/CustomHead";
import { useLocation } from "react-router";
import { SERVER } from "~/lib/utils";
import api from "~/lib/api";

export default function CartPage() {
  const location = useLocation();
  const { cartProducts } = useContext(CartContext);
  const [data, setData] = useState<ProductInterface[]>([]);

  const updateCart = useCallback(() => {
    if (cartProducts.length > 0) {
      api
        .post(`${SERVER}/products`, { ids: cartProducts })
        .then((res) => {
          setData(res.data as ProductInterface[]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setData([] as ProductInterface[]);
    }
  }, [cartProducts]);
  useEffect(() => {
    updateCart();
  }, [cartProducts, updateCart]);

  let totalPrice = 0;
  data.forEach((el) => {
    totalPrice += el.price;
  });

  return (
    <>
      <CustomHead
        title={`Две Трети | Количка`}
        description={`Онлайн магазин за дрехи втора употреба`}
        image={`/b.webp?height=800&width=1600`}
        link={`${location.pathname}`}
        type="web"
        domain={`${location.pathname}`}
      />
      <main>
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
                  <div className="pb-1 text-right md:flex md:justify-end">Цена</div>
                </div>
              </div>
              <div className="divide-y">
                {data.length > 0 ? (
                  data.map((el, index) => {
                    return (
                      <CartItem
                        key={index}
                        data={el}
                      />
                    );
                  })
                ) : (
                  <div className="flex justify-center p-10 text-2xl font-bold">
                    Вашата количка е празна
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 px-4 py-2 md:grid md:grid-cols-4 md:items-start lg:gap-6">
                <a
                  className="flex items-center gap-4 underline underline-offset-2"
                  href="/collection"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Обратно към магазина
                </a>
                <div className="text-2xl font-semibold md:col-span-2 md:flex md:justify-end md:text-right">
                  общо: {totalPrice}лв
                </div>
                <CheckoutSection />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              onClick={updateCart}
              className="w-full"
              size="lg"
              variant="outline"
            >
              Обновяване на Количката
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
