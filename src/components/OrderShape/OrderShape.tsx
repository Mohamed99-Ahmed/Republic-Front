"use client";

import imgCover from "../../../public/imgs/431558586_897428515517943_7725318522623890198_n.jpg";
import Image from "next/image";
import DeleteButton from "../DeleteButton/DeleteButton";

export default function Orders() {
  return (
    <>
      <section className="container orders space-y-4">
        {/* if no order here display this div */}
        {/* <div className="border border-sColor p-8 ">
          لا يوجد اوردرات{" "}
          <Link
            href="/cart"
            className="text-sColor underline uppercase text-lg "
          >
            عربة التسوق
          </Link>
        </div> */}
        {/* if have more than 0 order display this div */}
        <div className="orderItem p-4   rounded-lg  bg-gray-100  border border-gray-400 space-y-4">
          <header className="flex flex-col md:flex-row items-baseline border-b border-gray-500 pb-2  justify-between gap-4 text-nowrap">
            <div className="flex flex-wrap gap-4 items-center ">
              <h2 className="capitalize bg-white p-2 space-x-2 rounded-full font-semibold">
                <span> الاسم : </span>
                <span className="text-gray-600">محمد احمد</span>
              </h2>
              <h2 className="capitalize bg-white p-2 space-x-2 rounded-full font-semibold">
                <span>رقم الاوردر : </span>
                <span className="text-gray-600">5789</span>
              </h2>
              <p className="createdAt text-gray-600">
                {/* {order.createdAt.split("").slice(0, 10).join("")} */}
                22/3/2015
              </p>
            </div>
            <div className="flex  gap-3 self-end md:self-center ">
              <DeleteButton> ازالة</DeleteButton>
            </div>
          </header>
          <main className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* products */}
            <figure className="flex overflow-hidden  relative cursor-pointer group flex-col items-center justify-between  gap-2 p-2 border-gray-500 border-2 border-solid rounded-md">
              <div className="overflow-hidden self-stretch">
                <Image
                  src={imgCover.src}
                  width={100}
                  height={100}
                  className=" h-[200px] items-stretch  duration-1000 w-full object-cover   transition-[transform]  group-hover:scale-125"
                  alt="img cover"
                />
              </div>
              <h1 className="capitalize text-lg font-bold line-clamp-2">
                Rebublic beef
              </h1>

              <h2 className="capitalize ">
                الكمية : <span className="font-medium"> 25</span>
              </h2>

              <span className=" capitalize">
                السعر : <span className="font-medium"> 250</span>
              </span>
            </figure>
          </main>
          <footer className="border-t flex flex-col md:flex-row justify-between items-center pt-4 border-gray-500 text-nowrap gap-2">
            {/* total price  */}
            <h3 className="text-lg font-medium capitalize">
              اجمالي السعر :
              <span className="text-sColor text-xl ml-4">238 Egp</span>
            </h3>
            {/* paid method */}
            <p className="text-lg font-medium capitalize ">
              طريقة الدفع :
              <span className="uppercase text-sColor ml-4">الفيزا</span>
            </p>
            {/* paid and arrived */}
            <div className="space-x-3">
              {true ? (
                <span className="rounded-full bg-sColor p-3 text-white capitalize">
                  مدفوع
                </span>
              ) : (
                <span className="rounded-full bg-white  capitalize">
                  غير مدفوع
                </span>
              )}
              {true ? (
                <span className="rounded-full bg-white p-3 capitalize">
                  وصل
                </span>
              ) : (
                <span className="rounded-full bg-red-400 p-3 text-white capitalize">
                  لم يصل
                </span>
              )}
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
