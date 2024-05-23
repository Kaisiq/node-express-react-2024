import React, { useState } from "react";
import { Category } from "./models/product-model";

enum PriceSort {
  Normal = 0,
  Ascending = 1,
  Descending = 2,
}

const ProductFilter = ({
  handleFilter,
  handleSort,
}: {
  handleFilter: (filter: string) => void;
  handleSort: (sort: number) => void;
}) => {
  const [filter, setFilter] = useState<string>("");
  return (
    <div className="flex justify-center bg-gray-200 p-2 gap-5">
      <select
        onChange={(event) => {
          handleSort(parseInt(event.target.value));
        }}
      >
        <option value={PriceSort.Normal}>Normal</option>
        <option value={PriceSort.Ascending}>Ascending</option>
        <option value={PriceSort.Descending}>Descending</option>
      </select>
      <input
        placeholder="filter by tags"
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
          handleFilter(filter);
        }}
      />
    </div>
  );
};

export default ProductFilter;
