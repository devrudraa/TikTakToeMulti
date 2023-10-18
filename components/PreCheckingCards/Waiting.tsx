import { Snippet, Tooltip } from "@nextui-org/react";
import { FC } from "react";
import OrDivider from "../OrDivider";
import { InfoIcon } from "lucide-react";

interface WaitingProps {
  roomId: string;
}
const Waiting: FC<WaitingProps> = ({ roomId }) => {
  return (
    <section className="grid w-full h-full place-items-center">
      <div className="p-5 rounded-md bg-gray-600/50 backdrop-blur-lg space-y-5 max-w-[23rem]">
        <div className="!w-full items-center flex">
          <div className="loaderEye mx-auto"></div>
        </div>

        <div className="space-y-5">
          <h1 className="font-semibold text-lg">
            Waiting for a game partner to join.
          </h1>

          <label htmlFor="">
            Do you know someone who can play with you? 🤔 Invite them to join
            the fun! 😁
          </label>

          <span className="flex gap-3 items-center">
            Do not close this tab!
            <Tooltip
              showArrow={true}
              content="Closing this tab will end your room session."
            >
              <InfoIcon size={15} />
            </Tooltip>
          </span>
        </div>

        <div className="bg-gray-500/50 p-3 rounded-xl space-y-2 ">
          <label htmlFor="Snippet">Copy room code</label>
          <div className="flex gap-1 w-full items-center">
            <Snippet hideSymbol className="w-full">
              {roomId}
            </Snippet>
          </div>
        </div>
        <OrDivider />
        <div className="bg-gray-500/50 p-3 rounded-xl space-y-2 ">
          <label htmlFor="Snippet">Copy room invite link</label>
          <div className="flex gap-1 w-full items-center ">
            <Snippet
              hideSymbol
              className="w-full"
              codeString={window.location.origin + "/room/join?room=" + roomId}
            >
              {"/join?room=" + roomId}
            </Snippet>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Waiting;
