import { ErrorCode } from "@/lib/ErrorCode";
import { Button } from "@nextui-org/react";
import { ArrowLeft, RotateCw } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ErrorPageProps {
  error: number;
  roomId: string;
}
const ErrorPage: FC<ErrorPageProps> = ({ error, roomId }) => {
  const router = useRouter();

  const ErrorCodeComponent = ErrorCode({ roomId });
  const CurrentError = ErrorCodeComponent.find((item) => item.status === error);

  return (
    <section className="grid w-full h-full place-items-center py-5 ">
      <div className="p-5 rounded-md bg-gray-600/50 backdrop-blur-lg space-y-5 max-w-[23rem]">
        <Image
          src={"/Error.png"}
          width={200}
          height={200}
          className="mx-auto"
          alt="Nothing"
        />
        {/* </div> */}

        <p className="font-bold text-xl text-warning-500 text-center">
          {CurrentError?.error_title}
        </p>
        {CurrentError?.error_para
          ? CurrentError?.error_para.map((error, i) => {
              return (
                <ol key={i}>
                  <li>
                    <span className="font-semibold">{error.title}</span>
                    {error.para}
                  </li>
                </ol>
              );
            })
          : ""}
        {CurrentError?.error_html ? (
          CurrentError?.error_html
        ) : (
          <Button
            onClick={router.refresh}
            className="w-full flex items-center font-semibold"
            color="warning"
          >
            Retry <RotateCw size={15} />
          </Button>
        )}
        <Button
          onClick={() => router.push("/")}
          className="w-full flex items-center font-semibold"
          color="secondary"
        >
          <ArrowLeft size={15} />
          Back To Home
        </Button>
      </div>
    </section>
  );
};
export default ErrorPage;
