import "./App.css";
import { RouterProvider, createBrowserRouter, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import AboutUsPage from "./pages/AboutUsPage";
import AccountPage from "./pages/AccountPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import axios from "axios";
import SingleProduct from "./components/SingleProduct";
import { ProductInterface } from "./models/Product";
import CollectionPage from "./pages/collection/CollectionPage";
import CartPage from "./pages/CartPage";
import api from "./lib/api";
import { redirect } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AdminPage from "./pages/admin/AdminPage";
import { OrderInterface } from "./models/Order";
import ProductsPage from "./pages/admin/ProductsPage";
const SERVER = process.env.REACT_APP_SERVER_ADDRESS;

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
        loader: async () => {
          try {
            const products = (await axios.get(`${SERVER}/products?newest=3`)).data;
            const newestProducts = (await axios.get(`${SERVER}/products?newest=3`)).data;

            const randomNumber = Math.floor(Math.random() * products.length);
            const featuredProduct = products[randomNumber];

            return {
              featured: featuredProduct,
              newest: newestProducts,
            };
          } catch (error) {
            console.error("Error fetching products:", error);
            return {
              featured: "",
              newest: "",
            };
          }
        },
      },
      { path: "/", element: <IndexPage /> },
      {
        path: "/aboutus",
        element: <AboutUsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
        loader: async () => {
          try {
            const data = await api.get("/auth/profile");
            if (!data) return redirect("/account");
            return null;
          } catch (err) {
            console.log(err);
            return redirect("/account");
          }
        },
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/collection",
        children: [
          {
            index: true,
            element: <CollectionPage />,
            loader: async ({ params }) => {
              let { page } = params;
              const pageNumber = page ? Number(page) : 1;

              const res = (await axios.get(`${SERVER}/products?page=${pageNumber}`)).data as {
                products: ProductInterface[];
                maxPages: number;
              };
              return {
                products: res.products,
                page: pageNumber,
                maxPages: res.maxPages,
              };
            },
          },
          {
            path: "males",
            element: <CollectionPage />,
            loader: async ({ params }) => {
              let { page } = params;
              const pageNumber = page ? Number(page) : 1;

              const res = (await axios.get(`${SERVER}/products?page=${pageNumber}&filter=male`))
                .data as { products: ProductInterface[]; maxPages: number };
              return {
                products: res.products,
                page: pageNumber,
                maxPages: res.maxPages,
              };
            },
          },
          {
            path: "females",
            element: <CollectionPage />,
            loader: async ({ params }) => {
              let { page } = params;
              const pageNumber = page ? Number(page) : 1;

              const res = (await axios.get(`${SERVER}/products?page=${pageNumber}&filter=female`))
                .data as { products: ProductInterface[]; maxPages: number };
              return {
                products: res.products,
                page: pageNumber,
                maxPages: res.maxPages,
              };
            },
          },
          {
            path: "sale",
            element: <CollectionPage />,
            loader: async ({ params }) => {
              let { page } = params;
              const pageNumber = page ? Number(page) : 1;

              const res = (await axios.get(`${SERVER}/products?page=${pageNumber}&filter=sale`))
                .data as { products: ProductInterface[]; maxPages: number };
              return {
                products: res.products,
                page: pageNumber,
                maxPages: res.maxPages,
              };
            },
          },
        ],
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            children: [
              {
                index: true,
                element: <AdminPage />,
                loader: async () => {
                  try {
                    const data = (await api.get("/auth/admin")).data.isAdmin;
                    if (!data) return redirect("/account");
                    const orders = (await api.get(`${SERVER}/orders?newest=3`))
                      .data as OrderInterface[];

                    const products = (await api.get(`${SERVER}/products?newest=3`))
                      .data as ProductInterface[];
                    return { orders, products };
                  } catch (err) {
                    console.log(err);
                    return redirect("/account");
                  }
                },
              },
              {
                path: "products",
                element: <ProductsPage />,
                loader: async () => {
                  try {
                    const data = (await api.get("/auth/admin")).data.isAdmin;
                    if (!data) return redirect("/account");

                    const products = (await api.get(`${SERVER}/products`))
                      .data as ProductInterface[];
                    return products;
                  } catch (err) {
                    console.log(err);
                    return redirect("/account");
                  }
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
