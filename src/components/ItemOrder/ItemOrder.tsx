import { Item } from "@/types/responseTypes";
import Image from "next/image";
import React from "react";
import relativeIMg from "../../../public/imgs/relativeImg.svg";
type propsType = {
  item: Item;
};

export default function ItemOrder({ item }: propsType) {
  // handleIamgeCover of product
  const handleImageCover = function () {
    if (item.product && item.product.imageCover) {
      return item.product.imageCover.startsWith("http")
        ? item.product.imageCover
        : `https://backend-three-nu-89.vercel.app/public/imgs/products/${item.product.imageCover}`;
    } else {
      return relativeIMg.src;
    }
  };
  return ( item.product &&
    <figure className="flex overflow-hidden  relative cursor-pointer group flex-col items-center justify-between  gap-2 p-2 border-gray-500 border-2 border-solid rounded-md">
      <div className="overflow-hidden self-stretch">
        <Image
          src={handleImageCover()}
          width={100}
          height={100}
          className=" h-[200px] items-stretch  duration-1000 w-full object-cover   transition-[transform]  group-hover:scale-125"
          alt="img cover"
        />
      </div>
   <h1 className="capitalize text-lg font-bold line-clamp-2">
        {item.product.name}
      </h1>

      <h2 className="capitalize ">
        الكمية : <span className="font-medium"> {item.quantity}</span>
      </h2>

      <span className=" capitalize">
        السعر : <span className="font-medium"> {item.itemTotal}</span>
      </span>
    </figure>
  );
}
