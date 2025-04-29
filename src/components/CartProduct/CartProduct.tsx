"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import testImg from "../../../public/imgs/433964272_900878548506273_1143103208391292958_n.jpg";

import { FaShoppingBasket } from "react-icons/fa";

import { Item } from "@/types/responseTypes";
import { CartContex } from "@/context/cartContext/cartContext";
import SizeAndCoice from "../SizeAndChoice/SizeAndCoice";
type props = {
  productCart: Item;
};
export default function CartProduct({ productCart }: props) {
  //  state
  const [quantity, setQuantity] = useState<number>(productCart.quantity);
  // const [ setSize] = useState<string>("");
  const { removeProdcut, addProductToCart } = useContext(CartContex);
  const [size, setSize] = useState<string>(productCart.size);
  const [choice, setChoice] = useState<string>(productCart.choice);
  //   function
  useEffect(() => {
    addProductToCart({
      productId: productCart.product._id,
      size,
      choice,
      quantity,
    });
  }, [size, choice]);
  function handleMinus() {
    if (quantity > 1) {
      addProductToCart({
        productId: productCart.product._id,
        size,
        choice,
        quantity: quantity - 1,
      });
      setQuantity(quantity - 1);
    }
  }
  async function removeProdcutFromCart() {
    await removeProdcut(productCart.product._id);
  }
  // return
  const handleImageCover = function () {
    if (productCart.product.imageCover) {
      return productCart.product.imageCover.startsWith("http")
        ? productCart.product.imageCover
        : `https://backend-three-nu-89.vercel.app/public/imgs/products/${productCart.product.imageCover}`;
    } else {
      return testImg;
    }
  };
  return (
    productCart.product && (
      <>
        <div className="item bg-mColor items-center rounded-md p-4 justify-between flex flex-col gap-2  md:gap-4 md:flex-row ">
          <Image
            src={handleImageCover()}
            alt="img test"
            width={200}
            height={200}
            className="h-[200px] w-[250px] md:h-[200px] md:w-[200px] object-cover"
          ></Image>
          <article className="flex gap-4 flex-row-reverse md:flex-col justify-between items-center ">
            <p className="name font-semibold capitalize text-center">
              {" "}
              {productCart.product.name}
            </p>
            <button
              className=" flex mx-auto items-center gap-2 underline  text-red-900  text-lg whitespace-nowrap"
              dir="ltr"
              onClick={() => removeProdcutFromCart()}
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
            {/* size and choice */}
            <SizeAndCoice
              setSize={setSize}
              size={size}
              choice={choice}
              setChoice={setChoice}
            />

            <div className="space-y-4">
              <div className="flex self-stretch rounded-md border border-gray-300 overflow-hidden">
                <button
                  aria-label="decreament "
                  className="bg-gray-300 px-4 py-2 "
                  onClick={() => handleMinus()}
                >
                  {" "}
                  -{" "}
                </button>
                <span className="number-product grow flex items-center justify-center font-bold p-4">
                  {quantity}
                </span>
                <button
                  aria-label="increament  "
                  className="bg-sColor text-whitep-2 px-4 py-2 "
                  onClick={() => {
                    addProductToCart({
                      productId: productCart.product._id,
                      size,
                      choice,
                      quantity: quantity + 1,
                    });
                    setQuantity(quantity + 1);
                  }}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <p className="flex flex-col  gap-1 items-center" dir="ltr">
                <span>الاجمالي</span>
                <span className="price text-sColor font-bold whitespace-nowrap px-4">
                  {" "}
                  {productCart.itemTotal}
                </span>
              </p>
            </div>
          </form>
        </div>
      </>
    )
  );
}
