"use client";

import React, { useContext, createContext, useState } from "react";

type OwnerContextType = {
  isOwner: boolean;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
};
const OwnerContext = createContext<OwnerContextType | null>(null);

type OwnerContextProviderType = {
  children: React.ReactNode;
};
export default function OwnerContextProvider({
  children,
}: OwnerContextProviderType) {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  return (
    <OwnerContext.Provider value={{ isOwner, setIsOwner }}>
      {children}
    </OwnerContext.Provider>
  );
}

export const useIsOwner = () => {
  const context = useContext(OwnerContext);
  if (!context) {
    throw new Error("useIsOwner must be used within a OwnerContextProvider");
  }
  return context;
};
