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
import {
  getCategory,
  getSubcategoryOptionsByIds,
} from "../../constant/utilityfunction";
import AIQuesPaperUpload from "./AIQuesPaperUpload";
import EngBookForm from "./forms/EngBookForm";
import HindiBookForm from "./forms/HindiBookForm";
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

  const parentCategoryOptions = allCategory?.map((category, index) => {
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
    register,
    setValue,
  } = useForm({
    defaultValues: {
      // solvedPapers: [
      //   { solvedPaperTitle: "", solvedPaperFile: null }, // Default single field
      // ],
      eBookEngIsDownloadable: "no",
      eBookHindiIsDownloadable: "no",
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
  const [subCategoryOptions, setSubCategoryOptions] = useState();
  const [subSubCategoryOptions, setSubSubCategoryOptions] = useState();
  const [hindiSubCategoryOptions, setHindiSubCategoryOptions] = useState();
  const [hindiSubSubCategoryOptions, setHindiSubSubCategoryOptions] =
    useState();

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
  const engSelectedParent = watch("engParentCategory");
  const engSelectedSubCategory = watch("engSubCategory");

  const hindiSelectedParent = watch("hindiParentCategory");
  const hindiSelectedSubCategory = watch("hindiSubCategory");

  useEffect(() => {
    if (engSelectedParent) {
      const result = getSubcategoryOptionsByIds(allCategory, engSelectedParent);
      setSubCategoryOptions(result);
    }
  }, [engSelectedParent]);

  useEffect(() => {
    if (hindiSelectedParent) {
      const result = getSubcategoryOptionsByIds(
        allCategory,
        hindiSelectedParent
      );
      setHindiSubCategoryOptions(result);
    }
  }, [hindiSelectedParent]);

  useEffect(() => {
    if (engSelectedSubCategory) {
      const result = getSubcategoryOptionsByIds(
        allCategory,
        engSelectedSubCategory
      );
      console.log(result);
      setSubSubCategoryOptions(result);
    }
  }, [engSelectedSubCategory]);

  useEffect(() => {
    if (hindiSelectedSubCategory) {
      const result = getSubcategoryOptionsByIds(
        allCategory,
        hindiSelectedSubCategory
      );
      console.log(result);
      setHindiSubSubCategoryOptions(result);
    }
  }, [hindiSelectedSubCategory]);

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

    const payload = {};

    if (data.medium?.includes("English")) {
      const englishSlug = data.title.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase & replace spaces with "-"

      payload.english = {
        first: data.engFirst,
        revisedUpdated: data?.engRevisedUpdated,
        reprint: data?.engReprint,
        startPages: data?.engStatPages,
        quesPaperPages: data?.engQuesPapers,
        bookPages: data?.engBookPages,
        extraPages: data?.engExtraPages,
        totalPages: data?.engTotalPages,
        noOfForms: data?.engNoOfForms,
        // authorName: data?.engAuthorName,
        editorRevisor: data?.engEditorRevisor,
        bookType: data?.engBookType,
        bookSize: data?.engBookSize,
        bookColour: data?.engBookColour,

        metaTitle: data?.engMetaTitle,
        metaDescription: data?.engMetaDescription,
        metaTags: data?.engMetaTags,
        youtubeVideoPreview: data?.engYoutubeVideoPreview,
        youtubeQuestionPaperVideo: data?.engYoutubeQuestionPaperVideo,
        totalNoOfPapers: data?.engTotalPapers,
        totalPages: data?.engTotalPages,
        authorName: data?.engAuthorName,
        viewParentCategory: data?.engParentCategory,
        viewSubCategory: data?.engSubCategory,
        viewSubSubCategory: data?.engSubSubCategory,
        // categories: data?.engSubSubCategory
        //   ? data.engSubSubCategory
        //   : data?.engSubCategory
        //   ? data.engSubCategory
        //   : data?.engParentCategory,
        categories: getCategory(
          data?.engParentCategory,
          data?.engSubCategory,
          data?.engSubSubCategory
        ),

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
        first: data?.hindiFirst,
        revisedUpdated: data?.hindiRevisedUpdated,
        reprint: data?.hindiReprint,

        startPages: data?.hindiStatPages,
        quesPaperPages: data?.hindiQuesPapers,
        bookPages: data?.hindiBookPages,
        extraPages: data?.hindiExtraPages,

        totalPages: data?.hindiTotalPages,
        noOfForms: data?.hindiNoOfForms,
        // authorName: data?.hindiAuthorName,
        editorRevisor: data?.hindiEditorRevisor,
        bookType: data?.hindiBookType,
        bookSize: data?.hindiBookSize,
        bookColour: data?.hindiBookColour,

        metaTitle: data?.hindiMetaTitle,
        metaDescription: data?.hindiMetaDescription,
        metaTags: data?.hindiMetaTags,
        viewParentCategory: data?.hindiParentCategory,
        viewSubCategory: data?.hindiSubCategory,
        viewSubSubCategory: data?.hindiSubSubCategory,
        youtubeVideoPreview: data?.hindiYoutubeVideoPreview,
        youtubeQuestionPaperVideo: data?.hindiYoutubeQuestionPaperVideo,
        categories: getCategory(
          data?.hindiParentCategory,
          data?.hindiSubCategory,
          data?.hindiSubSubCategory
        ),
        totalNoOfPapers: data?.hindiTotalPapers,
        totalPages: data?.hindiTotalPages,
        authorName: data?.hindiAuthorName,

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
        // categories: data?.hcategories,
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
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    dispatch(
      addBook({
        formData,
        setAddLoader,
        callback: () => {
          // navigate(-1);
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
          </div>
          {selectedMedium?.includes("English") && (
            <EngBookForm
              control={control}
              errors={errors}
              register={register}
              watch={watch}
              setValue={setValue}
              bestSellerOptions={bestSellerOptions}
              selectedMedium={selectedMedium}
              engPaperPrice={engPaperPrice}
              engCalcEbookPrice={engCalcEbookPrice}
              englishDiscountSelected={englishDiscountSelected}
              engEbookDiscountSelected={engEbookDiscountSelected}
              discountOptions={discountOptions}
              parentCategoryOptions={parentCategoryOptions}
              subCategoryOptions={subCategoryOptions}
              subSubCategoryOptions={subSubCategoryOptions}
              brandNameOptions={brandNameOptions}
              statusOptions={statusOptions}
              chapterFields={chapterFields}
              appendChapter={appendChapter}
              removeChapter={removeChapter}
              samplePaperFields={samplePaperFields}
              appendSamplePaper={appendSamplePaper}
              removeSamplePaper={removeSamplePaper}
              solvedAssignmentFields={solvedAssignmentFields}
              appendSolvedAssignment={appendSolvedAssignment}
              removeSolvedAssignment={removeSolvedAssignment}
            />
          )}

          {selectedMedium?.includes("Hindi") && (
            <HindiBookForm
              control={control}
              errors={errors}
              register={register}
              watch={watch}
              setValue={setValue}
              selectedMedium={selectedMedium}
              parentCategoryOptions={parentCategoryOptions}
              hindiSubCategoryOptions={hindiSubCategoryOptions}
              hindiSubSubCategoryOptions={hindiSubSubCategoryOptions}
              discountOptions={discountOptions}
              hindiDiscountSelected={hindiDiscountSelected}
              hindiPaperPrice={hindiPaperPrice}
              hindiEbookDiscountSelected={hindiEbookDiscountSelected}
              hindiCalcEbookPrice={hindiCalcEbookPrice}
              brandNameOptions={brandNameOptions}
              statusOptions={statusOptions}
              bestSellerOptions={bestSellerOptions}
              appendHindiChapter={appendHindiChapter}
              hindiChapterFields={hindiChapterFields}
              removeHindiChapter={removeHindiChapter}
              hindiSamplePaperFields={hindiSamplePaperFields}
              appendHinidSamplePaper={appendHinidSamplePaper}
              removeHindiSamplePaper={removeHindiSamplePaper}
              solvedHindiAssignmentFields={solvedHindiAssignmentFields}
              appendSolvedHindiAssignment={appendSolvedHindiAssignment}
              removeSolvedHindiAssignment={removeSolvedHindiAssignment}
            />
          )}

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
            // loading={addLoader}
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
