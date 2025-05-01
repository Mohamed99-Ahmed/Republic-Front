import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react"; // ✅ صح
import { authContext } from "../AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "@/types/responseTypes";
interface userContextTpe {
  getAllUsers: () => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  updateMe: (bodyData: User) => Promise<void>;
  users: User[] | null;
}
export const userContext = createContext<userContextTpe>({
  getAllUsers: async () => {},
  deleteUser: async () => {},
  updateMe: async () => {},
  users: null,
});

export default function UserContextSupply({
  children,
}: {
  children: ReactNode;
}) {
  const { token } = useContext(authContext); // getCheckout on stripe
  const [users, setUsers] = useState<User[] | null>(null);

  // get All users function
  async function getAllUsers() {
    try {
      const options = {
        url: "https://backend-three-nu-89.vercel.app/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setUsers(data.data.data);
      }
    } catch (err) {
      let errorMessage = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage);
    }
  }
  // delete specefic user function
  async function deleteUser(userId: string) {
    const loadingToast = toast.loading("جاري حذف المستخدم");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/users/${userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم حذف المستخدم");
        getAllUsers();
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      let errorMessage = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage);
    }
  }
  //   udpate Me
  async function updateMe(bodyData: User) {
    const loadingToast = toast.loading("جاري تحديث بياناتك");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/users/updateMe`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: bodyData,
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم تحديث بياناتك بنجاح");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      let errorMessage = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage);
    }
  }

  return (
    <userContext.Provider
      value={{
        getAllUsers,
        deleteUser,
        updateMe,
        users,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
