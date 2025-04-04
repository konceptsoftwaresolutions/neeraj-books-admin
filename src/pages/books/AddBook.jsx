import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useFieldArray, useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { bestSellerOptions, mediumOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../redux/features/books";
import ImageField from "../../common/fields/ImageField";
// import EditModal from "./EditModal";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "antd";
import { v4 as uuidv4 } from "uuid";
import { setDummyBooks } from "../../redux/features/dummyBook";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomTreeSelect from "../../components/CustomTreeSelect";

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCategory } = useSelector((state) => state.category);
  console.log(allCategory);

  const categoryOptions = allCategory?.map((category, index) => {
    return {
      label: category.name,
      value: category._id,
    };
  });

  // const categoryOptions = [
  //   { label: "I.G.N.O.U", value: "ignou" },
  //   { label: "N.I.O.S", value: "nios" },
  // ];

  const discountedPercentageOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      // solvedPapers: [
      //   { solvedPaperTitle: "", solvedPaperFile: null }, // Default single field
      // ],
      theoreticalExplanationOfChapters: [
        { title: "", content: null }, // Default single field
      ],
      // quiz: [
      //   {
      //     question: "",
      //     correctAnswer: "",
      //     options: ["", "", "", ""], // Default 4 options per question
      //   },
      // ],
      reviews: [
        {
          name: "",
          rating: "",
          comment: "",
        },
      ],
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "solvedPapers", // The field array name
  // });

  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    control,
    name: "theoreticalExplanationOfChapters", // The field array name for chapters
  });

  // const {
  //   fields: questions,
  //   append: addQuestion,
  //   remove: removeQuestion,
  // } = useFieldArray({
  //   control,
  //   name: "quiz",
  // });

  const {
    fields: reviewsFields,
    append: appendReview,
    remove: removeReview,
  } = useFieldArray({
    control,
    name: "reviews",
  });

  // Watch the field value
  const selectedDiscountedPercentage = watch("discountedPercentage");
  const originalPrice = watch("paperBackOriginalPrice");
  const discountpercent = watch("paperBackDiscountedPercent");
  const selectedMedium = watch("medium");
  console.log("selec", selectedMedium);

  function convertToFormData(obj, formData = new FormData(), parentKey = "") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        // Skip 'fileName' key
        if (key === "fileName") {
          continue;
        }

        // Check if value is a blobURL (string and starts with 'blob:')
        if (value && typeof value === "string" && value.startsWith("blob:")) {
          // Skip appending blobURL
          continue;
        }

        if (
          value &&
          typeof value === "object" &&
          !Array.isArray(value) &&
          !(value instanceof File) &&
          !(value instanceof Blob) && // Skip Blobs
          !(value instanceof URL) // Skip URLs
        ) {
          // Recursively call for nested objects
          convertToFormData(value, formData, formKey);
        } else if (Array.isArray(value)) {
          // Handle arrays
          value.forEach((item, index) => {
            const arrayKey = `${formKey}[${index}]`;
            if (
              typeof item === "object" &&
              !(item instanceof File) &&
              !(item instanceof Blob) && // Skip Blobs in array
              !(item instanceof URL) // Skip URLs in array
            ) {
              convertToFormData(item, formData, arrayKey);
            } else {
              formData.append(arrayKey, item);
            }
          });
        } else {
          // Handle primitive values and File objects
          formData.append(formKey, value != null ? value : "");
        }
      }
    }
    return formData;
  }

  const onSubmit = (data) => {
    console.log(data);
    const fieldsToRemoveFromEnglish = [
      "hindiVideoPreview",
      "hindiEbook",
      "hindiImage",
    ];
    const fieldsToRemoveFromHindi = ["ebook", "image", "videoPreview"];

    // Initialize the payload object
    let payload = {};
    const slug = data.title.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase & replace spaces with "-"

    // Check if 'English' is in the medium array
    if (data.medium.includes("English")) {
      payload.english = {
        ...Object.fromEntries(
          Object.entries(data).filter(
            ([key]) => !fieldsToRemoveFromEnglish.includes(key)
          )
        ),
        slug,
        medium: "english",
      };
    }

    // Check if 'Hindi' is in the medium array
    if (data.medium.includes("Hindi")) {
      payload.hindi = {
        ...Object.fromEntries(
          Object.entries(data).filter(
            ([key]) => !fieldsToRemoveFromHindi.includes(key)
          )
        ),
        slug,
        medium: "hindi",
      };
    }

    // if (data.medium.includes("English")) {
    //   dispatch(setDummyBooks([payload.english])); // Add both books to the store
    // }
    // if (data.medium.includes("Hindi")) {
    //   dispatch(setDummyBooks([payload.hindi])); // Add both books to the store
    // }

    // toast.success("Book Addedd successfully!");

    console.log(payload);
    // const formData = convertToFormData(payload);
    // // To verify the result
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    // navigate(-1);
    dispatch(addBook({ formData: formData }));
  };

  return (
    <PageCont>
      <Heading text="Book Details" />
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="title"
              label="Title"
            />
            <InputField
              control={control}
              errors={errors}
              name="medium"
              label="Medium"
              type="select"
              options={mediumOptions}
              defaultValue="English"
            />
            {/* <InputField
              control={control}
              errors={errors}
              name="edition"
              label="Edition"
              type="text"
            /> */}
            <InputField
              control={control}
              errors={errors}
              name="description"
              label="Sub Info"
              type="text"
            />

            <InputField
              control={control}
              errors={errors}
              name="paperBackOriginalPrice"
              label="Paperback Original Price"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="discountedPercentage"
              label="Discounted percentage"
              type="option"
              options={discountedPercentageOptions}
            />

            {/* Conditional rendering based on the selected value */}
            {selectedDiscountedPercentage === "yes" && (
              <>
                {" "}
                <InputField
                  control={control}
                  errors={errors}
                  name="paperBackDiscountedPercent"
                  label="Paperback Discount Off"
                  type="number"
                />{" "}
              </>
            )}

            {selectedDiscountedPercentage === "no" && (
              <>
                <InputField
                  control={control}
                  errors={errors}
                  name="paperBackDiscountedPrice"
                  label="Paperback Discounted Price"
                  type="numeric"
                />
              </>
            )}
            <InputField
              control={control}
              errors={errors}
              name="eBookOriginalPrice"
              label="E-Book Original Price"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="eBookDiscountedPrice"
              label="E-Book Discounted Price"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="bookCode"
              label="Book Code"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="edition"
              label="Edition"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="course"
              label="Course"
              type="text"
            />

            {/* <InputField
              control={control}
              errors={errors}
              name="addEbookPrice"
              label="E-Book Addition Price"
              type="number"
              defaultValue="50"
            /> */}
          </div>
          <div className="flex flex-col gap-3">
            <InputField
              control={control}
              errors={errors}
              name="commonLine"
              label="Common Line"
              type="desc"
            />
            {selectedMedium?.includes("English") && (
              <InputField
                control={control}
                errors={errors}
                name="videoPreview"
                label="English Video Preview "
                type="file"
              />
            )}
            {selectedMedium?.includes("Hindi") && (
              <InputField
                control={control}
                errors={errors}
                name="hindiVideoPreview"
                label="Hindi Video Preview"
                type="file"
              />
            )}
            <InputField
              control={control}
              errors={errors}
              name="descriptionPara"
              label="Book Description"
              type="description"
            />
            <InputField
              control={control}
              errors={errors}
              name="whatYouGetInBook"
              label="What book includes"
              type="description"
            />
            {/* <InputField
              control={control}
              errors={errors}
              name="bookDescription"
              label="Book Description"
              type="textEditor"
            /> */}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {/* <InputField
              control={control}
              errors={errors}
              name="bookCover"
              label="Book Cover"
              type="file"
            /> */}
            {/* <InputField
              control={control}
              errors={errors}
              name="previewPdf"
              label="Preview PDF"
              type="file"
            /> */}
            {/* <InputField
              control={control}
              errors={errors}
              name="category"
              label="Select Category"
              options={categoryOptions}
              type="select"
              // mode="single"
            /> */}
            <div className="mt-3">
              <CustomTreeSelect
                data={allCategory}
                control={control}
                name="categories"
                label="Select Categories" // Add a label for the input
              />
            </div>
          </div>
          {/* <div className="mt-3 ">
            <InputField
              control={control}
              errors={errors}
              name="category"
              label="Select Category"
              options={categoryOptions}
              type="select"
              mode="single"
            />
          </div> */}

          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="weight"
              label="Weight"
            />
            <InputField
              control={control}
              errors={errors}
              name="stock"
              label="Stock"
              type="number"
            />
            {/* <InputField
              control={control}
              errors={errors}
              name="discount"
              label="Discount"
              type="number"
            /> */}
            {/* <InputField
              control={control}
              errors={errors}
              name="price"
              label="MRP"
              type="text"
            /> */}

            {/* <InputField
              control={control}
              errors={errors}
              name="paperprice"
              label="E-Book(MRP)"
              type="number"
            /> */}
            <InputField
              control={control}
              errors={errors}
              name="isBestSeller"
              label="Best Seller"
              options={bestSellerOptions}
              type="select"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {selectedMedium?.includes("English") && (
              <InputField
                control={control}
                errors={errors}
                name="englishAssignment"
                label="English Assignment "
                type="file"
              />
            )}
            {selectedMedium?.includes("Hindi") && (
              <InputField
                control={control}
                errors={errors}
                name="hindiAssignment"
                label="Hindi Assignment "
                type="file"
              />
            )}
          </div>
          <div>
            {selectedMedium?.includes("English") && (
              <InputField
                control={control}
                errors={errors}
                name="ebook"
                label="Add E-Books"
                type="uploadFiles"
              />
            )}
            {selectedMedium?.includes("Hindi") && (
              <InputField
                control={control}
                errors={errors}
                name="hindiEbook"
                label="Add Hindi E-Books"
                type="uploadFiles"
              />
            )}
          </div>
          <div>
            <ImageField
              control={control}
              errors={errors}
              name={"image"}
              maxFiles={10}
              label="Upload English Book Images (530px X 700px)"
            />
          </div>

          <div>
            {selectedMedium?.includes("Hindi") && (
              <ImageField
                control={control}
                errors={errors}
                name={"hindiImage"}
                maxFiles={10}
                label="Upload Hindi Book Images (530px X 700px)"
              />
            )}
          </div>

          <div>
            <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
              <p className="font-semibold py-2">Solved Papers </p>
              {/* <Tooltip title="Add Solved Paper">
                <Button
                  variant="gradient"
                  color="blue"
                  className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                  onClick={
                    () =>
                      append({ solvedPaperTitle: "", solvedPaperFile: null }) // Append new field
                  }
                >
                  <IoIosAddCircle size={17} />
                </Button>
              </Tooltip> */}
            </div>
            {/* <div className="grid grid-cols-2 gap-3">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                >
                  <div className="grid grid-cols-2 gap-3 p-3 relative ">
                    <InputField
                      control={control}
                      errors={errors}
                      name={`solvedPapers.${index}.solvedPaperTitle`}
                      label={`Title ${index + 1}`}
                      type="text"
                    />

                    <InputField
                      control={control}
                      errors={errors}
                      name={`solvedPapers.${index}.solvedPaperFile`}
                      label="Upload File"
                      type="file"
                    />
                  </div>

                  <div className="flex justify-end pr-3">
                    <Button
                      size="sm"
                      variant="outlined"
                      color="white"
                      className="bg-red-500 w-max p-2 ml-2 "
                      onClick={() => remove(index)}
                    >
                      <MdDelete size={17} />
                    </Button>
                  </div>
                </div>
              ))}
            </div> */}
            <div className="grid grid-cols-2 gap-3 p-3">
              <div>
                <InputField
                  control={control}
                  errors={errors}
                  name="titleOfFirstSemesterSolvedPaper"
                  label="Title First Sem"
                  type="text"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="linkOfFirstSemesterSolvedPaper"
                  label="Upload File First Sem"
                  type="text"
                />
              </div>
              <div>
                <InputField
                  control={control}
                  errors={errors}
                  name="titleOfSecondSemesterSolvedPaper"
                  label="Title Second Sem"
                  type="text"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="linkOfSecondSemesterSolvedPaper"
                  label="Upload File Second Sem"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
              <p className="font-semibold">
                Theoretical Explantion Of Chapters{" "}
              </p>
              <Tooltip title="Add Solved Paper">
                <Button
                  variant="gradient"
                  color="blue"
                  className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                  onClick={
                    () =>
                      appendChapter({
                        title: "",
                        content: null,
                      }) // Append new field
                  }
                >
                  <IoIosAddCircle size={17} />
                </Button>
              </Tooltip>
            </div>

            <div>
              {chapterFields.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                >
                  <div className="grid grid-cols-1 gap-3 p-3 relative ">
                    {/* Title Input */}
                    <InputField
                      control={control}
                      errors={errors}
                      name={`theoreticalExplanationOfChapters.${index}.title`}
                      label={`Title ${index + 1}`}
                      type="text"
                    />

                    {/* File Input */}
                    <InputField
                      control={control}
                      errors={errors}
                      name={`theoreticalExplanationOfChapters.${index}.content`}
                      label="Description"
                      type="description"
                    />
                  </div>
                  {/* Remove Button */}
                  <div className="flex justify-end pr-3">
                    <Button
                      size="sm"
                      variant="outlined"
                      color="white"
                      className="bg-red-500 w-max p-2 ml-2 "
                      onClick={() => removeChapter(index)} // Remove field
                    >
                      <MdDelete size={17} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
              <p className="font-semibold ">Review & Rating</p>
              <Tooltip title="Add More Reviews">
                <Button
                  variant="gradient"
                  color="blue"
                  className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                  onClick={
                    () => appendReview({ name: "", rating: "", comment: "" }) // Append new field
                  }
                >
                  <IoIosAddCircle size={17} />
                </Button>
              </Tooltip>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {reviewsFields.map((item, index) => (
                <div
                  key={item.id}
                  style={{}}
                  className="bg-[#f5f7fb] p-2 rounded-md  mt-2 grid gap-3"
                >
                  <InputField
                    control={control}
                    errors={errors}
                    name={`reviews[${index}].name`}
                    label="Name"
                    placeholder="Enter Name"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name={`reviews[${index}].rating`}
                    label="Rating"
                    type="numeric"
                    placeholder="Enter Rating"
                    options={mediumOptions} // Pass your rating options here
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name={`reviews[${index}].comment`}
                    label="Description"
                    type="description"
                    placeholder="Enter Comment"
                  />

                  <div className="w-full flex justify-end ">
                    <Button
                      size="sm"
                      variant="outlined"
                      color="white"
                      className="bg-red-500 w-max p-2 ml-2 "
                      onClick={() => removeReview(index)}
                    >
                      <MdDelete size={17} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="mt-4">
            <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
              <p className="font-semibold">Quiz </p>
              <Tooltip title="Add Solved Paper">
                <Button
                  variant="gradient"
                  color="blue"
                  className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                  onClick={
                    () =>
                      addQuestion({
                        title: "",
                        content: null,
                      }) // Append new field
                  }
                >
                  <IoIosAddCircle size={17} />
                </Button>
              </Tooltip>
            </div>
            <div>
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
                    name={`questions.${questionIndex}.correctAnswer`}
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
          </div> */}

          <Button type="submit" className="primary-gradient mt-4 mb-4">
            Add
          </Button>
        </form>

        {/* <button>
          <h1 className="mt-7 text-black-800 text-[20px]">Review & Rating</h1>
        </button> */}
        {/* <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 ">
          <InputField
            control={control}
            errors={errors}
            name="Name"
            label="Name"
            placeholder="Name"
          />
          <InputField
            control={control}
            errors={errors}
            name="Rating"
            label="Rating"
            type="text"
            placeholder="******"
            options={mediumOptions}
          />
          <InputField
            control={control}
            errors={errors}
            name="description"
            label="Description"
            type="description"
            placeholder="Description"
          />
        </div> */}

        {/* <Button type="submit" className="primary-gradient mt-4 mb-4">
          Submit
        </Button> */}
      </div>
    </PageCont>
  );
};

export default AddBook;
