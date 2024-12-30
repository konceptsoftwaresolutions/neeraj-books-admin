import React from "react";
import PageCont from "../../components/PageCont";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";
import Heading from "../../components/Heading";
import EditModal from "./EditModal";
import Reviews from "./Reviews";


const EditBook = () => {
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
      <Heading text="Edit Book Details" />
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
              type="option"
              options={mediumOptions}
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
              name="subInfo"
              label="Sub Info"
              type="text"
            />

            <InputField
              control={control}
              errors={errors}
              name="ebookPrice"
              label="E-Book Price"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="paperBookPrice"
              label="Paperback Book Price"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="paperBookOldPrice"
              label="Paperback Book Old Price"
              type="number"
            />
             <InputField
              control={control}
              errors={errors}
              name="category"
              label="Category"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-3">
            <InputField
              control={control}
              errors={errors}
              name="shortDescription"
              label="Short Description"
              type="description"
            />
            <InputField
              control={control}
              errors={errors}
              name="bookDescription"
              label="Book Description"
              type="textEditor"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <InputField
              control={control}
              errors={errors}
              name="bookCover"
              label="Book Cover"
              type="file"
            />
            <InputField
              control={control}
              errors={errors}
              name="previewPdf"
              label="Preview PDF"
              type="file"
            />
          </div>
          <div className="mt-3">
            <InputField
              control={control}
              errors={errors}
              name="suggestedBooks"
              label="Suggested Books"
              type="select"
            />
          </div>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="weight"
              label="weight"
            />
            <InputField
              control={control}
              errors={errors}
              name="stock"
              label="Stock"
              // type="option"
              options={mediumOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="weightDiscount"
              label="Discount"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="mrpPrice"
              label="Price"
              type="text"
            />

            <InputField
              control={control}
              errors={errors}
              name="Price"
              label="E-Book"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="paperBoo"
              label="E-Book(MRP)"
              type="number"
            />
          </div>
          <Button type="submit" className=" mt-5  primary-gradient mb-5">
            Update
          </Button>
          <hr />  <hr />
          <div className="flex mt-5 justify-between items-center ">
            <h2 className=" text-black-800 text-[20px]">
              Book Reviews & Rating Section
            </h2>
            <EditModal />
          </div>
          <Reviews />
        </form>
      </div>
    </PageCont>
  );
};

export default EditBook;
