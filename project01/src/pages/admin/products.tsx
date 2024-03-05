import Link from "next/link";
import { AdminLayout } from "~/components/AdminLayout";
import { ProductsList } from "~/components/ProductsList";
import { Button } from "~/components/ui/button";

export default function Component() {
  return (
    <AdminLayout>
      <main className="p-4">
        <Link href="/admin/products/add">
          <Button>Add a product</Button>
        </Link>
        Show products
        <ProductsList />
      </main>
    </AdminLayout>
  );
}
