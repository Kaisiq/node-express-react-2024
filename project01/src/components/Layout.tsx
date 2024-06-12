import { HeaderNav } from "./HeaderNav";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Toaster } from "./ui/toaster";
import { CartContextProvider } from "./CartContextProvider";
import { AdminContextProvider } from "./AdminContextProvider";

const Layout = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <AdminContextProvider>
        <CartContextProvider>
          <HeaderNav />
          <Outlet />
          <Footer />
          <Toaster />
        </CartContextProvider>
      </AdminContextProvider>
    </div>
  );
};

export default Layout;
