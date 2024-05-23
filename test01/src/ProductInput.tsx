import { useEffect, useState } from "react";
import { Category, CreateProductDto, Product } from "./models/product-model";

type Props = {
  handleForm: (product: CreateProductDto) => void;
  data?: Product;
};

const ProductInput = ({ data, handleForm }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();
  const [category, setCategory] = useState<Category>();
  const [image, setImage] = useState("");
  const [tags, setTags] = useState<string>("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setCategory(data.category);
      setImage(data.image);
      setTags(data.tags.join(" "));
    }
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setCategory(1);
    setImage("");
    setTags("");
  };

  return (
    <form
      className="flex gap-3 bg-slate-300 justify-center py-2"
      onSubmit={(ev) => {
        ev.preventDefault();
        if (!name || !description || !price || !category || !image || !tags) {
          console.log("asd");
          return;
        }
        const tagsArr = tags.trim().split(" ");
        const product = new CreateProductDto(name, description, price, category, image, tagsArr);
        handleForm(product);
        resetForm();
      }}
    >
      <input
        type="text"
        value={name}
        placeholder="name"
        onChange={(ev) => {
          setName(ev.target.value);
        }}
      />
      <textarea
        value={description}
        placeholder="description"
        onChange={(ev) => {
          setDescription(ev.target.value);
        }}
      />
      <input
        type="number"
        value={price}
        placeholder="price"
        onChange={(ev) => {
          setPrice(Number(ev.target.value));
        }}
      />
      <select
        value={category}
        onChange={(event) => setCategory(parseInt(event.target.value))}
        className="form-select"
      >
        <option value={Category.Computers}>Computers</option>
        <option value={Category.Accessories}>Accessories</option>
        <option value={Category.Phones}>Phones</option>
        <option value={Category.Software}>Software</option>
      </select>
      <input
        value={image}
        type="text"
        placeholder="image"
        onChange={(ev) => {
          setImage(ev.target.value);
        }}
      />
      <input
        value={tags}
        onChange={(ev) => {
          setTags(ev.target.value);
        }}
        type="text"
        placeholder="tags: separated by space"
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default ProductInput;
