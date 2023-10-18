"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function App() {
  return (
    <div className="grid place-items-center">
      <Link href="/room/create">
        <Button>Create a Room</Button>
      </Link>
    </div>
  );
}
