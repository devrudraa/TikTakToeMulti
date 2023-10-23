"use client";
import { FC, useEffect, useState } from "react";
import CustomNavbar from "./Navbar";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useUserName } from "@/Context/NameContext";
import { useChannel } from "@/Context/ClientAbly";
import { useIsOwner } from "@/Context/GameOwner";
import { toast } from "react-hot-toast";

interface GameBoardProps {}
interface ResetGameProps {
  name: string;
  buttonClicked?: boolean;
}

const GameBoard: FC<GameBoardProps> = ({}) => {
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const { isOwner, setIsOwner } = useIsOwner();
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const { name, opponent_name } = useUserName();
  const Channel = useChannel();

  useEffect(() => {
    Channel.publish("reset-game", { name: name });

    Channel.subscribe("update-game", ({ data }) => {
      if (data.name !== name) {
        setBoard(data.board);
        setIsMyTurn((prev) => !prev);
      }
    });

    Channel.subscribe("reset-game", ({ data }: { data: ResetGameProps }) => {
      if (data.buttonClicked) {
        toast.error(`Game was reset by: ${data.name}`);
      }
      setBoard(Array(9).fill(""));
      const shorted_names = [name, opponent_name].sort();

      if (shorted_names[0] === name) {
        setIsOwner(true);
        setIsMyTurn(true);
      } else {
        setIsOwner(false);
        setIsMyTurn(false);
      }
    });

    Channel.presence.subscribe(
      "leave",
      ({ data }: { data: { name: string } }) => {
        if (data.name === opponent_name) {
          toast.error(`${data.name} Left the game`);
        }
      }
    );
    Channel.presence.subscribe(
      "enter",
      ({ data }: { data: { name: string } }) => {
        toast.success(`${data.name} Joined the game`);
      }
    );

    return () => {
      Channel.unsubscribe("update-game");
      Channel.unsubscribe("reset-game");
      Channel.presence.unsubscribe("leave");
      Channel.presence.unsubscribe("enter");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSquareClick = (index: number) => {
    if (isMyTurn) {
      if (board[index] || calculateWinner().winner || isBoardFull()) {
        return;
      }

      // setScores({ x: 1, o: 1 });

      const newBoard = [...board];
      newBoard[index] = isOwner ? "X" : "O";

      //* Giving event to change the data
      // Channel.publish("update-board", { name: name, board: newBoard });
      Channel.publish("update-game", { name: name, board: newBoard });

      //* Changing the current user board for smooth experience
      setBoard(newBoard);
      setIsMyTurn((prev) => !prev);
    }
  };

  function isBoardFull(): boolean {
    return board.every((square) => square !== "");
  }

  function calculateWinner(): {
    winner: string | null;
    line: number[];
  } {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: lines[i] };
      }
    }

    return { winner: null, line: [] };
  }

  const renderSquare = (index: number) => {
    const isWinningSquare = calculateWinner().line.includes(index);

    const squareClass = isWinningSquare
      ? "bg-green-300"
      : getSquareBgColor(index);

    return (
      <Button
        onClick={() => handleSquareClick(index)}
        className={`aspect-square transition-all duration-300 rounded-md h-full w-full board:w-28 board:h-28 font-extrabold text-6xl grid place-items-center ${squareClass} `}
        key={index}
      >
        {board[index]}
      </Button>
    );
  };

  function getSquareBgColor(index: number) {
    const sideColor = "bg-[#6884d2]";
    const starColor = "bg-[#ece146]";
    const startArray = [0, 2, 4, 6, 8];

    if (!calculateWinner().winner) {
      if (startArray.includes(index)) {
        return starColor;
      } else {
        return sideColor;
      }
    } else {
      return "bg-gray-300";
    }
  }

  function reset() {
    const payload: ResetGameProps = { name: name, buttonClicked: true };
    Channel.publish("reset-game", payload);
  }

  return (
    <>
      <main
        className={`flex flex-col h-full ${
          isMyTurn ? "bg-red-950" : "bg-blue-950"
        }`}
      >
        <CustomNavbar />
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-8 w-full py-8 justify-center">
          {/* //! Board */}

          <section className="w-full board:h-fit flex justify-center md:justify-end  ">
            {/* {isMyTurn ? "not you turn " : "your turn"} */}
            <div className="grid grid-cols-3 grid-rows-3 board:w-fit gap-1 relative">
              <Image
                src={"/confetti.gif"}
                width={500}
                height={500}
                alt="confetti"
                className={`absolute bottom-0 right-0 z-30 ${
                  calculateWinner().winner ? "block" : "hidden"
                }`}
              />
              {board.map((_, index) => {
                return renderSquare(index);
              })}
            </div>
          </section>
          <div className="w-full px-8 space-y-8">
            {/* //! Score */}
            <h1 className="font-bold text-5xl">Lessgo 🥳</h1>
            <div className="font-semibold text-xl">
              Score:
              <div className="pl-8 ">
                <p className="text-red-400">You {isOwner ? `(X)` : `(O)`}</p>
                <p className="text-blue-400">
                  {opponent_name} {isOwner ? `(O)` : `(X)`}
                </p>
              </div>
              {/* <div className="font-semibold text-xl">
              Score:
              <div className="pl-8 ">
                <p className="text-red-400">
                  You {isOwner ? `(X): ${scores.x}` : `(O): ${scores.o}`}
                </p>
                <p className="text-blue-400">
                  {opponent_name}{" "}
                  {isOwner ? `(O): ${scores.o}` : `(X): ${scores.x}`}
                </p>
              </div> */}
            </div>
            <Button onClick={reset} color="primary" className="text-lg">
              Reset Game
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default GameBoard;
