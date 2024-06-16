import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Package2Icon } from "~/components/Icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { AdminType } from "~/models/User";

export function AdminDropdownMenu() {
  const { userType } = useContext(UserContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Package2Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              className="h-full w-full"
              to="/"
            >
              Back to homepage
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              className="h-full w-full"
              to="/admin"
            >
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              className="h-full w-full"
              to="/admin/orders"
            >
              Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              className="h-full w-full"
              to="/admin/products"
            >
              Products
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              className="h-full w-full"
              to="/admin/analytics"
            >
              Analytics
            </Link>
          </DropdownMenuItem>
          {userType === AdminType.Admin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  className="h-full w-full"
                  to="/admin/users"
                >
                  Users
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
