import React from "react";
import Title from "../Title/Title";
import CardProduct from "../productItem/ProductItem";
import categoryType from "../../types/category.type";

type propsType = {
  category: categoryType;
};

export default function CategoryMeal({ category }: propsType) {
  console.log("products", category);
  return (
    <>
      <div className="container">
        <Title
          titleWord={category.categoryName}
          className="whitespace-nowrap"
        />
        <div className="cards-burgers grid mt-10 justify-center  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.products.map((product) => {
            return <CardProduct key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
}
