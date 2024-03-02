import { AdminLayout } from "~/components/AdminLayout";
import { useRouter } from "next/router";

export default function Component() {
  const router = useRouter();
  const itemID = router.query.id;
  return (
    <AdminLayout>
      <main className="p-10">{itemID}</main>
    </AdminLayout>
  );
}
