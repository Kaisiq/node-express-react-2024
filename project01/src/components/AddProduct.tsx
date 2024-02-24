import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroupItem, RadioGroup } from "./ui/radio-group";
import { CardContent, Card } from "./ui/card";

export function AddProduct() {
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold md:text-2xl">Add new product</h1>
        <Button className="ml-auto" size="sm">
          Save
        </Button>
      </div>
      <Card className="mt-4">
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter product name" />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="Enter product price"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="size">Size</Label>
              <Input id="size" placeholder="Enter product size" type="text" />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="category">Category</Label>
              <RadioGroup
                className="flex flex-col gap-1"
                defaultValue="shirts"
                id="category"
              >
                <Label htmlFor="shirts">Shirts</Label>
                <RadioGroupItem id="shirts" value="shirts" />
                <Label htmlFor="pants">Pants</Label>
                <RadioGroupItem id="pants" value="pants" />
                <Label htmlFor="shoes">Shoes</Label>
                <RadioGroupItem id="shoes" value="shoes" />
                <Label htmlFor="accessories">Accessories</Label>
                <RadioGroupItem id="accessories" value="accessories" />
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-1">
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
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
