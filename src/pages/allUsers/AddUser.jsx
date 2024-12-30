import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import BackButton from "../../common/fields/BackButton";

const AddUser = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageCont>
      <div className="flex justify-start items-center gap-3">
        <BackButton />
        <Heading text="Add User" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 bg-[#f6f6f678] p-4">
          <InputField
            type="text"
            label="Name"
            name="name"
            control={control}
            errors={errors}
          />
          <InputField
            type="email"
            label="Email"
            name="email"
            control={control}
            errors={errors}
          />
          <InputField
            type="text"
            label="Address"
            name="address"
            control={control}
            errors={errors}
          />
          <InputField
            type="text"
            label="Mobile"
            name="phone"
            control={control}
            errors={errors}
          />
          <InputField
            type="text"
            label="Profile"
            name="profile"
            control={control}
            errors={errors}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="filled"
            className="primary-gradient black text-white py-[8px] px-[16px] font-bold text-md mt-4 rounded-md flex items-center justify-center bg-gradient-to-r from-[#29A6E0] to-[#2E3494]"
            // loading={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </PageCont>
  );
};

export default AddUser;
