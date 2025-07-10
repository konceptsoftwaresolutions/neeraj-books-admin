import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import { stateOptions } from "../../constant/options";
import { MdDelete } from "react-icons/md";

function EditBulkClient() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageCont>
      <Heading text="Edit Client" />
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <InputField
              control={control}
              errors={errors}
              name="firstName"
              label="First Name"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="lastName"
              label="Last Name"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="companyName"
              label="Company Name"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="email"
              label="Email"
              type="text"
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
              name="notes"
              label="Notes"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="addressLine1"
              label="Address Line 1"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="addressLine2"
              label="Address Line 2"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="pincode"
              label="Pincode"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="city"
              label="City"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="state"
              label="States"
              type="option"
              options={stateOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="country"
              label="Country"
              type="text"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="primary-gradient mt-4 capitalize">
              Add
            </Button>
            <Button
              type="button"
              className="primary-gradient mt-4 capitalize flex items-center gap-1"
            >
              <MdDelete size={17} /> Delete
            </Button>
          </div>
        </form>
      </div>
    </PageCont>
  );
}

export default EditBulkClient;
