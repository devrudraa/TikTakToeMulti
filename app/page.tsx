"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function App() {
  return (
    <div className="grid place-items-center h-full max-w-xl mx-auto p-5">
      <Image src={"/logo.png"} alt="logo" width={100} height={100} />
      <div className="text-center space-y-3">
        <h1 className="font-bold md:text-5xl text-xl">
          The Classic Game Re-imagined
        </h1>
        <p>
          Discover our hassle-free online Tic-Tac-Toe web app! In just three
          easy steps, you can enjoy multiplayer matches and chat with friends in
          the same room. Step one, visit our website. Step two, create or enter
          a room and share the code with your friends. Step three, play
          Tic-Tac-Toe and chat with your pals in real-time. It&apos;s the
          ultimate way to combine classic gaming and social interaction
          seamlessly.
        </p>
      </div>
      <div className="space-x-5">
        <Button as={Link} href="/room/create" color="secondary">
          Create Game
        </Button>
        <Button as={Link} href="/room/Join">
          Join Game
        </Button>
      </div>
    </div>
  );
}
