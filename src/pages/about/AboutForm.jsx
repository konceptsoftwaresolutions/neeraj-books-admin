import React, { useState } from "react";
import InputField from "../../common/fields/InputField";
import ImageField from "../../common/fields/ImageField";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  uploadPhotoAboutSection,
  createAboutSection,
} from "../../redux/features/sliders";
import { toast } from "react-toastify";

const AboutForm = ({ title, imageFieldName }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    const formData = new FormData();
    const payload = {
      [`${imageFieldName}Description`]: data.description,
      [`${imageFieldName}Name`]: data.name,
    };
    const photo = data.photo?.[0]?.file;
    formData.append("photo", photo);
    formData.append("section", imageFieldName);
    setIsLoading(true);
    if (photo) {
      // Step 1: Upload photo
      dispatch(
        uploadPhotoAboutSection(
          formData,
          (success) => {
            // Step 2: After photo upload, send text data
            dispatch(
              createAboutSection(
                { payload },
                () => {
                  toast.success("Data saved successfully!");
                },
                setIsLoading
              )
            );
          },
          setIsLoading
        )
      );
    } else {
      // Only text data
      dispatch(
        createAboutSection(
          payload,
          () => {
            toast.success("Data saved successfully!");
          },
          setIsLoading
        )
      );
    }
  };

  return (
    <div className="mt-4 p-3 rounded-lg bg-gray-100">
      <p>{title}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageField
          control={control}
          errors={errors}
          name="photo"
          maxFiles={1}
          label="Select Image"
        />
        <div className="mb-3">
          <InputField
            type="textEditor"
            control={control}
            errors={errors}
            label="Description"
            name="description"
          />
          <InputField
            type="text"
            control={control}
            errors={errors}
            label="Name"
            name="name"
          />
        </div>
        <Button
          type="submit"
          className="primary-gradient mt-4 mb-4 text-white capitalize"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default AboutForm;
