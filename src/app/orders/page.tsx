"use client";
import OrderShape from "@/components/OrderShape/OrderShape";
import { orderContext } from "@/context/OrderContext/orderContext";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

export default function Orders() {
  const { getMyOrders, userOrders } = useContext(orderContext); // get all orders from context
  // get all orders when page load
  useEffect(() => {
    getMyOrders();

  }, []);
  // if change orderes rerender component
  useEffect(() => {    }, [userOrders]);
  return (
    <div className="grid   gap-12">
      {userOrders ? (
        userOrders
          .map((order) => {
            return <OrderShape myOrder={true} key={order._id} order={order} />;
          }).reverse() // reverse order to show the latest order first

      ) : (
        <div className="border border-sColor p-8 ">
          لا يوجد اوردرات
          <Link
            href="/cart"
            className="text-sColor underline uppercase text-lg "
          >
            عربة التسوق
          </Link>
        </div>
      )}
    </div>
  );
}
