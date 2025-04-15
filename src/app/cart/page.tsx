"use client";
import Button from "@/components/Button/Button";
import CartProduct from "@/components/CartProduct/CartProduct";
import { CartContex } from "@/context/cartContext/cartContext";
import {orderContext} from "@/context/OrderContext/orderContext";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function Cart() {
  const { getCart, responseData, clearCart } = useContext(CartContex);
  const { getCheckOut} = useContext(orderContext);
  useEffect(() => {
    getCart();
  }, []);

  // if carts true display it and if false display loading untill data response
  return (
    <>
      <section className="bg-white py-8 antialiased  md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            عربة التسوق
          </h2>
          {responseData?.data.data && (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start lg:justify-between xl:gap-2">
              <main className="mx-auto w-full flex-none lg:max-w-2xl flex-grow-[4]">
                <div className="carts space-y-6 ">
                  {responseData?.data?.data?.items?.map((item) => {
                    return <CartProduct productCart={item} key={item._id} />;
                  })}
                <textarea
                    name="ملاحظات"
                    id=""
                    placeholder="اكتب هنا ملاحظاتك"
                    className="w-full h-20 p-3 text-right text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sColor focus:border-sColor placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out resize-none"
                  ></textarea>
                  <button
                    onClick={() => clearCart()}
                    className="clear mt-4 text-center cursor-pointer"
                  >
                    <span className="btn text-sColor text-xl underline">ازالة الكل</span>
                  </button>
                </div>
              </main>

              <aside className="mx-auto  mt-6  space-y-6 lg:mt-0 ">
                <div className="space-y-4  rounded-lg border border-gray-200 bg-white p-4 px-16 shadow-sm ">
                  <p className="text-xl font-semibold text-gray-900 ">
                    تفاصيل الاوردر
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          اجمالي السعر
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">
                          {responseData.data.data.totalPrice} EGY
                        </dd>
                      </dl>
                    </div>
                    <button
                     onClick={()=>{
                      getCheckOut(responseData.data.data._id)
                     }}
                      className="flex bg-sColor cursor-pointer hover:opacity-80 transition-opacity duration-1000 w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                    >
                      قم بالدفع الان
                    </button>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-normal text-gray-500 ">
                        {" "}
                        او{" "}
                      </span>
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary-700  hover:no-underline "
                      >
                        <span className="underline">اضافة وجبات</span>
                        <i className="fa-solid fa-arrow-right "></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
