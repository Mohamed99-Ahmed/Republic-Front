"use client";
import CartProduct from "@/components/CartProduct/CartProduct";
import { CartContex } from "@/context/cartContext/cartContext";
import { orderContext } from "@/context/OrderContext/orderContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const { getMyCart, mycart, clearCart } = useContext(CartContex);
  const { getCheckOut, createOrderCash } = useContext(orderContext);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [typePayment, setTypePayment] = useState<string>("");
  console.log("mycart", mycart);
  useEffect(() => {
    getMyCart();
  }, []);
  // handle payment function
  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    if (isPaid && mycart) {
      if (typePayment === "viza") {
        await getCheckOut(mycart.id);
      }
      if (typePayment === "cash") {
        await createOrderCash({ cartId: mycart._id, userId: mycart.user._id });
      }
    } else {
      toast.error("من فضلك اختر طريقة الدفع");
    }
  }
  // if carts true display it and if false display loading untill data response
  return (
    <>
      <section className="bg-white py-8 antialiased  md:py-16">
        <div className="mx-auto max-w-screen-xl space-y-4 px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            عربة التسوق
          </h2>
          {mycart && mycart.items.length > 0 ? (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start lg:justify-between xl:gap-2">
              <main className="mx-auto w-full flex-none lg:max-w-2xl flex-grow-[4]">
                <div className="carts space-y-6 ">
                  {mycart.items.map((item) => {
                    return <CartProduct productCart={item} key={item._id} />;
                  })}
                  {/* add notes to order */}
                  {/* <textarea
                    name="ملاحظات"
                    id=""
                 
                    placeholder="اكتب هنا ملاحظاتك"
                    className="w-full h-20 p-3 text-right text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sColor focus:border-sColor placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out resize-none"
                  ></textarea> */}
                  <button
                    onClick={() => clearCart()}
                    className="clear mt-4 text-center cursor-pointer"
                  >
                    <span className="btn text-sColor text-xl underline">
                      ازالة الكل
                    </span>
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
                          {mycart.totalPrice} EGY
                        </dd>
                      </dl>
                    </div>
                    <form onSubmit={(e) => handlePayment(e)}>
                      <header className="flex items-center mb-4 justify-between gap-4">
                        <input
                          type="radio"
                          name="payment"
                          onChange={() => {
                            setTypePayment("viza");
                            setIsPaid(true);
                          }}
                          id="viza"
                          className="w-4 h-4 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
                        />
                        <label htmlFor="viza"> فيزا</label>
                        <input
                          type="radio"
                          name="payment"
                          onChange={() => {
                            setTypePayment("cash");
                            setIsPaid(true);
                          }}
                          id="cash"
                          className="w-4 h-4 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
                        />
                        <label htmlFor="cash"> كاش</label>
                      </header>
                      <button
                        className={`flex ${
                          isPaid
                            ? "bg-sColor "
                            : "bg-gray-500 cursor-not-allowed"
                        } cursor-pointer hover:opacity-80 transition-opacity duration-1000 w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 `}
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
                    </form>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="border border-sColor p-8 ">
              لا يوجد منتجات في العربة الذهاب الي
              <Link
                href="/"
                className="text-sColor underline uppercase text-lg "
              >
                <span className="mx-2">الصفحة الرئيسية</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
