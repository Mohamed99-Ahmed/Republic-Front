"use client";
import React from "react";
import Button from "../Button/Button";
import DeleteButton from "../DeleteButton/DeleteButton";
import { Kufam } from "next/font/google";
import ControleProduct from "../ControleProduct/ControleProduct";
import { useFormik } from "formik";
const kufam = Kufam({
  subsets: ["arabic"],
  weight: ["400", "700"], // Add weights as needed
});
export default function ControleCategory() {
  // formik
  const formik = useFormik({
    initialValues: {
      categorName: "offers",
    },
    onSubmit: () => {},
  });

  return (
    <>
      {/* category with its products */}
      <div className="flex gap-2 justify-between items-center ">
        <input
          className={`${kufam.className} w-full   text-xl focus:outline-sColor font-bold text-gray-800 uppercase p-2 rounded-r-xl box-border`}
          type="text"
          name="categorName"
          value={formik.values.categorName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className="flex items-center gap-4">
          <Button ariaLabel="تعديل" text="تعديل" className="p-2"></Button>
          <DeleteButton>ازالة</DeleteButton>
        </div>
      </div>
      {/* prducts */}
      <div className="grid gap-4  md:grid-cols-2 ">
        <ControleProduct />
      </div>
    </>
  );
}
