
// Import Swiper styles
import "swiper/css";

import Header from "@/components/Header/Header";
import Meals from "@/components/Meals/Meals";
import Slider from "@/components/Slider/Slider";

export default function HomeHeader() {

  return (
    <>
      <Header />
      <Meals/>
      <Slider/>
    </>
  );
}
