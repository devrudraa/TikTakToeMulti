"use client";
import { useContext, createContext, useState, useEffect } from "react";

interface MessageTypeContext {
  message: MessageType[] | null;
  setMessage: React.Dispatch<React.SetStateAction<MessageType[] | null>>;
}

export const MessageContext = createContext<MessageTypeContext | null>(null);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};

interface MessageProviderProps {
  children: React.ReactNode;
}
type MessageType = {
  text: string;
  user: string;
};

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<MessageType[] | null>(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {!isLoading ? children : ""}
    </MessageContext.Provider>
  );
};
