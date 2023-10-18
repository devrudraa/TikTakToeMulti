import * as Ably from "ably";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  const clientId = req.headers.get("clientId");
  if (!process.env.API_KEY) {
    return new NextResponse("Api KEY not found!", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin || "*",
      },
    });
  }
  if (!clientId) {
    return new NextResponse("Cannot found ClientId in the head", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin || "*",
      },
    });
  }

  try {
    var realtime = new Ably.Realtime({
      key: process.env.API_KEY,
    });

    const tokenDetails = await new Promise((resolve, reject) => {
      realtime.auth.createTokenRequest(
        { clientId: clientId },
        (err, tokenDetails) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(tokenDetails);
          }
        }
      );
    });

    const data = JSON.stringify({ token: tokenDetails });
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin || "*",
      },
    });
  } catch (err) {
    console.error("The Error IS", err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
