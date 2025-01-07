import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/features/books";
import ImageField from "../../common/fields/ImageField";
// import EditModal from "./EditModal";

const AddBook = () => {
  const dispatch = useDispatch();

  const categoryOptions = [
    { label: "I.G.N.O.U", value: "ignou" },
    { label: "N.I.O.S", value: "nios" },
  ];

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addBook(data));
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
              name="price"
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
          </div>
          <div className="flex flex-col gap-3">
            <InputField
              control={control}
              errors={errors}
              name="description"
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
            {/* <InputField
              control={control}
              errors={errors}
              name="bookCover"
              label="Book Cover"
              type="file"
            /> */}
            <InputField
              control={control}
              errors={errors}
              name="previewPdf"
              label="Preview PDF"
              type="file"
            />
            <InputField
              control={control}
              errors={errors}
              name="category"
              label="Select Category"
              options={categoryOptions}
              type="select"
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
            <InputField
              control={control}
              errors={errors}
              name="discount"
              label="Discount"
              type="number"
            />
            {/* <InputField
              control={control}
              errors={errors}
              name="price"
              label="MRP"
              type="text"
            /> */}

            <InputField
              control={control}
              errors={errors}
              name="ebook"
              label="E-Book"
              type="file"
            />
            <InputField
              control={control}
              errors={errors}
              name="paperprice"
              label="E-Book(MRP)"
              type="number"
            />
          </div>
          <div>
            <ImageField
              control={control}
              errors={errors}
              name={"adhaarImg"}
              maxFiles={5}
              label="Upload Book Images (530px X 700px)"
            />
          </div>
          <Button type="submit" className="primary-gradient mt-4 mb-4">
            Add
          </Button>

          <hr />
          <hr />
          <button>
            <h1 className="mt-7 text-black-800 text-[20px]">Review & Rating</h1>
          </button>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 ">
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
          </div>
          <Button type="submit" className="primary-gradient mt-4 mb-4">
            Submit
          </Button>
        </form>
      </div>
    </PageCont>
  );
};

export default AddBook;
