import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function Issue() {
  return (
    <div>
      <Button>
        <Link href="/issue/create">Create</Link>
      </Button>
    </div>
  );
}
