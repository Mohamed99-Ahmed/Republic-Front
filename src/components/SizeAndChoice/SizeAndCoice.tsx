"use client";
import React from "react";
type propsType = {
  oneSize?: boolean;
  setSize?: React.Dispatch<React.SetStateAction<string>>;
  setChoice?: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  choice: string;
  productId?: string;
};
export default function SizeAndCoice({
  oneSize,
  setSize,
  setChoice,
  size,
  choice,
  productId,
}: propsType) {
  return (
    <main className="space-y-2">
      {!oneSize && (
        <div className="size">
          <h4 className="text-sColor font-bold">size</h4>
          <div className="flex justify-between items-center gap-3">
            <div
              className="size-single flex items-center  gap-2"
              onClick={() => {
                if (setSize) {
                  setSize("single");
                }
              }}
            >
              <input
                type="radio"
                name={`size-${productId}`}
                value={`single-${productId}`}
                checked={size === "single"}
                className="h-5  w-5 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
              />
              <label htmlFor={`single-${productId}`} className="text-lg">
                single
              </label>
            </div>
            <div
              className="size-item flex items-center  gap-2"
              onClick={() => {
                if (setSize) {
                  setSize("double");
                }
              }}
            >
              <input
                type="radio"
                name={`size-${productId}`}
                id={`double-${productId}`}
                checked={size === "double"}
                className="h-5 w-5 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
              />
              <label htmlFor={`double-${productId}`} className="text-lg">
                double
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="choice">
        <h4 className="text-sColor font-bold">choice</h4>
        <div className="flex justify-between items-center gap-3">
          <div
            className="size-item flex items-center  gap-2"
            onClick={() => {
              if (setChoice) {
                setChoice("regualr");
              }
            }}
          >
            <input
              type="radio"
              name={`choice-${productId}`}
              id={`regular-${productId}`}
              checked={choice === "regualr"}
              className="h-5 w-5 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
            />
            <label htmlFor={`regular-${productId}`} className="text-lg">
              regualr
            </label>
          </div>
          <div
            className="size-item flex items-center  gap-2"
            onClick={() => {
              if (setChoice) {
                setChoice("spicy");
              }
            }}
          >
            <input
              type="radio"
              name={`choice-${productId}`}
              id={`spicy-${productId}`}
              checked={choice === "spicy"}
              className="h-5 w-5 cursor-pointer appearance-none border-2 border-sColor rounded-full checked:bg-sColor checked:border-transparent transition-all duration-300 ease-in-out focus:ring-2 focus:ring-sColor"
            />
            <label htmlFor={`spicy-${productId}`} className="text-lg">
              spicy
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
