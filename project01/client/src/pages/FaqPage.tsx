import { Input } from "~/components/ui/input";

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Често задавани въпроси</h1>
        <p className="text-gray-500">
          Получете отговори на най-често задаваните въпроси за нашите продукти и доставка.
        </p>
      </div>
      <div className="mb-8">
        <Input
          className="w-full max-w-md"
          onChange={undefined}
          placeholder="Search FAQs"
          value={undefined}
        />
      </div>
      <div className="space-y-4" />
    </main>
  );
}
