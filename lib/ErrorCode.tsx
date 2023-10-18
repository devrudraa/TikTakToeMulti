import { Button } from "@nextui-org/react";
import Link from "next/link";
// import { Link } from "@nextui-org/react";

export const ErrorCode = ({ roomId }: { roomId: string }) => {
  return [
    {
      status: 404,
      error_title: "The room you're looking for does not exist.",
      error_para: [
        {
          title: "Typo or Mistake: ",
          para: "The room name or identifier might have been entered incorrectly.",
        },
        {
          title: "Deletion: ",
          para: "The room may have been deleted or removed.",
        },
        {
          title: "Expired: ",
          para: "It might be a temporary room or an event-specific room that has now expired.",
        },
      ],
    },
    {
      status: 409,
      error_title: "A user with same name already exists",
      error_para: [
        {
          title: "Error: ",
          para: "It seems that there is already a user with the same name in our system. To avoid confusion, please select a unique username that sets you apart from others.",
        },
      ],
      error_html: (
        <Link href={"/room/join?room=" + roomId}>
          <Button
            className="w-full flex items-center font-semibold mt-5"
            color="warning"
          >
            Try again with different name?
          </Button>
        </Link>
      ),
    },
    {
      status: 423,
      error_title: "Room Occupied by Maximum Players",
      error_para: [
        {
          title: "Error: ",
          para: "The room you're attempting to join is at full capacity. Unfortunately, it's currently unable to accommodate additional participants. Please consider trying another room or returning later.",
        },
      ],
    },
    {
      status: 500,
      error_title: "Internal Server Error!",
      error_para: [
        {
          title: "Internal Server Error: ",
          para: "Oops! Something went wrong on our end. Our technical team is already on it, and we apologize for the inconvenience. Please try your request again later. We'll do our best to have things running smoothly as soon as possible.",
        },
      ],
    },
  ];
};
