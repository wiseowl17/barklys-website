import { createContext, useContext, type ReactNode } from "react";
import { fallbackPublicCms, type PublicCms } from "@/lib/cms";

const CmsContext = createContext<PublicCms>(fallbackPublicCms());

export function CmsProvider({
  value,
  children,
}: {
  value: PublicCms
  children: ReactNode
}) {
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms(): PublicCms {
  return useContext(CmsContext);
}
