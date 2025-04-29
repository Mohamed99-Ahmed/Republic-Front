"use client";
import ContoleLocation from "@/components/ControleLocation/ControleLocation";
import { storesContext } from "@/context/Stores/StoresContext";
import React, { useContext, useEffect, useState } from "react";

export default function ControleStores() {
  const [appearNew, setAppearNew] = useState<boolean>(false);
  const {getAllStores,stores} =  useContext(storesContext);
  // get all stores when the page loads
  useEffect(() => {getAllStores()},[])
  // rerender comoponent when the stores change
  useEffect(() => {
  },[stores])
  return (
    <div className="container space-y-8">
      {/* Adding new store */}
      <header className={`space-y-5 p-4 ${appearNew && "border border-gray-700 rounded-md "}`}>
        <button
          onClick={() => setAppearNew(!appearNew)}
          className="bg-white flex items-center justify-center text-gray-800 font-semibold rounded-md h-24 w-24 text-4xl"
        >
          +
        </button>
        {appearNew && <ContoleLocation />}
      </header>

      {/* paleces of stores */}
      <main className="grid gird-cols-1 md:grid-cols-2  gap-4">
        {stores? stores.map((store)=>{
          return  (<ContoleLocation key={store._id} store={store}/>)
          }).reverse()
        : ""}
      </main>
    </div>
  );
}
