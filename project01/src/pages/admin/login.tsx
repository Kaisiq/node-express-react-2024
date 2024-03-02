import Head from "next/head";
import LoginForm from "~/components/LoginForm";

export default function AdminLogin() {
  return (
    <>
      <Head>
        <title>2/3 Login</title>
        <meta name="description" content="second hand shop 2/3 login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <LoginForm />
      </main>
    </>
  );
}
