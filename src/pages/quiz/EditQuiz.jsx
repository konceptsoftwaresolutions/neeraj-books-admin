import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm, useFieldArray } from "react-hook-form";
import InputField from "../../common/fields/InputField";
// import Button from "../../components/Button";
import { Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import {  addSingleQuizQuestion, deleteQuizQuestion, updateQuizQuestion } from "../../redux/features/quiz";

const EditQuiz = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location.state.quizData;
  console.log(data)
  const { allBooks } = useSelector((state) => state.books);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      localizedId: data?.bookId || "",
      questions: data?.quizzes || [
        {
          question: "",
          answer: "",
          options: ["", "", "", ""], // Default 4 options per question
        },
      ],
    },
  });

  const {
    fields: questions,
    append: addQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  // 🔹 Save only a single question
  // 🔹 Save (edit or add) a single question
const handleSingleSave = (index) => {
  const allQuestions = getValues("questions");
  const currentQuestion = allQuestions[index];

  if (currentQuestion.quizId) {
    // ✅ Update existing question
    const payload = {
      localizedId: data?.localizedId,
      quizId: currentQuestion.quizId,
      ...currentQuestion,
    };
    console.log("✏️ Updating Question:", payload);
    dispatch(updateQuizQuestion(payload)); // Uncomment when you have an update API
  } else {
    // 🆕 Add new question
    const payload = {
      localizedId: data?.localizedId,
      ...currentQuestion,
    };
    console.log("🆕 Adding New Question:", payload);
    dispatch(addSingleQuizQuestion(payload));
  }
};


  // 🔹 Update button still logs all new questions
  const onSubmit = (formData) => {
    const newQuestions = formData.questions.filter((q) => !q.quizId);
    console.log("🆕 All New Questions:", newQuestions);
    reset({ questions: formData.questions });
  };

  const handleQuestionDelete = (questionIndex) => {
    const toDeleteQues = questions[questionIndex];
    const payload = {
      localizedId: data?.localizedId,
      quizId: toDeleteQues?.quizId,
    };
    dispatch(deleteQuizQuestion(payload));
  };

  return (
    <PageCont>
      <div className="flex justify-between">
        <Heading text="Edit Quiz" />
      </div>

      <div className="p-3 bg-[#f5f7fb] mt-3">
        <p>
          <span className="font-semibold">Book Code -</span> {data?.bookCode}
        </p>
        <p>
          <span className="font-semibold">Book Name -</span> {data?.bookName} -{" "}
          <span className="capitalize">({data?.language})</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {questions?.map((question, questionIndex) => (
            <div
              key={question.id}
              className="flex flex-col gap-3 bg-[#f5f7fb] p-4 rounded-lg relative h-max"
            >
              <InputField
                name={`questions.${questionIndex}.question`}
                control={control}
                errors={errors}
                label={`Question ${questionIndex + 1}`}
                placeholder="Enter question"
                type="description"
              />

              <div>
                <h4 className="mb-2">Options</h4>
                <div className="flex gap-3">
                  {question.options.map((_, optionIndex) => (
                    <InputField
                      key={optionIndex}
                      name={`questions.${questionIndex}.options.${optionIndex}`}
                      control={control}
                      errors={errors}
                      placeholder={`Enter option ${optionIndex + 1}`}
                      type="description"
                    />
                  ))}
                </div>
              </div>

              <InputField
                name={`questions.${questionIndex}.answer`}
                control={control}
                errors={errors}
                label="Correct Answer"
                placeholder="Enter the correct answer"
                type="description"
              />

              <div className="flex gap-2 mt-2">
                {/* Delete Button */}
                <Button
                  type="button"
                  onClick={() => {
                    removeQuestion(questionIndex);
                    handleQuestionDelete(questionIndex);
                  }}
                  className="bg-red-500 w-max p-2"
                >
                  <MdDelete size={17} />
                </Button>

                {/* Save Button → saves only this new question */}
                
                  <Button
                    type="button"
                    onClick={() => handleSingleSave(questionIndex)}
                    className="bg-green-500 w-max p-2 flex items-center capitalize gap-1"
                  >
                    {/* <IoIosAddCircle size={18} /> */}
                     Save
                  </Button>
                
              </div>
            </div>
          ))}
        </div>

        {/* Global Add & Update buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            type="button"
            className="bg-[#f5f7fb] hover:bg-cstm-blue text-[#1f437f] hover:text-white"
            onClick={() =>
              addQuestion({
                question: "",
                answer: "",
                options: ["", "", "", ""],
              })
            }
          >
            <IoIosAddCircle size={18} />
          </Button>
          <Button type="submit">Update Quiz</Button>
        </div>
      </form>
    </PageCont>
  );
};

export default EditQuiz;
