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

const EbookPriceModal = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      dispatch(getBrandName());
    }
  }, [showModal, dispatch]);

  const { brandNames } = useSelector((state) => state.books);

  const mediumOptions = ["Brand A", "Brand B", "Brand C"];

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      brand: brandNames || [],
    },
  });

  useEffect(() => {
    if (showModal) {
      reset({
        brand: brandNames || [],
      }); // Reset when modal opens
    }
  }, [showModal, reset]);

  const onSubmit = (data) => {
    console.log(data.brand);
    dispatch(setBrandName(data));
    reset();
    handleCloseModal();
  };

  return (
    <Dialog
      open={showModal}
      handler={handleCloseModal}
      className="detailModal z-[99]"
      style={{ maxHeight: "90vh" }} // Set max-height to 90% of the viewport height
    >
      <DialogHeader className="text-xl primary-gradient text-white poppins-font">
        <div className="flex justify-between w-full items-center">
          Set Brand Name
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
          <InputField
            name="brand"
            label="Enter Name"
            type="tags"
            errors={errors}
            control={control}
          />
          <div className="flex gap-x-2 mt-3">
            <Button
              type="submit"
              className="capitalize primary-gradient poppins-font"
            >
              Save
            </Button>
          </div>
          {/* <p className="mt-2 italic text-black">
            **This is the standard pricing applicable to all books.**
          </p> */}
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default EbookPriceModal;
