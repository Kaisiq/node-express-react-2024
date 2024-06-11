import { OrdersInformation } from "~/components/OrdersInformation";
import { AccountInformation } from "~/components/AccountInformation";
import { AccountHeaderNav } from "~/components/AccountHeaderNav";
// import { useSession } from "next-auth/react";
import LoginForm from "~/components/LoginForm";
import CustomHead from "~/components/CustomHead";
import { useLocation } from "react-router";
import { getUser } from "~/services/UserServie";
import { useCallback, useContext, useEffect, useState } from "react";
import { AdminContext } from "~/components/AdminContextProvider";
import { OrderInterface } from "~/models/Order";
import axios, { AxiosResponse } from "axios";

export default function AccountPage() {
  const user = getUser();
  const { isAdmin } = useContext(AdminContext);
  // const { data: session } = useSession();
  const location = useLocation();

  const [orders, setOrders] = useState<OrderInterface[]>([]);

  const updateOrders = useCallback(() => {
    const email = sessionStorage.getItem("user");
    if (!email) return;
    axios
      .get(`/api/orders?email=${email}`)
      .then((res: AxiosResponse<OrderInterface[]>) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [sessionStorage]);

  useEffect(() => {
    updateOrders();
  }, [updateOrders]);

  async function cancelOrder(_id: string | undefined, email: string) {
    try {
      await axios.patch(`/api/orders/${_id}`, {
        status: "canceled",
        email,
      });
      updateOrders();
    } catch (err) {
      console.log(err);
    }
  }

  if (user)
    return (
      <>
        <CustomHead
          title={`Две Трети | Акаунт`}
          description={`Онлайн магазин за дрехи втора употреба`}
          image={`/b.webp?height=800&width=1600`}
          link={`${location.pathname}`}
          type="web"
          domain={`${location.pathname}`}
        />
        <main className="mx-auto flex w-[80%] flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
          <AccountHeaderNav
            {...user}
            isAdmin={isAdmin}
          />
          <OrdersInformation
            orders={orders}
            cancelOrder={cancelOrder}
          />
          <AccountInformation userEmail={user.userEmail} />
        </main>
      </>
    );
  else {
    return (
      <>
        <CustomHead
          title={`Две Трети | Влизане`}
          description={`Онлайн магазин за дрехи втора употреба`}
          image={`/b.webp?height=800&width=1600`}
          link={`${location.pathname}`}
          type="web"
          domain={`${location.pathname}`}
        />
        <main>
          <LoginForm />
        </main>
      </>
    );
  }
}