import { useLocation } from "react-router";
import CustomHead from "~/components/CustomHead";

export default function ContactPage() {
  const location = useLocation();
  return (
    <>
      <CustomHead
        title={`Две Трети | Контакт`}
        description={`Онлайн магазин за дрехи втора употреба | контакти`}
        image={`/b.webp?height=800&width=1600`}
        link={`${location.pathname}`}
        type="web"
        domain={`${location.pathname}`}
      />
      <main className="m-auto flex w-[90%] flex-col items-center justify-center bg-white py-16 dark:bg-slate-900 md:w-full">
        <section className="w-full max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-slate-900 dark:text-white">
            Свържете се с нас
          </h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label
                  className="mb-1 text-slate-600 dark:text-slate-400"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="rounded-md bg-slate-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-800 dark:text-white"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-slate-600 dark:text-slate-400"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="rounded-md bg-slate-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-800 dark:text-white"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-slate-600 dark:text-slate-400"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="rounded-md bg-slate-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-800 dark:text-white"
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                />
              </div>
              <button
                className="rounded-md bg-slate-900 px-6 py-3 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
                type="submit"
              >
                Submit
              </button>
            </form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Contact Information
                </h2>
                <div className="flex flex-col gap-2 text-slate-600 dark:text-slate-400">
                  <p>123 Main Street</p>
                  <p>Anytown, USA 12345</p>
                  <p>Phone: (123) 456-7890</p>
                  <p>Email: info@example.com</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Business Hours
                </h2>
                <div className="flex flex-col gap-2 text-slate-600 dark:text-slate-400">
                  <p>Monday - Friday: 9am - 5pm</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
