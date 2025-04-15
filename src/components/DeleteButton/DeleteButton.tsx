import React from 'react'
import { FaShoppingBasket } from "react-icons/fa";
interface propsType  {
 children: string,
 className?:  string
}
export default function DeleteButton({children,className} : propsType) {
  return (
               <button
                  className={` flex  items-center gap-2 underline  text-red-900  text-lg whitespace-nowrap ${className}`}
                  dir="ltr"
                >
                  <span> {children} </span>
                  <FaShoppingBasket className=" font-semibold underline" />
                </button>
  )
}
