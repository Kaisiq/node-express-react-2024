import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Row } from "@tanstack/react-table";

const ActionsCell = ({
  row,
}: {
  row: Row<{
    flname: string;
    tel: string;
    address: string;
    info: string;
    city: string;
    email: string;
    price: number;
    status: string;
    productIDs: string[];
    productNames: string[];
    _id?: string | undefined;
    createdAt?: string | undefined;
  }>;
}) => {
  const order = row.original;
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.address)}>
          Copy order address
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
        {order.status === "canceled" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2"
              onClick={async () => {
                navigate("/admin/orders/delete/", { state: order._id });
              }}
            >
              <Trash2Icon className="h-4 w-4" />
              <span>Delete Order</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
