// "use client"
// import axios from 'axios';
// import React, { createContext, ReactNode, useEffect, useState } from 'react'

// export const categoryContext = createContext('defaultValue')
// export default  function CategoryContext({children}:{children:ReactNode}) {
//   const [categories, setCategories] = useState([])
//   // get  All Categories
//     async function getAllCategories(){
//       try{
//         const options = {
//           url: "https://backend-three-nu-89.vercel.app/categories",
//           method: "GET"
//         };
//         const {data} = await axios.request(options)
//         console.log(data)
//         return data
//       }catch(err){
//         console.log(err);
//       }
//     }
//     // useEffect Hook
//     useEffect(()=>{
//     (async function aysFunc(){
//       setCategories(await getAllCategories())
//     })();
    
//     },[])
    
//   return (
//     <categoryContext.Provider value={{categories}}>
//            {children}
//       </categoryContext.Provider>
//   )
// }
