"use client";

import { issueSchema } from "@/app/api/issue/schema";
import http from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type Inputs = z.infer<typeof issueSchema>;

const Create = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    resolver: zodResolver(issueSchema),
  });

  const { mutate: createIssue, isPending } = useMutation({
    mutationFn(newIssue: Inputs) {
      return http.post("/api/issue", newIssue);
    },
    onSuccess() {
      router.replace("/issue");
    },
    onError(error) {
      setErrorMsg(error.message);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    createIssue(data);
  };

  return (
    <div className="p-8">
      {errorMsg && <p>{errorMsg}</p>}
      <form
        className="max-w-lg space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setErrorMsg("")}
      >
        <div>
          <Input
            size="sm"
            errorMessage={errors.title?.message}
            placeholder="Title"
            {...register("title")}
          />
        </div>

        {/* <div>
          <Textarea
            size="sm"
            errorMessage={errors.description?.message}
            {...register("description")}
          />
        </div> */}

        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE {...field} />}
          />
        </div>

        <Button type="submit" isLoading={isPending}>
          Create New Issue
        </Button>
      </form>
    </div>
  );
};

export default Create;
