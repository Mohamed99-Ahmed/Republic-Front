"use client";
import React, { createContext, ReactNode, useContext } from "react";
import { authContext } from "../AuthContext/AuthContext";
import { CartType } from "@/types/responseTypes";
import axios from "axios";
import toast from "react-hot-toast";
type AddProduct = {
  size:string, productId:string, quantity:number, description? : string,choice:string
}
interface CartContextType {
  addProductToCart: (arg: AddProduct) => Promise<void>;
  getMyCart: () => Promise<void>;
  clearCart: () => Promise<void>;
  getAllCarts: () => Promise<void>;
  removeProdcut: (productCart: string) => Promise<void>;
  carts: CartType[] | null;
  mycart: CartType | null;
}

export const CartContex = createContext<CartContextType>({
  addProductToCart: async () => {},
  getMyCart: async () => {},
  removeProdcut: async () => {},
  clearCart: async () => {},
  getAllCarts: async () => {},
  carts: null,
  mycart: null,
});

export default function CartContext({ children }: { children: ReactNode }) {
  // states
  const { token } = useContext(authContext);
  const [carts, setCarts] = React.useState<CartType[] | null>(null);
  const [mycart, setMyCart] = React.useState<CartType | null>(null);

  // get All carts function
  async function getAllCarts() {
    try {
      const options = {
        url: "https://backend-three-nu-89.vercel.app/cart/allCarts",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setCarts(data.data.data);
      }
    } catch (err) {
      console.log(err);
      
    }
  }
  // get myCart function
  async function getMyCart() {
    try {
      const options = {
        url: "https://backend-three-nu-89.vercel.app/cart",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setMyCart(data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // add product to cart function
  async function addProductToCart(bodyData:AddProduct) {
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/cart`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data:bodyData,
        
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("تم اضافة المنتج بنجاح");
        getMyCart();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }
  // remove product from cart function
  async function removeProdcut(productId: string) {
    const loadingToast = toast.loading("جاري ازالة المنتج من عربة التسوق");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/cart/${productId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم ازالة المنتج بنجاح");
        getMyCart();
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
    }
  }
  // clear product function
  async function clearCart() {
    const loadingToast = toast.loading("جاري ازالة جميع المنتجات من العربة");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/cart`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم ازالة جميع المنتجات من العربة");
        getMyCart();
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
    }
  }

  return (
    <CartContex.Provider
      value={{
        addProductToCart,
        getMyCart,
        removeProdcut,
        clearCart,
        carts,
        getAllCarts,
        mycart,
      }}
    >
      {children}
    </CartContex.Provider>
  );
}
