import React, { useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
// import { DndContext } from "react-dnd";
import { DndContext, closestCorners } from "@dnd-kit/core";
import TestimonialCol from "./TestimonialCol";
import DragAndDrop from "./DragandDrop";

const Testimonials = () => {
  const path = usePath();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      review: "this is the first title ",
      name: "Dinesh",
      course: "BA HONS",
      rating: 5,
      imgLink: "https://www.neerajbooks.com/assets-new/img/testimonials/1.jpg",
    },
    {
      id: 2,
      review: "this is the second title ",
      name: "User 2",
      course: "BA HONS",
      rating: 4,
      imgLink: "https://www.neerajbooks.com/assets-new/img/testimonials/2.jpg",
    },
    {
      id: 3,
      review: "this is the third title ",
      name: "User 3",
      course: "BA HONS",
      rating: 3,
      imgLink:
        "https://www.neerajbooks.com/assets-new/img/testimonials/24ded6aa4f398469e57e00b94ba1cd82.png",
    },
    {
      id: 4,
      review: "this is the fourth title ",
      name: "User 4",
      course: "BA HONS",
      rating: 2,
      imgLink:
        "https://www.neerajbooks.com/assets-new/img/testimonials/943d399e1a32861f191ab1a431e18435.png",
    },
    {
      id: 5,
      review: "this is the fifth title ",
      name: "User 5",
      course: "BA HONS",
      rating: 1,
      imgLink:
        "https://www.neerajbooks.com/assets-new/img/testimonials/bb872a0f8b00a92f57c2d45597f4fcfd.png",
    },
  ]);

  const handleSaveSequence = () => {
    console.log("Updated Sequence:", tasks);
  };

  return (
    <PageCont>
      <div className="flex justify-between">
        <Heading text="All Testimonials" />
        <Button
          className="bg-cstm-blue flex justify-center items-center"
          onClick={() => path.changeEndPoint("addtestimonial")}
        >
          <Plus className="pr-1" />
          Add New
        </Button>
      </div>
      <div className="mt-4">
        <DragAndDrop data={tasks} onUpdate={setTasks} />
        <Button
          className="bg-cstm-blue flex justify-center items-center mt-3"
          onClick={handleSaveSequence}
        >
          Save Sequence
        </Button>
      </div>
    </PageCont>
  );
};

export default Testimonials;
