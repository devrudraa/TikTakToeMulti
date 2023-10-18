import { Realtime } from "ably";

type DoesRoomExistProp = {
  name: string;
  roomId: string;
};

export async function DoesRoomExist({ name, roomId }: DoesRoomExistProp) {
  const headers = new Headers();
  headers.append("clientId", name);

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

  const Channel = Client.channels.get(roomId);

  return new Promise((resolve, reject) => {
    Channel.presence.get((err, presencePage) => {
      if (err) {
        if (err.statusCode !== 400) {
          reject(500);
        }
      }
      if (presencePage) {
        if (presencePage.length === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    });
  });
}
