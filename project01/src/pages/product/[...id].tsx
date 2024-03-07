import { StarIcon } from "lucide-react";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";
import type { ProductInterface } from "~/models/Product";
import axios from "axios";
import type { AxiosResponse } from "axios";
import Image from "next/image";
import { Layout } from "~/components/Layout";

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
  const [imageToShow, setImageToShow] = useState("");
  useEffect(() => {
    if (!productID) {
      return;
    }
    axios
      .get("/api/products?id=" + productID)
      .then((res: AxiosResponse<ProductInterface>) => {
        setProductInfo(res.data);
      })
      .then(() => {
        const toShow = productInfo?.images?.[0]
          ? productInfo?.images?.[0]
          : imageToShow;
        setImageToShow(toShow);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [router.query.id]);
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
                    <RadioGroupItem id="size-m" value="m" />M
                    {"\n                          "}
                  </Label>
                </RadioGroup>
              </div>
              <Button size="lg">Add to cart</Button>
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
            <div className="grid gap-4">
              <Image
                alt="Product Image"
                className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
                height={600}
                src={
                  imageToShow
                    ? imageToShow
                    : productInfo?.images?.[0]
                      ? productInfo?.images?.[0]
                      : ""
                }
                width={600}
              />
              <div className="hidden items-start gap-4 md:flex">
                {productInfo.images.map((image) => {
                  return (
                    <button
                      onClick={() => {
                        if (image) {
                          setImageToShow(image);
                        }
                      }}
                      key={image}
                      className="overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50"
                    >
                      <Image
                        alt={image}
                        className="aspect-square object-cover"
                        height={100}
                        src={image ? image : ""}
                        width={100}
                      />
                      <span className="sr-only">View Image 1</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return <div>Loading</div>;
  }
}
