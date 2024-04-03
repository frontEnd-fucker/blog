import { db } from "@/lib/db";
import React from "react";

import SubjectList from "./subject-list";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params: { boardId } }: BoardIdPageProps) => {
  const subjects = await db.subject.findMany({
    where: { boardId: Number(boardId) },
    orderBy: { position: "asc" },
    include: {
      cards: {
        orderBy: { position: 'asc' }
      }
    }
  });

  return (
    <div>
      <div>Here is the board page</div>
      <SubjectList data={subjects} />
    </div>
  );
};

export default BoardIdPage;
