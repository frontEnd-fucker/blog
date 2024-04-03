"use client";

import {
  DragDropContext,
  Draggable,
  type DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Card, Subject } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

import CardForm from "./card-from";
import EditableTitle from "./editable-title";

export type ListWithCards = Subject & { cards: Card[] };

const reorder = <T,>(items: T[], sourceIdx: number, destIdx: number) => {
  const newItems = Array.from(items);
  const [movedItem] = newItems.splice(sourceIdx, 1);
  newItems.splice(destIdx, 0, movedItem);

  return newItems;
};

const SubjectList = ({ data }: { data: ListWithCards[] }) => {
  const [orderedData, setOrderedData] = useState(data);

  const { mutate: updateOrder } = useMutation({
    mutationFn: (newItems: ListWithCards[]) => {
      return axios.put("/api/trello/subject", newItems);
    },
    onSuccess: () => {
      toast.success("Subjects reordered!");
    },
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const reorderData = reorder(
      orderedData,
      result.source.index,
      result.destination.index,
    ).map((item, idx) => ({ ...item, position: idx }));
    setOrderedData(reorderData);
    updateOrder(reorderData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-4 gap-4 auto-rows-auto"
          >
            {orderedData.map((subject, index) => (
              <Draggable
                draggableId={subject.id.toString()}
                index={index}
                key={subject.id}
              >
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    // key={subject.id}
                    className="bg-slate-400/80 rounded-lg transition p-2 h-fit space-y-2"
                  >
                    <EditableTitle title={subject.title} />

                    <div className="space-y-2">
                      {subject.cards.map((card) => (
                        <div
                          key={card.id}
                          className="bg-white p-2 rounded-lg truncate cursor-pointer"
                        >
                          {card.title}
                        </div>
                      ))}
                    </div>

                    <CardForm subjectId={subject.id} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SubjectList;
