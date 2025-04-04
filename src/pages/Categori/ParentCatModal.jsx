import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  useSelect,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";

import { IoIosCloseCircle } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../common/fields/InputField";
import ImageField from "../../common/fields/ImageField";
import { addCategory } from "../../redux/features/category";
import { categorySchema } from "../../constant/validations";

const ParentCatModal = ({ showParentModal, setShowParentModal }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const handleCloseModal = () => {
    setShowParentModal(!showParentModal);
  };

  const onSubmit = (data) => {
    const { name, description1, description2, categoryFile } = data;
    console.log(data);

    const imageFile = categoryFile[0].file;
    const slug = name.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase & replace spaces with "-"

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description1", description1);
    formData.append("description2", description2);
    formData.append("categoryFile", imageFile);
    formData.append("parent", null);
    formData.append("slug", slug);
    const payload = {
      ...data,
      parent: null,
      slug,
    };
    console.log(payload);

    dispatch(addCategory(formData));
    reset({
      name: "",
      description1: "",
      description2: "",
      imageFile: "",
    });
    setShowParentModal(false);
  };

  return (
    <Dialog
      open={showParentModal}
      handler={handleCloseModal}
      className="detailModal overflow-hidden"
      style={{ maxHeight: "90vh" }} // Set max-height to 90% of the viewport height
    >
      <DialogHeader className="text-xl primary-gradient text-white poppins-font">
        <div className="flex justify-between w-full items-center">
          Parent Category
          <IoIosCloseCircle
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowParentModal(false)}
          />
        </div>
      </DialogHeader>
      <DialogBody
        className="overflow-y-auto bg-transparent lg:p-3"
        style={{ maxHeight: "calc(90vh - 64px)" }} // Adjust height based on header height
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ImageField
            control={control}
            errors={errors}
            name="categoryFile"
            maxFiles={1}
            label="Upload Image (330px X 150px)"
          />
          <div className="w-full grid grid-cols-2 gap-3">
            <InputField
              control={control}
              errors={errors}
              name="name"
              label="Parent Category Name"
              type="text"
              // options={mediumOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="description1"
              label="Description 1"
              type="description"
            />
            <InputField
              control={control}
              errors={errors}
              name="description2"
              label="Description 2"
              type="description"
            />
            <InputField
              control={control}
              errors={errors}
              name="order"
              label="Order"
              type="numeric"
            />
          </div>

          <Button type="submit" className="primary-gradient mt-4">
            Add
          </Button>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default ParentCatModal;
