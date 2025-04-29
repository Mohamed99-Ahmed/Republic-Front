"use client";
import OrderShape from "@/components/OrderShape/OrderShape";
import { orderContext } from "@/context/OrderContext/orderContext";
import Link from "next/link";
import { useContext, useEffect } from "react";
export default function Orders() {
  const { orders, getAllOrders } = useContext(orderContext); // get all orders from context
  // get all orders when page load
  useEffect(() => {
    getAllOrders();
  }, []);
  // if change orderes rerender component
  useEffect(() => {}, [orders]);
  return (
    <>
      {/* if no order here display this div */}

      {/* if have more than 0 order display this div */}
      <div className="grid   gap-12">
        {orders ? (
          orders.map((order) => {
            return <OrderShape key={order._id} order={order} />;
          })
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
    </>
  );
}
