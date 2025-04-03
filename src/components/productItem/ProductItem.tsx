"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { IoIosExpand } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import Button from "../Button/Button";
import { productType } from "../../types/category.type";
import { BiDish } from "react-icons/bi";
import { CartContex } from "@/context/cartContext/cartContext";
// const relativeImg = require("../../../public/imgs/relativeImg.svg");
type propsType = {
  product: productType;
};
export default function ProductItem({ product }: propsType) {
  const { addProductToCart } = useContext(CartContex);
  const [addToWishList, setAddToWishList] = useState<boolean>(false);
  const [addToCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);


    // Add this new function to handle adding to cart
  function handleAddToCart(check:string) {
    let newQuantity
    if(check === "incr") {
       newQuantity = quantity + 1;
    }else if(check === "decr") {
      newQuantity = quantity - 1;
    }
    if(newQuantity){
      setQuantity(newQuantity);
      addProductToCart(product._id, newQuantity);
    }
  }
  return (
    <>
      <figure className="flex flex-col justify-between relative overflow-hidden  group/parent hover:shadow-md items-center gap-4 p-4 bg-white rounded-md hover:border hover:border-sColor">
        {product.imageCover ? (
          <Image
            alt="name of product"
            src={product.imageCover}
            className="w-full h-[300px] rounded-md object-contain"
            width={100}
            height={300}
          />
        ) : (
          <div className="w-full h-[300px] rounded-md object-contain flex items-center justify-center">
            <BiDish className="font-bold text-gray-600 text-[100px]" />
          </div>
        )}
        <h3 className="text-xl font-[500] text-center capitalize">
          {product.name}
        </h3>
        {typeof product.price === "object" ? (
          <div dir="ltr" className="space-y-2">
            <p className="flex justify-between gap-4">
              <span className="capitalize">single : </span>
              <span className="price text-sColor font-bold ">
                {product.price.single} Egy
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="capitalize">double : </span>
              <span className="price text-sColor font-bold ">
                {product.price.double} Egy
              </span>
            </p>
          </div>
        ) : (
          <p className="price text-sColor font-bold ">{product.price} Egy</p>
        )}
  
        {quantity ? (
          <div className="flex self-stretch rounded-md border border-gray-300 overflow-hidden">
            <button
              aria-label="decreament "
              className="bg-gray-300 px-4 py-2 "
              onClick={() => {
                handleAddToCart("decr")
              }}
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
              onClick={() => {
                handleAddToCart("incr")
              }}
            >
              {" "}
              +{" "}
            </button>
          </div>
        ) : (
          <Button
            text={" اضافتة الي العربة"}
            ariaLabel="اضافة الي العربة"
            className={` w-full cursor-pointer ${addToCart && "bg-gray-600"}`}
            onClick={() => {
              handleAddToCart("incr")
            }}
          />
        )}
        
        <div className="absLayer absolute top-2 -right-8  group-hover/parent:right-2 transition-[right] duration-1000  flex flex-col gap-4">
          <IoIosExpand className="text-3xl text-gray-700 font-bold cursor-pointer" />
          <FaHeart
            className={`text-3xl font-bold  cursor-pointer ${
              addToWishList ? "text-sColor" : "text-gray-700"
            } `}
            onClick={() => setAddToWishList(!addToWishList)}
          />
        </div>
      </figure>
    </>
  );
}
