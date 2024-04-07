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
  const [preData, setPreData] = useState(data);

  if (data !== preData) {
    setOrderedData(data);
    setPreData(data);
  }

  const { mutate: updateSubjectOrder } = useMutation({
    mutationFn: (newItems: ListWithCards[]) => {
      return axios.put("/api/trello/subject", newItems);
    },
    onSuccess: () => {
      toast.success("Subjects reordered!");
    },
  });

  const { mutate: updataCardOrder } = useMutation({
    mutationFn: (newItems: Card[]) => {
      return axios.put("/api/trello/card-order", newItems);
    },
    onSuccess: () => {
      toast.success("Cards reordered!");
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (result.type === "list") {
      const reorderData = reorder(
        orderedData,
        source.index,
        destination.index,
      ).map((item, idx) => ({ ...item, position: idx }));
      setOrderedData(reorderData);
      updateSubjectOrder(reorderData);
    }

    if (result.type === "card") {
      const newOrderData = [...orderedData];

      const sourceList = newOrderData.find(
        (list) => list.id.toString() === source.droppableId,
      );
      const destList = newOrderData.find(
        (list) => list.id.toString() === destination.droppableId,
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // move in the same list
      if (source.droppableId === destination.droppableId) {
        const reroderCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        reroderCards.forEach((card, idx) => {
          card.position = idx;
        });

        sourceList.cards = reroderCards;

        setOrderedData(newOrderData);
        updataCardOrder(sourceList.cards);
      } else {
        // move into other list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.subjectId = destList.id;

        destList.cards.splice(destination.index, 0, movedCard);

        // Update the order for each card in the destination list
        destList.cards.forEach((card, idx) => {
          card.position = idx;
        });

        setOrderedData(newOrderData);
        updataCardOrder(destList.cards);
      }
    }
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
                    <EditableTitle
                      title={subject.title}
                      subjectId={subject.id}
                    />

                    <Droppable droppableId={subject.id.toString()} type="card">
                      {(provided) => (
                        <div
                          className="flex flex-col gap-y-2"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {subject.cards.map((card, index) => (
                            <Draggable
                              draggableId={card.id}
                              index={index}
                              key={card.id}
                            >
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  key={card.id}
                                  className="bg-white p-2 rounded-lg truncate cursor-pointer"
                                >
                                  {card.title}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

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
