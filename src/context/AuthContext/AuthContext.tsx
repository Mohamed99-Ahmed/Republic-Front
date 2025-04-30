"use client";
import React, { createContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { forgetPasswordType, loginType, payload, resetPasswordType, submitType } from "@/types/auth";
import axios from "axios";
import toast from "react-hot-toast";

interface AuthContextType {
  token: string | undefined;
  payload: payload | null;
  logOut: () => void;
  signUp: (bodyData:submitType) => Promise<void>;
  logIn: (bodyData:loginType) => Promise<void>;
  forgetPassword: (bodyData:forgetPasswordType) => Promise<void>;
  putTokenCookie: (token:string) => void;
  resetPassword: (bodyData:resetPasswordType) => void;
}

export const authContext = createContext<AuthContextType>({
  token: undefined,
  payload: null ,
  logOut: () => {},
  putTokenCookie: () => {},
  signUp:  async () => {},
  logIn:  async () => {},
  forgetPassword:  async () => {},
  resetPassword:  async () => {},
});

export default function AuthContext({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
  let payload = null;
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
   // signUp function
   async function signUp(bodyData:submitType) {
    const loadingToast = toast.loading("جاري انشاء حساب");
    console.log(bodyData);
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/users/signup`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data : bodyData,
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم انشاء الاوردر بنجاح");
        router.push("./login");
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
    }
  }
  // logikn function
  async function logIn(bodyData:loginType) {
    const loadingToast = toast.loading("جاري تسجيل الدخول");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/users/login`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data : bodyData,
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم تسجيل دخولك بنجاح");
        putTokenCookie(data.token);
        router.push("./");
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error(err.response.data.message);
    }
  }
  // forgetPassword function
   // logikn function
   async function forgetPassword(bodyData:forgetPasswordType) {
    const loadingToast = toast.loading("جاري تحميل بيناتك");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/users/forgetPassword`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data : bodyData,
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم ارسال كود الي الايميل");
        putTokenCookie(data.token);
        router.push("./resetPassword");
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error(err.response.data.message);
    }
  }
  // resetPassword function
  async function resetPassword(bodyData:resetPasswordType) {
    const loadingToast = toast.loading("جاري اعادة تغيير كلمة المرور");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/users/resetPassword/${bodyData.token}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data : bodyData,
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم تغيير كلمة المرور بنجاح");
        putTokenCookie(data.token);
        router.push("./login");
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error(err.response.data.message);
    }
  }

  return (
    <authContext.Provider
      value={{ putTokenCookie,signUp, logOut, logIn,forgetPassword,resetPassword, token, payload }}
    >
      {children}
    </authContext.Provider>
  );
}
