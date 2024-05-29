import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import AboutUsPage from "./pages/AboutUsPage";
import AccountPage from "./pages/AccountPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import AllProductPage from "./pages/collection/AllProductsPage";
import MalesPage from "./pages/collection/MalesPage";
import FemalesPage from "./pages/collection/FemalesPage";
import SalePage from "./pages/collection/SalePage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <IndexPage /> },
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
          { index: true, element: <AllProductPage /> },
          {
            path: "males",
            element: <MalesPage />,
          },
          {
            path: "females",
            element: <FemalesPage />,
          },
          {
            path: "sale",
            element: <SalePage />,
          },
          {
            path: "all",
            element: <AllProductPage />,
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
