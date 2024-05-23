import React, { useEffect, useState } from "react";
import "./App.css";
import ProductList from "./ProductList";
import API from "./services/api-clients";
import { CreateProductDto, Product } from "./models/product-model";
import ProductInput from "./ProductInput";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const prdcts = await API.findAll(Product);
      setProducts(prdcts);
      console.log(prdcts);
    };
    getAllProducts();
  }, []);

  const onCreateProduct = async (product: CreateProductDto) => {
    const created = await API.createOne(Product, product);
    setProducts([...products, created]);
  };

  const onDeleteProduct = async (toDelete: Product) => {
    const deleted = await API.deleteOne(Product, toDelete.id);
    setProducts((products) => products.filter((el) => el.id != deleted.id));
  };
  const onEditProduct = async (edited: Product) => {
    const updated = await API.update(Product, edited, edited.id);
    setProducts((products) =>
      products.map((el) => {
        if (el.id != edited.id) return el;
        return updated;
      })
    );
  };

  return (
    <>
      <ProductInput handleForm={onCreateProduct} />
      {products ? (
        <div className="mt-5 flex flex-col gap-5">
          <h1 className="text-3xl text-center">Products:</h1>
          <ProductList
            data={products}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
          />
        </div>
      ) : (
        <div>"Loading"</div>
      )}
    </>
  );
}

export default App;
