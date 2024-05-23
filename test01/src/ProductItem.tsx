import React, { useState } from "react";
import { CreateProductDto, Product } from "./models/product-model";
import ProductInput from "./ProductInput";

const EditIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
};

const TrashIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
};

type Props = {
  data: Product;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
};

const ProductItem = ({ data, onEditProduct, onDeleteProduct }: Props) => {
  function handleInput(product: CreateProductDto) {
    const updatedProduct = { ...product, id: data.id };
    onEditProduct(updatedProduct);
    setItem(data);
    setEditing(false);
  }
  const [item, setItem] = useState<Product>(data);
  const [editing, setEditing] = useState(false);
  return (
    <>
      <div className="flex gap-5 justify-center mt-3 text-xl">
        <span>ID: {item.id} </span>
        <span>Name: {item.name} </span>
        <span>Description: {item.description} </span>
        <span>Price: {item.price} </span>
        <span className="flex">
          Image:
          <img
            className="h-16 w-16"
            src={item.image}
            alt={item.image}
          />
        </span>
        Tags:
        {item.tags.join(" ")}
        <button
          onClick={() => {
            setEditing(!editing);
          }}
        >
          <EditIcon />
        </button>
        <button
          onClick={() => {
            onDeleteProduct(item);
          }}
        >
          <TrashIcon />
        </button>
      </div>
      {editing && (
        <div className="flex justify-center">
          <ProductInput
            data={item}
            handleForm={handleInput}
          />
        </div>
      )}
    </>
  );
};

export default ProductItem;
