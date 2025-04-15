import Image from "next/image";
import React from "react";
import userImage from "../../../public/imgs/userDefault.png";
import DeleteButton from "../DeleteButton/DeleteButton";
export default function ControleUser() {
  return (
    <figure className="flex relative flex-wrap overflow-hidden text-ellipsis  md:items-center gap-2 p-4  bg-white rounded-md hover:border hover:border-sColor">
      <Image
        src={userImage.src}
        alt="user image logo "
        className="w-[50px] h-[50px]"
        width={100}
        height={100}
      />
      <article className="space-y-2">
        <p>
          <span className="text-sColor">الاسم : </span>
          <span className="text-gray-900">محمد احمد</span>
        </p>
        <p>
          <span className="text-sColor">الايميل: </span>
          <span className="text-gray-900 break-words  flex flex-wrap">
            mohamed202029999
          </span>
        </p>
        <p>
          <span className="text-sColor">الهوية : </span>
          <span className="text-gray-900"> user </span>
        </p>
        <p>
          <span className="text-sColor">الموقع : </span>
          <span className="text-gray-900"> الكبلات / الاميرية </span>
        </p>
        <p>
          <span className="text-sColor">رقم التليفون : </span>
          <span className="text-gray-500 font-semibold"> 01033088054</span>
        </p>
      </article>
      {/* remove user only with authorize */}

      <DeleteButton className="absolute top-2 left-2 flex-wrap-reverse">
        ازاله
      </DeleteButton>
    </figure>
  );
}
