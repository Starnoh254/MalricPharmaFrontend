import { createContext } from "react";
import type { BrandConfig, BrandKey } from "../config/brands";

export interface BrandContextValue {
  brand: BrandConfig;
  setBrandKey: (key: BrandKey) => void;
}

export const BrandContext = createContext<BrandContextValue | undefined>(
  undefined
);
