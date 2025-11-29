import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cdnImagePath = (path: string) => {
  const base = process.env.NEXT_PUBLIC_CDN_BASE_URL
  return `${base}${path}`
}