"use client";

import React, { ReactNode, useRef } from "react";
import {
  LoadingContext,
  LoadingManager,
} from "@/shared/lib/context/loading-context";

export function LoadingProvider({ children }: { children: ReactNode }) {
  const managerRef = useRef<LoadingManager | null>(null);

  if (!managerRef.current) {
    managerRef.current = new LoadingManager();
  }

  return (
    <LoadingContext.Provider value={managerRef.current}>
      {children}
    </LoadingContext.Provider>
  );
}
