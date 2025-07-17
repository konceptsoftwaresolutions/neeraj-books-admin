import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { Tooltip } from "antd";
import { Button } from "@material-tailwind/react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import {
  bookSizeOptions,
  bookTypeOptions,
  colourOptions,
} from "../../../constant/options";

const EngBookForm = ({
  control,
  errors,
  register,
  watch,
  language,
  setValue,
  selectedMedium,
  engPaperPrice,
  engCalcEbookPrice,
  englishDiscountSelected,
  engEbookDiscountSelected,
  discountOptions,
  parentCategoryOptions,
  subCategoryOptions,
  subSubCategoryOptions,
  brandNameOptions,
  statusOptions,
  chapterFields,
  appendChapter,
  removeChapter,
  samplePaperFields,
  appendSamplePaper,
  removeSamplePaper,
  solvedAssignmentFields,
  appendSolvedAssignment,
  removeSolvedAssignment,
  bestSellerOptions,
}) => {
  const engStatPages = watch("engStatPages");
  const engQuesPapers = watch("engQuesPapers");
  const engBookPages = watch("engBookPages");
  const engTotalPages = watch("engTotalPages");
  const engExtraPages = watch("engExtraPages");
  const engBookSize = watch("engBookSize");

  useEffect(() => {
    const s = parseInt(engStatPages) || 0;
    const q = parseInt(engQuesPapers) || 0;
    const b = parseInt(engBookPages) || 0;
    const e = parseInt(engExtraPages) || 0;

    setValue("engTotalPages", s + q + b + e);
  }, [engStatPages, engQuesPapers, engBookPages, engExtraPages, setValue]);

  useEffect(() => {
    if (engBookSize && engTotalPages) {
      let noOfForms;
      if (engBookSize === "medium-regular") {
        noOfForms = engTotalPages / 8;
      } else if (engBookSize === "large-slim") {
        noOfForms = engTotalPages / 8;
      } else if (engBookSize === "small-hos") {
        noOfForms = engTotalPages / 16;
      } else {
        noOfForms = engTotalPages / 16;
      }
      setValue("engNoOfForms", Math.floor(noOfForms));
    }
  }, [engBookSize, engTotalPages]);

  return (
    <>
      <div className=" rounded-lg bg-gray-100  p-4 mt-6">
        <p className="border-b-2 border-gray-200 pb-2 mb-2 font-semibold">
          English Book Fields
        </p>
        <div className="w-full grid  gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 ">
          <InputField
            control={control}
            errors={errors}
            label="Parent Category"
            name="engParentCategory"
            type="option"
            mode="single"
            options={parentCategoryOptions}
          />
          {subCategoryOptions?.length > 0 && (
            <InputField
              control={control}
              errors={errors}
              label="Sub Category"
              name="engSubCategory"
              type="select"
              options={subCategoryOptions}
            />
          )}
          {subSubCategoryOptions?.length > 0 && (
            <InputField
              control={control}
              errors={errors}
              label="Sub-Sub Category"
              name="engSubSubCategory"
              type="select"
              options={subSubCategoryOptions}
            />
          )}
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
            label="MRP / Printed Price"
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
            required={true}
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
          <InputField
            control={control}
            errors={errors}
            name="engYoutubeVideoPreview"
            label="YT Video Preview "
            type="text"
          />
          <InputField
            control={control}
            errors={errors}
            name="engYoutubeQuestionPaperVideo"
            label="YT Ques. Paper Video "
            type="text"
          />
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
          <InputField
            control={control}
            errors={errors}
            name="isBestSeller"
            label="Best Seller"
            options={bestSellerOptions}
            type="select"
            mode="single"
          />
          <InputField
            control={control}
            errors={errors}
            name="engBookType"
            label="Book Type"
            options={bookTypeOptions}
            type="select"
            mode="single"
          />
          <InputField
            control={control}
            errors={errors}
            name="engBookSize"
            label="Book Size"
            options={bookSizeOptions}
            type="select"
            mode="single"
          />
          <InputField
            control={control}
            errors={errors}
            name="engBookColour"
            label="Book Colour"
            options={colourOptions}
            type="select"
            mode="single"
          />
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
        </div>
        <div className="w-full grid  gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 mt-5">
          <InputField
            control={control}
            errors={errors}
            name="eBookEngIsDownloadable"
            label="Is Ebook Downloadable"
            type="option"
            options={discountOptions}
          />
          {/* <InputField
            control={control}
            errors={errors}
            name="engTngTotalPages"
            label="Total Pages"
            type="number"
          />
          <InputField
            control={control}
            errors={errors}
            name="engTotalPapers"
            label="Total No. Of Papers"
            type="number"
          /> */}
        </div>

        <div className="w-full grid  gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 mt-5">
          <InputField
            control={control}
            errors={errors}
            name="engStatPages"
            label="Start Pages"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="engQuesPapers"
            label="Ques Papers"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="engBookPages"
            label="Book Pages"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="engExtraPages"
            label="Extra Pages"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="engTotalPages"
            label="Total Pages"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="engNoOfForms"
            label="No. Of Forms"
            type="numeric"
            disabled="true"
          />
          <InputField
            control={control}
            errors={errors}
            name="engAuthorName"
            label="Author"
          />
          <InputField
            control={control}
            errors={errors}
            name="engEditorRevisor"
            label="Editor/Revisor"
            type="numeric"
          />
        </div>

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
            <div key={item.id} className="bg-[#f5f7fb] rounded-lg mt-2 pb-2">
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
          <p className="font-semibold py-2">Edition</p>
        </div>
        <div className="grid grid-col-2 md:grid-cols-3 gap-3 bg-[#f5f7fb] rounded-lg mt-2 p-3 mb-3">
          <InputField
            control={control}
            errors={errors}
            name="engFirst"
            label="First"
          />
          <InputField
            control={control}
            errors={errors}
            name="engRevisedUpdated"
            label="Revised/Updated"
          />
          <InputField
            control={control}
            errors={errors}
            name="engReprint"
            label="Reprint"
          />
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
            <div key={item.id} className="bg-[#f5f7fb] rounded-lg mt-2 pb-2">
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
            <div key={item.id} className="bg-[#f5f7fb] rounded-lg mt-2 pb-2">
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

        <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
          <p className="font-semibold py-2">English Book Meta Details</p>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-[#f5f7fb] rounded-lg mt-2 p-3">
          <InputField
            control={control}
            errors={errors}
            name="engMetaTitle"
            label="Meta Title"
            type="text"
          />
          <InputField
            control={control}
            errors={errors}
            name="engMetaTags"
            label="Meta Tags"
            type="description"
          />
          <div className="col-span-2">
            <InputField
              control={control}
              errors={errors}
              name="engMetaDescription"
              label="Meta Description"
              type="description"
              rows={5}
            />
          </div>
        </div>
        {/* <AIQuesPaperUpload medium="english" /> */}
      </div>
    </>
  );
};

export default EngBookForm;
