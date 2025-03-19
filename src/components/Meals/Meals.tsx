import React from "react";
import CategoryMeal from "../CategoryMeal/CategoryMeal";
import axios from "axios";
import categoryType from "../../types/category.type";
// import burgerVid from "../../../public/vidios/burgerVid.mp4";
const videoUrl = "/vidios/burgerVid.mp4";

export default async function Meals() {
  async function getAllCategories() {
    try {
      const options = {
        url: "https://backend-three-nu-89.vercel.app/categories",
        method: "GET",
      };
      const { data } = await axios.request(options);
      console.log(data.data.categories);
      return data.data.categories;
    } catch (err) {
      console.log(err);
    }
  }
  const categories = await getAllCategories();

  return (
    <main className="space-y-20 mt-20">
      {categories.map((category: categoryType) => {
        return <CategoryMeal key={category.id} category={category} />;
      })}

      <div className="vidioBurger ">
        <video src={videoUrl} autoPlay loop muted></video>
      </div>
    </main>
  );
}
