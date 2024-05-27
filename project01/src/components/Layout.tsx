import { HeaderNav } from "./HeaderNav";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Toaster } from "./ui/toaster";

const Layout = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <HeaderNav />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
