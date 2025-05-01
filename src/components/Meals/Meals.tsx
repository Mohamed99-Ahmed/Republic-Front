"use client";
import React, {   useContext, useEffect } from "react";
import CategoryMeal from "../CategoryMeal/CategoryMeal";
import categoryType from "../../types/category.type";
import { CateogryContext } from "@/context/CategoriesContext/Categories.context";
// import burgerVid from "../../../public/vidios/burgerVid.mp4";

export default  function Meals() {
  const {getAllCategories,categories} = useContext(CateogryContext)
useEffect(() => {
  getAllCategories()
},[])
// if changed in categories context it will re render the component
useEffect(() => {},[categories])
  return (
    <main className="space-y-20 mt-20">
      {categories?.map((category: categoryType) => {
        return <CategoryMeal key={category.id} category={category} />;
      })}
    </main>
  );
}
