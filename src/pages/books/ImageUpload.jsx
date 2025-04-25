import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import InputField from "../../common/fields/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrandName,
  setBrandName,
  updateEbookExtraAmount,
} from "../../redux/features/books";
import ImageField from "../../common/fields/ImageField";

const ImageUpload = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
    reset();
    handleCloseModal();
  };

  return (
    <Dialog
      open={showModal}
      handler={handleCloseModal}
      className=" z-[99] !min-w-[80vw]"
      style={{ maxHeight: "90vh" }} // Set max-height to 90% of the viewport height
    >
      <DialogHeader className="text-xl primary-gradient text-white poppins-font">
        <div className="flex justify-between w-full items-center">
          Bulk Images Upload
          <IoIosCloseCircle
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowModal(!showModal)}
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
            name={"image"}
            maxFiles={600}
            // label="Upload Bulk Images"
          />
          <div className="flex gap-x-2 mt-3">
            <Button
              type="submit"
              className="capitalize primary-gradient poppins-font"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default ImageUpload;
