"use client";
import React, { createContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  // Add other auth-related properties here if needed
}

export const authContext = createContext<AuthContextType>({
  token: null,
});

export default function AuthContext({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
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
    <authContext.Provider value={{ putTokenCookie, logOut, logIn, token }}>
      {children}
    </authContext.Provider>
  );
}
