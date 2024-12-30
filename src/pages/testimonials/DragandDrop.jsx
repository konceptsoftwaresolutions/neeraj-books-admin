import React from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const DraggableItem = ({ id, title, name, imgLink, course }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="w-full flex justify-between">
        <div>
          <div className="flex ">
            <span className="text-sm">{name}</span>
            <span className="text-sm ml-3">subtext</span>
            
            <span className="text-sm ml-3">{course}</span>
            <div className="ml-3">
              <p className="text-sm">rating</p>
            </div>
          </div>

          <div>{title}</div>
        </div>
        <div>
          <div>
            <img src={imgLink} className="w-[50px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DragAndDrop = ({ data, onUpdate }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((item) => item.id === active.id);
    const newIndex = data.findIndex((item) => item.id === over.id);

    const updatedData = [...data];
    const [movedItem] = updatedData.splice(oldIndex, 1);
    updatedData.splice(newIndex, 0, movedItem);

    onUpdate(updatedData);
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext
        items={data.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {data.map((item, index) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            title={item.review}
            name={item.name}
            imgLink={item.imgLink}
            course={item.course}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DragAndDrop;
