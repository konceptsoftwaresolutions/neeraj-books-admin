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
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../common/fields/InputField";

const TemplateModal = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  const onSubmit = (data) => {
    console.log(data);
    setShowModal(false);
  };

  return (
    <Dialog
      open={showModal}
      handler={handleCloseModal}
      className="detailModal overflow-hidden"
      style={{ maxHeight: "90vh" }} // Set max-height to 90% of the viewport height
    >
      <DialogHeader className="text-xl primary-gradient text-white poppins-font">
        <div className="flex justify-between w-full items-center">
          Create Template
          <IoIosCloseCircle
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowModal(false)}
          />
        </div>
      </DialogHeader>
      <DialogBody
        className="overflow-y-auto bg-transparent lg:p-3"
        style={{ maxHeight: "calc(90vh - 64px)" }} // Adjust height based on header height
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 gap-3">
            <InputField
              control={control}
              errors={errors}
              name="name"
              label="Template Name :"
              type="text"
              // options={mediumOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="description1"
              label="Text :"
              type="description"
              rows={6}
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

export default TemplateModal;
