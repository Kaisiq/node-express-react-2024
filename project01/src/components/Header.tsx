import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "./ui/dropdown-menu";
import { Package2Icon } from "~/components/Icons";
import { SearchIcon } from "~/components/Icons";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
      <div className="lg:hidden">
        <Button
          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
          size="icon"
          variant="ghost"
          onClick={toggleMenu}
        >
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-950 md:w-2/3 lg:w-1/3"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
            <Image
              alt="Avatar"
              className="rounded-full"
              height="32"
              src={session?.user?.image ? session?.user?.image : ""}
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOut().catch((err) => {
                console.log(err);
                return;
              });
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
