import { CategoryMenu, Menu } from "@/types"
import { createClient } from "@/utils/supabase/server"

export async function fetchCategoryMenus(primaryType: string) {
  console.log()

  const supabase = await createClient()
  const bucket = supabase.storage.from("menus")

  const { data: menus, error: menusError } = await supabase
    .from('menus')
    .select('*')
    .eq("genre", primaryType)

  if(menusError) {
    console.error("メニューの取得に失敗しました", menusError)
    return {error:"メニューの取得に失敗しました"}
  }

  console.log("mmeennuu",menus)

  if(menus.length === 0) {
    return {data:[]}
  }

  const categoryMenus: CategoryMenu[] = []

  // メニューから
  const featuredItems = menus
    // is_featuredがtrueのみのデータを抽出
    .filter((menu) => menu.is_featured)
    // 必要なデータだけが配列に格納されるよう整形
    .map((menu): Menu => ({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      photoUrl: bucket.getPublicUrl(menu.image_path).data.publicUrl
    })
  )

  categoryMenus.push({
    id: "featured",
    categoryName:"注目商品",
    items: featuredItems
  })
 

  // 取得したメニュー情報のカテゴリー情報一覧を取得する。Array.from(new Set)で重複値を排除 
  const categories = Array.from(new Set(menus.map((menu) => menu.category)))
  console.log("categoryes", categories)

  for (const category of categories) {
    const items = menus 
      // 現在のカテゴリーと一致するデータのみを抽出 
      .filter((menu) => menu.category === category)
      // データ整形
      .map((menu):Menu => ({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        photoUrl: bucket.getPublicUrl(menu.image_path).data.publicUrl
      }))

    categoryMenus.push({
      id: category,
      categoryName:category,
      items: items
    })
  }
  return { data: categoryMenus }
}