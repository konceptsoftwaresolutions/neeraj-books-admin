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
import FileFieldWithText from "../../../common/fields/FileFieldWithText";

const HindiBookForm = ({
  control,
  errors,
  register,
  watch,
  language,
  setValue,
  selectedMedium,
  parentCategoryOptions,
  hindiSubCategoryOptions = [],
  hindiSubSubCategoryOptions = [],
  discountOptions,
  hindiDiscountSelected,
  hindiPaperPrice,
  hindiEbookDiscountSelected,
  hindiCalcEbookPrice,
  brandNameOptions,
  statusOptions,
  bestSellerOptions,
  appendHindiChapter,
  hindiChapterFields,
  removeHindiChapter,
  hindiSamplePaperFields,
  appendHinidSamplePaper,
  removeHindiSamplePaper,
  solvedHindiAssignmentFields,
  appendSolvedHindiAssignment,
  removeSolvedHindiAssignment,
}) => {
  if (!selectedMedium?.includes("Hindi")) return null;

  const hindiStatPages = watch("hindiStatPages");
  const hindiQuesPapers = watch("hindiQuesPapers");
  const hindiBookPages = watch("hindiBookPages");
  const hindiExtraPages = watch("hindiExtraPages");
  const hindiTotalPages = watch("hindiTotalPages");
  const hindiBookSize = watch("hindiBookSize");

  useEffect(() => {
    const s = parseInt(hindiStatPages) || 0;
    const q = parseInt(hindiQuesPapers) || 0;
    const b = parseInt(hindiBookPages) || 0;
    const e = parseInt(hindiExtraPages) || 0;

    setValue("hindiTotalPages", s + q + b + e);
  }, [
    hindiStatPages,
    hindiQuesPapers,
    hindiBookPages,
    hindiExtraPages,
    setValue,
  ]);

  useEffect(() => {
    if (hindiBookSize && hindiTotalPages) {
      let noOfForms;
      if (hindiBookSize === "medium-regular") {
        noOfForms = hindiTotalPages / 8;
      } else if (hindiBookSize === "large-slim") {
        noOfForms = hindiTotalPages / 8;
      } else if (hindiBookSize === "small-hos") {
        console.log("small", hindiTotalPages);
        noOfForms = hindiTotalPages / 16;
      } else {
        noOfForms = hindiTotalPages / 16;
      }
      setValue("hindiNoOfForms", Math.floor(noOfForms));
    }
  }, [hindiBookSize, hindiTotalPages]);

  return (
    <>
      <div className="rounded-lg bg-gray-100  p-4 mt-6">
        <p className="border-b-2 border-gray-200 pb-2 mb-2 font-semibold">
          Hindi Book Fields
        </p>
        <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 ">
          <InputField
            control={control}
            errors={errors}
            label="Parent Category"
            name="hindiParentCategory"
            type="option"
            mode="single"
            options={parentCategoryOptions}
          />
          {hindiSubCategoryOptions?.length > 0 && (
            <InputField
              control={control}
              errors={errors}
              label="Sub Category"
              name="hindiSubCategory"
              type="select"
              options={hindiSubCategoryOptions}
            />
          )}
          {hindiSubSubCategoryOptions?.length > 0 && (
            <InputField
              control={control}
              errors={errors}
              label="Sub-Sub Category"
              name="hindiSubSubCategory"
              type="select"
              options={hindiSubSubCategoryOptions}
            />
          )}
          {/* <div>
                    <CustomTreeSelect
                      data={allCategory}
                      control={control}
                      name="hcategories"
                    />
                  </div> */}

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

          <InputField
            control={control}
            errors={errors}
            name="hindiYoutubeVideoPreview"
            label="YT Video Preview "
            type="text"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiYoutubeQuestionPaperVideo"
            label="YT Ques. Paper Video "
            type="text"
          />

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
          <InputField
            control={control}
            errors={errors}
            name="hindiBookType"
            label="Book Type"
            options={bookTypeOptions}
            type="select"
            mode="single"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiBookSize"
            label="Book Size"
            options={bookSizeOptions}
            type="select"
            mode="single"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiBookColour"
            label="Book Colour"
            options={colourOptions}
            type="select"
            mode="single"
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {selectedMedium?.includes("Hindi") && (
            <InputField
              control={control}
              errors={errors}
              name="hindiEbook"
              label="Add Hindi E-Books"
              type="uploadFiles"
              maxFiles="20"
            />

            // <FileFieldWithText
            //   control={control}
            //   errors={errors}
            //   name={"hindiEbook"}
            //   maxFiles={20}
            //   label="Add Hindi E-Books"
            // />
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
          <div className="w-full grid  gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3">
            <InputField
              control={control}
              errors={errors}
              name="eBookHindiIsDownloadable"
              label="Is Ebook Downloadable"
              type="option"
              options={discountOptions}
            />
            {/* <InputField
              control={control}
              errors={errors}
              name="hindihindiTotalPages"
              label="Total Pages"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="hindiTotalPapers"
              label="Total No. Of Papers"
              type="number"
            /> */}
            {/* <InputField
              control={control}
              errors={errors}
              name="hindiAuthorName"
              label="Author Name"
              type="text"
            /> */}
          </div>
        </div>

        <div className="w-full grid  gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 mt-5">
          <InputField
            control={control}
            errors={errors}
            name="hindiStatPages"
            label="Start Pages"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiQuesPapers"
            label="Ques Papers"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiBookPages"
            label="Book Pages"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiExtraPages"
            label="Extra Pages"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiTotalPages"
            label="Total Pages"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiNoOfForms"
            label="No. Of Forms"
            type="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiAuthorName"
            label="Author"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiEditorRevisor"
            label="Editor/Revisor"
            type="text"
          />
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
              <div key={item.id} className="bg-[#f5f7fb] rounded-lg mt-2 pb-2">
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
          <p className="font-semibold py-2">Edition</p>
        </div>
        <div className="grid grid-col-2 md:grid-cols-3 gap-3 bg-[#f5f7fb] rounded-lg mt-2 p-3 mb-3">
          <InputField
            control={control}
            errors={errors}
            name="hindiFirst"
            label="First"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiRevisedUpdated"
            label="Revised/Updated"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiReprint"
            label="Reprint"
          />
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
            <div key={item.id} className="bg-[#f5f7fb] rounded-lg mt-2 pb-2">
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
            <div key={item.id} className="bg-[#f5f7fb] rounded-lg mt-2 pb-2">
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

        <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
          <p className="font-semibold py-2">Hindi Book Meta Details</p>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-[#f5f7fb] rounded-lg mt-2 p-3">
          <InputField
            control={control}
            errors={errors}
            name="hindiMetaTitle"
            label="Meta Title"
            type="text"
          />
          <InputField
            control={control}
            errors={errors}
            name="hindiMetaTags"
            label="Meta Tags"
            type="description"
          />
          <div className="col-span-2">
            <InputField
              control={control}
              errors={errors}
              name="hindiMetaDescription"
              label="Meta Description"
              type="description"
              rows={5}
            />
          </div>
        </div>
        {/* <AIQuesPaperUpload medium="hindi" /> */}
      </div>
    </>
  );
};

export default HindiBookForm;
