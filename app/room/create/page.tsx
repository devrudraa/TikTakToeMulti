"use client";
import { Button, Input, Skeleton, Snippet } from "@nextui-org/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useIsOwner } from "@/Context/GameOwner";

interface CreateRoomFormProps {}
const CreateRoomForm: FC<CreateRoomFormProps> = ({}) => {
  const router = useRouter();
  const { setIsOwner } = useIsOwner();
  const [RoomName] = useState<string>(nanoid());
  const [loading, setLoading] = useState<boolean>(false);
  const [writeRoomID, setWriteRoomID] = useState<boolean>(false);

  useEffect(() => {
    setWriteRoomID(true);
  }, []);

  const FormData = z.object({
    name: z.string().min(3).max(10),
  });

  type FormType = z.infer<typeof FormData>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormData),
  });

  function FormSubmitted(data: FormType) {
    setLoading(true);
    setIsOwner(true);
    router.replace(`/game/${RoomName}?name=${data.name}`);
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Create a room</h2>
      <form onSubmit={handleSubmit(FormSubmitted)} className="space-y-5">
        <Input
          {...register("name")}
          label="Your Name"
          type="text"
          size="sm"
          className="text-black"
        />
        {errors.name ? (
          <span className="text-sm text-danger mt-5">
            {errors.name.message}
          </span>
        ) : (
          ""
        )}

        {writeRoomID ? (
          <Snippet className="w-full">{RoomName}</Snippet>
        ) : (
          <Skeleton className="rounded-xl w-full h-[2.5rem] bg-gray-500" />
        )}
        <Button
          color="secondary"
          type="submit"
          className="w-full"
          isLoading={loading}
          isDisabled={!writeRoomID || loading}
        >
          Create
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
          href="/room/join"
          color="secondary"
          type="button"
          className="w-full"
        >
          Join Room by Code
        </Button>
      </div>
    </>
  );
};
export default CreateRoomForm;
