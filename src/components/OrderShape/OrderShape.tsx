"use client";
import DeleteButton from "../DeleteButton/DeleteButton";
import { OrderType } from "../../types/responseTypes";
import ItemOrder from "../ItemOrder/ItemOrder";
import { useContext } from "react";
import { orderContext } from "@/context/OrderContext/orderContext";

type propsType = {
  order: OrderType;
  myOrder?: boolean;
};

export default function OrderShape({ order, myOrder }: propsType) {
  const { deleteOrder } = useContext(orderContext);
  console.log(order);

  return (
    <>
      <article className="container orders space-y-4 ">
        <div className="orderItem p-4 hover:border-sColor   rounded-lg  bg-gray-100  border border-gray-400 space-y-4">
          <header className="flex flex-col md:flex-row items-baseline border-b border-gray-500 pb-2  justify-between gap-4 text-nowrap">
            <div className="flex flex-wrap gap-4 items-center ">
              <h2 className="capitalize bg-white p-2 space-x-2 rounded-full font-semibold">
                <span> الاسم : </span>
                <span className="text-gray-600">{order.user.name}</span>
              </h2>
              <h2 className="capitalize bg-white p-2 space-x-2 rounded-full font-semibold">
                <span>رقم الاوردر : </span>
                <span className="text-gray-600">
                  {" "}
                  {order._id.split("").slice(-4).join("")} .....
                </span>
              </h2>
              <p className="createdAt text-gray-600">
                {/* {order.createdAt.split("").slice(0, 10).join("")} */}
                {new Date(order.createdAt).toLocaleDateString("ar-EG")}
              </p>
            </div>
            <div className="flex  gap-3 self-end md:self-center ">
              {!myOrder && (
                <DeleteButton onClick={() => deleteOrder(order._id)}>
                  ازالة
                </DeleteButton>
              )}
            </div>
          </header>
          <main className="grid md:grid-cols-3  lg:grid-cols-4 gap-4">
            {order.cart &&
            // products
              order.cartCopy.items.map((item) => {
                return <ItemOrder key={item._id} item={item} />;
              })}
          </main>
          <footer className="border-t flex  flex-wrap gap-4 flex-col md:flex-row justify-between items-center pt-4 border-gray-500 text-nowrap ">
            {/* total price  */}
            <h3 className="text-lg font-medium capitalize">
              اجمالي السعر :
              <span className="text-sColor text-xl ml-4">{order.price}</span>
            </h3>
            {/* paid method */}
            <p className="text-lg font-medium capitalize ">
              طريقة الدفع :
              <span className="uppercase text-sColor ml-4">
                {order.paid ? "فيزا" : "كاش"}
              </span>
            </p>
            {/* paid and arrived */}
            <div className="space-x-3">
              {order.paid ? (
                <span className="rounded-full bg-sColor p-3 text-white capitalize">
                  مدفوع
                </span>
              ) : (
                <span className="rounded-full bg-gray-400 p-3  capitalize">
                  غير مدفوع
                </span>
              )}
              {true ? (
                <span className="rounded-full bg-white p-3 capitalize">
                  وصل
                </span>
              ) : (
                <span className="rounded-full bg-red-400 p-3 text-white capitalize">
                  لم يصل
                </span>
              )}
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
