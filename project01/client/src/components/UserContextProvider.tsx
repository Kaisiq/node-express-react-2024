import { type ReactNode, createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router";
import { AdminType } from "~/models/User";
import { AuthService } from "~/services/AuthService";

interface UserContextType {
  userType: AdminType;
  user: string;
  setUserType: Dispatch<SetStateAction<AdminType>>;
  checkForAdmin: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  userType: AdminType.User,
  user: "",
  setUserType: () => {}, // eslint-disable-line
  checkForAdmin: async () => {}, // eslint-disable-line
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<AdminType>(AdminType.User);
  const [user, setUser] = useState<string>("");
  const authService = new AuthService();
  const location = useLocation();

  useEffect(() => {
    async function isValidSession() {
      try {
        const result = await authService.getUser();
        if (!result) {
          setUser("");
          return;
        }
        setUser(result);
        checkForAdmin().catch((err) => console.log(err));
      } catch (err) {
        setUser("");
      }
    }

    isValidSession().catch((err) => console.log(err));
  }, [location, authService, checkForAdmin]);

  async function checkForAdmin() {
    const user = await authService.getUser();
    if (!user) {
      console.error("No session:", user);
      setUserType(AdminType.User);
      return;
    }
    const accountType = await authService.isAdmin();
    setUserType(accountType);
    return;
  }
  return (
    <UserContext.Provider value={{ userType, user, setUserType, checkForAdmin }}>
      {children}
    </UserContext.Provider>
  );
}
