import React, { useEffect, useMemo, useState } from "react";
import { BRANDS, getActiveBrand } from "../config/brands";
import type { BrandKey } from "../config/brands";
import { BrandContext, type BrandContextValue } from "./BrandContextBase";

interface BrandProviderProps {
  initialBrandKey?: BrandKey;
  children: React.ReactNode;
}

export const BrandProvider: React.FC<BrandProviderProps> = ({
  initialBrandKey,
  children,
}) => {
  const [brandKey, setBrandKey] = useState<BrandKey>(
    initialBrandKey || getActiveBrand()
  );

  const brand = useMemo(() => BRANDS[brandKey], [brandKey]);

  // Apply brand class to body for CSS variables
  useEffect(() => {
    const { className } = brand;
    document.body.classList.remove("brand-malric", "brand-angelic");
    document.body.classList.add(className);
  }, [brand]);

  const value = useMemo<BrandContextValue>(
    () => ({ brand, setBrandKey }),
    [brand, setBrandKey]
  );

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  );
};

export default BrandProvider;
