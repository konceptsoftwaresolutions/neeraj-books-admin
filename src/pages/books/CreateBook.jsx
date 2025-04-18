import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useFieldArray, useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import {
  bestSellerOptions,
  discountOptions,
  mediumOptions,
  statusOptions,
} from "../../constant/options";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, getBrandName } from "../../redux/features/books";
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
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const CreateBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCategory } = useSelector((state) => state.category);
  // console.log(allCategory);

  const [addLoader, setAddLoader] = useState(false);

  useEffect(() => {
    dispatch(getBrandName());
  }, []);

  const { brandNames } = useSelector((state) => state.books);

  const brandNameOptions = brandNames?.map((item) => ({
    label: item,
    value: item,
  }));

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
      addDiscount: "no",
      haddDiscount: "no",
      addEngEbookDiscount: "no",
      addHEbookDiscount: "no",
      theoreticalExplanationOfChapters: [
        { title: "", content: null }, // Default single field
      ],
      theoreticalExplanationOfHindiChapters: [
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
      solvedAssignment: [
        {
          session: "",
          isDownloadable: "",
          coverImg: "",
          assignmentFile: "",
          price: "",
          // medium: "",
          // course: "",
          // code: "",
          // title: "",
        },
      ],
      solvedSamplePapers: [
        {
          file: "",
        },
      ],
      solvedHindiAssignment: [
        {
          session: "",
          isDownloadable: "",
          coverImg: "",
          assignmentFile: "",
          price: "",
          // medium: "",
          // course: "",
          // code: "",
          // title: "",
        },
      ],
      solvedHindiSamplePapers: [
        {
          file: "",
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

  const {
    fields: samplePaperFields,
    append: appendSamplePaper,
    remove: removeSamplePaper,
  } = useFieldArray({
    control,
    name: "solvedSamplePapers", // The field array name for chapters
  });

  const {
    fields: hindiSamplePaperFields,
    append: appendHinidSamplePaper,
    remove: removeHindiSamplePaper,
  } = useFieldArray({
    control,
    name: "solvedHindiSamplePapers", // The field array name for chapters
  });

  const {
    fields: solvedAssignmentFields,
    append: appendSolvedAssignment,
    remove: removeSolvedAssignment,
  } = useFieldArray({
    control,
    name: "solvedAssignment", // The field array name for chapters
  });

  const {
    fields: solvedHindiAssignmentFields,
    append: appendSolvedHindiAssignment,
    remove: removeSolvedHindiAssignment,
  } = useFieldArray({
    control,
    name: "solvedHindiAssignment", // The field array name for chapters
  });

  const {
    fields: hindiChapterFields,
    append: appendHindiChapter,
    remove: removeHindiChapter,
  } = useFieldArray({
    control,
    name: "theoreticalExplanationOfHindiChapters", // The field array name for chapters
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
  const [engPaperPrice, setEngPaperPrice] = useState(null);
  const [engCalcEbookPrice, setEngCalcEbookPrice] = useState(null);
  const [hindiPaperPrice, setHindiPaperPrice] = useState(null);
  const [hindiCalcEbookPrice, setHindiCalcEbookPrice] = useState(null);

  const selectedDiscountedPercentage = watch("discountedPercentage");
  const selectedMedium = watch("medium");
  const englishDiscountSelected = watch("addDiscount");
  const engEbookDiscountSelected = watch("addEngEbookDiscount");
  const hindiDiscountSelected = watch("haddDiscount");
  const hindiEbookDiscountSelected = watch("addHEbookDiscount");

  const engBookPrice = watch("paperBackOriginalPrice");
  const englishPaperPercentage = watch("paperDiscount");

  const engEbookPrice = watch("eBookOriginalPrice");
  const engEbookPercentage = watch("ebookDiscount");

  const hindiBookPrice = watch("hpaperBackOriginalPrice");
  const hindiPaperPercentage = watch("hpaperDiscount");

  const hindiEbookPrice = watch("heBookOriginalPrice");
  const hindiEbookPercentage = watch("hEbookDiscount");

  useEffect(() => {
    const price =
      parseFloat(hindiEbookPrice) -
      (parseFloat(hindiEbookPercentage) / 100) * parseFloat(hindiEbookPrice);

    setHindiCalcEbookPrice(price);
  }, [hindiEbookPercentage, hindiEbookPrice]);

  useEffect(() => {
    const price =
      parseFloat(engEbookPrice) -
      (parseFloat(engEbookPercentage) / 100) * parseFloat(engEbookPrice);

    setEngCalcEbookPrice(price);
  }, [engEbookPercentage, engEbookPrice]);

  useEffect(() => {
    const price =
      parseFloat(engBookPrice) -
      (parseFloat(englishPaperPercentage) / 100) * parseFloat(engBookPrice);

    setEngPaperPrice(price);
  }, [englishPaperPercentage, engBookPrice]);

  useEffect(() => {
    const price =
      parseFloat(hindiBookPrice) -
      (parseFloat(hindiPaperPercentage) / 100) * parseFloat(hindiBookPrice);

    setHindiPaperPrice(price);
  }, [hindiPaperPercentage, hindiBookPrice]);

  console.log("selected medium delfa", englishDiscountSelected);

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
    setAddLoader(true);
    console.log(data);

    // Initialize payload
    const payload = {};

    if (data.medium?.includes("English")) {
      const englishSlug = data.title.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase & replace spaces with "-"

      payload.english = {
        eBookIsDownloadable: data?.eBookEngIsDownloadable,
        isDownloadableEngSolvedPaper: data?.isDownloadableEngSolvedPaper,
        engSolvedPaperImg: data?.engSolvedPaperImg,
        engSolvedPaperPrice: data?.engSolvedPaperPrice,
        solvedAssignment: data?.solvedAssignment,
        samplePapers: data?.solvedSamplePapers,
        discount: data?.addDiscount,
        brand: data?.brand,
        isbn: data?.engISBN,
        addEbookPrice: data?.addEbookEngPrice,
        discountPercentage: data?.paperDiscount,
        active: data?.active === "true",
        // order: data?.order,
        weight: data?.weight,
        paperBackOriginalPrice: data?.paperBackOriginalPrice,
        paperBackDiscountedPrice:
          data?.addDiscount === "yes"
            ? (
                parseFloat(data?.paperBackOriginalPrice) -
                (parseFloat(data?.paperDiscount) / 100) *
                  parseFloat(data?.paperBackOriginalPrice)
              ).toString()
            : data?.paperBackDiscountedPrice, // Keep as string
        eBookOriginalPrice: data?.eBookOriginalPrice,
        // eBookDiscountedPrice: data?.eBookDiscountedPrice,
        eBookDiscountedPrice:
          data?.addEngEbookDiscount === "yes"
            ? (
                parseFloat(data?.eBookOriginalPrice) -
                (parseFloat(data?.ebookDiscount) / 100) *
                  parseFloat(data?.eBookOriginalPrice)
              ).toString()
            : data?.eBookDiscountedPrice, // Keep as string
        title: data?.title,
        // description: data?.description,
        bookCode: data?.bookCode,
        edition: data?.edition,
        categories: data?.categories,
        commonLine: data?.commonLine,
        videoPreview: data?.videoPreview,
        // descriptionPara: data?.descriptionPara,
        whatYouGetInBook: data?.whatYouGetInBook,
        stock: data?.stock,
        isBestSeller: data?.isBestSeller,
        // englishAssignment: data?.englishAssignment,
        ebook: data?.ebook,
        image: data?.image,
        theoreticalExplanationOfChapters:
          data?.theoreticalExplanationOfChapters,
        medium: "english",
        slug: englishSlug,
        // course: data?.course,
        weight: data?.weight,
        reviews: data?.reviews,
        linkOfFirstSemesterSolvedPaper: data?.linkOfFirstSemesterSolvedPaper,
        titleOfFirstSemesterSolvedPaper: data?.titleOfFirstSemesterSolvedPaper,
        titleOfSecondSemesterSolvedPaper:
          data?.titleOfSecondSemesterSolvedPaper,
        linkOfSecondSemesterSolvedPaper: data?.linkOfSecondSemesterSolvedPaper,
      };
    }

    if (data.medium?.includes("Hindi")) {
      const hindiSlug = data.hTitle.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase & replace spaces with "-"

      payload.hindi = {
        eBookIsDownloadable: data?.eBookHindiIsDownloadable,
        isDownloadableEngSolvedPaper: data?.isDownloadableHindiSolvedPaper,
        engSolvedPaperImg: data?.hindiSolvedPaperImg,
        engSolvedPaperPrice: data?.hindiSolvedPaperPrice,
        solvedAssignment: data?.solvedAssignment,
        samplePapers: data?.solvedHindiSamplePapers,
        solvedAssignment: data?.solvedHindiAssignment,
        active: data?.hactive === "true",
        isbn: data?.hindiISBN,
        addEbookPrice: data?.addEbookHindiPrice,
        brand: data?.hbrand,
        // order: data?.horder,
        weight: data?.hweight,
        paperBackOriginalPrice: data?.hpaperBackOriginalPrice,
        paperBackDiscountedPrice:
          data?.haddDiscount === "yes"
            ? (
                parseFloat(data?.hpaperBackOriginalPrice) -
                (parseFloat(data?.hpaperDiscount) / 100) *
                  parseFloat(data?.hpaperBackOriginalPrice)
              ).toString()
            : data?.hpaperBackDiscountedPrice, // Keep as string
        eBookOriginalPrice: data?.heBookOriginalPrice,
        eBookDiscountedPrice: data?.heBookDiscountedPrice,
        eBookDiscountedPrice:
          data?.hindiEbookDiscountSelected === "yes"
            ? (
                parseFloat(data?.heBookOriginalPrice) -
                (parseFloat(data?.hEbookDiscount) / 100) *
                  parseFloat(data?.heBookOriginalPrice)
              ).toString()
            : data?.heBookDiscountedPrice, // Keep as string
        title: data?.hTitle,
        // description: data?.hdescription,
        bookCode: data?.hbookCode,
        edition: data?.hedition,
        categories: data?.hcategories,
        commonLine: data?.hcommonLine,
        videoPreview: data?.hVideoPreview,
        // descriptionPara: data?.hdescriptionPara,
        whatYouGetInBook: data?.hwhatYouGetInBook,
        stock: data?.hstock,
        isBestSeller: data?.hisBestSeller,
        // englishAssignment: data?.hindiAssignment,
        ebook: data?.hindiEbook,
        image: data?.hindiImage,
        theoreticalExplanationOfChapters:
          data?.theoreticalExplanationOfHindiChapters,
        medium: "hindi",
        slug: hindiSlug,
        // course: data?.course,
        reviews: data?.reviews,
        linkOfFirstSemesterSolvedPaper:
          data?.linkOfFirstSemesterHindiSolvedPaper,
        titleOfFirstSemesterSolvedPaper:
          data?.titleOfFirstSemesterHindiSolvedPaper,
        titleOfSecondSemesterSolvedPaper:
          data?.titleOfSecondSemesterHindiSolvedPaper,
        linkOfSecondSemesterSolvedPaper:
          data?.linkOfSecondSemesterHindiSolvedPaper,
      };
    }

    console.log(payload);

    const formData = convertToFormData(payload);
    // To verify the result
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    dispatch(
      addBook({
        formData,
        setAddLoader,
        callback: () => {
          navigate(-1);
        },
      })
    );
  };

  return (
    <PageCont>
      <Heading text="Create Book" />
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-3">
            <InputField
              control={control}
              errors={errors}
              name="medium"
              label="Select Medium"
              type="select"
              options={mediumOptions}
              defaultValue="English"
            />

            {/* <InputField
              control={control}
              errors={errors}
              name="discountedPercentage"
              label="Discounted percentage"
              type="option"
              options={discountedPercentageOptions}
            /> */}

            {/* Conditional rendering based on the selected value */}
            {/* {selectedDiscountedPercentage === "yes" && (
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

            {selectedDiscountedPercentage === "no" && <></>} */}

            {/* <InputField
              control={control}
              errors={errors}
              name="course"
              label="Course"
              type="text"
            /> */}
          </div>
          {selectedMedium?.includes("English") && (
            <div className=" rounded-lg bg-gray-100  p-4 mt-6">
              <p className="border-b-2 border-gray-200 pb-2 mb-2 font-semibold">
                English Book Fields
              </p>
              <div className="w-full grid  gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 ">
                <div>
                  <CustomTreeSelect
                    data={allCategory}
                    control={control}
                    name="categories"
                  />
                </div>
                <InputField
                  control={control}
                  errors={errors}
                  name="bookCode"
                  label="Book Code"
                  type="text"
                  required={true}
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="title"
                  label="Title"
                  required={true}
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="paperBackOriginalPrice"
                  label="Paperback Original Price"
                  type="number"
                  required={true}
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="addDiscount"
                  label="Discount Percentage"
                  type="option"
                  options={discountOptions}
                  defaultValue="yes"
                  required={true}
                />
                {englishDiscountSelected === "yes" ? (
                  <>
                    <InputField
                      control={control}
                      errors={errors}
                      name="paperDiscount"
                      label="Enter Discount %"
                      type="number"
                    />

                    <div className="flex flex-col">
                      <p className="font-medium ml-0.5 text-[#000000]">
                        Paperback Discounted Price
                      </p>
                      <p className="border-[1px]  border-black mt-2 min-h-[39px] p-2 text-sm">
                        {isNaN(engPaperPrice) ? 0 : engPaperPrice}
                      </p>
                    </div>
                  </>
                ) : (
                  <InputField
                    control={control}
                    errors={errors}
                    name="paperBackDiscountedPrice"
                    label="Paperback Discounted Price"
                    type="numeric"
                  />
                )}
                <InputField
                  control={control}
                  errors={errors}
                  name="eBookOriginalPrice"
                  label="E-Book Original Price"
                  type="number"
                  required={true}
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="addEngEbookDiscount"
                  label="Discount Percentage"
                  type="option"
                  options={discountOptions}
                  defaultValue="yes"
                  // required={true}
                />{" "}
                {engEbookDiscountSelected === "yes" ? (
                  <>
                    <InputField
                      control={control}
                      errors={errors}
                      name="ebookDiscount"
                      label="Enter Discount %"
                      type="number"
                    />

                    <div className="flex flex-col">
                      <p className="font-medium ml-0.5 text-[#000000]">
                        Ebook Discounted Price
                      </p>
                      <p className="border-[1px]  border-black mt-2 min-h-[39px] p-2 text-sm">
                        {isNaN(engCalcEbookPrice) ? 0 : engCalcEbookPrice}
                      </p>
                    </div>
                  </>
                ) : (
                  <InputField
                    control={control}
                    errors={errors}
                    name="eBookDiscountedPrice"
                    label="E-Book Discounted Price"
                    type="number"
                    // required={true}
                  />
                )}
                <InputField
                  control={control}
                  errors={errors}
                  name="addEbookEngPrice"
                  label="E-book Addition Price"
                  type="number"
                  required={true}
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="active"
                  label="Active"
                  type="option"
                  options={statusOptions}
                  required={true}
                />
                {/* <InputField
                  control={control}
                  errors={errors}
                  name="order"
                  label="Order"
                  type="numeric"
                /> */}
                <InputField
                  control={control}
                  errors={errors}
                  name="weight"
                  label="Weight (kg)"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="engISBN"
                  label="ISBN"
                  type="text"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="brand"
                  label="Brand"
                  type="option"
                  options={brandNameOptions}
                />
                {/* {selectedMedium?.includes("English") && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="description"
                    label="Sub Info"
                    type="text"
                  />
                )} */}
                <InputField
                  control={control}
                  errors={errors}
                  name="edition"
                  label="For Session"
                  type="text"
                  required={true}
                />
                {selectedMedium?.includes("English") && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="commonLine"
                    label="Common Line"
                    type="desc"
                  />
                )}
                {selectedMedium?.includes("English") && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="videoPreview"
                    label="English Video Preview "
                    type="file"
                  />
                )}
                {/* {selectedMedium?.includes("English") && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="descriptionPara"
                    label="Book Description"
                    type="description"
                  />
                )} */}
                {/* <InputField
                  control={control}
                  errors={errors}
                  name="whatYouGetInBook"
                  label="What book includes"
                  type="description"
                /> */}
                {selectedMedium?.includes("English") && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="stock"
                    label="Stock"
                    type="number"
                    required={true}
                  />
                )}
                {selectedMedium?.includes("English") && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="isBestSeller"
                    label="Best Seller"
                    options={bestSellerOptions}
                    type="select"
                    mode="single"
                  />
                )}
                {/* {selectedMedium?.includes("English") && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="englishAssignment"
                    label="English Assignment "
                    type="file"
                  />
                )} */}
              </div>
              <div className="grid grid-cols-1 gap-3 pt-2">
                {selectedMedium?.includes("English") && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="ebook"
                    label="Add E-Books"
                    type="uploadFiles"
                  />
                )}

                {selectedMedium?.includes("English") && (
                  <>
                    <ImageField
                      control={control}
                      errors={errors}
                      name={"image"}
                      maxFiles={10}
                      label="Upload English Book Images (530px X 700px)"
                    />
                    <p className="mt-[-10px] text-center">
                      (The Book Image Upload Is Mandatory...)
                    </p>
                  </>
                )}
                {selectedMedium?.includes("English") && (
                  <InputField
                    control={control}
                    errors={errors}
                    name="eBookEngIsDownloadable"
                    label="Is Ebook Downloadable"
                    type="option"
                    options={discountOptions}
                    // required={true}
                  />
                )}
              </div>
              {/* <div>
                <InputField
                  type="textEditor"
                  control={control}
                  errors={errors}
                  label="What book includes"
                  name="whatYouGetInBook"
                  required={true}
                />
              </div> */}
              <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md mt-4">
                <p className="font-semibold">About The English Book </p>
                <Tooltip title="Add More Content">
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
                        type="textEditor"
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

              <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
                <p className="font-semibold py-2">English Solved Papers </p>
                <Tooltip title="Add More ">
                  <Button
                    variant="gradient"
                    color="blue"
                    className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                    onClick={
                      () =>
                        appendSamplePaper({
                          file: "",
                        }) // Append new field
                    }
                  >
                    <IoIosAddCircle size={17} />
                  </Button>
                </Tooltip>
              </div>
              <div className="grid gap-3 p-3">
                <div className="grid grid-cols-3 gap-3">
                  <InputField
                    control={control}
                    errors={errors}
                    name="isDownloadableEngSolvedPaper"
                    label="Downloadable"
                    type="option"
                    options={[
                      { label: "Yes", value: "true" },
                      { label: "No", value: "false" },
                    ]}
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="engSolvedPaperImg"
                    label="Image"
                    type="file"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="engSolvedPaperPrice"
                    label="Price"
                    type="text"
                  />
                </div>

                {samplePaperFields?.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                  >
                    <div className="grid grid-cols-1  p-3 relative ">
                      {/* Title Input */}
                      <InputField
                        control={control}
                        errors={errors}
                        name={`solvedSamplePapers.${index}.file`}
                        label={`Upload Assignment`}
                        type="file"
                      />
                    </div>
                    {/* Remove Button */}
                    <div className="flex justify-end pr-3">
                      <Button
                        size="sm"
                        variant="outlined"
                        color="white"
                        className="bg-red-500 w-max p-2 ml-2 "
                        onClick={() => removeSamplePaper(index)} // Remove field
                      >
                        <MdDelete size={17} />
                      </Button>
                    </div>
                  </div>
                ))}
                {/* <div className="flex flex-col gap-3">
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
                    label="Second Sem (YT link)"
                    type="text"
                  />
                </div> */}
              </div>
              <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
                <p className="font-semibold py-2">English Solved Assignments</p>
                <Tooltip title="Add More Content">
                  <Button
                    variant="gradient"
                    color="blue"
                    className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                    onClick={
                      () =>
                        appendSolvedAssignment({
                          session: "",
                          isDownloadable: "",
                          coverImg: "",
                          assignmentFile: "",
                          price: "",
                        }) // Append new field
                    }
                  >
                    <IoIosAddCircle size={17} />
                  </Button>
                </Tooltip>
              </div>
              <div>
                {solvedAssignmentFields?.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3 relative ">
                      {/* Title Input */}
                      <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.session`}
                        label={`Session`}
                        type="monthRange"
                      />
                      <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.isDownloadable`}
                        label={`Downloadable`}
                        type="option"
                        options={[
                          { label: "Yes", value: "true" },
                          { label: "No", value: "false" },
                        ]}
                      />
                      <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.coverImg`}
                        label={`Image`}
                        type="file"
                      />

                      {/* File Input */}
                      <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.assignmentFile`}
                        label="Upload Assignment"
                        type="file"
                      />
                      {/* <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.year`}
                        label="Year"
                        type="text"
                      /> */}
                      <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.price`}
                        label="Price"
                        type="text"
                      />
                      {/* <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.medium`}
                        label="Medium"
                        type="text"
                      />
                      <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.course`}
                        label="Course"
                        type="text"
                      />
                      <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.code`}
                        label="Code"
                        type="text"
                      />
                      <InputField
                        control={control}
                        errors={errors}
                        name={`solvedAssignment.${index}.title`}
                        label="Title"
                        type="text"
                      /> */}
                    </div>
                    {/* Remove Button */}
                    <div className="flex justify-end pr-3">
                      <Button
                        size="sm"
                        variant="outlined"
                        color="white"
                        className="bg-red-500 w-max p-2 ml-2 "
                        onClick={() => removeSolvedAssignment(index)} // Remove field
                      >
                        <MdDelete size={17} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedMedium?.includes("Hindi") && (
            <>
              <div className="rounded-lg bg-gray-100  p-4 mt-6">
                <p className="border-b-2 border-gray-200 pb-2 mb-2 font-semibold">
                  Hindi Book Fields
                </p>
                <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 ">
                  <div>
                    <CustomTreeSelect
                      data={allCategory}
                      control={control}
                      name="hcategories"
                    />
                  </div>

                  <InputField
                    control={control}
                    errors={errors}
                    name="hbookCode"
                    label="Book Code"
                    type="text"
                    required={true}
                  />

                  <InputField
                    control={control}
                    errors={errors}
                    name="hTitle"
                    label="Title"
                    required={true}
                  />

                  {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hpaperBackOriginalPrice"
                      label="Paperback Original Price"
                      type="number"
                      required={true}
                    />
                  )}

                  <InputField
                    control={control}
                    errors={errors}
                    name="haddDiscount"
                    label="Discount Percentage"
                    type="option"
                    options={discountOptions}
                    required={true}
                  />

                  {hindiDiscountSelected === "yes" ? (
                    <>
                      <InputField
                        control={control}
                        errors={errors}
                        name="hpaperDiscount"
                        label="Enter Discount"
                        type="number"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium ml-0.5 text-[#000000]">
                          Paperback Discounted Price
                        </p>
                        <p className="border-[1px]  border-black mt-2 min-h-[39px] p-2 text-sm">
                          {isNaN(hindiPaperPrice) ? 0 : hindiPaperPrice}
                        </p>
                      </div>
                    </>
                  ) : (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hpaperBackDiscountedPrice"
                      label="Paperback Discounted Price"
                      type="numeric"
                    />
                  )}

                  {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="heBookOriginalPrice"
                      label="E-Book Original Price"
                      type="number"
                      required={true}
                    />
                  )}

                  <InputField
                    control={control}
                    errors={errors}
                    name="addHEbookDiscount"
                    label="Discount Percentage"
                    type="option"
                    options={discountOptions}
                    required={true}
                  />

                  {hindiEbookDiscountSelected === "yes" ? (
                    <>
                      <InputField
                        control={control}
                        errors={errors}
                        name="hEbookDiscount"
                        label="Enter Discount"
                        type="number"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium ml-0.5 text-[#000000]">
                          E-book Discounted Price
                        </p>
                        <p className="border-[1px]  border-black mt-2 min-h-[39px] p-2 text-sm">
                          {isNaN(hindiCalcEbookPrice) ? 0 : hindiCalcEbookPrice}
                        </p>
                      </div>
                    </>
                  ) : (
                    <InputField
                      control={control}
                      errors={errors}
                      name="heBookDiscountedPrice"
                      label="E-Book Discounted Price"
                      type="number"
                      // required={true}
                    />
                  )}

                  <InputField
                    control={control}
                    errors={errors}
                    name="addEbookHindiPrice"
                    label="E-book Addition Price"
                    type="number"
                    required={true}
                  />
                  {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hactive"
                      label="Active"
                      type="option"
                      options={statusOptions}
                      required={true}
                    />
                  )}
                  {/* {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="horder"
                      label="Order"
                      type="numeric"
                    />
                  )} */}
                  {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hweight"
                      label="Weight (kg)"
                    />
                  )}
                  <InputField
                    control={control}
                    errors={errors}
                    name="hindiISBN"
                    label="ISBN"
                    type="text"
                  />
                  <InputField
                    control={control}
                    errors={errors}
                    name="hbrand"
                    label="Brand"
                    type="option"
                    options={brandNameOptions}
                    required={true}
                  />

                  {/* <InputField
              control={control}
              errors={errors}
              name="medium"
              label="Medium"
              type="select"
              options={mediumOptions}
              defaultValue="English"
            /> */}
                  {/* <InputField
              control={control}
              errors={errors}
              name="edition"
              label="Edition"
              type="text"
            /> */}

                  {/* {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hdescription"
                      label="Sub Info"
                      type="text"
                    />
                  )} */}

                  {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hedition"
                      label="For Session"
                      type="text"
                      required={true}
                    />
                  )}

                  {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hcommonLine"
                      label="Common Line"
                      type="desc"
                    />
                  )}

                  {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hVideoPreview"
                      label="Video Preview"
                      type="file"
                    />
                  )}
                  {/* {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hdescriptionPara"
                      label="Book Description"
                      type="description"
                    />
                  )} */}

                  {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hstock"
                      label="Stock"
                      type="number"
                      required={true}
                    />
                  )}
                  <InputField
                    control={control}
                    errors={errors}
                    name="hisBestSeller"
                    label="Best Seller"
                    options={bestSellerOptions}
                    type="select"
                    mode="single"
                  />
                  {/* {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hindiAssignment"
                      label="Hindi Assignment "
                      type="file"
                    />
                  )} */}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {selectedMedium?.includes("Hindi") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="hindiEbook"
                      label="Add Hindi E-Books"
                      type="uploadFiles"
                    />
                  )}
                  {selectedMedium?.includes("Hindi") && (
                    <>
                      <ImageField
                        control={control}
                        errors={errors}
                        name={"hindiImage"}
                        maxFiles={10}
                        label="Upload Hindi Book Images (530px X 700px)"
                      />
                      <p className="mt-[-10px] text-center">
                        (The Book Image Upload Is Mandatory...)
                      </p>
                    </>
                  )}
                  {selectedMedium?.includes("English") && (
                    <InputField
                      control={control}
                      errors={errors}
                      name="eBookHindiIsDownloadable"
                      label="Is Ebook Downloadable"
                      type="option"
                      options={discountOptions}
                      // required={true}
                    />
                  )}
                </div>

                {/* <InputField
              control={control}
              errors={errors}
              name="addEbookPrice"
              label="E-Book Addition Price"
              type="number"
              defaultValue="50"
            /> */}
                {/* <div>
                  <InputField
                    type="textEditor"
                    control={control}
                    errors={errors}
                    label="What book includes"
                    name="hwhatYouGetInBook"
                    required={true}
                  />
                </div> */}
                <div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
                      <p className="font-semibold">About The Hindi Book</p>
                      <Tooltip title="Add More Content">
                        <Button
                          variant="gradient"
                          color="blue"
                          className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                          onClick={
                            () =>
                              appendHindiChapter({
                                title: "",
                                content: null,
                              }) // Append new field
                          }
                        >
                          <IoIosAddCircle size={17} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <div>
                    {hindiChapterFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                      >
                        <div className="grid grid-cols-1 gap-3 p-3 relative ">
                          {/* Title Input */}
                          <InputField
                            control={control}
                            errors={errors}
                            name={`theoreticalExplanationOfHindiChapters.${index}.title`}
                            label={`Title ${index + 1}`}
                            type="text"
                          />

                          {/* File Input */}
                          <InputField
                            control={control}
                            errors={errors}
                            name={`theoreticalExplanationOfHindiChapters.${index}.content`}
                            label="Description"
                            type="textEditor"
                          />
                        </div>
                        {/* Remove Button */}
                        <div className="flex justify-end pr-3">
                          <Button
                            size="sm"
                            variant="outlined"
                            color="white"
                            className="bg-red-500 w-max p-2 ml-2 "
                            onClick={() => removeHindiChapter(index)} // Remove field
                          >
                            <MdDelete size={17} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
                  <p className="font-semibold py-2">Hindi Solved Papers </p>
                  <Tooltip title="Add More ">
                    <Button
                      variant="gradient"
                      color="blue"
                      className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                      onClick={
                        () =>
                          appendHinidSamplePaper({
                            file: "",
                          }) // Append new field
                      }
                    >
                      <IoIosAddCircle size={17} />
                    </Button>
                  </Tooltip>
                </div>
                <div className="grid  gap-3 p-3">
                  {/* <div className="flex flex-col gap-3">
                    <InputField
                      control={control}
                      errors={errors}
                      name="titleOfFirstSemesterHindiSolvedPaper"
                      label="Title First Sem"
                      type="text"
                    />
                    <InputField
                      control={control}
                      errors={errors}
                      name="linkOfFirstSemesterHindiSolvedPaper"
                      label="First Sem (YT link)"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <InputField
                      control={control}
                      errors={errors}
                      name="titleOfSecondSemesterHindiSolvedPaper"
                      label="Title Second Sem"
                      type="text"
                    />
                    <InputField
                      control={control}
                      errors={errors}
                      name="linkOfSecondSemesterHindiSolvedPaper"
                      label="Second Sem (YT link)"
                      type="text"
                    />
                  </div> */}
                  <div className="grid grid-cols-3 gap-3">
                    <InputField
                      control={control}
                      errors={errors}
                      name="isDownloadableHindiSolvedPaper"
                      label="Downloadable"
                      type="option"
                      options={[
                        { label: "Yes", value: "true" },
                        { label: "No", value: "false" },
                      ]}
                    />
                    <InputField
                      control={control}
                      errors={errors}
                      name="hindiSolvedPaperImg"
                      label="Image"
                      type="file"
                    />
                    <InputField
                      control={control}
                      errors={errors}
                      name="hindiSolvedPaperPrice"
                      label="Price"
                      type="text"
                    />
                  </div>
                  {hindiSamplePaperFields?.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                    >
                      <div className="grid grid-cols-1  p-3 relative ">
                        {/* Title Input */}
                        <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiSamplePapers.${index}.file`}
                          label={`Upload Assignment`}
                          type="file"
                        />
                      </div>
                      {/* Remove Button */}
                      <div className="flex justify-end pr-3">
                        <Button
                          size="sm"
                          variant="outlined"
                          color="white"
                          className="bg-red-500 w-max p-2 ml-2 "
                          onClick={() => removeHindiSamplePaper(index)} // Remove field
                        >
                          <MdDelete size={17} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
                  <p className="font-semibold py-2">Hindi Solved Assignments</p>
                  <Tooltip title="Add More Content">
                    <Button
                      variant="gradient"
                      color="blue"
                      className="p-3 flex justify-center items-center primary-gradient gap-x-1"
                      onClick={
                        () =>
                          appendSolvedHindiAssignment({
                            session: "",
                            isDownloadable: "",
                            coverImg: "",
                            assignmentFile: "",
                            year: "",
                            price: "",
                          }) // Append new field
                      }
                    >
                      <IoIosAddCircle size={17} />
                    </Button>
                  </Tooltip>
                </div>
                <div>
                  {solvedHindiAssignmentFields?.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-[#f5f7fb] rounded-lg mt-2 pb-2"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3 relative ">
                        {/* Title Input */}
                        <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.session`}
                          label={`Session`}
                          type="monthRange"
                        />
                        <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.isDownloadable`}
                          label={`Downloadable`}
                          type="option"
                          options={[
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                          ]}
                        />
                        <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.coverImg`}
                          label={`Image`}
                          type="file"
                        />

                        {/* File Input */}
                        <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.assignmentFile`}
                          label="Upload Assignment"
                          type="file"
                        />
                        {/* <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.year`}
                          label="Year"
                          type="text"
                        /> */}
                        <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.price`}
                          label="Price"
                          type="text"
                        />
                        {/* <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.medium`}
                          label="Medium"
                          type="text"
                        />
                        <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.course`}
                          label="Course"
                          type="text"
                        />
                        <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.code`}
                          label="Code"
                          type="text"
                        />
                        <InputField
                          control={control}
                          errors={errors}
                          name={`solvedHindiAssignment.${index}.title`}
                          label="Title"
                          type="text"
                        /> */}
                      </div>
                      {/* Remove Button */}
                      <div className="flex justify-end pr-3">
                        <Button
                          size="sm"
                          variant="outlined"
                          color="white"
                          className="bg-red-500 w-max p-2 ml-2 "
                          onClick={() => removeSolvedHindiAssignment(index)} // Remove field
                        >
                          <MdDelete size={17} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="flex flex-col gap-3">
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

          <div className="grid grid-cols-2 gap-3"></div>
          <div></div>
          <div></div>

          <div></div>

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
                    max={5}
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

          <Button
            loading={addLoader}
            type="submit"
            className="primary-gradient mt-4 mb-4"
          >
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

export default CreateBook;
