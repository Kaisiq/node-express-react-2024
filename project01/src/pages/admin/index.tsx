import AdminLogin from "./login";
import { useSession } from "next-auth/react";
import { AdminLayout } from "~/components/AdminLayout";

export default function Component() {
  const { data: session } = useSession();
  if (!session) {
    return <AdminLogin />;
  }

  return <AdminLayout>Dashboard</AdminLayout>;
}
