"use client";

import { unprotectedRoutes, testCredientials } from "@/constants/auth";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

type Role = "student" | "instructor";

const contextInitialValue = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  email: testCredientials.email,
  password: testCredientials.password,
  role: "instructor" as Role,
  setRole: () => {},
};

type ContextValue = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  email: string;
  password: string;
  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
};

const AuthContext = createContext<ContextValue>(contextInitialValue);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContextProvider = function ({ children }: AuthContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>("instructor");

  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(
    function () {
      if (isLoggedIn) {
        if (pathname === "/") {
          router.push("/dashboard");
        }
      } else {
        if (!unprotectedRoutes.includes(pathname)) {
          router.push("/");
        }
      }
    },
    [isLoggedIn, pathname, router],
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        email: contextInitialValue.email,
        password: contextInitialValue.password,
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = function () {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("This component doesn't have access to the auth context");
  }
  return authContext;
};
