import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { authContext } from "../AuthContext/AuthContext";
import categoryType, { productType } from "@/types/category.type";
import axios from "axios";
import toast from "react-hot-toast";


interface CateogryContextType {
  updateCategory: (id: string, categoryName: string) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
  getAllCategories: () => Promise<void>;
  createCategory: (categoryName: string) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, bodyData: productType, formData?: FormData) => Promise<void>;
  createProduct: (bodyData: handleProductType) => Promise<void>;
  categories: categoryType[] | null;
}

type handleProductType = {
  name: string;
  price: number | { single: number; double: number };
  description: string;
  category: string;
};

export const CateogryContext = createContext<CateogryContextType>({
  updateCategory: async () => {},
  removeCategory: async () => {},
  getAllCategories: async () => {},
  updateProduct: async () => {},
  removeProduct: async () => {},
  createCategory: async () => {},
  createProduct: async () => {},
  categories: null,
});

export default function CateogryContextSupply({
  children,
}: {
  children: ReactNode;
}) {
  const { token } = useContext(authContext);
  const [categories, setCategories] = useState<categoryType[] | null>(null);

  async function getAllCategories() {
    try {
      const { data } = await axios.get("https://backend-three-nu-89.vercel.app/categories");
      setCategories(data.data.data);
    } catch (err) {

      let errorMessage = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage);
    }
  }

  async function createCategory(categoryName: string) {
    const loadingToast = toast.loading("جاري انشاء الفئة");
    try {
      const { data } = await axios.post(
        "https://backend-three-nu-89.vercel.app/categories",
        { categoryName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم انشاء الفئة بنجاح");
        getAllCategories();
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

  async function updateCategory(id: string, categoryName: string) {
    const loadingToast = toast.loading("جاري تعديل الفئة");
    try {
      const { data } = await axios.patch(
        `https://backend-three-nu-89.vercel.app/categories/${id}`,
        { categoryName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم تعديل الفئة بنجاح");
        getAllCategories();
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

  async function removeCategory(id: string) {
    const loadingToast = toast.loading("جاري مسح الفئة");
    try {
      const { data } = await axios.delete(
        `https://backend-three-nu-89.vercel.app/categories/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم مسح الفئة بنجاح");
        getAllCategories();
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

  function handleImageUpload(bodyData: handleProductType, formData?: FormData): FormData {
    const data = new FormData();

    Object.keys(bodyData).forEach((key) => {
      if (key === "price" && typeof bodyData.price === "object") {
        data.append("single", bodyData.price.single.toString());
        data.append("double", bodyData.price.double.toString());
      } else {
        data.append(key, (bodyData as any)[key].toString());
      }
    });

    if (formData) {
      const image = formData.get("imageCover");
      if (image) {
        data.append("imageCover", image);
      }
    }

    return data;
  }

  async function createProduct(bodyData: handleProductType) {
    const loadingToast = toast.loading("جاري انشاء المنتج");
    try {
      const options = {
        url : "https://backend-three-nu-89.vercel.app/products",
        method: "POST",
        headers: {  Authorization: `Bearer ${token}` },
        data: bodyData,
      }
      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم انشاء المنتج بنجاح");
        getAllCategories();
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

  async function removeProduct(id: string) {
    const loadingToast = toast.loading("جاري حذف المنتج");
    try {
      const { data } = await axios.delete(
        `https://backend-three-nu-89.vercel.app/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم حذف المنتج بنجاح");
        getAllCategories();
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

  async function updateProduct(id: string, bodyData: handleProductType, formData?: FormData) {
    const loadingToast = toast.loading("جاري تعديل المنتج");
    try {
      const dataToSend = formData ? handleImageUpload(bodyData, formData) : bodyData;
      const options = {
        url : `https://backend-three-nu-89.vercel.app/products/${id}`,
        method: "PATCH",
        headers: {  Authorization: `Bearer ${token}` },
        data: dataToSend,
      } 
      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم تعديل المنتج بنجاح");
        getAllCategories();
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
    <CateogryContext.Provider
      value={{
        categories,
        getAllCategories,
        updateCategory,
        removeCategory,
        updateProduct,
        removeProduct,
        createCategory,
        createProduct,
      }}
    >
      {children}
    </CateogryContext.Provider>
  );
}
