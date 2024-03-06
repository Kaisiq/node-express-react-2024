import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { RingLoader } from "react-spinners";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchAdminStatus() {
      const session = await getSession();
      if (!session || !session.user || !session.user.email) {
        setIsAdminUser(false);
        return;
      }
      try {
        const res = await axios.post("/api/authAdmin/", {
          email: session.user.email,
        });
        setIsAdminUser(res.data);
      } catch (error) {
        setIsAdminUser(false);
      }
    }
    fetchAdminStatus();
  }, []);

  if (isAdminUser === null) {
    // While loading admin status, you can display loading or any other UI
    return <RingLoader className="top-96 m-auto" />;
  }

  if (isAdminUser) {
    return (
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-[100vh] flex-col items-center justify-center space-y-4 px-4 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            404 Error
          </h1>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Return to the homepage
        </Link>
      </div>
    );
  }
}
