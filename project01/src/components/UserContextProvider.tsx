import { type ReactNode, createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router";
import { AuthService } from "~/services/AuthService";

interface UserContextType {
  isAdmin: boolean;
  user: string;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  checkForAdmin: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  isAdmin: false,
  user: "",
  setIsAdmin: () => {}, // eslint-disable-line
  checkForAdmin: async () => {}, // eslint-disable-line
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const authService = new AuthService();
  const location = useLocation();

  useEffect(() => {
    if (isAdmin) return;
    checkForAdmin().catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    async function isValidSession() {
      try {
        const result = await authService.getUser();
        result ? setUser(result) : setUser("");
      } catch (err) {
        setUser("");
      }
    }

    isValidSession().catch((err) => console.log(err));
  }, [localStorage, location]);

  async function checkForAdmin() {
    const user = await authService.getUser();
    if (!user) {
      console.error("No session:", user);
      setIsAdmin(false);
      return;
    }
    const adminBool = await authService.isAdmin();
    setIsAdmin(adminBool);
    return;
  }
  return (
    <UserContext.Provider value={{ isAdmin, user, setIsAdmin, checkForAdmin }}>
      {children}
    </UserContext.Provider>
  );
}
