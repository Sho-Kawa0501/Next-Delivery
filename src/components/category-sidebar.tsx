"use client"
import { CategoryMenu } from '@/types'
import React from 'react'

interface CategorySidebarProps {
  categoryMenus: CategoryMenu[]
}
const CategorySidebar = ({categoryMenus}: CategorySidebarProps) => {
  console.log("CategorySidearProps", categoryMenus)
  return (
    <aside className="w-1/4">CategorySidebar
      <p className="p-3 font-bold">メニュー Menu</p>
      <nav>
        <ul>
          {categoryMenus.map((category) => (
            <li>{category.categoryName}</li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default CategorySidebar