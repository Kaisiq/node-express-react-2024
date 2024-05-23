import React, { useEffect, useState } from "react";

import ProductItem from "./ProductItem";
import { Product } from "./models/product-model";
import ProductFilter from "./ProductFilter";

type Props = {
  data: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
};

const ProductList = ({ data, onEditProduct, onDeleteProduct }: Props) => {
  const [items, setItems] = useState<Product[]>(data);
  const [filter, setFilter] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  useEffect(() => {
    if (!filter) {
      setFilteredItems(items);
    }
    setFilteredItems(
      items.filter((el) => {
        for (const flt of filter) {
          if (!el.tags.includes(flt)) {
            return false;
          }
        }
        return true;
      })
    );
  }, [items, filter]);

  const handleFilter = (filter: string) => {
    if (!filter) {
      setFilter([]);
    }
    setFilter(filter.trim().split(" "));
  };
  const handleSort = (type: number) => {
    if (type === 0) {
      setItems(data);
    } else if (type === 1) {
      setItems(data.sort((a, b) => (a.price >= b.price ? 1 : -1)));
    } else {
      setItems(data.sort((a, b) => (a.price >= b.price ? -1 : 1)));
    }
  };

  return (
    <>
      <ProductFilter
        handleFilter={handleFilter}
        handleSort={handleSort}
      />
      {filteredItems.map((el) => {
        return (
          <ProductItem
            key={el.id}
            data={el}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
          />
        );
      })}
    </>
  );
};

export default ProductList;
