import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomColor() {
  const colors = ["red", "green", "blue", "yellow", "purple", "pink", "orange"]
  return colors[Math.floor(Math.random() * colors.length)]
}
