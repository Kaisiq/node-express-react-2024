import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import axios from "axios";
import Link from "next/link";
import { ZoomInIcon } from "lucide-react";
import { FileEditIcon } from "lucide-react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  status: string;
  _id: string;
}

export function ProductsList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response: AxiosResponse) => {
      setProducts(response.data);
    });
  }, []);
  const editLink = "/admin/products/";
  const deleteLink = "/admin/products/delete/";

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product: Product, index) => {
        return (
          <div
            className="group relative overflow-hidden rounded-lg bg-gray-200"
            key={index}
          >
            <Link href={editLink + product._id}>
              <img
                alt={product.name}
                className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
                height={600}
                src="/cat.jpg"
                width={600}
              />
            </Link>
            <div className="grid gap-2 p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-sm leading-none">{product.description}</p>
              <div className="font-semibold">{product.price}лв</div>
              <div className="flex p-4">
                <Link href={editLink + product._id}>
                  <Button
                    className="ml-2 h-10 basis-1/2 rounded-b-md border-gray-200 dark:border-gray-800"
                    variant="outline"
                  >
                    <FileEditIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Link href={deleteLink + product._id}>
                  <Button
                    className="ml-2 h-10 basis-1/2 rounded-b-md border-gray-200 dark:border-gray-800"
                    variant="outline"
                  >
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
