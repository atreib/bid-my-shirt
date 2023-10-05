import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ErrorResult } from "domain-functions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeErrorFromDF(dfErrors: ErrorResult) {
  return new Error(dfErrors.errors.map((x) => x.message).join(", "));
}
