import { IndexHeader } from "./IndexHeader";
import { Footer } from "./Footer";
import { Toaster } from "./ui/toaster";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <IndexHeader />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
}
