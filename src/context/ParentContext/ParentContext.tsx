"use client";
import React, { ReactNode } from "react";
import AuthContext from "../AuthContext/AuthContext";
import CartContext from "../cartContext/cartContext";
import OrderContextSupply from "../OrderContext/orderContext";
import CateogryContextSupply from "../CategoriesContext/Categories.context";
import UserContextSupply from "../UserContext/UserContext";
import StoresContextSupply from "../Stores/StoresContext";

export default function ParentContext({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthContext>
        <CartContext>
          <CateogryContextSupply>
            <StoresContextSupply> 
            <OrderContextSupply>
              <UserContextSupply>{children}</UserContextSupply>
            </OrderContextSupply>
            </StoresContextSupply>
          </CateogryContextSupply>
        </CartContext>
      </AuthContext>
    </>
  );
}
