"use client";

import { updateSubjectSchema } from "@/app/api/subject/schema";
import { Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface EditableTitleProps {
  title: string;
  subjectId: number;
}

const EditableTitle = ({ title, subjectId }: EditableTitleProps) => {
  const router = useRouter();

  const [isEditting, setIsEditting] = useState(false);
  const [inputVal, setInputVal] = useState(title);
  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    if (isEditting) {
      inputRef.current?.focus();
    }
  }, [isEditting]);

  const { mutate: updateTitle } = useMutation({
    mutationFn: (input: z.infer<typeof updateSubjectSchema>) => {
      return axios.put("/api/subject", input);
    },
    onSuccess() {
      toast.success("Subject title updated!");
      router.refresh();
    },
  });

  const enableEdit = () => {
    setIsEditting(true);
  };

  const disableEdit = () => {
    setIsEditting(false);
    setInputVal(title);
    updateTitle({
      title: inputVal,
      boardId: 1,
      id: subjectId,
    });
  };

  return (
    <div className=" hover:ring-2 hover:ring-gray-50 truncate">
      {isEditting ? (
        <div>
          <Input
            ref={inputRef}
            onBlur={disableEdit}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>
      ) : (
        <div onClick={enableEdit}>{title}</div>
      )}
    </div>
  );
};

export default EditableTitle;
