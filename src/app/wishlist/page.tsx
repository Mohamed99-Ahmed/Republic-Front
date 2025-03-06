"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import testImg from "../../../public/imgs/433964272_900878548506273_1143103208391292958_n.jpg";
import Button from "@/components/Button/Button";
import { FaShoppingBasket } from "react-icons/fa";

export default function WishList() {
  const [noItem] = useState<boolean>(false);
  return (
    <section className="bg-white  rounded-md p-8 m-5">
      {noItem && (
        <Link href="/" className="text-sColor">
          لا يوجد منتجات ارجع الي الصفحة الرئيسة واضف منتجات
        </Link>
      )}
      <main className="divide-y-2 divide-white ">
        <div className="item bg-mColor items-center rounded-md p-4 justify-between flex flex-col gap-2  md:gap-2 md:flex-row ">
          <Image
            src={testImg}
            alt="img test"
            className="  h-[200px] w-[200px] md:h-[100px] md:w-[100px] object-contain "
          ></Image>
          <p className="name font-semibold capitalize text-center">
            world war burger
          </p>
          <p
            className="price text-sColor font-bold whitespace-nowrap"
            dir="ltr"
          >
            255 Egy
          </p>
          <p className="details text-center">
            مع قطع اللحم الشهية وطبةقة من المتشمستيمبتشسيتبمتسي
          </p>
          <button
            className=" flex items-center gap-2 underline  text-red-900  text-lg whitespace-nowrap"
            dir="ltr"
          >
            ازالة
            <FaShoppingBasket className=" font-semibold underline" />
          </button>
          <Button
            text="اضف الى السلة"
            ariaLabel="add to cart"
            className="bg-sColor self-stretch whitespace-nowrap md:self-auto"
          ></Button>
        </div>
      </main>
    </section>
  );
}
