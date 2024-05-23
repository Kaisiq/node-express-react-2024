import React, { ReactNode } from "react";
import { HeaderNav } from "./HeaderNav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className="dark">
        <HeaderNav />
        {children}
      </body>
    </html>
  );
};

export default Layout;
