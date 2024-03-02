import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroupItem, RadioGroup } from "./ui/radio-group";
import { CardContent, Card } from "./ui/card";
import { FormEvent, useState } from "react";
import axios from "axios";

export function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");

  async function saveProduct(ev: FormEvent) {
    ev.preventDefault();
    if (!name || !price || !category || !size || !description) {
      return;
    }
    const status = "ok";
    const product = {
      name,
      description,
      size,
      price,
      category,
      status,
    };
    await axios.post("/api/products", product);
  }
  return (
    <form onSubmit={saveProduct}>
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold md:text-2xl">Add new product</h1>
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
                placeholder="Enter product name"
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="Enter product price"
                type="number"
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                placeholder="Enter product size"
                type="text"
                onChange={(ev) => setSize(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
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
            {/* <div className="flex flex-col gap-1">
              <Label htmlFor="image">Picture</Label>
              <label
                className="relative cursor-pointer rounded-md border border-gray-200 p-2"
                htmlFor="image"
              >
                <Input
                  className="absolute inset-0 h-full w-full opacity-0"
                  id="image"
                  type="file"
                />
                Upload Image
              </label>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
