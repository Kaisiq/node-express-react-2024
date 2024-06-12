import { Link } from "react-router-dom";
import { FileEditIcon } from "lucide-react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import type { ProductInterface } from "~/models/Product";

export function ProductCardAdmin(product: ProductInterface) {
  const editLink = "/admin/products/";
  const deleteLink = "/admin/products/delete/";
  let imageLink = "/cat.jpg";
  if (product?.images?.[0]) {
    imageLink = product.images[0];
  }
  return (
    <div
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-gray-200"
      key={product._id}
    >
      <Link to={editLink + product._id}>
        <img
          alt={product.name}
          className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
          height={600}
          src={imageLink}
          width={600}
        />
      </Link>
      <div className="flex h-full flex-col justify-between gap-2 p-4">
        <div>
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-sm leading-none">{product.description}</p>
          <div className="font-semibold">{product.price}лв</div>
        </div>
        <div className="flex p-4">
          <Link to={editLink + product._id}>
            <Button
              className="ml-2 h-10 basis-1/2 rounded-b-md border-gray-200 dark:border-gray-800"
              variant="outline"
            >
              <FileEditIcon className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Link to={deleteLink + product._id}>
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
}
