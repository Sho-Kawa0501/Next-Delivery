"use client"

import React from 'react'
import CategorySidebar from './category-sidebar'
import { CategoryMenu } from '@/types'

interface MenuContentProps {
  categoryMenus: CategoryMenu[]
}
const MenuContent = ({categoryMenus}: MenuContentProps) => {
  return (
    <div className='flex'>
      <CategorySidebar 
        categoryMenus={categoryMenus} />
      <div className='w-3/4'>
        MenuContent
      </div>
      
    </div>
  )
}

export default MenuContent