// import { useSession, signOut } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
import { Button } from "./ui/button";
// import { useRouter } from "next/router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export function AccountHeaderNav({
  username,
  userEmail,
  isAdmin,
}: {
  username: string;
  userEmail: string;
  isAdmin: boolean;
}) {
  // const { data: session } = useSession();
  const navigate = useNavigate();

  return (
    <>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{username}</h1>
        </div>
        <Button
          onClick={async () => {
            // await signOut();
            localStorage.removeItem("user");
            localStorage.removeItem("jwtToken");
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
          <Link
            className="border-b-2 border-transparent pb-2 transition-colors hover:border-gray-500 dark:hover:border-gray-400"
            to="/admin"
          >
            Админски панел
          </Link>
        )}
      </nav>
    </>
  );
}
