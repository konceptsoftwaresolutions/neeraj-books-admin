import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import {
  addBook,
  deleteEnglishAIQuesPaper,
  deleteHindiAIQuesPaper,
  getAIQuesPaper,
  uploadAIQuesPaper,
} from "../../redux/features/books";
import { Tooltip } from "antd";
import { MdDelete } from "react-icons/md";

const AIQuesPaperUpload = ({ innerId, medium, outerId }) => {
  const dispatch = useDispatch();

  const [pdfUrl, setPdfUrl] = useState();

  const getThePdfFile = () => {
    const payload = {
      localizedId: innerId,
      // medium: medium,
      productId: outerId,
    };
    dispatch(
      getAIQuesPaper(payload, (success, url) => {
        if (success) {
          // console.log(url);
          setPdfUrl(url);
        } else {
          setPdfUrl(null);
        }
      })
    );
  };

  useEffect(() => {
    getThePdfFile();
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const lowercaseMedium = medium.toLowerCase();
    console.log("inside form submit", data);
    const formData = new FormData();
    formData.append("localizedId", innerId);
    // formData.append("medium", lowercaseMedium);
    formData.append("productId", outerId);
    formData.append("file", data.aipdf[0].file);
    dispatch(
      uploadAIQuesPaper({
        formData,
        callback: (success) => {
          if (success) {
            reset();
            getThePdfFile();
          }
        },
      })
    );
  };

  // Custom submit handler for button click
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent the default form behavior (if any)
    handleSubmit(onSubmit)(); // Explicitly call handleSubmit when the button is clicked
  };

  const handlePaperDelete = () => {
    const payload = {
      productId: outerId,
      localizedId: innerId,
    };

    dispatch(
      deleteEnglishAIQuesPaper(payload, (success) => {
        if (success) {
          getThePdfFile();
        }
      })
    );
  };

  return (
    <div className=" mt-3">
      <div className="flex justify-between items-center bg-[#dadada82] p-2 rounded-md">
        <p className="font-semibold py-2 capitalize">
          {medium} AI Question Paper
        </p>
      </div>
      <form className="mt-3">
        <div className="relative">
          {pdfUrl && (
            <div className="absolute right-2 flex items-center justify-end gap-3">
              <div className="cursor-pointer">
                <Tooltip title="View Question Paper">
                  <a href={pdfUrl} target="_blank" className="text-blue-700">
                    View{" "}
                  </a>
                </Tooltip>
              </div>
              <div className="" onClick={handlePaperDelete}>
                <Tooltip title="Delete">
                  <MdDelete size={20} className="cursor-pointer" />
                </Tooltip>
              </div>
            </div>
          )}
          <InputField
            control={control}
            errors={errors}
            name="aipdf"
            label="Add AI Question Paper"
            type="uploadFiles"
            maxFiles="1"
          />
        </div>
        <Button
          type="button" // Set the button type to 'button' to avoid automatic form submission
          onClick={handleButtonClick} // Trigger submission when clicked
          className="primary-gradient"
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default AIQuesPaperUpload;
