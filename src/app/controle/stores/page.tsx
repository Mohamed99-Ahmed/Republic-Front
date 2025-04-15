"use client";
import ContoleLocation from "@/components/ControleLocation/ControleLocation";
import React, { useState } from "react";

export default function ControleStores() {
  const [appearNew, setAppearNew] = useState<boolean>(false);
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
        <ContoleLocation />
      </main>
    </div>
  );
}
