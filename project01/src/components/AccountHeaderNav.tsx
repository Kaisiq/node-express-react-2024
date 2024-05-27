// import { useSession, signOut } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
import { Button } from "./ui/button";
// import { useRouter } from "next/router";
import { useContext } from "react";
import { AdminContext } from "./AdminContextProvider";
import { useNavigate } from "react-router";
import { getUser } from "~/lib/utils";

export function AccountHeaderNav() {
  // const { data: session } = useSession();
  const navigate = useNavigate();
  const user = getUser();
  const { isAdmin } = useContext(AdminContext);

  return (
    <>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{user.username}</h1>
        </div>
        <Button
          onClick={async () => {
            // await signOut();
            sessionStorage.removeItem("user");
            // await router.push("/");
            navigate("/");
          }}
          variant="outline"
        >
          Излизане
        </Button>
      </header>
      <nav className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
        <a
          className="border-b-2 border-transparent pb-2 transition-colors hover:border-gray-500 dark:hover:border-gray-400"
          href="#history"
        >
          История на Поръчки
        </a>
        <a
          className="border-b-2 border-transparent pb-2 transition-colors hover:border-gray-500 dark:hover:border-gray-400"
          href="#account"
        >
          Информация за акаунта
        </a>
        {isAdmin && (
          <a
            className="border-b-2 border-transparent pb-2 transition-colors hover:border-gray-500 dark:hover:border-gray-400"
            href="/admin"
          >
            Админски панел
          </a>
        )}
      </nav>
    </>
  );
}
