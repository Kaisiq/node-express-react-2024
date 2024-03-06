import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroupItem, RadioGroup } from "./ui/radio-group";
import { CardContent, Card } from "./ui/card";
import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UploadDropzone } from "~/utils/uploadthing";
import { SwappableImageList } from "./SwappableImageList";

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  status: string;
  _id: string;
  images: string[];
}

export function AddProduct({
  _id = "",
  name: existingName = "",
  description: existingDescription = "",
  price: existingPrice = null as unknown as number,
  category: existingCategory = "",
  size: existingSize = "",
  status = "",
  images: existingImages = [],
}: Product) {
  const [name, setName] = useState(existingName || "");
  const [price, setPrice] = useState(existingPrice || undefined);
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [size, setSize] = useState(existingSize || "");
  const [images, setImages] = useState(existingImages || []);
  const [addedProduct, setAddedProduct] = useState(0);
  const router = useRouter();

  async function saveProduct(ev: FormEvent) {
    ev.preventDefault();
    if (!name || !price || !category || !size || !description) {
      return;
    }
    if (!_id) {
      status = "ok";
      const product = {
        name,
        description,
        size,
        price,
        category,
        images,
        status,
      };
      await axios.post("/api/products", product);
    } else {
      const product = {
        name,
        description,
        size,
        price,
        category,
        status,
        images,
        _id,
      };
      await axios.put("/api/products", product);
    }
    setAddedProduct(1);
  }
  if (addedProduct === 1) {
    router.push("/admin/products").catch((err) => {
      console.log(err);
    });
  }
  return (
    <form onSubmit={saveProduct}>
      <div className="flex items-center gap-4">
        <Button className="ml-auto" size="sm">
          <input type="submit" className="cursor-pointer" value="Добавяне" />
        </Button>
      </div>
      <Card className="mt-4 ">
        <CardContent>
          <div className="m-10 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                placeholder="Enter product name"
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={price}
                placeholder="Enter product price"
                type="number"
                onChange={(ev) => setPrice(Number(ev.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                value={size}
                placeholder="Enter product size"
                type="text"
                onChange={(ev) => setSize(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                placeholder="Enter product description"
                type="text"
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <RadioGroup
                aria-labelledby="feedback"
                className="flex flex-col items-start gap-4"
              >
                <h3
                  className="text-lg font-semibold leading-none"
                  id="feedback"
                >
                  Категория
                </h3>
                <div className="flex items-center gap-4">
                  <Label
                    className="flex cursor-pointer items-center gap-2 text-base"
                    htmlFor="clothing"
                  >
                    <RadioGroupItem
                      className="peer sr-only"
                      id="clothing"
                      onClick={(e) => setCategory(e.currentTarget.id)}
                      value="clothing"
                    />
                    <span className="flex aspect-square h-4 w-4 items-center justify-center rounded-md border border-gray-200 peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50" />
                    <span className="transition-colors peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:peer-aria-checked:text-gray-50">
                      Дрехи
                    </span>
                  </Label>
                  <Label
                    className="flex cursor-pointer items-center gap-2 text-base"
                    htmlFor="footwear"
                  >
                    <RadioGroupItem
                      className="peer sr-only"
                      id="footwear"
                      value="footwear"
                      onClick={(e) => setCategory(e.currentTarget.id)}
                    />
                    <span className="flex aspect-square h-4 w-4 items-center justify-center rounded-md border border-gray-200 peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50" />
                    <span className="transition-colors peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:peer-aria-checked:text-gray-50">
                      Обувки
                    </span>
                  </Label>
                  <Label
                    className="flex cursor-pointer items-center gap-2 text-base"
                    htmlFor="accessories"
                  >
                    <RadioGroupItem
                      className="peer sr-only"
                      id="accessories"
                      value="accessories"
                      onClick={(e) => setCategory(e.currentTarget.id)}
                    />
                    <span className="flex aspect-square h-4 w-4 items-center justify-center rounded-md border border-gray-200 peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50" />
                    <span className="transition-colors peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:peer-aria-checked:text-gray-50">
                      Аксесоари
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                res.forEach((el) => {
                  setImages((oldImages) => {
                    return [...oldImages, el.url];
                  });
                });
                return images;
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
            {images && (
              <SwappableImageList images={images} onImagesChange={setImages} />
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
