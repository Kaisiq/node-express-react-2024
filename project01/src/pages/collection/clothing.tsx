/**
 * v0 by Vercel.
 * @see https://v0.dev/t/w9VqQyJzXZS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { IndexHeader } from "../IndexHeader";
import { ClothingSlotsList } from "./ClothingSlotsList";

export default function Component() {
  return (
    <>
      <IndexHeader />
      <section className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-6 md:gap-8 md:py-12 lg:grid-cols-3">
        <ClothingSlotsList />
      </section>
    </>
  );
}
