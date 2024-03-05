import { AdminLayout } from "~/components/AdminLayout";
import { useRouter } from "next/router";
import { AddProduct } from "~/components/AddProduct";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  status: string;
  _id: string;
}

export default function Component() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<Product>({
    name: "",
    price: null as unknown as number,
    description: "",
    category: "",
    size: "",
    status: "",
    _id: "",
  });
  const itemID = router.query.id
    ? Array.prototype.join.call(router.query.id, "")
    : "";

  useEffect(() => {
    if (!itemID) {
      return;
    }
    axios.get("/api/products?id=" + itemID).then((res) => {
      setProductInfo(res.data);
    });
  }, [itemID]);
  return (
    <AdminLayout>
      <main className="p-10">
        <h1 className="text-lg font-semibold md:text-2xl">
          editing product with id: {itemID}
        </h1>
        <AddProduct {...productInfo} />
      </main>
    </AdminLayout>
  );
}
