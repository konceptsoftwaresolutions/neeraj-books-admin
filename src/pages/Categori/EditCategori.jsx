import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";

const EditCategori = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageCont>
      <Heading text="Edit Category" />
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-[20px] border-b my-3 font-sans">
            Parent Category
          </h1>
          <div className="w-full grid gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="CategoryImage"
              label="Category Image"
              type="file"
            />
            <InputField
              control={control}
              errors={errors}
              name="categoryname"
              label="Category Name"
              type="text"
              options={mediumOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="secondHeading"
              label="Second Heading"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="thirdHeading"
              label="Third Heading"
              type="text"
            />
          </div>
          <h1 className="text-[20px] border-b my-3 font-sans">Sub Category</h1>
          <div className="w-full grid gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="subCategoryImage"
              label="Category Image"
              type="file"
            />
            <InputField
              control={control}
              errors={errors}
              name="subCategoryName"
              label="Category Name"
              type="text"
              options={mediumOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="subSecondHeading"
              label="Second Heading"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="subThirdHeading"
              label="Third Heading"
              type="text"
            />
          </div>
          <h1 className="text-[20px] border-b my-3 font-sans">
            Sub Sub Category
          </h1>
          <div className="w-full grid gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="subSubCategoryImage"
              label="Category Image"
              type="file"
            />
            <InputField
              control={control}
              errors={errors}
              name="subSubCategoryName"
              label="Category Name"
              type="text"
              options={mediumOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="subSubsecondHeading"
              label="Second Heading"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="thirdeading"
              label="Third Heading"
              type="text"
            />
          </div>
          <Button type="submit" className="primary-gradient mt-4">
            Add
          </Button>
        </form>
      </div>
    </PageCont>
  );
};

export default EditCategori;
