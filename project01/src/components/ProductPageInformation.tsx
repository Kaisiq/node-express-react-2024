import { ProductInterface } from "~/models/Product";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { useContext } from "react";
import { CartContext } from "./CartContextProvider";

export function ProductPageInformation({
  productInfo,
}: {
  productInfo: ProductInterface;
}) {
  const { addProduct } = useContext(CartContext);

  return (
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
          addProduct(productInfo._id);
        }}
        size="lg"
      >
        Add to cart
      </Button>
    </form>
  );
}
