import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions, profileOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTeamMember } from "../../redux/features/teamMembers";

function EditMembers(props) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleDelete = () => {
    let _id = '';
    let data = _id
    dispatch(deleteTeamMember(data));
  };

  return (
    <PageCont>
      <div className="flex justify-between">
        <Heading text="Edit Members" />
        <Button
          type="button"
          onClick={handleDelete}
          variant="filled"
          className="bg-cstm-blue rounded-md poppins-font hover:bg-red-500 px-2"
        >
          <span className="poppins-font flex items-center gap-1">
            <MdDelete size={18} />
          </span>
        </Button>
      </div>
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
              mode="single"
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
          <Button type="submit" className="  primary-gradient ">
            Update
          </Button>
        </form>
      </div>
    </PageCont>
  );
}

export default EditMembers;
