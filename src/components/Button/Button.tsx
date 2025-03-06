import React, { EventHandler, ReactNode } from "react";
interface props {
  text: ReactNode;
  className?: string;
  ariaLabel: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function Button({ text, className, ariaLabel, onClick }: props) {
  return (
    <button
      className={`capitalize  text-xl text-slate-200 px-2 py-2 rounded-full bg-sColor text-center ${className}`}
      aria-label={ariaLabel}
        onClick= {onClick}
    >
      {text}
    </button>
  );
}
