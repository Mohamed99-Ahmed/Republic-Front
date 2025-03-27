
// Import Swiper styles
import "swiper/css";

import Header from "@/components/Header/Header";
import Meals from "@/components/Meals/Meals";

export default function HomeHeader() {
  console.log("function")
  return (
    <>
      <Header />
      <Meals/>
    </>
  );
}
