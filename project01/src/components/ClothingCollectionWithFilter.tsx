import { useEffect, useMemo, useState } from "react";
import { ClothingSlotsList } from "~/components/ClothingSlotsList";
import type { ProductInterface } from "~/models/Product";
import ClothingListFilter, {
  type FilterInterface,
  type Sort,
} from "~/components/ClothingListFilter";
import { ClothingPagination } from "./ClothingPagination";

export default function ClothingCollectionWithFilter(props: {
  products: string;
  page: number;
  maxPages: number;
}) {
  const [filter, setFilter] = useState<FilterInterface>();
  const [sort, setSort] = useState<Sort>("normal");
  const [searchFor, setSearchFor] = useState("");
  const [toShowProducts, setToShowProducts] = useState<ProductInterface[]>([]);
  const handleFilter = (newFilter: Partial<FilterInterface>) => {
    setFilter((old) => {
      const updatedFilter: FilterInterface = {
        ...old,
        ...newFilter,
      } as FilterInterface;
      return updatedFilter;
    });
  };

  const handleSort = (newSort: Sort) => {
    setSort(newSort);
  };

  const handleSearch = (value: string) => {
    setSearchFor(value);
  };

  const parsedProducts = useMemo(() => {
    return JSON.parse(props.products) as ProductInterface[];
  }, [props.products]);

  const filteredProducts = useMemo(() => {
    if (!filter || Object.keys(filter).length === 0) {
      return parsedProducts;
    }

    return parsedProducts.filter((product) => {
      if (Object.values(filter).find((el) => el !== "all" && el !== ""))
        for (const [fltr, value] of Object.entries(filter)) {
          console.log(fltr, value);
          if (value === "all") continue;
          /* eslint-disable */
          if (!Object.keys(product).includes(fltr) || (product as any)[fltr] !== value) {
            return false;
          }
          /* eslint-enable */
        }
      return true;
    });
  }, [parsedProducts, filter]);

  const sortedProducts = useMemo(() => {
    if (sort === "normal") {
      return filteredProducts;
    } else if (sort === "priceup") {
      return [...filteredProducts].sort((a, b) => {
        return a.price >= b.price ? 1 : -1;
      });
    } else if (sort === "pricedown")
      return [...filteredProducts].sort((a, b) => {
        return a.price >= b.price ? -1 : 1;
      });
    else if (sort === "newest")
      return [...filteredProducts].sort((a, b) =>
        Date.parse(a.updatedAt!) >= Date.parse(b.updatedAt!) ? -1 : 1
      );
    else if (sort === "oldest")
      return [...filteredProducts].sort((a, b) =>
        Date.parse(a.updatedAt!) >= Date.parse(b.updatedAt!) ? 1 : -1
      );
    else return [];
  }, [filteredProducts, sort]);

  useEffect(() => {
    setToShowProducts(
      sortedProducts.filter((product) => product.name.toLowerCase().includes(searchFor))
    );
  }, [searchFor, sortedProducts]);

  return (
    <>
      <ClothingListFilter
        handleFilter={handleFilter}
        handleSort={handleSort}
        handleSearch={handleSearch}
      />
      <ClothingSlotsList data={toShowProducts} />
      <ClothingPagination
        currentPage={props.page}
        maxPages={props.maxPages}
      />
    </>
  );
}
