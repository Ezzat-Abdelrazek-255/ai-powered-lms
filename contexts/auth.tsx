"use client";

import { unprotectedRoutes, testCredientials } from "@/constants/auth";
import { useLocalStorage } from "@uidotdev/usehooks";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useLayoutEffect,
} from "react";

const contextInitialValue = {
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  email: testCredientials.email,
  password: testCredientials.password,
};

type ContextValue = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  email: string;
  password: string;
};

const AuthContext = createContext<ContextValue>(contextInitialValue);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContextProvider = function({ children }: AuthContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(
    function() {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = function() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("This component doesn't have access to the auth context");
  }
  return authContext;
};
