import React, { ReactNode } from 'react'
import CategoryContext from '../../../context/category.context'

export default function ParentContext({children}:{children:ReactNode}) {
  return (
    <>
       <CategoryContext>
            {children}
       </CategoryContext>
    </>
  )
}
