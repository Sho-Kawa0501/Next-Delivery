'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login() {
  console.log("google login")
  //googleログイン
  // 非同期で
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: 'http://localhost:3000//auth/callback',
  },
})

if (data.url) {
  redirect(data.url) // use the redirect API for your server framework
}
}

export async function logout() {
  const supabase = await createClient()
  const { error: logoutError } = await supabase.auth.signOut()
  if(logoutError) {
    console.error(logoutError)
  }
}