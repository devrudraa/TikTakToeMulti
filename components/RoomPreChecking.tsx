"use client";
import { useChannel } from "@/Context/ClientAbly";
import { NameContext } from "@/Context/NameContext";
import { FC, useEffect, useState } from "react";
import GameBoard from "./GamBoard";
import { useMessage } from "@/Context/MessageContext";
import { Realtime } from "ably";
import Waiting from "./PreCheckingCards/Waiting";
import { useIsOwner } from "@/Context/GameOwner";
import ErrorPage from "./PreCheckingCards/Error";

interface OpponentWaitingProps {
  name: string;
  roomId: string;
  ClientGlobal: Realtime | null;
}
interface Message {
  data: { messages: { text: string; user: string } };
}

const RoomPreChecking: FC<OpponentWaitingProps> = ({
  name,
  ClientGlobal,
  roomId,
}) => {
  const Channel = useChannel();
  const { isOwner } = useIsOwner();
  const [error, setError] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [opponent_name, setOpponent_name] = useState<string | null>(null);
  const [isMessageSubscribed, setIsMessageSubscribed] =
    useState<boolean>(false);
  const { setMessage } = useMessage();

  function setUserError(message: number) {
    setLoading(false);
    setError(message);
    ClientGlobal?.close();
    Channel.off();
    Channel.presence.leave();
  }

  useEffect(() => {
    Channel.presence.enter({ name: name }, (err) => {
      if (err) {
        if (err.statusCode !== 400) {
          setUserError(500);
          return;
        }
      }
      Channel.presence.get((err, presencePage) => {
        if (err) {
          if (err.statusCode !== 400) {
            setUserError(500);
            return;
          }
        }
        if (presencePage && !error) {
          presencePage.map((client) => {
            if (
              client.clientId === name &&
              ClientGlobal?.connection.id != client.connectionId
            ) {
              setUserError(409);
              return;
            }
          });

          if (presencePage.length >= 2) {
            setUserError(423);
            return;
          }

          if (!isOwner) {
            if (presencePage.length === 0) {
              setUserError(404);
              return;
            } else if (!isOwner && presencePage.length === 1) {
              if (
                presencePage[0].clientId === name &&
                presencePage[0].connectionId === ClientGlobal?.connection.id
              ) {
                setUserError(404);
                return;
              }
            }
          }

          Channel.publish("refresh-game", null);
        }
      });
    });

    //! This will run only once no matter what
    if (!isMessageSubscribed) {
      Channel.subscribe("send_message", ({ data }: Message) => {
        setMessage((oldMess) => {
          return oldMess ? [...oldMess, data.messages] : [data.messages];
        });
      });
      setIsMessageSubscribed(true);
    }

    Channel.subscribe("refresh-game", () => {
      setLoading(false);
      Channel.presence.get((err, presencePage) => {
        if (err) {
          console.error("Something went wrong during checking user presence");
        }
        if (presencePage && !error) {
          presencePage.map((client) => {
            if (client.clientId !== name) {
              setOpponent_name(client.clientId);
            }
          });
        }
      });
    });

    return () => {
      Channel.presence.leave(name);
      Channel.unsubscribe("send_message");
      Channel.unsubscribe("enter");
      setIsMessageSubscribed(false);
      setOpponent_name(null);
      setLoading(false);
    };
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center h-full ">
        <div className="loader"></div>
      </div>
    );
  } else if (error) {
    return <ErrorPage roomId={roomId} error={error} />;
  }

  return (
    <>
      {!error && opponent_name ? (
        <NameContext.Provider
          value={{
            name: name,
            opponent_name: opponent_name,
            setOpponent_name: setOpponent_name,
          }}
        >
          <GameBoard />
        </NameContext.Provider>
      ) : (
        <Waiting roomId={roomId} />
      )}
    </>
  );
};
export default RoomPreChecking;
