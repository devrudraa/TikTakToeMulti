import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}
const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="grid place-items-center h-full">
      <div className="bg-black/50 rounded-lg shadow-md p-8 max-w-[23rem] w-full space-y-5 backdrop-blur-xl h-fit">
        {children}
      </div>
    </div>
  );
};
export default layout;
