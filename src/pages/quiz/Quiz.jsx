import React, { useEffect } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import usePath from "../../hooks/usePath";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../redux/features/books";
import quizImg from "../../assets/quizimg.jpg";
import { getAllQuiz } from "../../redux/features/quiz";
import { useNavigate } from "react-router-dom";

const ComboCard = ({ onViewClick, bookName, data }) => {
  return (
    <div className="border  rounded-xl text-center p-3 ">
      <div className="rounded-xl ">
        <img src={quizImg} className="rounded-lg border-none" />
      </div>
      <p className="text-base text-center pt-2">{bookName}</p>
      <Button className="mt-3 bg-cstm-blue" onClick={() => onViewClick(data)}>
        View
      </Button>
    </div>
  );
};

const Quiz = () => {
  const dispatch = useDispatch();
  const path = usePath();
  const navigate = useNavigate();

  const { role } = useSelector((state) => state.auth);

  const handleViewClick = (data) => {
    // Change the path when the "View" button is clicked
    // path.push("editquiz");
    console.log(data);
    navigate(`/${role}/quiz/editquiz`, { state: { quizData: data } });
  };

  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getAllQuiz());
  }, [dispatch]);

  const { allQuiz } = useSelector((state) => state.quiz);

  console.log(allQuiz);

  return (
    <PageCont>
      <div className="flex justify-between items-center gap-3">
        <Heading text="Quizes" />
        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center capitalize bg-cstm-blue"
          onClick={() => path.push("addquiz")}
        >
          <Plus className="pr-1" />
          Add Questions
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-3">
        {allQuiz?.map((book, index) => {
          return (
            <ComboCard
              bookName={book?.bookName}
              data={book}
              onViewClick={handleViewClick}
            />
          );
        })}
      </div>
    </PageCont>
  );
};

export default Quiz;
