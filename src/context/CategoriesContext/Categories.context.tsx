import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react"; // ✅ صح
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
  updateProduct: (id: string, bodyData: productType, formData?:FormData) => Promise<void>;
  createProduct: ( bodyData: productType) => Promise<void>;
  categories: categoryType[] | null;
}

type handleProductType = {
  name: string;
  price: number | { single: number; double: number };
  description: string;
  category:string
}
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
  
  const { token } = useContext(authContext); // getCheckout on stripe
  const [categories, setCategories] = useState(null);
  // get all categories function
  async function getAllCategories() {
    try {
      const options = {
        url: "https://backend-three-nu-89.vercel.app/categories",
        method: "GET",
      };
      const { data } = await axios.request(options);
      console.log(data.data.data);
      setCategories(data.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  // create Category function

  async function createCategory(categoryName: string) {
    const loadingToast = toast.loading("جاري انشاء الفئة");
    try {
      const options = {
        url: "https://backend-three-nu-89.vercel.app/categories",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          categoryName,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم انشاء الفئة بنجاح");
        getAllCategories();
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
    }
  }
  // udpate specific category function
  async function updateCategory(id: string, categoryName: string) {
    const loadingToast = toast.loading("جاري تعديل المنتج");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/categories/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          categoryName,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم تعديل المنتج بنجاح");
        getAllCategories();
      }
    } catch (err ) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error( err.response.data.message);    
  }
  //   REMOVE category function
  async function removeCategory(id: string) {
    const loadingToast = toast.loading("جاري مسح الفئة");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/categories/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        getAllCategories();
        toast.success("تم مسح بنجاح");
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
    }
  }

  // function to handle image upload
  function handleImageUpload(bodyData: handleProductType, formData?: FormData) {
    const data = new FormData();
    
    // Add all bodyData fields to FormData
    Object.keys(bodyData).forEach(key => {
      data.append(key, bodyData[key]);
    });
    
    // Add image if formData is provided
    if (formData) {
      for (const [key, value] of formData.entries()) {
        data.append(key, value);
      }
    }
    
    return data;
  }
  
  async function updateProduct(id: string, bodyData: handleProductType, formData?: FormData) {
    const loadingToast = toast.loading("جاري تعديل المنتج");
    try {
      const data = handleImageUpload(bodyData, formData);
  
      const options = {
        url: `https://backend-three-nu-89.vercel.app/products/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data
      };
  
      const { data: response } = await axios.request(options);
      if (response.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم تعديل المنتج بنجاح");
        getAllCategories();
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "حدث خطأ أثناء تعديل المنتج");
    }
  }
  //   REMOVE product fst);
        console.log("reupnseDana", dataction
  async function removeProduct(id: string) {
    consconsole.log("formDttl", formDaaa);
   d    ingToast = toast.loading("جاري حذف الفئة");
    try {
      const options = {
        url: `https://backeders: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم مسح بنجاح");
        getAllCategories();
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
    }
  }
  //  CREATE product function
  async function createProduct(
    bodyData: handleProductType,
  ) {
    const loadingToast = toast.loading("جاري انشاء المنتج");
   

    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/products`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data:bodyData
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم انشاء المنتج بنجاح");
        getAllCategories();
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      // toast.error(err);
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
}