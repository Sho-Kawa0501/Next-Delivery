"use client"

import DeliveryAnimation from '@/components/delivery-animation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const CheckoutCompletePage = () => {
  const router = useRouter()

  useEffect(() => {
    // 10秒後に注文履歴ページに遷移
    const timer = setTimeout(() => {
      router.push("/orders")
    }, 10000)

    // コンポーネントがアンマウントされた時にタイマー解除
    return () => clearTimeout(timer)
  }, [router])
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="font-bold text-3xl">ご注文の品を準備しています…</h1>
      <DeliveryAnimation />
      <Button size={"lg"} asChild>
        <Link href={"/orders"}>注文履歴へ</Link>
      </Button>
    </div>
  )
}

export default CheckoutCompletePage