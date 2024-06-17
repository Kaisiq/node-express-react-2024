import React from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useSizeLTMd } from "~/hooks/useScreenSize";

export type FilterInterface = {
  category: string;
  condition: string;
  size: string;
  order: string;
};

export type Sort = "priceup" | "pricedown" | "oldest" | "newest" | "normal";

const ClothingListFilter = ({
  handleFilter,
  handleSort,
  handleSearch,
}: {
  handleFilter: (filter: Partial<FilterInterface>) => void;
  handleSort: (sort: Sort) => void;
  handleSearch: (value: string) => void;
}) => {
  const isMdOrLess = useSizeLTMd();
  return (
    <div className="flex flex-col items-center pb-2">
      <h2 className="text-2xl font-semibold">Филтри</h2>
      <section className={`m-auto flex w-[70%] ${isMdOrLess && "flex-col"} gap-2`}>
        <Select
          onValueChange={(value: string) => {
            handleFilter({ category: value });
          }}
          defaultValue=""
        >
          <SelectTrigger>
            <SelectValue placeholder={"Категория"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            <SelectItem value="clothing">Дрехи</SelectItem>
            <SelectItem value="accessories">Аксесоари</SelectItem>
            <SelectItem value="footwear">Обувки</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: string) => {
            console.log(value);
            handleFilter({ condition: value });
          }}
          defaultValue=""
        >
          <SelectTrigger>
            <SelectValue placeholder={"Състояние"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            <SelectItem value="new">Ново</SelectItem>
            <SelectItem value="likenew">Като ново</SelectItem>
            <SelectItem value="minimalwear">Леки следи от употреба</SelectItem>
            <SelectItem value="wellworn">Употребявано</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: string) => {
            handleFilter({ size: value });
          }}
          defaultValue=""
        >
          <SelectTrigger>
            <SelectValue placeholder={"Размер"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            <SelectItem value="2XS">2XS</SelectItem>
            <SelectItem value="XS">XS</SelectItem>
            <SelectItem value="S">S</SelectItem>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="L">L</SelectItem>
            <SelectItem value="XL">XL</SelectItem>
            <SelectItem value="2XL">2XL</SelectItem>
          </SelectContent>
        </Select>
        {/* <Select>
					<SelectTrigger>
						<SelectValue placeholder={"Цвят"} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="">Profile</SelectItem>
						<SelectItem value="">Billing</SelectItem>
						<SelectItem value="">Team</SelectItem>
						<SelectItem value="">Subscription</SelectItem>
					</SelectContent>
				</Select> */}
        <div className="flex w-[100%] gap-2 lg:ml-5 lg:w-[200%]">
          <Select
            onValueChange={(value: Sort) => {
              handleSort(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={"Подреди по"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Нормално</SelectItem>
              <SelectItem value="priceup">Цена (от ниска към висока)</SelectItem>
              <SelectItem value="pricedown">Цена (от висока към ниска)</SelectItem>
              <SelectItem value="oldest">Най-стари</SelectItem>
              <SelectItem value="newest">Най-нови</SelectItem>
            </SelectContent>
          </Select>

          <Input
            onChange={(ev) => {
              handleSearch(ev.target.value);
            }}
            placeholder="Търсене по име"
          />
        </div>
      </section>
    </div>
  );
};

export default ClothingListFilter;
