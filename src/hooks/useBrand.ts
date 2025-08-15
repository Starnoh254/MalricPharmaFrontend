import { useContext } from "react";
import { BrandContext } from "../context/BrandContextBase";

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrand must be used within BrandProvider");
  }
  return ctx;
}
