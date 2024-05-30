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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
