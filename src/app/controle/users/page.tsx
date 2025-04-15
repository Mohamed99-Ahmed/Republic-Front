import ControleUser from "@/components/ControleUser/ControleUser";
import React from "react";

export default function contrleUsers() {
  return (
    <div className="container space-y-8">
      <h2 className="text-2xl font-semibold text-sColor"> العملاء</h2>
      {/* users */}
      <div className="grid md:grid-cols-3  gap-4">
        <ControleUser></ControleUser>
        <ControleUser></ControleUser>
        <ControleUser></ControleUser>
        <ControleUser></ControleUser>
        <ControleUser></ControleUser>
        
      </div>
    </div>
  );
}
