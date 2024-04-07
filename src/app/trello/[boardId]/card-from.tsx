"use client";

import { cardSchema } from "@/app/api/trello/card/schema";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Textarea } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Inputs = z.infer<typeof cardSchema>;

interface CardFormProps {
  subjectId: number;
}

const CardForm = ({ subjectId }: CardFormProps) => {
  const router = useRouter();
  const [editting, setEditting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(cardSchema),
  });

  const { mutate: createCard, isPending } = useMutation({
    mutationFn(newCard: Inputs) {
      return axios.post("/api/trello/card", newCard);
    },
    onSuccess() {
      toast.success("Card created!");
      router.refresh();
    },
    onError(error) {
      // setErrorMsg(error.message);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    createCard(data);
  };

  if (!editting) {
    return (
      <div onClick={() => setEditting(true)}>
        <div className="bg-white p-2 rounded-lg truncate flex gap-2 items-center cursor-pointer">
          <PlusCircleIcon className="w-4 h-4" />
          <p>Add A Card</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          {...register("title")}
          variant="bordered"
          placeholder="Enter your title"
          errorMessage={errors.title?.message}
        />

        <input
          type="hidden"
          value={subjectId}
          {...register("subjectId", { valueAsNumber: true })}
        />

        <div className="flex gap-2 mt-2 justify-end">
          <Button type="submit" size="sm" isLoading={isPending}>
            Add
          </Button>
          <Button onClick={() => setEditting(false)} size="sm">
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
