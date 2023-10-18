import { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
  roomId: string;
};

export const SocketContext = createContext<SocketContextType | null>(null);

// Export a hook for SocketContext

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
