import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm, useFieldArray } from "react-hook-form";
import InputField from "../../common/fields/InputField";
// import Button from "../../components/Button";
import { Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "../../redux/features/quiz";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {
  const navigate = useNavigate();
  const { allBooks } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
  } = useForm({
    defaultValues: {
      questions: [
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

  const onSubmit = (data) => {
    console.log(data); // Handle submission logic here
    dispatch(
      addQuiz(data, (success) => {
        if (success) {
          navigate(-1);
        }
      })
    );
    reset();
  };

  const transformData = (books) => {
    let rows = [];
    books?.forEach((book) => {
      if (book.english) {
        rows.push({
          value: book?.english?._id,
          label: book?.english?.title + "-" + "(English)",
          // description: book.english.description,
          // paperBackPrice: book.english.paperBackOriginalPrice,
          // eBookPrice: book.english.eBookOriginalPrice,
          // averageRating: book.english.averageRating,
          // medium: "English",
          // bookDetail: book.english,
          // outerId: book._id,
        });
      }
      if (book.hindi) {
        rows.push({
          value: book?.hindi?._id,
          label: book?.hindi?.title + "-" + "(Hindi)",
          // description: book.hindi.description,
          // paperBackPrice: book.hindi.paperBackOriginalPrice,
          // eBookPrice: book.hindi.eBookOriginalPrice,
          // averageRating: book.hindi.averageRating,
          // medium: "Hindi",
          // bookDetail: book.hindi,
          // outerId: book._id,
        });
      }
    });
    return rows;
  };

  const booksOptions = transformData(allBooks);
  console.log(booksOptions);

  return (
    <PageCont>
      <Heading text="Add Quiz" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div>
          <div className="mb-5">
            <InputField
              name="localizedId"
              control={control}
              errors={errors}
              label="Select Book"
              type="select"
              mode="single"
              options={booksOptions}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {questions.map((question, questionIndex) => (
              <div
                key={question.id}
                className="flex flex-col gap-3 bg-[#f5f7fb] p-4 rounded-lg relative h-max "
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
                        // label={`Option ${optionIndex + 1}`}
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
                <Button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="bg-red-500 w-max p-2"
                >
                  <MdDelete size={17} />
                </Button>
              </div>
            ))}
          </div>
        </div>
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
          <Button type="submit" style={{}}>
            Submit Quiz
          </Button>
        </div>
      </form>
    </PageCont>
  );
};

export default AddQuiz;
