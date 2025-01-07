import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions, profileOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addTeamMember } from "../../redux/features/teamMembers";

function AddMembers() {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addTeamMember(data));
  };

  return (
    <PageCont>
      <Heading text="Add Members" />
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="name"
              label="Name"
            />
            <InputField
              control={control}
              errors={errors}
              name="email"
              label="Email"
              type="email"
            />
            <InputField
              control={control}
              errors={errors}
              name="mobile"
              label="Mobile"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="profile"
              label="Profile"
              type="select"
              options={profileOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="password"
              label="Password"
              type="password"
            />
          </div>
          <Button type="submit" className="primary-gradient ">
            Submit
          </Button>
        </form>
      </div>
    </PageCont>
  );a
}

export default AddMembers;
