/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0vL2DADddLt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sidebar } from "~/components/Sidebar";
import { Header } from "~/components/Header";
import { AddProduct } from "~/components/AddProduct";

export default function Component() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex-1 bg-gray-100/40 dark:bg-gray-800/40">
        <Header />
        <main className="p-4">
          <AddProduct />
        </main>
      </div>
    </div>
  );
}
