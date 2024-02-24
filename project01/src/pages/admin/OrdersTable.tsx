import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Package2Icon } from "~/components/Icons";
import { SearchIcon } from "~/components/Icons";
import { PlusIcon } from "~/components/Icons";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../../components/ui/table";

export function OrdersTable() {
  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
        <Link className="lg:hidden" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="w-full">
          <h1 className="text-lg font-semibold">Pending Orders</h1>
        </div>
        <form className="flex-1 md:flex-initial">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="bg-white pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search orders..."
              type="search"
            />
          </div>
        </form>
        <Button className="rounded-full" size="icon" variant="outline">
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">New order</span>
        </Button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border p-2 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Olivia Martin</TableCell>
                <TableCell>Online Store</TableCell>
                <TableCell>Shipped</TableCell>
                <TableCell>February 20, 2022</TableCell>
                <TableCell>$42.25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ava Johnson</TableCell>
                <TableCell>Shop</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>January 5, 2022</TableCell>
                <TableCell>$74.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Michael Johnson</TableCell>
                <TableCell>Shop</TableCell>
                <TableCell>Unfulfilled</TableCell>
                <TableCell>August 3, 2021</TableCell>
                <TableCell>$64.75</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lisa Anderson</TableCell>
                <TableCell>Online Store</TableCell>
                <TableCell>Shipped</TableCell>
                <TableCell>July 15, 2021</TableCell>
                <TableCell>$34.50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Samantha Green</TableCell>
                <TableCell>Shop</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>June 5, 2021</TableCell>
                <TableCell>$89.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Adam Barlow</TableCell>
                <TableCell>Online Store</TableCell>
                <TableCell>Unfulfilled</TableCell>
                <TableCell>May 20, 2021</TableCell>
                <TableCell>$24.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sophia Anderson</TableCell>
                <TableCell>Shop</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>November 2, 2021</TableCell>
                <TableCell>$99.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Daniel Smith</TableCell>
                <TableCell>Online Store</TableCell>
                <TableCell>Shipped</TableCell>
                <TableCell>October 7, 2021</TableCell>
                <TableCell>$67.50</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
