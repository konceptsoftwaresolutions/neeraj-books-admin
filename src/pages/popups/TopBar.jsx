import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createYoutubePopUp,
  getYTPopUpData,
} from "../../redux/features/sliders";
import { Button } from "@material-tailwind/react";
import InputField from "../../common/fields/InputField";

const TopBar = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const getDefaultData = () => {
    dispatch(
      getYTPopUpData((success, data) => {
        if (success) {
          console.log(data);
          reset({
            firstLinkName: data.firstLinkName,
            youtubeLink: data.youtubeLink,
          });
        }
      })
    );
  };

  useEffect(() => {
    getDefaultData();
  }, []);

  const discountTextSubmit = (data) => {
    console.log(data);
    const title = data.firstLinkName?.split(" ")[0] || ""; // Extract first word
    const payload = {
      ...data,
      title,
    };
    dispatch(createYoutubePopUp(payload, setIsLoading));
  };

  return (
    <div>
      <div className="my-8 border-t-2 pt-8">
        <Heading text="Top Bar Fields" backIcon="false" />
      </div>
      <div className="mt-4 p-3 rounded-lg bg-gray-100">
        <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
          YT Link
        </h2>
        <div>
          <form onSubmit={handleSubmit(discountTextSubmit)}>
            <div className="grid grid-cols-2 gap-3 ">
              <InputField
                control={control}
                errors={errors}
                label="Enter Text"
                name="firstLinkName"
                type="description"
              />
              <InputField
                control={control}
                errors={errors}
                label="YT link"
                name="youtubeLink"
                type="description"
              />
            </div>
            <Button
              type="submit"
              loading={isLoading}
              className="primary-gradient mt-4 mb-4 capitalize"
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
