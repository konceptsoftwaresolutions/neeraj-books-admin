import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../../components/Heading";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { createHeroSection } from "../../redux/features/sliders";

const HeroSection = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(createHeroSection(data));
  };

  return (
    <>
      <div className="my-8 border-t-2 pt-8">
        <Heading text="Home Banner" backIcon="false" />
      </div>
      <div className="mt-4 p-3 rounded-lg bg-gray-100">
        <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
          YT Link
        </h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3 ">
              <InputField
                control={control}
                errors={errors}
                label="Heading"
                name="title"
                type="text"
              />
              <InputField
                control={control}
                errors={errors}
                label="Sub Heading"
                name="description"
                type="text"
              />
              <InputField
                control={control}
                errors={errors}
                label="YT Link"
                name="youtubeLink"
                type="text"
              />
            </div>
            <Button type="submit" className="primary-gradient mt-4 mb-4">
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
