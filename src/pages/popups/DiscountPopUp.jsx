import React, { useEffect, useState } from "react";
import InputField from "../../common/fields/InputField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createDiscountPopUp,
  getDiscountPopUpData,
} from "../../redux/features/sliders";
import { Button } from "@material-tailwind/react";

const DiscountPopUp = () => {
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
      getDiscountPopUpData((success, data) => {
        if (success) {
          console.log(data);
          reset({
            firstLinkName: data.firstLinkName,
            heading1: data.heading1,
            heading2: data.heading2,
            title: data.title,
          });
        }
      })
    );
  };

  useEffect(() => {
    getDefaultData();
  }, []);

  const disountPopUpSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    dispatch(
      createDiscountPopUp(
        data,
        (success) => {
          if (success) {
            getDefaultData();
          }
        },
        setIsLoading
      )
    );
  };

  return (
    <div>
      <div className="mt-4 p-3 rounded-lg bg-gray-100">
        <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
          Discount Pop Up
        </h2>
        <div>
          <form onSubmit={handleSubmit(disountPopUpSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
              <InputField
                control={control}
                errors={errors}
                label="Link Text"
                name="firstLinkName"
                type="description"
              />
              <InputField
                control={control}
                errors={errors}
                label="Title"
                name="title"
                type="description"
              />
              <InputField
                control={control}
                errors={errors}
                label="First Heading"
                name="heading1"
                type="description"
              />
              <InputField
                control={control}
                errors={errors}
                label="Second Heading"
                name="heading2"
                type="description"
              />
              {/* <InputField
                  control={control}
                  errors={errors}
                  label="Pop Up Text"
                  name="normalDiscount"
                  type="textEditor"
                /> */}
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

export default DiscountPopUp;
