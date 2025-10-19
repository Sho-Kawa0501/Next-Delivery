import React from 'react'
import { fetchCategoryRestaurants, fetchRestaurantsByKeyword } from '@/lib/restaurants/api'
import RestaurantList from '@/components/restaurant-list'
import Categories from '@/components/categories'
import { redirect } from 'next/navigation'

const SearchPage = async ({searchParams,}: {
  searchParams: Promise<{
    category: string,
    restaurant: string
  }>
}) => {
  const {category, restaurant} = await searchParams
  console.log("restaurant", restaurant)
  
  if(category) {
    const {data: categoryRestaurants, error: fetchError} = await fetchCategoryRestaurants(category)
  return (
    <>
      <div className="mb-4">
        <Categories />
      </div>
      {!categoryRestaurants ? (
        <p>{fetchError}</p>
      ): categoryRestaurants.length > 0 ?(
        <RestaurantList restaurants={categoryRestaurants} />
      ) : (
        <p>カテゴリ<strong>{category}</strong>に一致するレストランがありません</p>
      )}
    </>
  )} else if(restaurant) {
    
    const {data: restaurants, error: fetchError} = 
    await fetchRestaurantsByKeyword(restaurant)
    console.log("text_search_results", restaurants);
     return (
    <>
      {!restaurants ? (
        <p>{fetchError}</p>
      ): restaurants.length > 0 ?(
        <>
          <div>{restaurant}の検索結果 {restaurants.length}件の結果</div>
          <RestaurantList restaurants={restaurants} />
        </>
      ) : (
        <p><strong>{restaurant}</strong>に一致するレストランがありません</p>
      )}
    </>
  )} else {
    redirect("/")
  }
}

export default SearchPage