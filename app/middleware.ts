import { NextResponse } from "next/server";

const allowedOrigins = [
  "https://tik-tak-toe-multi.vercel.app/",
  "https://tik-tak-toe-multi.vercel.app",
  "https://www.tik-tak-toe-multi.vercel.app",
  "https://www.tik-tak-toe-multi.vercel.app.app/",

  "http://localhost:3000",
  "http://localhost:3000/",
];

export default async function middleware(req: Request) {
  const origin = req.headers.get("origin");
  var referer = req.headers.get("referer");

  if (
    (origin && !allowedOrigins.includes(origin)) ||
    (!origin && !referer) ||
    referer
  ) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Invalid",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

export const config = {
  matcher: ["/api/auth/", "/api/auth"],
};
