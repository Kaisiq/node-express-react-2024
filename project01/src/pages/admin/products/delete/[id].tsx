import { AdminLayout } from "~/components/AdminLayout";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import axios from "axios";

export default function Component() {
  const router = useRouter();
  const id = router.query.id as string;

  function goBack() {
    router.push("/admin/products").catch((err) => {
      console.log(err);
    });
  }

  function deleteProduct() {
    axios
      .delete("/api/products?id=" + id)
      .then(() => {
        router.push("/admin/products").catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <AdminLayout>
      <main className="p-10">
        <h1 className="text-lg font-semibold md:text-2xl">
          Do you really want to delete product with id: {id}
        </h1>
        <Button onClick={deleteProduct}>Yes</Button>
        <Button onClick={goBack}>No</Button>
      </main>
    </AdminLayout>
  );
}
