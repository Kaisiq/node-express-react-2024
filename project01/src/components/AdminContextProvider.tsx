// import { getSession } from "next-auth/react";
import { type ReactNode, createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { getUser } from "~/services/UserServie";
import { AuthService } from "~/services/AuthService";

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  checkForAdmin: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  setIsAdmin: () => {}, // eslint-disable-line
  checkForAdmin: async () => {}, // eslint-disable-line
});

export function AdminContextProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (isAdmin) return;
    checkForAdmin().catch((err) => console.log(err));
  }, []);

  async function checkForAdmin() {
    // const session = await getSession();
    const user = getUser();
    if (!user?.userEmail) {
      console.error("No session:", user);
      setIsAdmin(false);
      return;
    }
    const authService = new AuthService();
    const adminBool = await authService.isAdmin(user.userEmail);
    setIsAdmin(adminBool);
    return;
  }
  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, checkForAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}
