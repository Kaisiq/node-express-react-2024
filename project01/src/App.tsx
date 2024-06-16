import "./App.css";
import { RouterProvider, createBrowserRouter, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import AboutUsPage from "./pages/AboutUsPage";
import AccountPage from "./pages/AccountPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
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
import OrdersPage from "./pages/admin/OrdersPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import AddProductPage from "./pages/admin/AddProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import DeleteProductPage from "./pages/admin/DeleteProductPage";
import DeleteOrderPage from "./pages/admin/DeleteOrderPage";
import { UserInterface } from "./models/User";
import UsersPage from "./pages/admin/UsersPage";
import SingleUserPage from "./pages/admin/SingleUserPage";
import DeleteUserPage from "./pages/admin/DeleteUserPage";
import EditFeaturedPage from "./pages/admin/EditFeaturedPage";
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
            const featuredProduct = (await api.get(`${SERVER}/products/featured`))
              .data as ProductInterface;
            const newestProducts = (await api.get(`${SERVER}/products?newest=3`))
              .data as ProductInterface[];
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

              const res = (await api.get(`${SERVER}/products?page=${pageNumber}`)).data as {
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

              const res = (await api.get(`${SERVER}/products?page=${pageNumber}&filter=male`))
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

              const res = (await api.get(`${SERVER}/products?page=${pageNumber}&filter=female`))
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

              const res = (await api.get(`${SERVER}/products?page=${pageNumber}&filter=sale`))
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
            loader: async () => {
              try {
                const data = (await api.get("/auth/admin")).data.isAdmin;
                if (!data) return redirect("/account");
                return null;
              } catch (err) {
                console.log(err);
                return redirect("/account");
              }
            },
            children: [
              {
                index: true,
                element: <AdminPage />,
                loader: async () => {
                  try {
                    const orders = (await api.get(`${SERVER}/orders/newest/${3}`))
                      .data as OrderInterface[];
                    const products = (await api.get(`${SERVER}/products?newest=3`))
                      .data as ProductInterface[];
                    const req1 = (await api.get("/orders/totalrevenue")).data;
                    const req2 = (await api.get("/orders/complete")).data;
                    const req3 = (await api.get("/orders/incomplete")).data;

                    return {
                      orders,
                      products,
                      totalRevenue: req1.total_sales,
                      salesCount: req2,
                      notShippedCount: req3,
                    };
                  } catch (err) {
                    console.log(err);
                    return redirect("/account");
                  }
                },
              },
              {
                path: "products",
                children: [
                  {
                    index: true,
                    element: <ProductsPage />,
                    loader: async () => {
                      try {
                        const products = (await api.get(`${SERVER}/products`))
                          .data as ProductInterface[];
                        return products;
                      } catch (err) {
                        console.log(err);
                        return redirect("/account");
                      }
                    },
                  },
                  {
                    path: "add",
                    element: <AddProductPage />,
                  },
                  {
                    path: "delete",
                    element: <DeleteProductPage />,
                  },
                  {
                    path: "featured",
                    element: <EditFeaturedPage />,
                  },
                  {
                    path: ":id",
                    element: <EditProductPage />,
                  },
                ],
              },
              {
                path: "orders",
                children: [
                  {
                    index: true,
                    element: <OrdersPage />,
                    loader: async () => {
                      try {
                        const orders = (await api.get(`${SERVER}/orders`)).data as OrderInterface[];
                        return orders;
                      } catch (err) {
                        console.log(err);
                        return redirect("/account");
                      }
                    },
                  },
                  {
                    path: "delete",
                    element: <DeleteOrderPage />,
                  },
                ],
              },
              {
                path: "analytics",
                element: <AnalyticsPage />,
                loader: async () => {
                  try {
                    const req1 = (await api.get("/orders/totalrevenue")).data;
                    const req2 = (await api.get("/users/total")).data;
                    const req3 = (await api.get("/orders/monthrevenue")).data;
                    const req4 = (await api.get("/orders/weekrevenue")).data;
                    const req5 = (await api.get("/orders/dayrevenue")).data;
                    return {
                      totalRevenue: req1.total_sales,
                      totalPercentage: req1.percentage,
                      ordersCount: req1.total_count,
                      usersCount: req2.users_count,
                      monthPercentage: req3.percentage,
                      monthRevenue: req3.total_sales,
                      weekPercentage: req4.percentage,
                      weekRevenue: req4.total_sales,
                      dayPercentage: req5.percentage,
                      dayRevenue: req5.total_sales,
                    };
                  } catch (err) {
                    console.log(err);
                    return redirect("/account");
                  }
                },
              },
              {
                path: "users",
                loader: async () => {
                  try {
                    const data = (await api.get("/auth/admin")).data.isAdmin;
                    if (data != 2) return redirect("/admin");
                    return null;
                  } catch (err) {
                    console.log(err);
                    return redirect("/account");
                  }
                },
                children: [
                  {
                    index: true,
                    element: <UsersPage />,
                    loader: async () => {
                      try {
                        const users = (await api.get(`${SERVER}/users`)).data as UserInterface[];
                        return users;
                      } catch (err) {
                        console.log(err);
                        return redirect("/account");
                      }
                    },
                  },
                  {
                    path: "register",
                    element: (
                      <div>
                        <h1 className="text-center text-2xl m-3 bg-stone-100 w-[25%] mx-auto rounded-lg">
                          Регистриране на потребител
                        </h1>
                        <SingleUserPage />
                      </div>
                    ),
                  },
                  {
                    path: "delete",
                    element: <DeleteUserPage />,
                  },
                  {
                    path: ":_id",
                    element: <SingleUserPage />,
                  },
                ],
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
