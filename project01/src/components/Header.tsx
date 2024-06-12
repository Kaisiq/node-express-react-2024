import { Button } from "./ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "./ui/dropdown-menu";
import { AdminDropdownMenu } from "./AdminDropdownMenu";

export function Header() {
  // const { data: session } = useSession();
  return (
    <header className="flex h-14 w-full items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
      <div className="lg:hidden">
        <AdminDropdownMenu />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
            {/* <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src={session?.user?.image ? session?.user?.image : ""}
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            /> */}
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
          // onClick={() => {
          //   signOut().catch((err: Error) => {
          //     console.log(err);
          //     return;
          //   });
          // }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
