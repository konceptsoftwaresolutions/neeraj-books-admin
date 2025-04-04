import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useDispatch } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import ImageField from "../../common/fields/ImageField";
import { Button } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { deleteSlider } from "../../redux/features/sliders";

const EditSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const sliderData = location.state?._id;
  console.log(sliderData);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: sliderData?.content || [
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
  };

  const handleSlideDelete = () => {
    dispatch(deleteSlider(sliderId));
    navigate(-1);
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <Heading text="Edit Slider" />
        <Button
          type="button"
          onClick={handleSlideDelete}
          variant="filled"
          className="bg-cstm-blue rounded-md poppins-font hover:bg-red-500 px-2"
        >
          <span className="poppins-font flex items-center gap-1">
            <MdDelete size={18} />
          </span>
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
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
            {fields?.map((field, index) => (
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
            Add Content
          </Button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="success"
          className="w-full primary-gradient capitalize"
        >
          Save Slider
        </Button>
      </form>
    </PageCont>
  );
};

export default EditSlider;
