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
import { createCoupon } from "../../redux/features/coupons";

const AddCouponModal = ({ openModal, setOpenModal }) => {
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
    reset();
    setOpenModal(!openModal);
  };

  const onSubmit = (data) => {
    console.log(data);
    dispatch(createCoupon(data));
    setOpenModal(false);
    reset();
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
          Create Coupon
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
          <div className="w-full grid grid-cols-2 gap-3">
            <InputField
              control={control}
              errors={errors}
              name="discount"
              label="Discount"
              type="text"
              // options={mediumOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="title"
              label="Coupon Name"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="couponCode"
              label="Coupon Code"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="totalUses"
              label="Total Uses"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="expiryDate"
              label="Expiry Date"
              type="date"
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

export default AddCouponModal;
