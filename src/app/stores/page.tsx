import React from "react";

import type { storesType } from "../../types/store.type";
import Location from "@/components/Location/location";
import axios from "axios";
import toast from "react-hot-toast";

//   {
//     id: 1,
//     name: "1 حدائق القبة",
//     description: "شارع مصر والسودان",
//     link: "https://maps.app.goo.gl/Cv5Y81SfP5dJu6cU9",
//   },
//   {
//     id: 2,
//     name: "2 حدائق القبة",
//     description:
//       "١٥١ مصر والسودان، حدائق القبة، امام صيدلية العزبي",
//     link: "https://maps.app.goo.gl/ZeDXqLLFLBRQZ5q18",
//   },
//   {
//     id: 3,
//     name: "مدينة نصر",
//     description: "مكرم عبيد، المنطقة السادسة، مدينة نصر",
//     link: "https://maps.app.goo.gl/Y87SHNpMRtJzH4EQ6",
//   },
//   {
//     id: 4,
//     name: "مصر الجديدة, هيليوبلس",
//     description: "حديقة تيفولي دوم، شارع عمر بن الخطاب، الماظة، مصر الجديدة",
//     link: "https://maps.app.goo.gl/ZueF83e1uWTBk24b9",
//   },
//   {
//     id: 5,
//     name: "الهرم",
//     description: "108 الهرم، أول الهرم، الطالبية",
//     link: "https://maps.app.goo.gl/djvsGFEaiP1gqmpL7",
//   }, {
//     id: 6,
//     name: "المعادي",
//     description: "146 شارع النصر، البساتين الشرقية، البساتين، محافظة القاهرة",
//     link: "https://maps.app.goo.gl/etf3woyajsQJ8Fov6",
//   }, {
//     id: 7,
//     name: "جاردينا",
//     description: "مدينة نصر، محافظة القاهرة",
//     link: "https://maps.app.goo.gl/XniamJmveApfhpKT7",
//   }, {
//     id: 8,
//     name: "التجمع الاول",
//     description: "امتداد محور السادات",
//     link: "https://maps.app.goo.gl/2bEGqhDCLdsAozNE7",
//   }, {
//     id: 9,
//     name: "العبور",
//     description: "مدينة العبور, محور العبور",
//     link: "https://maps.app.goo.gl/omiEgTeBNqJp6fUG6",
//   },
// ];
export default async function Stores() {
  async function getAllStores() {
    try {
      const options = {
        url: "https://backend-three-nu-89.vercel.app/stores",
        method: "GET",
      };
      const { data } = await axios.request(options);
      return data.data.data;
    } catch (err) {
      let errorMessage = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage);
    }
  }
  const stores: storesType = await getAllStores();
  return (
    <section className="stores ">
      <div className="container grid gird-cols-1 md:grid-cols-2  gap-4">
        {stores.map((store) => {
          return <Location key={store._id} store={store} />;
        })}
      </div>
    </section>
  );
}
