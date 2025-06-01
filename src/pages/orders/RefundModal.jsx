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
import { createCoupon, initiateRefund } from "../../redux/features/coupons";
import toast from "react-hot-toast";
import * as Yup from "yup"; // <-- Add this
// import { yupResolver } from "@hookform/resolvers/yup";

const RefundModal = ({ openModal, setOpenModal, orderdata }) => {
  const dispatch = useDispatch();

  const [isEditable, setIsEditable] = useState(false);
  const [isLoadiing, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .min(1, "Amount must be greater than 0")
      .max(
        orderdata?.totalAmount || 0,
        `Amount cannot exceed ₹${orderdata?.totalAmount}`
      ),
  });

  const {
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCloseModal = () => {
    reset();
    setOpenModal(!openModal);
  };

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      ...data,
      txnid: orderdata?.txnid,
    };
    dispatch(
      initiateRefund(payload, setIsLoading, (success) => {
        if (success) {
          setOpenModal(false);
          reset();
        } else {
          setOpenModal(false);
          reset();
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
          Create Refund
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
              name="amount"
              label="Amount"
              type="numeric"
              defaultValue={orderdata?.totalAmount}
              max={orderdata?.totalAmount}
              disabled={!isEditable}
              // options={mediumOptions}
            />
          </div>
          <div className="flex gap-x-3">
            <Button
              type="button"
              className="primary-gradient mt-4 capitalize"
              onClick={() => setIsEditable(!isEditable)}
            >
              Change Amount
            </Button>
            <Button
              type="submit"
              className="primary-gradient mt-4 capitalize"
              loading={isLoadiing}
            >
              Initiate Refund
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default RefundModal;
