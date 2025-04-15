"use client";
import React from "react";
import Button from "../Button/Button";
import DeleteButton from "../DeleteButton/DeleteButton";
import { useFormik } from "formik";
import InputField from "../InputField/inputField";

export default function ControleProduct() {
  // formik
  const formik = useFormik({
    initialValues: {
      productName: "breef man lokk",
      price: 200,
      priceSingle: 300,
      priceDouble: 400,
      description:
        "برجر مشوي علي الفحم محشي جبنه خطيره مع  المودزريلا و بيف بيكن بالطريقه السويسريه  مع صوص  الرنش  الكريمي و البطاطس المتبله",
    },
    onSubmit: () => {},
  });
  return (
    <div className="product bg-white p-4 rounded-md hover:border hover:border-sColor flex flex-col gap-2">
      {/* name of product */}
      <p className="flex items-center gap-2">
        <label htmlFor="productName">اسم المنتج :</label>
        <InputField
          id="productName"
          type="tesxt"
          name="productName"
          value={formik.values.productName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className=" bg-white grow rounded-md text-lg font-semibold capitalize text-center"
        />
      </p>
      {/* price */}
      <p>
        <span>السعر:</span>
        <div dir="ltr" className="space-y-1">
          <p className="flex justify-between items-center gap-4">
            <label className="capitalize" htmlFor="priceSingle">
              single :{" "}
            </label>
            <InputField
              id="priceSingle"
              type="number"
              name="priceSingle"
              value={formik.values.priceSingle}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className=" grow"
            />
          </p>
          <p className="flex justify-between items-center gap-4">
            <label className="capitalize" htmlFor="priceDouble">
              double :{" "}
            </label>
            <InputField
              id="priceDouble"
              type="number"
              name="priceDouble"
              value={formik.values.priceDouble}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className=" grow"
            />
          </p>
        </div>
      </p>
      {/* description of product */}
      <p className="flex items-center gap-2">
        <label htmlFor="description">الوصف :</label>
        <textarea
          id="description"
          name="description"
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className=" p-1 bg-white focus:outline-sColor rounded-md grow text-wrap min-h-24 overflow-hidden "
        />
      </p>
      {/* buttons */}
      <footer className="flex justify-around gap-2 items-center pt-2 border-t-2 border-slate-500">
        <Button ariaLabel="تعديل" text="تعديل"></Button>
        <DeleteButton> ازالة</DeleteButton>
      </footer>
    </div>
  );
}
