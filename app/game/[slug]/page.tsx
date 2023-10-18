"use client";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Realtime } from "ably";
import { ClientContext } from "@/Context/ClientAbly";
import { Types } from "ably";
import RoomPreChecking from "@/components/RoomPreChecking";
import { MessageProvider } from "@/Context/MessageContext";

interface PageProps {
  params: {
    slug: string;
  };
}
const Page: FC<PageProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name"));
  const [loading, setLoading] = useState<boolean>(true);
  const [ChannelGlobal, setChannelGlobal] =
    useState<Types.RealtimeChannelCallbacks | null>(null);
  const [ClientGlobal, setClientGlobal] = useState<Realtime | null>(null);

  const { slug } = params;

  useEffect(() => {
    const headers = new Headers();
    headers.append("clientId", name ? name : "unnamed");

    async function get_token() {
      const response = await fetch(`/api/auth`, {
        method: "GET",
        headers: headers,
      });
      if (response.status === 500) return;
      const { token } = await response.json();
      return token;
    }

    const Client = new Realtime({
      authCallback: async (tokenParams, callback) => {
        try {
          const tokenRequest = await get_token(); // Make a network request to your server
          callback(null, tokenRequest);
        } catch (error) {
          // @ts-ignore
          callback(error, null);
        }
      },
    });

    const Channel = Client.channels.get(slug);
    setChannelGlobal(Channel);
    setClientGlobal(Client);
    setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
        <MessageProvider>
          <ClientContext.Provider value={ChannelGlobal}>
            <RoomPreChecking
              ClientGlobal={ClientGlobal}
              roomId={slug}
              name={name!}
            />
          </ClientContext.Provider>
        </MessageProvider>
      ) : (
        <div className="grid place-items-center h-full ">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Page;
