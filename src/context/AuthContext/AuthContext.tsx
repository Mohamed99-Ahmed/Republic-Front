"use client"
import React, { createContext, ReactNode } from "react";
import Cookies from "js-cookie";

export const authContext = createContext({});
export default function AuthContext({ children }: { children: ReactNode }) {
    // const [token, setToken] = useState<string>("");
    function putTokenCookie(token:string){
        Cookies.set('token', token, { expires: 7 })
        localStorage.setItem("token",token)
    }
  return <authContext.Provider value={{putTokenCookie}}>{children}</authContext.Provider>;
}
