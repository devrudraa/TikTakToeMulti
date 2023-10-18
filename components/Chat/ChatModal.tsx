"use client";
import {
  Badge,
  Button,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { MessageSquare } from "lucide-react";
import { useChannel } from "@/Context/ClientAbly";
import { useUserName } from "@/Context/NameContext";

export default function ChatModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInvisible, setInVisible] = useState<boolean>(true);
  const Channel = useChannel();
  const { opponent_name } = useUserName();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key.toLocaleLowerCase() === "k" &&
        (event.ctrlKey || event.metaKey)
      ) {
        event.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onOpen]);

  Channel.subscribe("send_message", () => {
    setInVisible(false);
  });

  return (
    <>
      <Badge content="" color="primary" isInvisible={isInvisible}>
        <Button
          onClick={() => {
            onOpen();
            setInVisible(true);
          }}
          variant="light"
          className="flex items-center bg-gray-100 rounded-lg px-2"
        >
          <MessageSquare />
          <Kbd keys={["command"]}>K</Kbd>
        </Button>
      </Badge>
      <Modal
        className="max-h-[100vh] overflow-y-scroll hideScrollBar backdrop-blur-xl bg-white/50"
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setInVisible(true);
        }}
      >
        <ModalContent>
          <ModalHeader>
            <User
              name={opponent_name}
              avatarProps={{
                src: `https://api.dicebear.com/7.x/open-peeps/svg?seed=${Math.random()}`,
              }}
            />
          </ModalHeader>
          <ModalBody>
            <Chat />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
