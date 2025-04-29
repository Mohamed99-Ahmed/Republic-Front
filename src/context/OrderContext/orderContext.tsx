import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react"; // ✅ صح
import { authContext } from "../AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { OrderType } from "../../types/responseTypes";
import { CartContex } from "../cartContext/cartContext";
// import Stripe from "stripe";
interface OrderContextType {
  getCheckOut: (cartId: string) => Promise<void>;
  getAllOrders: () => Promise<void>;
  getMyOrders: () => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  createOrderCash: (bodyData: {
    cartId: string;
    userId: string;
  }) => Promise<void>;
  orders: OrderType[] | null;
  userOrders: OrderType[] | null;
}
export const orderContext = createContext<OrderContextType>({
  getCheckOut: async () => {},
  getAllOrders: async () => {},
  getMyOrders: async () => {},
  deleteOrder: async () => {},
  createOrderCash: async () => {},
  orders: null,
  userOrders: null,
});
const stripePromise = loadStripe(
  "pk_test_51RAl922QW4k1617z4iWyWSQMFobW8EWI5sRkDnby94cVtggriK7ZRA3YRATTbjoZnQnF1BuPP52og92KzsHAyfUv00waMWu6Zo"
);
export default function OrderContextSupply({
  children,
}: {
  children: ReactNode;
}) {
  const { token } = useContext(authContext); // getCheckout on stripe
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const [userOrders, setUserOrders] = useState<OrderType[] | null>(null);
  const { getMyCart } = useContext(CartContex);
  // get my orders function
  // get All orders function
  async function getMyOrders() {
    try {
      const options = {
        url: "https://backend-three-nu-89.vercel.app/order/myOrders",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setUserOrders(data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // get Checkout function
  async function getCheckOut(cartId: string) {
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/order/checkout-session/${cartId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const session = await axios.request(options);
      console.log(session);
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: session.data.session.id,
      });
    } catch (err) {
      toast.error(err);
    }
  }
  // get All orders function
  async function getAllOrders() {
    try {
      const options = {
        url: "https://backend-three-nu-89.vercel.app/order/allOrders",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setOrders(data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // delete order function
  async function deleteOrder(orderId: string) {
    const loadingToast = toast.loading("جاري حذف الطلب");
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/order/${orderId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم حذف الطلب بنجاح");
        getAllOrders();
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
    }
  }
  // create order if he paid cash
  async function createOrderCash(bodyData: { cartId: string; userId: string }) {
    const loadingToast = toast.loading("جاري انشاء اوردر");
    console.log(bodyData);
    try {
      const options = {
        url: `https://backend-three-nu-89.vercel.app/order`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          cart: bodyData.cartId,
          user: bodyData.userId,
        },
      };
      console.log(bodyData);
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("تم انشاء الاوردر بنجاح");
        getMyCart();
        getMyOrders();
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      // toast.error(err.message || "An error occurred");
    }
  }
  return (
    <orderContext.Provider
      value={{
        getCheckOut,
        orders,
        getAllOrders,
        getMyOrders,
        userOrders,
        deleteOrder,
        createOrderCash,
      }}
    >
      {children}
    </orderContext.Provider>
  );
}
