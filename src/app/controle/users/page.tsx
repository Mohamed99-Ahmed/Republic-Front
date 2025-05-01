"use client";
import ControleUser from "@/components/ControleUser/ControleUser";
import { userContext } from "@/context/UserContext/UserContext";

import React, {  useContext, useEffect } from "react";

export default function ContrleUsers() {
  const { getAllUsers,users } = useContext(userContext); // getCheckout on stripe
  useEffect(()=>{
    getAllUsers()
  },[])
  // if change in users rerender component
  useEffect(() => {
  },[users])
  
  return (
    <div className="container space-y-8">
      <h2 className="text-2xl font-semibold text-sColor"> العملاء</h2>
      {/* users */}
      <div className="grid md:grid-cols-3  gap-4">
        {users && users.length > 0 ? 
         users.map((user)=>{
          return (<ControleUser user={user} key={user._id}></ControleUser> )
         })
         : <h2 className="text-2xl font-semibold text-sColor">لا يوجد مستخدمين</h2>}
        
      </div>
    </div>
  );
}
