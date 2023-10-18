import { Types } from "ably";
import { useContext, createContext } from "react";

export const ClientContext =
  createContext<Types.RealtimeChannelCallbacks | null>(null);

export const useChannel = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useChannel must be used within a ChannelContextProvider");
  }
  return context;
};
