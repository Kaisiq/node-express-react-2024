import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { ProductInterface } from "~/models/Product";
import { Button } from "./ui/button";
import api from "~/lib/api";
import { useNavigate } from "react-router";

export default function Component({ products }: { products: ProductInterface[] }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const navigate = useNavigate();
  const handleProductSelect = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const saveProducts = async () => {
    try {
      if (!selectedProducts) return;
      await api.post("/products/featured", selectedProducts);
      navigate(-1);
    } catch (err) {
      console.error(err);
      navigate(-1);
    }
  };
  return (
    <>
      <Button
        variant="outline"
        className="m-auto text-2xl p-6"
        onClick={saveProducts}
      >
        Запазване
      </Button>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4">
        {products.map((product) => (
          <div
            key={product._id}
            className={`relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 ${
              selectedProducts.includes(product._id)
                ? "bg-gray-100 dark:bg-gray-800"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => handleProductSelect(product._id)}
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              width={300}
              height={300}
              className="z-0 w-full h-[300px] object-cover transition-opacity group-hover:opacity-50"
            />
            <div className="p-4">
              <h3 className="font-semibold tracking-tight">{product.name}</h3>
            </div>
            {selectedProducts.includes(product._id) && (
              <div className="absolute z-10 inset-0 bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <CheckIcon className="w-40 h-40 z-10 text-secondary dark:text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
