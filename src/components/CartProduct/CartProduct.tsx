"use client";
import Image from "next/image";
import React, { useState } from "react";
import testImg from "../../../public/imgs/433964272_900878548506273_1143103208391292958_n.jpg";

import { FaShoppingBasket } from "react-icons/fa";

export default function CartProduct() {
  //  state
  const [quantity, setQuantity] = useState<number>(0);
  const [size, setSize] = useState<string>("");

  //   function
  function handleMinus() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  // return
  return (
    <>
      <div className="item bg-mColor items-center rounded-md p-4 justify-between flex flex-col gap-2  md:gap-4 md:flex-row ">
        <Image
          src={testImg}
          alt="img test"
          className="  h-[200px] md:h-[200px] md:w-[200px] object-cover "
        ></Image>
        <article className="flex gap-4 flex-row-reverse md:flex-col justify-between items-center ">
          <p className="name font-semibold capitalize text-center">
            {" "}
            worldware Bruger
          </p>
          <button
            className=" flex mx-auto items-center gap-2 underline  text-red-900  text-lg whitespace-nowrap"
            dir="ltr"
          >
            ازالة
            <FaShoppingBasket className=" font-semibold underline" />
          </button>
        </article>

        {/* Form to select size and quantity of item*/}
        <form
          dir="ltr"
          className="flex flex-col md:flex-row-reverse gap-4 items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <main className="space-y-2">
            <div className="size">
              <h4 className="text-sColor font-bold">size</h4>
              <div className="flex justify-between items-center gap-3">
                <div
                  className="size-single flex items-center  gap-2"
                  onClick={() => setSize("single")}
                >
                  <input
                    type="radio"
                    name="size"
                    id="single"
                    className="h-5 w-5 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
                  />
                  <label htmlFor="single" className="text-lg">
                    single
                  </label>
                </div>
                <div
                  className="size-item flex items-center  gap-2"
                  onClick={() => setSize("double")}
                ></div>
                <input
                  type="radio"
                  name="size"
                  id="double"
                  className="h-5 w-5 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
                />
                <label htmlFor="double" className="text-lg">
                  double
                </label>
              </div>
            </div>
            <div className="choice">
              <h4 className="text-sColor font-bold">choice</h4>
              <div className="flex justify-between items-center gap-3">
                <div className="size-item flex items-center  gap-2">
                  <input
                    type="radio"
                    name="choice"
                    id="regualr"
                    className="h-5 w-5 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
                  />
                  <label htmlFor="regualr" className="text-lg">
                    regualr
                  </label>
                </div>
                <div className="size-item flex items-center  gap-2"></div>
                <input
                  type="radio"
                  name="choice"
                  id="spicy"
                  className="h-5 w-5 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
                />
                <label htmlFor="spicy" className="text-lg">
                  spicy
                </label>
              </div>
            </div>
          </main>

          <div className="space-y-4">
            <textarea
              name="ملاحظات"
              id=""
              placeholder="اكتب هنا ملاحظاتك"
              className="w-full h-20 p-3 text-right text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sColor focus:border-sColor placeholder-gray-400 shadow-sm transition-all duration-300 ease-in-out resize-none"
            ></textarea>

            <div className="flex self-stretch rounded-md border border-gray-300 overflow-hidden">
              <button
                aria-label="decreament "
                className="bg-gray-300 px-4 py-2 "
                onClick={() => handleMinus()}
              >
                {" "}
                -{" "}
              </button>
              <span className="number-product grow flex items-center justify-center font-bold">
                {quantity}
              </span>
              <button
                aria-label="increament  "
                className="bg-sColor text-whitep-2 px-4 py-2 "
                onClick={() => setQuantity(quantity + 1)}
              >
                {" "}
                +{" "}
              </button>
            </div>
            <p className="flex flex-col  gap-1 items-center" dir="ltr">
              <span>الاجمالي</span>
              <span className="price text-sColor font-bold whitespace-nowrap">
                {" "}
                250 Egy
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
