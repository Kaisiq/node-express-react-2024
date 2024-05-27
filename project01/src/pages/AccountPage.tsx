import { OrdersInformation } from "~/components/OrdersInformation";
import { AccountInformation } from "~/components/AccountInformation";
import { AccountHeaderNav } from "~/components/AccountHeaderNav";
// import { useSession } from "next-auth/react";
import LoginForm from "~/components/LoginForm";
import CustomHead from "~/components/CustomHead";
import { useLocation } from "react-router";
import { getUser } from "~/lib/utils";

export default function AccountPage() {
  const userEmail = getUser().userEmail;
  // const { data: session } = useSession();
  const location = useLocation();
  if (userEmail)
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
          <AccountHeaderNav />
          <OrdersInformation />
          <AccountInformation />
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
