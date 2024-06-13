import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CardContent, Card } from "./ui/card";
import { useState } from "react";
import type { FormEvent } from "react";
import { SERVER, UploadDropzone } from "~/lib/utils";
import { SwappableImageList } from "./SwappableImageList";
import type { ProductInterface } from "~/models/Product";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { SelectGroup } from "@radix-ui/react-select";
import { useNavigate } from "react-router";
import api from "~/lib/api";

export function AddProduct({
  _id = "",
  name: existingName = "",
  description: existingDescription = "",
  price: existingPrice = null as unknown as number,
  sellPercent: existingSellPercent = null as unknown as number,
  category: existingCategory = "",
  condition: existingCondition = "",
  sex: existingSex = "",
  size: existingSize = "",
  color: existingColor = "",
  materials: existingMaterials = "",
  fit: existingFit = "",
  status = "",
  images: existingImages = [],
}: ProductInterface) {
  const [name, setName] = useState(existingName || "");
  const [price, setPrice] = useState(existingPrice || undefined);
  const [sellPercent, setSellPercent] = useState(existingSellPercent || undefined);
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [condition, setCondition] = useState(existingCondition || "");
  const [sex, setSex] = useState(existingSex || "");
  const [size, setSize] = useState(existingSize || "");
  const [color, setColor] = useState(existingColor || "");
  const [materials, setMaterials] = useState(existingMaterials || "");
  const [fit, setFit] = useState(existingFit || "");
  const [images, setImages] = useState(existingImages || []);
  const navigate = useNavigate();

  const [rerenderKey, setRerenderKey] = useState(0);

  async function saveProduct(ev: FormEvent) {
    try {
      ev.preventDefault();
      if (!name || !price || !category || !size || !sex || !condition || !description) {
        toast({
          title: "Липсва попълнено поле!",
          description:
            "Задължителните полета са: име, цена, категория, размер, пол, кондиция, description",
        });
        return;
      }
      const product = {
        name,
        description,
        size,
        color,
        materials,
        fit,
        sex,
        condition,
        price,
        sellPercent,
        category,
        images,
        status,
      };
      if (!_id) {
        product.status = status = "ok";
        await api.post(`${SERVER}/products`, product);
        navigate(-1);
      } else {
        const product2 = { ...product, _id: _id };
        await api.put(`${SERVER}/products`, product2);
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
      navigate(-1);
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <div className="flex items-center gap-4">
        <Button
          className="ml-auto"
          size="sm"
        >
          <input
            type="submit"
            className="cursor-pointer"
            value="Запазване"
          />
        </Button>
      </div>
      <Card className="mt-4 ">
        <CardContent>
          <div className="my-5 flex flex-col gap-4 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                placeholder="Enter product name"
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="flex w-full gap-5">
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
                <Label htmlFor="sell">Процент намаление от цената</Label>
                <Input
                  id="sell"
                  value={sellPercent}
                  placeholder="Колко % намаляме"
                  type="number"
                  onChange={(ev) => setSellPercent(Number(ev.target.value))}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                placeholder="Enter product description"
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-5">
                <Select
                  onValueChange={(value: string) => {
                    setCategory(value);
                  }}
                  defaultValue={category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Категория"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Категория</SelectLabel>
                      <SelectItem value="clothing">Дрехи</SelectItem>
                      <SelectItem value="footwear">Обувки</SelectItem>
                      <SelectItem value="accessories">Аксесоари</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {category === "footwear" ? (
                  <div className="flex flex-col gap-1">
                    <Input
                      id="size"
                      value={size}
                      placeholder="Размер"
                      type="text"
                      onChange={(ev) => setSize(ev.target.value)}
                    />
                  </div>
                ) : (
                  <Select
                    onValueChange={(value: string) => {
                      setSize(value);
                    }}
                    defaultValue={size}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Размер"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Размер</SelectLabel>
                        <SelectItem value="2XS">2XS</SelectItem>
                        <SelectItem value="XS">XS</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="2XL">2XL+</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}

                <Select
                  onValueChange={(value: string) => {
                    setCondition(value);
                  }}
                  defaultValue={condition}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Състояние"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Състояние</SelectLabel>
                      <SelectItem value="new">Ново</SelectItem>
                      <SelectItem value="likenew">Като ново</SelectItem>
                      <SelectItem value="minimalwear">Леки следи от употреба</SelectItem>
                      <SelectItem value="wellworn">Употребявано</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value: string) => {
                    setSex(value);
                  }}
                  defaultValue={sex}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Пол"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Пол</SelectLabel>
                      <SelectItem value="male">Мъже</SelectItem>
                      <SelectItem value="female">Жени</SelectItem>
                      <SelectItem value="both">Унисекс</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-5">
                <Input
                  id="color"
                  value={color}
                  placeholder="Цвят"
                  type="text"
                  onChange={(ev) => setColor(ev.target.value)}
                />
                <Select
                  onValueChange={(value: string) => {
                    setFit(value);
                  }}
                  defaultValue={fit}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Тип Fit"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Тип Fit</SelectLabel>
                      <SelectItem value="slim">slim fit</SelectItem>
                      <SelectItem value="normal">normal fit</SelectItem>
                      <SelectItem value="relaxed">relaxed fit</SelectItem>
                      <SelectItem value="regular">regular fit</SelectItem>
                      <SelectItem value="athletic">athletic fit</SelectItem>
                      <SelectItem value="oversized">oversized fit</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  id="materials"
                  value={materials}
                  placeholder="Материали"
                  type="text"
                  onChange={(ev) => setMaterials(ev.target.value)}
                />
              </div>

              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages((oldImages) => {
                    const data = res.map((el) => el.url);
                    return [...oldImages, ...data];
                  });
                  setRerenderKey((rk) => rk + 1);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
              {images && (
                <SwappableImageList
                  key={rerenderKey}
                  images={images}
                  onImagesChange={setImages}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
