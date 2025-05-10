import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";

const OrderModal = ({ showModal, setShowModal }) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
    setFile(null);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onSubmit = () => {
    console.log("Submitted File:", file);
    setShowModal(false);
  };

  return (
    <Dialog
      open={showModal}
      handler={handleCloseModal}
      className="detailModal overflow-hidden"
      style={{ maxHeight: "90vh" }}
    >
      <DialogHeader className="text-xl primary-gradient text-white poppins-font">
        <div className="flex justify-between w-full items-center">
          Bulk Order Upload
          <IoIosCloseCircle
            className="h-6 w-6 cursor-pointer"
            onClick={handleCloseModal}
          />
        </div>
      </DialogHeader>

      <DialogBody
        className="overflow-y-auto bg-transparent lg:p-3"
        style={{ maxHeight: "calc(90vh - 64px)" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Drag & Drop Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-full border-2 border-dashed rounded-md p-6 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <p className="text-gray-700 mb-2">
              Drag & drop a file here, or click to select a file
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="upload-input"
            />
            <label
              htmlFor="upload-input"
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md inline-block"
            >
              Choose File
            </label>
            {file && (
              <p className="mt-2 text-green-600 font-medium">
                Selected File: {file.name}
              </p>
            )}
          </div>

          <Button type="submit" className="primary-gradient mt-4 capitalize">
            Add
          </Button>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default OrderModal;
