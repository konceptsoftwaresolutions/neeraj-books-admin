import {
  Button,
  ButtonGroup,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle, IoMdDownload } from "react-icons/io";
import { useDispatch } from "react-redux";

import { RiFileExcel2Fill } from "react-icons/ri";
import useDocument from "../hooks/useDocument";

const UploadExcel = ({
  isOpen,
  setIsOpen,
  template,
  templateName = "",
  handleSave = function () {},
}) => {
  const dispatch = useDispatch();
  const docs = useDocument();
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      amount: "", // Ensure a default value is provided
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(); // Reset when modal opens
    }
  }, [isOpen, reset]);

  const handleSaveEvent = () => {
    let file = docs.file;
    if (file) {
      console.log(file);
      handleSave(file);
      setIsOpen(false);
      docs.reset();
    } else {
      toast.error("Please select a File.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      handler={handleCloseModal}
      className=" z-[99]"
      style={{ maxHeight: "90vh" }} // Set max-height to 90% of the viewport height
    >
      <DialogHeader className="text-xl primary-gradient text-white poppins-font">
        <div className="flex justify-between w-full items-center">
          Upload Excel
          <IoIosCloseCircle
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </DialogHeader>
      <DialogBody
        className="overflow-y-auto bg-transparent lg:p-3"
        style={{ maxHeight: "calc(90vh - 64px)" }} // Adjust height based on header height
      >
        <Button
          variant="filled"
          className="primary-gradient flex w-full items-center py-2 gap-x-3 justify-center poppins-font"
          // onClick={handleDelete}
          onClick={() => docs.downloadXLSX(template, templateName)}
        >
          <IoMdDownload size={22} />
          <span className="poppins-font">Download Template</span>
        </Button>
        <div
          className="w-full flex justify-center mt-3 items-center border-2 gap-x-2 active:bg-gray-300 transition-all duration-700 cursor-pointer border-dotted border-gray-800 py-8 rounded-md text-gray-800"
          onClick={() => docs.upload("single")}
        >
          <RiFileExcel2Fill size={40} />
          <h2 className="font-poppins not-italic leading-normal text-lg font-semibold">
            {docs.file?.name ? docs.file?.name : "Upload Excel"}
          </h2>
        </div>

        <div className="w-full my-2"></div>

        <div className="flex justify-end w-full items-center gap-x-2">
          <Button
            variant="filled"
            className="primary-gradient flex items-center py-2 gap-x-3 justify-center poppins-font"
            onClick={handleSaveEvent}
          >
            <span className="poppins-font capitalize text-xs md:text-sm">
              Save
            </span>
          </Button>

          <Button
            variant="filled"
            className="bg-gray-200 shadow-sm hover:shadow-sm border border-gray-400 text-[#000000] flex items-center py-2 gap-x-3 justify-center poppins-font"
            // onClick={handleDelete}
            onClick={() => docs.reset()}
          >
            <span className="poppins-font capitalize text-xs md:text-sm">
              Reset
            </span>
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default UploadExcel;
