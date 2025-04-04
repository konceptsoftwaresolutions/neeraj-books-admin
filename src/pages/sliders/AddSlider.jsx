import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import InputField from "../../common/fields/InputField";
import ImageField from "../../common/fields/ImageField"; // Adjust the import path
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addSlider } from "../../redux/features/sliders";
import { useNavigate } from "react-router-dom";

const AddSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: [
        {
          type: "image",
          title: "",
          youtubelink: "",
          description: "",
          image: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "content",
  });

  const mediumOptions = [
    { label: "Image", value: "image" },
    { label: "Video", value: "video" },
  ];

  const onSubmit = (data) => {
    console.log(data);
    const filteredContent = data.content.map((item) => {
      if (item.type === "image") {
        return {
          type: item.type,
          title: item.title,
          description: item.description,
          file: item.image.length > 0 ? item.image[0].file : null, // Use the first image file
        };
      }
      if (item.type === "video") {
        return {
          type: item.type,
          title: item.title,
          youtubelink: item.youtubelink, // Keep video-related fields
        };
      }
      return item; // Default case (if any other types exist)
    });

    const filteredData = {
      ...data,
      content: filteredContent,
    };

    console.log("--------", filteredData);

    // Convert filteredData to FormData
    const formData = new FormData();

    // Append top-level fields
    formData.append("title", filteredData.title);

    // Append content array
    filteredData.content.forEach((item, index) => {
      formData.append(`content[${index}][type]`, item.type);
      formData.append(`content[${index}][title]`, item.title);

      if (item.type === "image" && item.file) {
        formData.append(`content[${index}][file]`, item.file); // Directly append the file
        formData.append(`content[${index}][description]`, item.description);
      }

      if (item.type === "video") {
        formData.append(`content[${index}][youtubelink]`, item.youtubelink);
      }
    });

    // console.log("FormData ready for submission:");

    // // Debug: Print FormData
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    dispatch(
      addSlider({ formData }, (success) => {
        if (success) {
          navigate(-1);
        }
      })
    );
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <Heading text="Add Slider" />
      </div>
      <p className="italic mt-3">**Please add at least 2 slides content**</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-6">
        {/* Slider Title */}
        <InputField
          control={control}
          errors={errors}
          name="title"
          label="Slider Title"
          type="text"
        />

        {/* Dynamic Content Fields */}
        <div>
          <h3 className="font-medium text-lg mb-2">Slider Content</h3>
          <div className="grid grid-cols-2 gap-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-lg mb-4 space-y-4 bg-gray-100"
              >
                {/* Content Type */}
                <InputField
                  control={control}
                  errors={errors}
                  name={`content[${index}].type`}
                  label="Type"
                  type="select"
                  mode="single"
                  options={mediumOptions}
                />

                <div className="grid grid-cols-2 gap-3">
                  {/* Content Title */}
                  <InputField
                    control={control}
                    errors={errors}
                    name={`content[${index}].title`}
                    label="Title"
                    type="text"
                  />

                  {/* YouTube Link (only for video type) */}
                  {watch(`content[${index}].type`) === "video" && (
                    <InputField
                      control={control}
                      errors={errors}
                      name={`content[${index}].youtubelink`}
                      label="YouTube Link"
                      type="text"
                    />
                  )}
                  {watch(`content[${index}].type`) === "image" && (
                    <>
                      <InputField
                        control={control}
                        errors={errors}
                        name={`content[${index}].description`}
                        label="Description"
                        type="description"
                      />
                    </>
                  )}
                </div>

                {/* Description (only for image type) */}
                {watch(`content[${index}].type`) === "image" && (
                  <>
                    {/* Image Upload Field */}
                    <ImageField
                      control={control}
                      errors={errors}
                      name={`content[${index}].image`}
                      maxFiles={1}
                      label="Upload Image (530px X 300px)"
                    />
                  </>
                )}

                {/* Remove Content Button */}
                <Button
                  onClick={() => remove(index)}
                  variant="contained"
                  color="error"
                  className="capitalize"
                >
                  Remove Slide
                </Button>
              </div>
            ))}
          </div>

          {/* Add Content Button */}
          <Button
            onClick={() =>
              append({
                type: "image",
                title: "",
                youtubelink: "",
                description: "",
                image: [],
              })
            }
            variant="contained"
            color="primary"
          >
            Add Slide
          </Button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="success"
          className="w-full primary-gradient capitalize"
        >
          Create Slider
        </Button>
      </form>
    </PageCont>
  );
};

export default AddSlider;
