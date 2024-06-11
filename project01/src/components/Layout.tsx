import { HeaderNav } from "./HeaderNav";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Toaster } from "./ui/toaster";
import { CartContextProvider } from "./CartContextProvider";

const Layout = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <CartContextProvider>
        <HeaderNav />
        <Outlet />
        <Footer />
        <Toaster />
      </CartContextProvider>
    </div>
  );
};

export default Layout;
