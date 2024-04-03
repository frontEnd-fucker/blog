"use client";

import { Input } from "@nextui-org/react";
import React, { ElementRef, useEffect, useRef, useState } from "react";

interface EditableTitleProps {
  title: string;
}

const EditableTitle = ({ title }: EditableTitleProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const [inputVal, setInputVal] = useState(title);
  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    if (isEditting) {
      inputRef.current?.focus();
    }
  }, [isEditting]);

  const enableEdit = () => {
    setIsEditting(true);
  };

  const disableEdit = () => {
    setIsEditting(false);
    setInputVal(title);
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
