import React, { useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import InputField from "../../common/fields/InputField";
import { editCoupon } from "../../redux/features/coupons";

const EditCouponModal = ({ openModal, setOpenModal, rowData }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      discount: "",
      title: "",
    },
  });

  // Update form values when rowData changes
  useEffect(() => {
    if (rowData) {
      console.log(rowData);
      reset({
        discount: rowData.discount || "",
        title: rowData.title || "",
        couponCode: rowData.couponCode || "",
        totalUses: rowData.totalUses || "",
        expiryDate: rowData.expiryDate || "",
        usesLeft: rowData?.usesLeft || "",
      });
    }
  }, [rowData, reset]);

  const handleCloseModal = () => {
    reset();
    setOpenModal(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      ...data,
      id: rowData._id,
    };
    dispatch(editCoupon(payload));
    handleCloseModal();
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
          Edit Coupon
          <IoIosCloseCircle
            className="h-6 w-6 cursor-pointer"
            onClick={handleCloseModal}
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
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="usesLeft"
              label="Uses Left"
              type="number"
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
            Save
          </Button>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default EditCouponModal;
