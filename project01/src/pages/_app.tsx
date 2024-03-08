import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "@uploadthing/react/styles.css";
import "~/styles/globals.css";
import { CartContextProvider } from "~/components/CartContextProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </SessionProvider>
  );
};

export default MyApp;
