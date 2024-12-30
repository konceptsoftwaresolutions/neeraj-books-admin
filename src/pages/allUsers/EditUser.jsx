import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PageCont from "../../components/PageCont";
import { useLocation } from "react-router-dom";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import Heading from "../../components/Heading";
import BackButton from "../../common/fields/BackButton";

const EditUser = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [isEditable , setIsEditable] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      address: user?.address,
      phone: user?.phone,
      profile: user?.profile,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageCont>
      <div className="flex justify-start items-center gap-3">
        <BackButton />
        <Heading text="Edit User" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 bg-[#f6f6f678] p-4">
          <InputField
            type="text"
            label="Name"
            name="name"
            control={control}
            errors={errors}
            disabled={!isEditable}
          />
          <InputField
            type="email"
            label="Email"
            name="email"
            control={control}
            errors={errors}
            disabled={!isEditable}
          />
          <InputField
            type="text"
            label="Address"
            name="address"
            control={control}
            errors={errors}
            disabled={!isEditable}
          />
          <InputField
            type="text"
            label="Mobile"
            name="phone"
            control={control}
            errors={errors}
            disabled={!isEditable}
          />
          <InputField
            type="text"
            label="Profile"
            name="profile"
            control={control}
            errors={errors}
            disabled={!isEditable}
          />
        </div>
        <div className="flex justify-start items-center gap-4">
        <Button
            variant="filled"
            className="primary-gradient black text-white py-[8px] px-[16px] font-bold text-md mt-4 rounded-md flex items-center justify-center bg-gradient-to-r from-[#29A6E0] to-[#2E3494]"
            // loading={loading}
            onClick={ () => setIsEditable(!isEditable) }
          >
            Edit
          </Button>
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

export default EditUser;
