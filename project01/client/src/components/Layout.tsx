import { HeaderNav } from "./HeaderNav";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Toaster } from "./ui/toaster";
import { CartContextProvider } from "./CartContextProvider";
import { UserContextProvider } from "./UserContextProvider";

const Layout = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <UserContextProvider>
        <CartContextProvider>
          <HeaderNav />
          <Outlet />
          <Footer />
          <Toaster />
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default Layout;
