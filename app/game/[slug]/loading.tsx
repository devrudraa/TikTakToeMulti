import { FC } from "react";

interface loadingProps {}
const loading: FC<loadingProps> = ({}) => {
  return (
    <div className="grid place-items-center h-full ">
      <div className="loader"></div>
    </div>
  );
};
export default loading;
