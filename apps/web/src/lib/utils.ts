import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function numberWithCommas(x: string)  {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
