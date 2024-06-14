import { UserIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon } from "~/components/Icons";
import { ShoppingCartIcon } from "~/components/Icons";
import { LineChartIcon } from "~/components/Icons";
import { PackageIcon } from "~/components/Icons";

export function Sidebar() {
  const location = useLocation();
  const pathname: string = location.pathname;
  const inactiveLink =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";
  const activeLink =
    "flex items-center gap-3 rounded-lg bg-gray-200 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50";
  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className={pathname === "/admin" ? activeLink : inactiveLink}
              to="/admin"
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              className={pathname.includes("/admin/orders") ? activeLink : inactiveLink}
              to="/admin/orders"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              Orders
            </Link>
            <Link
              className={pathname.includes("/admin/products") ? activeLink : inactiveLink}
              to="/admin/products"
            >
              <PackageIcon className="h-4 w-4" />
              Products
            </Link>
            <Link
              className={pathname.includes("/admin/analytics") ? activeLink : inactiveLink}
              to="/admin/analytics"
            >
              <LineChartIcon className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              className={pathname.includes("/admin/users") ? activeLink : inactiveLink}
              to="/admin/users"
            >
              <UserIcon className="h-4 w-4" />
              Users
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
