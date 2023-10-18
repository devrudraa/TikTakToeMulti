import { useContext, createContext } from "react";

type NameContextType = {
  name: string;
  // setName: React.Dispatch<React.SetStateAction<string | null>>;
  opponent_name: string | null;
  setOpponent_name: React.Dispatch<React.SetStateAction<string | null>>;
};
export const NameContext = createContext<NameContextType | null>(null);

export const useUserName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useUserName must be used within a NameContextProvider");
  }
  return context;
};
