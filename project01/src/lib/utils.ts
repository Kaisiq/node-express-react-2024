import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUser() {
  const userString = sessionStorage.getItem("user");
  const user: { username: string; userEmail: string } = userString
    ? JSON.parse(userString)
    : undefined;
  return user;
}

export const SERVER = process.env.REACT_APP_SERVER_ADDRESS;
