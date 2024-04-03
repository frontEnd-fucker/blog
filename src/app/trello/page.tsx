import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const TrelloHomePage = () => {
  return (
    <div>
      <div>Here is the board list</div>
      <Button>
        <Link href="/trello/1">Board 1</Link>
      </Button>
    </div>
  );
};

export default TrelloHomePage;
