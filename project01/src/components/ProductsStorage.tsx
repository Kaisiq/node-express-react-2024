interface Product {
  id: number;
  name: string;
  description: string;
  size: string;
  price: number;
  category: string;
  image: string;
  status: string;
  userID: number;
}

function ProductsStorage() {
  let storage: Product[] = [];
  const addProduct = (product: Product) => {
    storage.push(product);
  };
  const removeProduct = (name: string) => {
    storage = storage.filter((el) => el.name != name);
  };
  const updateProduct = (product: Product) => {
    storage = storage.map((el) => {
      if (el.name === product.name) {
        el = product;
      }
      return el;
    });
  };
  const getProduct = (name: string) => {
    return storage.find((el) => {
      el.name === name;
    });
  };
  const reserveProduct = (name: string, userID: number) => {
    let toReserve = getProduct(name);
    if (!toReserve) {
      return new Error("Cannot find product");
    }
    toReserve.status = "reserved";
    toReserve.userID = userID;
    updateProduct(toReserve);
  };
  const freeProduct = (name: string) => {
    let toReserve = getProduct(name);
    if (!toReserve) {
      return new Error("Cannot find product");
    }
    if (toReserve.status === "ok") return new Error("already freed");
    toReserve.status = "ok";
    toReserve.userID = -1;
    updateProduct(toReserve);
  };
}
