import type { ColumnDef } from "@tanstack/react-table";
import type { OrderInterface } from "~/models/Order";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2Icon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import api from "~/lib/api";

export const columns: ColumnDef<OrderInterface>[] = [
  {
    accessorKey: "flname",
    header: "Име и Фамилия",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tel",
    header: "Телефонен номер",
  },
  {
    accessorKey: "city",
    header: "Град",
  },
  {
    accessorKey: "address",
    header: "Адрес",
  },
  {
    accessorKey: "info",
    header: "Бонус инфо",
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const order = row.original;
      let status = order.status;

      return (
        <Select
          onValueChange={(value) => {
            status = value;
            const updatedOrder = { ...order, status: value };
            api.put("/api/orders", updatedOrder).catch((err) => {
              console.log(err);
            });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">new</SelectItem>
            <SelectItem value="shipped">shipped</SelectItem>
            <SelectItem value="completed">completed</SelectItem>
            <SelectItem value="canceled">canceled</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "productNames",
    enableHiding: true,
    header: "Продукти",
  },
  {
    accessorKey: "price",
    enableHiding: true,
    header: "Цена",
  },
  {
    accessorKey: "createdAt",
    enableHiding: true,
    header: "Дата на създаване",
  },
  {
    header: "Още",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
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
                    window.location.href = "/admin/orders/delete/" + order._id;
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
    },
  },
];
