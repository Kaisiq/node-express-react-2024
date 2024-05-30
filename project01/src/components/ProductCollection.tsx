import { ClothingSlotsList, EmptyClothingSlotsList } from "@/components/ClothingSlotsList";
import { useEffect, useState } from "react";
import { ProductInterface } from "@/models/Product";
import axios, { type AxiosResponse } from "axios";
import { SERVER } from "~/lib/utils";

function min(a: number, b: number) {
  return a < b ? a : b;
}

export function ProductCollection({ category, n }: { category: string; n: number }) {
  const [data, setData] = useState<ProductInterface[]>([]);
  useEffect(() => {
    if (category)
      axios
        .get(`${SERVER}/products?category=${category}&number=${n}`)
        .then((result: AxiosResponse<ProductInterface[]>) => {
          setData(result.data);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    else
      axios
        .get(`${SERVER}/products?newest=${n}`)
        .then((res: AxiosResponse<ProductInterface[]>) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
  }, [category, n]);

  if (data && data.length > 0) {
    return <ClothingSlotsList data={data} />;
  } else {
    return <EmptyClothingSlotsList n={min(3, n)} />;
  }
}
