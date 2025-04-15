"use client";
import useAxios from "@/Hooks/useAxios";
import React, { createContext, ReactNode, useContext } from "react";
import { authContext } from "../AuthContext/AuthContext";
import { ApiResponse } from "@/types/cart.type";

interface CartContextType {
  addProductToCart: (productId: string, quantity: number) => Promise<void>;
  getCart: () => Promise<void>;
  clearCart: () => Promise<void>;
  removeProdcut: (productCart: string) => Promise<void>;
  responseData: ApiResponse | null;
  responseDataRemove: ApiResponse | null;
}

export const CartContex = createContext<CartContextType>({
  addProductToCart: async () => {},
  getCart: async () => {},
  removeProdcut: async () => {},
  clearCart: async () => {},
  responseData: null,
  responseDataRemove: null,
});

export default function CartContext({ children }: { children: ReactNode }) {
  const { token } = useContext(authContext);
  // axios config for add product to cart
  const { axiosConfig: axiosConfigAdd, setAxios: setAxiosAdd } = useAxios({
    run: false,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    toastLoading: "جاري اضافة العنصر الي عربة التسوق",
    toastSuccess: " تم اضافته بنجاح",
  });
  const {
    axiosConfig: axiosConfigRemove,
    setAxios: setAxiosRemove,
    responseData: responseDataRemove,
  } = useAxios({
    run: false,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const {
    axiosConfig: axiosConfigACart,
    setAxios: setAxiosCart,
    responseData,
  } = useAxios({
    run: false,
    url: `https://backend-three-nu-89.vercel.app/cart`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { axiosConfig: axiosConfigClear, setAxios: setAxiosClear } = useAxios({
    run: false,
    url: `https://backend-three-nu-89.vercel.app/cart`,
    toastLoading: "جاري مسح جميع المنتجات",
    toastSuccess: "تم مسح جميع المنتجات",
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // const { axiosConfig: axiosConfigAllCarts, setAxios: setAxiosAllCarts } = useAxios({
  //   run: false,
  //   url: `https://backend-three-nu-89.vercel.app/cart`,
  //   toastLoading: "جاري مسح جميع المنتجات",
  //   toastSuccess: "تم مسح جميع المنتجات",
  //   method: "DELETE",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  //get All carts

  // get cart function
  async function getCart() {
    setAxiosCart({
      ...axiosConfigACart,
      run: true,
    });
  
  }
  // Add product function
  async function addProductToCart(productId: string, quantity: number) {
    setAxiosAdd({
      ...axiosConfigAdd,
      url: `https://backend-three-nu-89.vercel.app/cart/${productId}/${quantity}`,
      run: true,
    });
  }
  // remove product function
  async function removeProdcut(productId: string) {
    console.log("remove loading")
    await (async function remove() {
      setAxiosRemove({
        url: `https://backend-three-nu-89.vercel.app/cart/${productId}`,
        ...axiosConfigRemove,
        toastLoading: "جاري ازالة المنتج من عربة التسوق",
        toastSuccess: "تم ازالة المنتج من عربة التسوق",
        run: true,
      });
    })();
    console.log("done remove")
      getCart();
      console.log("after")

  }
  // clear product function
  async function clearCart() {
    await (async function clear() {
      setAxiosClear({
        ...axiosConfigClear,
        run: true,
      });
    })();
    getCart();
  }

  return (
    <CartContex.Provider
      value={{
        addProductToCart,
        getCart,
        responseData,
        removeProdcut,
        responseDataRemove,
        clearCart,
      }}
    >
      {children}
    </CartContex.Provider>
  );
}
