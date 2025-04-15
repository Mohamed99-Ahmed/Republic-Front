import React, { ReactNode, useContext } from "react";
import { createContext } from "react"; // ✅ صح
import { authContext } from "../AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
// import Stripe from "stripe";
interface OrderContextType {
  getCheckOut: (cartId: string) => Promise<void>;
}
export const orderContext = createContext<OrderContextType>({
  getCheckOut: async () => {},
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
  return (
    <orderContext.Provider value={{ getCheckOut }}>
      {children}
    </orderContext.Provider>
  );
}
