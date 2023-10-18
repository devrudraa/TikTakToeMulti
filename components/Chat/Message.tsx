import React, { FC, memo } from "react";

interface MessageProps {
  variant: "send" | "receive";
  children: React.ReactNode;
}
const Message: FC<MessageProps> = ({ variant, children }) => {
  const ClassVariantAlign = {
    send: "w-full flex my-3 justify-end",
    receive: "w-full flex my-3",
  };
  const ClassVariantMessage = {
    send: "max-w-[80%] bg-primary-100 rounded-lg px-4 py-2",
    receive: "max-w-[80%] bg-primary-300 rounded-lg px-4 py-2 text-white",
  };

  return (
    <div className={ClassVariantAlign[variant]}>
      <div className={ClassVariantMessage[variant]}>{children}</div>
    </div>
  );
};
export default memo(Message);
