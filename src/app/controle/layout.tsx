import ControleAside from "@/components/ControleAside/ControleAside";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-screen">
      <ControleAside></ControleAside>
      <div className="  pt-20 lg:pt-12 lg:mr-40">{children}</div>
    </main>
  );
}
