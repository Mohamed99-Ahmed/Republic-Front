"use client";
import React, { ReactNode } from "react";
import AuthContext from "../AuthContext/AuthContext";
import CartContext from "../cartContext/cartContext";
import OrderContextSupply from "../OrderContext/orderContext";

export default function ParentContext({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthContext>
        <CartContext>
       
         <OrderContextSupply>
          {children}
          </OrderContextSupply>
          </CartContext>
      </AuthContext>
    </>
  );
}
