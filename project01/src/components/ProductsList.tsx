import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import axios from "axios";
import { ProductCardAdmin } from "./ProductCardAdmin";

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

export function ProductsList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response: AxiosResponse) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product: Product) => {
        return <ProductCardAdmin {...product} />;
      })}
    </div>
  );
}
