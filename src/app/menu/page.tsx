import React from 'react'
import menu1 from "../../../public/imgs/menu1.webp"
import menu2 from "../../../public/imgs/menu2.webp"
import menu3 from "../../../public/imgs/menu3.webp"
import menu4 from "../../../public/imgs/menu4.webp"
import menu5 from "../../../public/imgs/menu5.webp"
import Image from 'next/image'
export default function Menue() {
  return (
    <main className='conatianer' >
      <div className="imgsMenue grid justify-items-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* it will be added by database */}
        <Image src={menu1.src} alt="img1" className='w-full object-cover ' width={100} height={50}/>
        <Image src={menu2.src} alt="img1" className='w-full object-contain ' width={100} height={50}/>
        <Image src={menu3.src} alt="img1" className='w-full object-contain ' width={100} height={50}/>
        <Image src={menu4.src} alt="img1" className='w-full object-contain ' width={100} height={50}/>
        <Image src={menu5.src} alt="img1" className='w-full object-contain ' width={100} height={50}/>
  
      </div>  
    </main>
  )
}
