import { useCallback, useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import type { OrderInterface } from "~/models/Order";
import { AlertDialogOnAction } from "./AlertDialogOnAction";

function isLessThan24HoursFromOrder(orderCreation: string | undefined) {
  if (!orderCreation) return false;
  const createdAt = new Date(orderCreation);
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const hours = diff / 3600000;
  return hours < 24;
}

export function OrdersInformation({
  orders,
  cancelOrder,
}: {
  orders: OrderInterface[];
  cancelOrder: (id: string | undefined, email: string) => void;
}) {
  return (
    <section id="history">
      <h2 className="mb-4 text-xl font-semibold">Order History</h2>
      <div className="grid gap-4">
        {orders?.map((order) => {
          const date = new Date(order.createdAt!);
          const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          return (
            <div
              key={order._id}
              className="flex items-center justify-between rounded-md bg-white p-4 shadow dark:bg-gray-800"
            >
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {date.toLocaleDateString("bg-BG", options)}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Артикули: {order.productNames.join(", ")}
                </p>
                <p className="text-gray-700 dark:text-gray-300">Цена: {order.price}лв</p>
                <ColoredOrderStatus status={order.status} />
              </div>
              {order._id !== undefined &&
                order.status === "new" &&
                isLessThan24HoursFromOrder(order.createdAt) && (
                  <AlertDialogOnAction
                    buttonText={"Откажи поръчката"}
                    title={"Сигурни ли сте?"}
                    description="Ако откажете поръчката, тя ще бъде изтрита и няма да получите
						артикула!"
                    continueText="Продължаване"
                    cancelText="Назад"
                    fn={async () => {
                      console.log("here1");
                      await cancelOrder(order._id, order.email);
                    }}
                  />
                )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ColoredOrderStatus({ status }: { status: string }) {
  if (status === "canceled") {
    return <p className="font-medium text-red-500">{status}</p>;
  } else if (status === "new" || status === "completed") {
    return <p className="font-medium text-green-500">{status}</p>;
  } else if (status === "shipped") {
    return <p className="font-medium text-yellow-500">{status}</p>;
  } else {
    return <p className="font-medium text-red-500">{status}</p>;
  }
}
