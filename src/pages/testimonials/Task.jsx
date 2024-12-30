import { useSortable } from '@dnd-kit/sortable'
import React from 'react'
import { CSS } from '@dnd-kit/utilities'

const Task = ({id,title}) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
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
          {title}
        </div>
      );
}

export default Task
