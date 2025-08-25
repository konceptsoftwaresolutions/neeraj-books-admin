import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import InputField from "../../common/fields/InputField";
import { bestSellerOptions, mediumOptions } from "../../constant/options";
import Heading from "../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBook,
  getEnglishProdImagesLink,
  getEngProductImagesName,
  getHindiProductImagesName,
} from "../../redux/features/books";
import { MdDelete } from "react-icons/md";
import ImageField from "../../common/fields/ImageField";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

import { Tooltip } from "antd";
import {
  deleteDummyBook,
  updateDummyBook,
} from "../../redux/features/dummyBook";
import CustomTreeSelect from "../../components/CustomTreeSelect";

const discountedPercentageOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const EditBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { allCategory } = useSelector((state) => state.category);

  const { rowData, medium, outerId } = location.state || {};
  // console.log("-------", rowData);
  // console.log(">>>>>>>>", medium);
  // console.log("//////////", outerId);
  const categoryOptions = [
    { label: "I.G.N.O.U", value: "ignou" },
    { label: "N.I.O.S", value: "nios" },
  ];

  const [isEditable, setIsEditable] = useState(false);
  const [productImages, setProductImages] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      isBestSeller: rowData.isBestSeller || "",
      categories: rowData.categories || "",
      title: rowData.title || "",
      medium: medium || "",
      description: rowData.description || "",
      paperBackOriginalPrice: rowData.paperBackOriginalPrice || "",
      paperBackDiscountedPrice: rowData.paperBackDiscountedPrice || "",
      discountedPercentage: rowData.discountedPercentage || "",
      eBookOriginalPrice: rowData.eBookOriginalPrice || "",
      eBookDiscountedPrice: rowData.eBookDiscountedPrice || "",
      addEbookPrice: rowData.addEbookPrice || "",
      descriptionPara: rowData.descriptionPara || "",
      titleOfFirstSemesterSolvedPaper:
        rowData.titleOfFirstSemesterSolvedPaper || "",
      linkOfFirstSemesterSolvedPaper:
        rowData.linkOfFirstSemesterSolvedPaper || "",
      titleOfSecondSemesterSolvedPaper:
        rowData.titleOfSecondSemesterSolvedPaper || "",
      linkOfSecondSemesterSolvedPaper:
        rowData.linkOfSecondSemesterSolvedPaper || "",
      solvedPapers: rowData.solvedPapers || [
        { solvedPaperTitle: "", solvedPaperFile: null },
      ],
      theoreticalExplanationOfChapters:
        rowData.theoreticalExplanationOfChapters || [
          { title: "", content: "" },
        ],
      quiz: rowData.quiz || [
        {
          question: "",
          correctAnswer: "",
          options: ["", "", "", ""],
        },
      ],
      reviews: rowData.reviews || [
        {
          name: "",
          rating: "",
          comment: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "solvedPapers", // The field array name
  });

  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    control,
    name: "theoreticalExplanationOfChapters", // The field array name for chapters
  });

  const {
    fields: reviewsFields,
    append: appendReview,
    remove: removeReview,
  } = useFieldArray({
    control,
    name: "reviews",
  });

  const {
    fields: questions,
    append: addQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "quiz",
  });

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

    // Check if 'English' is in the medium array
    if (data.medium.includes("English")) {
      payload.english = {
        ...Object.fromEntries(
          Object.entries(data).filter(
            ([key]) => !fieldsToRemoveFromEnglish.includes(key)
          )
        ),
        id: rowData?._id, // Add rowData._id here

        medium: "English",
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
        id: rowData?._id, // Add rowData._id here

        medium: "Hindi",
      };
    }

    console.log("id is ", rowData?._id);
    console.log("edit payload is", payload);

    // Check if the rowData._id exists for updating the book
    if (rowData?._id) {
      if (payload.english) {
        dispatch(
          updateDummyBook({ _id: rowData._id, updatedData: payload.english })
        );
      }
      if (payload.hindi) {
        dispatch(
          updateDummyBook({ _id: rowData._id, updatedData: payload.hindi })
        );
      }
    }

    navigate(-1);

    // const final = { ...data, _id: "" };
    // dispatch(editBookDetails(final));
  };

  const handleBookDelete = (final) => {
    let id = "";
    const data = { _id: id };
    const rowId = rowData?._id;
    dispatch(deleteDummyBook({ _id: rowId })); // Dispatch the delete action with the _id
    navigate(-1);
    // dispatch(deleteBook(data));
  };

  const selectedDiscountedPercentage = watch("discountedPercentage");
  const selectedMedium = watch("medium");

  useEffect(() => {
    if (rowData?.title && medium === "English") {
      dispatch(
        getEngProductImagesName(rowData?.title, (array) => {
          console.log("fetched array hello", array);
          setProductImages(array); // Store the fetched array in the state
        })
      );
    }
    if (rowData?.title && medium === "Hindi") {
      console.log("hello", rowData);
      dispatch(
        getHindiProductImagesName(rowData?.title, (array) => {
          console.log("fetched array", array);
          setProductImages(array); // Store the fetched array in the state
        })
      );
    }
  }, [rowData, dispatch]);

  useEffect(() => {
    if (productImages?.length > 0 && medium === "English") {
      productImages?.map((name, index) => {
        const payload = {
          fileName: name,
          productId: outerId,
        };
        dispatch(
          getEnglishProdImagesLink(payload, (url) => {
            if (url) {
              console.log(url);
            }
          })
        );
      });
    }
  }, [productImages]);

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <Heading text="Edit Book Details" />
        <div className="flex gap-2 items-center justify-end">
          <Button
            type="button"
            onClick={() => setIsEditable(!isEditable)}
            variant="filled"
            className="bg-cstm-blue rounded-md poppins-font  px-3"
          >
            <span className="poppins-font flex items-center gap-1">
              <FaEdit size={18} />
              Edit
            </span>
          </Button>
          <Button
            type="button"
            onClick={handleBookDelete}
            variant="filled"
            className="bg-cstm-blue rounded-md poppins-font hover:bg-red-500 px-2"
          >
            <span className="poppins-font flex items-center gap-1">
              <MdDelete size={18} />
            </span>
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="title"
              label="Title"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="medium"
              label="Medium"
              type="select"
              options={mediumOptions}
              defaultValue="English"
              disabled="true"
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
              disabled={!isEditable}
            />

            <InputField
              control={control}
              errors={errors}
              name="paperBackOriginalPrice"
              label="Paperback Original Price"
              type="number"
              disabled={!isEditable}
            />
            {/* <InputField
              control={control}
              errors={errors}
              name="discountedPercentage"
              label="Discounted percentage"
              type="option"
              options={discountedPercentageOptions}
              disabled={!isEditable}
            /> */}

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
                  disabled={!isEditable}
                />{" "}
              </>
            )}

            <>
              <InputField
                control={control}
                errors={errors}
                name="paperBackDiscountedPrice"
                label="Paperback Discounted Price"
                type="numeric"
                disabled={!isEditable}
              />
            </>

            <InputField
              control={control}
              errors={errors}
              name="eBookOriginalPrice"
              label="E-Book Original Price"
              type="number"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="eBookDiscountedPrice"
              label="E-Book Discounted Price"
              type="number"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="bookCode"
              label="Book Code"
              type="text"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="edition"
              label="Edition"
              type="text"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="course"
              label="Course"
              type="text"
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
            {selectedMedium?.includes("English") && (
              <InputField
                control={control}
                errors={errors}
                name="videoPreview"
                label="English Video Preview "
                type="file"
                disabled={!isEditable}
              />
            )}
            {selectedMedium?.includes("Hindi") && (
              <InputField
                control={control}
                errors={errors}
                name="hindiVideoPreview"
                label="Hindi Video Preview"
                type="file"
                disabled={!isEditable}
              />
            )}
            <InputField
              control={control}
              errors={errors}
              name="descriptionPara"
              label="Book Description"
              type="description"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="whatYouGetInBook"
              label="What book includes"
              type="description"
              disabled={!isEditable}
            />
            <CustomTreeSelect
              data={allCategory}
              control={control}
              name="categories"
              label="Select Categories" // Add a label for the input
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
            <InputField
              control={control}
              errors={errors}
              name="category"
              label="Select Category"
              options={categoryOptions}
              type="select"
              disabled={!isEditable}
              // mode="single"
            />
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
            {/* <InputField
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
            /> */}
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
              type="option"
              disabled={!isEditable}
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
                disabled={!isEditable}
              />
            )}
            {selectedMedium?.includes("Hindi") && (
              <InputField
                control={control}
                errors={errors}
                name="hindiAssignment"
                label="Hindi Assignment "
                type="file"
                disabled={!isEditable}
              />
            )}
          </div>
          <div className="mt-3">
            {selectedMedium?.includes("English") && (
              <InputField
                control={control}
                errors={errors}
                name="ebook"
                label="Add E-Books"
                type="uploadFiles"
                disabled={!isEditable}
              />
            )}
            {selectedMedium?.includes("Hindi") && (
              <InputField
                control={control}
                errors={errors}
                name="hindiEbook"
                label="Add Hindi E-Books"
                type="uploadFiles"
                disabled={!isEditable}
              />
            )}
          </div>
          <div>
            {selectedMedium?.includes("English") && (
              <ImageField
                control={control}
                errors={errors}
                name={"image"}
                maxFiles={10}
                label="Upload English Book Images (530px X 700px)"
                disabled={!isEditable}
              />
            )}
          </div>

          <div>
            {selectedMedium?.includes("Hindi") && (
              <ImageField
                control={control}
                errors={errors}
                name={"hindiImage"}
                maxFiles={10}
                label="Upload Hindi Book Images (530px X 700px)"
                disabled={!isEditable}
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
                  disabled={!isEditable}
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="linkOfFirstSemesterSolvedPaper"
                  label="Upload File First Sem"
                  type="text"
                  disabled={!isEditable}
                />
              </div>
              <div>
                <InputField
                  control={control}
                  errors={errors}
                  name="titleOfSecondSemesterSolvedPaper"
                  label="Title Second Sem"
                  type="text"
                  disabled={!isEditable}
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="linkOfSecondSemesterSolvedPaper"
                  label="Upload File Second Sem"
                  type="text"
                  disabled={!isEditable}
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
                      disabled={!isEditable}
                    />

                    {/* File Input */}
                    <InputField
                      control={control}
                      errors={errors}
                      name={`theoreticalExplanationOfChapters.${index}.content`}
                      label="Description"
                      type="description"
                      disabled={!isEditable}
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
                      disabled={!isEditable}
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
                    disabled={!isEditable}
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name={`reviews[${index}].rating`}
                    label="Rating"
                    type="numeric"
                    placeholder="Enter Rating"
                    options={mediumOptions} // Pass your rating options here
                    disabled={!isEditable}
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name={`reviews[${index}].comment`}
                    label="Description"
                    type="description"
                    placeholder="Enter Comment"
                    disabled={!isEditable}
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

          <Button type="submit" className="primary-gradient mt-4 mb-4">
            Add
          </Button>
        </form>
      </div>
    </PageCont>
  );
};

export default EditBook;
