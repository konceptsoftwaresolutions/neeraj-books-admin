import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button, Spinner } from "@material-tailwind/react";
import usePath from "../../hooks/usePath";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../redux/features/books";
import quizImg from "../../assets/quizimg.jpg";
import { getAllQuiz } from "../../redux/features/quiz";
import { useNavigate } from "react-router-dom";
import QuizFilterDrawer from "./QuizFilterDrawer";

const ComboCard = ({ onViewClick, bookName, data, bookCode }) => {
  return (
    <div className="border rounded-xl text-center p-3">
      <div className="rounded-xl">
        <img src={quizImg} className="rounded-lg border-none" />
      </div>
      <p className="text-base text-center pt-2">{bookCode}</p>
      <p className="text-sm text-center">({bookName})</p>
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

  const [allQuiz, setAllQuiz] = useState([]);
  const [filteredQuiz, setFilteredQuiz] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [storedFilters, setStoredFilters] = useState({});
  const [loading, setLoading] = useState(false); // 🔹 loading state

  const handleViewClick = (data) => {
    navigate(`/${role}/quiz/editquiz`, { state: { quizData: data } });
  };

  useEffect(() => {
    setLoading(true); // start loading
    dispatch(getAllBooks());
    dispatch(
      getAllQuiz((success, data) => {
        if (success) {
          setAllQuiz(data);
          setFilteredQuiz(data);
        }
        setLoading(false); // stop loading
      })
    );
  }, [dispatch]);

  const onApplyFilter = (filters) => {
    setStoredFilters(filters);

    let filtered = allQuiz;

    if (filters.bookName || filters.bookCode) {
      filtered = allQuiz.filter((quiz) => {
        const matchesBookName =
          filters.bookName &&
          quiz.bookName
            .toLowerCase()
            .includes(filters.bookName.toLowerCase().trim());

        const matchesBookCode =
          filters.bookCode &&
          quiz.bookCode
            .toLowerCase()
            .includes(filters.bookCode.toLowerCase().trim());

        return matchesBookName || matchesBookCode;
      });
    }

    setFilteredQuiz(filtered);
  };

  const onCancelFilter = () => {
    setStoredFilters({});
    setFilteredQuiz(allQuiz);
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center gap-3">
        <Heading text="Quizzes" />
        <div className="flex gap-2">
          <Button
            type="button"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center capitalize bg-gray-600"
            onClick={() => setIsDrawerVisible(true)}
          >
            Filter
          </Button>
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
      </div>

      {/* 🔹 Show loader when fetching */}
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading ...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
          {filteredQuiz?.length > 0 ? (
            filteredQuiz.map((book) => (
              <ComboCard
                key={book.bookId}
                bookName={book?.bookName}
                data={book}
                bookCode={book?.bookCode}
                onViewClick={handleViewClick}
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No quizzes found
            </p>
          )}
        </div>
      )}

      <QuizFilterDrawer
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        onApplyFilter={onApplyFilter}
        onCancelFilter={onCancelFilter}
        initialFilters={storedFilters}
      />
    </PageCont>
  );
};

export default Quiz;
