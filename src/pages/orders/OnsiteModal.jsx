import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../common/fields/InputField";
import { createOnSiteDiscount } from "../../redux/features/orders";

const OnsiteModal = ({ openModal, setOpenModal, id, getTheOrderbyId }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm({});

  const handleCloseModal = () => {
    reset();
    setOpenModal(!openModal);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id: id,
    };
    console.log(payload);
    dispatch(
      createOnSiteDiscount(payload, (success) => {
        if (success) {
          handleCloseModal();
          getTheOrderbyId(id);
        }
      })
    );
  };

  return (
    <Dialog
      open={openModal}
      handler={handleCloseModal}
      className="detailModal overflow-hidden"
      style={{ maxHeight: "90vh" }} // Set max-height to 90% of the viewport height
    >
      <DialogHeader className="text-xl primary-gradient text-white poppins-font">
        <div className="flex justify-between w-full items-center">
          Onsite Discount
          <IoIosCloseCircle
            className="h-6 w-6 cursor-pointer"
            onClick={() => setOpenModal(false)}
          />
        </div>
      </DialogHeader>
      <DialogBody
        className="overflow-y-auto bg-transparent lg:p-3"
        style={{ maxHeight: "calc(90vh - 64px)" }} // Adjust height based on header height
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full ">
            <InputField
              control={control}
              errors={errors}
              name="onSiteDiscount"
              label="Enter Discount Amount"
              type="numeric"
            />
          </div>
          <div className="flex gap-x-3">
            <Button type="submit" className="primary-gradient mt-4 capitalize">
              Save
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default OnsiteModal;
