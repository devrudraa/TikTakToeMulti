"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { DoesRoomExist } from "@/lib/RoomCheck";
import toast from "react-hot-toast";

interface JoinRoomFormProps {}
const JoinRoomForm: FC<JoinRoomFormProps> = ({}) => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [oldName, setOldName] = useState<string | null>(null);

  useEffect(() => {
    setOldName(localStorage.getItem("name"));
  }, []);

  const FormData = z.object({
    name: z.string().min(3).max(10),
    id: z.string().min(21).max(21),
  });

  type FormType = z.infer<typeof FormData>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormData),
    defaultValues: {
      id: roomId ? roomId : "",
      name: oldName ? oldName : "",
    },
  });

  async function FormSubmitted(data: FormType) {
    setLoading(true);
    const response = await DoesRoomExist({ name: data.name, roomId: data.id });
    setLoading(false);

    if (!response) {
      toast.error("Room does not exist");
      return;
    } else if (response === 500) {
      toast.error("Something went wrong try again");
      return;
    }
    localStorage.setItem("name", data.name);
    router.replace(`/game/${data.id}?name=${data.name}`);
  }
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Join a room</h2>
      <form onSubmit={handleSubmit(FormSubmitted)} className="space-y-5">
        <Input
          {...register("name")}
          label="Name"
          type="text"
          size="sm"
          placeholder="Your Name"
          className="text-black"
        />
        {errors.name ? (
          <span className="text-sm text-danger mt-5">
            {errors.name.message}
          </span>
        ) : (
          ""
        )}
        <Input
          {...register("id")}
          label="Room ID"
          type="text"
          placeholder="-pWltuPW9__Aq7Umdo7H9"
          size="sm"
          className="text-black"
        />
        {errors.id ? (
          <span className="text-sm text-danger mt-5">{errors.id.message}</span>
        ) : (
          ""
        )}

        <Button
          isLoading={loading}
          isDisabled={loading}
          color="secondary"
          type="submit"
          className="w-full"
        >
          Join
        </Button>
      </form>
      <div className="mt-4">
        <div className="flex gap-2 items-center my-5">
          <div className="h-[1px] w-full bg-black" />
          <label htmlFor="">or</label>
          <div className="h-[1px] w-full bg-black" />
        </div>

        <Button
          as={Link}
          href="/room/create"
          color="secondary"
          type="button"
          className="w-full"
        >
          Create a Room
        </Button>
      </div>
    </>
  );
};
export default JoinRoomForm;
