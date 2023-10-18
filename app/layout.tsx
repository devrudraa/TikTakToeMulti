import Provider from "@/lib/Provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tik Tak Toe - Dev Rudra",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <body className={`${inter.className}`}>
        <Provider>
          <main className="flex flex-col h-screen bg-[url('/gradient.jpg')] bg-fixed bg-cover text-white overflow-auto">
            <section className="flex-grow">{children}</section>
            <Toaster position="bottom-right" />
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}