"use client";
import React, { createContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { payload } from "@/types/auth";

interface AuthContextType {
  token: string | undefined;
  payload: string | JwtPayload | null;
  logOut: () => void;
  logIn: () => void;
  putTokenCookie: (token:string) => void;
}

export const authContext = createContext<AuthContextType>({
  token: undefined,
  payload: null,
  logOut: () => {},
  logIn: () => {},
  putTokenCookie: () => {},
});

export default function AuthContext({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
  let payload: payload ;
  if (token) {
    payload = jwtDecode(token);
  }

  // function to setToken in cookies
  function putTokenCookie(token: string) {
    Cookies.set("token", token, { expires: 7 });
    setToken(token);
  }
  function logOut() {
    Cookies.remove("token");
    setToken("");
    router.push("/login");
  }
  function logIn() {
    router.push("/login");
  }
  return (
    <authContext.Provider
      value={{ putTokenCookie, logOut, logIn, token, payload }}
    >
      {children}
    </authContext.Provider>
  );
}
