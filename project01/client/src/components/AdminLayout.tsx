import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useSizeLTMd } from "~/hooks/useScreenSize";

export default function AdminLayout() {
  const isMDOrLess = useSizeLTMd();
  return (
    <div className="flex h-full min-h-full flex-col">
      <div className="grid h-full w-full border-t lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="max-w-screen flex flex-col">
          {isMDOrLess && <Header />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
