import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react"; // ✅ صح
import { authContext } from "../AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { storeType } from "@/types/store.type";
interface storesContextTpe {
  getAllStores: () => Promise<void>;
  deleteStore: (storeId: string) => Promise<void>;
  updateStore: (storeId:string,bodyData: storeType) => Promise<void>;
  createStore: (bodyData: storeType) => Promise<void>;
  stores: storeType[] | null;
}
export const storesContext = createContext<storesContextTpe>({
  getAllStores: async () => {},
  deleteStore: async () => {},
  updateStore: async () => {},
  createStore: async () => {},
  stores: null,
});

export default function StoresContextSupply({
  children,
}: {
  children: ReactNode;
}) {
  const { token } = useContext(authContext); // getCheckout on stripe
  const [stores, setStores] = useState<storeType[] | null>(null);

  // get All stores function
  async function getAllStores() {
    try {
      const options = {
        url: "https://republic-backend.vercel.app/stores",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setStores(data.data.data);
      }
    } catch (err) {
      let errorMessage = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage);
    }
  }
  // delete specefic store function
  async function deleteStore(storeId: string) {
    const loadingToast = toast.loading("جاري حذف المتجر");
    try {
      const options = {
        url: `https://republic-backend.vercel.app/stores/${storeId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم حذف المتجر");
        getAllStores();
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
  async function updateStore(storeId:string,bodyData: storeType) {
    const loadingToast = toast.loading("جاري تحديث البيانات");
    try {
      const options = {
        url: `https://republic-backend.vercel.app/stores/${storeId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: bodyData,
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم تحديث بيانات المتجر بنجاح");
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
  // create new store function
  
async function createStore(bodyData: storeType) {
    const loadingToast = toast.loading("جاري انشاء المتجر");
    try {
      const options = {
        url: `https://republic-backend.vercel.app/stores`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: bodyData
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم انشاء المتجر بنجاح");
    
        getAllStores();
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
    <storesContext.Provider
      value={{
        getAllStores,
        createStore,
        deleteStore,
        updateStore,
        stores,
      }}
    >
      {children}
    </storesContext.Provider>
  );
}
