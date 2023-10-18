import { FC } from "react";
import ChatModal from "./Chat/ChatModal";
import Image from "next/image";

interface NavbarProps {}
const CustomNavbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="px-5 py-3 w-full bg-primary bg-white/10 backdrop-blur-xl">
      <ul className="flex justify-between">
        <li>
          <Image
            src={"/logo.png"}
            height={50}
            width={50}
            alt="logo tik tak toe"
          />{" "}
        </li>
        <div className="flex gap-3 items-center">
          <li>
            <ChatModal />
          </li>
        </div>
      </ul>
    </nav>
  );
};
export default CustomNavbar;
