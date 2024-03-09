import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useContext, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";
import type { ProductInterface } from "~/models/Product";
import axios from "axios";
import type { AxiosResponse } from "axios";
import Image from "next/image";
import { Layout } from "~/components/Layout";
import { CartContext } from "~/components/CartContextProvider";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "~/components/ui/carousel";

export default function Page() {
  const router = useRouter();
  const productID: string = router?.query?.id?.[0] ? router.query.id[0] : "";
  const [productInfo, setProductInfo] = useState<ProductInterface>({
    name: "",
    price: null as unknown as number,
    description: "",
    category: "",
    size: "",
    status: "",
    _id: "",
    images: [],
  });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { addProduct } = useContext(CartContext);
  useEffect(() => {
    if (!productID) return;
    axios
      .get("/api/products?id=" + productID)
      .then((res: AxiosResponse<ProductInterface>) => {
        setProductInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [productID]);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  if (productInfo) {
    return (
      <Layout>
        <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
          <div className="order-2 grid items-start gap-4 md:order-1 md:gap-10">
            <div className="hidden items-start md:flex">
              <div className="grid gap-4">
                <h1 className="text-3xl font-bold lg:text-4xl">
                  {productInfo.name}
                </h1>
                <div>
                  <p>{productInfo.description}</p>
                </div>
              </div>
              <div className="ml-auto text-4xl font-bold">
                {productInfo.price}лв
              </div>
            </div>
            <form className="grid gap-4 md:gap-10">
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="color">
                  Color
                </Label>
                <RadioGroup
                  className="flex items-center gap-2"
                  defaultValue="black"
                  id="color"
                >
                  <Label
                    className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-black"
                  >
                    <RadioGroupItem id="color-black" value="black" />
                    Black
                  </Label>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="size">
                  Size
                </Label>
                <RadioGroup
                  className="flex items-center gap-2"
                  defaultValue="m"
                  id="size"
                >
                  <Label
                    className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="size-m"
                  >
                    <RadioGroupItem id="size-m" value="m" />
                    {productInfo.size}
                    {"\n                          "}
                  </Label>
                </RadioGroup>
              </div>
              <Button
                onClick={(ev) => {
                  ev.preventDefault();
                  addProduct(productID);
                }}
                size="lg"
              >
                Add to cart
              </Button>
            </form>
          </div>
          <div className="order-1 grid items-start gap-3">
            <div className="flex items-start md:hidden">
              <div className="grid gap-4">
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {productInfo.name}
                </h1>
                <div>
                  <p>{productInfo.description}</p>
                </div>
              </div>
              <div className="ml-auto text-4xl font-bold">
                {productInfo.price}лв
              </div>
            </div>
            <div className="block rounded-lg">
              <Carousel setApi={setApi}>
                <CarouselContent>
                  {productInfo.images.map((image) => {
                    return (
                      <CarouselItem key={image}>
                        {image ? (
                          <Image
                            alt={image}
                            className="aspect-square rounded-lg object-cover"
                            height={600}
                            src={image ? image : ""}
                            width={600}
                          />
                        ) : (
                          <Skeleton className="h-[600] w-[600]" />
                        )}
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
              {current && count ? (
                <div className="py-2 text-center text-sm text-muted-foreground">
                  Снимка {current} от {count}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return <div>Loading</div>;
  }
}
