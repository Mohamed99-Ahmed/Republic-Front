"use client";
import React, { ReactNode } from "react";
import AuthContext from "../AuthContext/AuthContext";
import CartContext from "../cartContext/cartContext";

export default function ParentContext({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthContext>
        <CartContext>{children}</CartContext>
      </AuthContext>
    </>
  );
}
