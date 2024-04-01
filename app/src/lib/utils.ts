import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomColor() {
  const colors = ["red", "green", "blue", "yellow", "purple", "pink", "orange"]
  return colors[Math.floor(Math.random() * colors.length)]
}

export const refreshToken = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: localStorage.getItem("refresh") }),
    });
    const result = await response.json();
    if (!response.ok) {
      return false;
    }
    localStorage.setItem("token", result.access);
    return true
  } catch (error) {
    console.error(error);
    return false
  }
}