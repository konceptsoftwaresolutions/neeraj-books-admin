import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import ImageField from "../common/fields/ImageField";

const LogoModal = ({ showLogoModal, setShowLogoModal }) => {
  const handleCloseModal = () => {
    setShowLogoModal(false);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Dialog
        open={showLogoModal}
        handler={handleCloseModal}
        className="detailModal z-[99] overflow-hidden "
        style={{ maxHeight: "90vh", minWidth: "40vw" }} // Set max-height to 90% of the viewport height
      >
        <DialogHeader className="text-xl py-3 bg-cstm-blue text-white poppins-font">
          <div className="flex justify-between w-full items-center">
            Logo
            <IoIosCloseCircle
              className="h-6 w-6 cursor-pointer"
              onClick={() => setShowLogoModal(!showLogoModal)}
            />
          </div>
        </DialogHeader>
        <DialogBody
          className="overflow-y-auto bg-transparent lg:p-5 pb-0"
          style={{ maxHeight: "calc(90vh - 64px)" }} // Adjust height based on header height
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <ImageField
              control={control}
              errors={errors}
              name={"logoImg"}
              maxFiles={1}
              label="Upload Logo (50x50 px)"
            />
            <Button type="submit" className="primary-gradient ">
              Save
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default LogoModal;
