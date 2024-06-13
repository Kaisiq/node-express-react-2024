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
import { useNavigate } from "react-router";
import { SERVER } from "~/lib/utils";
import ActionsCell from "./ActionsCell";

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
            api.put(`${SERVER}/orders`, updatedOrder).catch((err) => {
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
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
