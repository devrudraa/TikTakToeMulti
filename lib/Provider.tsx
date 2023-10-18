"use client";
import { FC } from "react";
import { NextUIProvider } from "@nextui-org/react";
import OwnerContextProvider from "@/Context/GameOwner";

interface ProviderProps {
  children: React.ReactNode;
}
const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <OwnerContextProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </OwnerContextProvider>
    </>
  );
};
export default Provider;
