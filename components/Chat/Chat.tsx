"use client";
import { FC, useEffect, useRef } from "react";
import Message from "./Message";
import { Button, Input } from "@nextui-org/react";
import { SendHorizontal } from "lucide-react";
import { useUserName } from "@/Context/NameContext";
import { useChannel } from "@/Context/ClientAbly";
import { useMessage } from "@/Context/MessageContext";
import NoMessageSVG from "../SVG/NoMessageSVG";

interface Message {
  data: { messages: { text: string; user: string } };
}

interface ChatProps {}
const Chat: FC<ChatProps> = ({}) => {
  const { name } = useUserName();
  const ChatRef = useRef<HTMLElement | null>(null);
  const Channel = useChannel();

  const { message, setMessage } = useMessage();
  const inputBox = useRef<HTMLInputElement | null>(null);

  function sendMess() {
    if (inputBox.current && inputBox.current?.value !== "") {
      const value = inputBox.current.value;
      inputBox.current.value = "";
      Channel.publish("send_message", {
        messages: { text: value, user: name },
      });
    }
  }

  useEffect(() => {
    if (ChatRef.current) {
      ChatRef.current.scrollTo({
        top: ChatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [message]);

  Channel.subscribe("give_old_messages", () => {
    Channel.publish("got_old_messages", message);
  });

  Channel.subscribe("got_old_messages", ({ data }) => {
    setMessage(data);
  });

  useEffect(() => {
    if (!message) {
      Channel.publish("give_old_messages", null);

      // console.log(Channel);

      // Channel.subscribe("send_message", ({ data }: Message) => {
      //   setMessage((oldMess) => {
      //     return oldMess ? [...oldMess, data.messages] : [data.messages];
      //   });
      // });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section ref={ChatRef} className="max-h-[20em] overflow-auto px-4">
        {message ? (
          message.map((mess, index) => {
            return (
              <Message
                key={index}
                variant={mess.user === name ? "send" : "receive"}
              >
                {mess.text}
              </Message>
            );
          })
        ) : (
          <NoMessageSVG />
        )}
      </section>
      <div className="flex gap-2">
        <Input ref={inputBox} color="secondary" />
        <Button onClick={sendMess} variant="flat" color="secondary" isIconOnly>
          <SendHorizontal size={20} />
        </Button>
      </div>
    </main>
  );
};
export default Chat;
