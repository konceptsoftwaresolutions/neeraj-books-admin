import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import InputField from "../../common/fields/InputField";
import Heading from "../../components/Heading";
import BackButton from "../../common/fields/BackButton";
import PageCont from "../../components/PageCont";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import ImageField from "../../common/fields/ImageField";
import { Trash2 } from "lucide-react";

const EditPatient = () => {
  const location = useLocation();
  const patient = location.state?.patient;

  const [isEditable, setIsEditable] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: patient?.name,
      email: patient?.email,
      phone: patient?.phone,
      ward: patient?.ward,
      address: patient?.address,
      date: patient?.date,
      patientId: patient?.patientId,
      note: " be navigated to amazon.com not back to email. how to do it? ",
    },
  });

  const {
    handleSubmit: handleAadharSubmit,
    formState: { errors: errorsAadhar },
    control: controlAadhar,
  } = useForm();

  const aadharEdit = (data) => {
    console.log(data);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <PageCont>
        <div className="flex justify-start items-center gap-3">
          <BackButton />
          <Heading text="Edit Patient" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 bg-[#f6f6f678] p-4">
            <InputField
              type="text"
              label="Patient ID"
              name="patientId"
              control={control}
              errors={errors}
              disabled
            />
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
              label="Ward"
              name="ward"
              control={control}
              errors={errors}
              disabled={!isEditable}
            />
            <InputField
              type="date"
              label="Date"
              name="date"
              control={control}
              errors={errors}
              disabled={!isEditable}
            />
          </div>
          <div className="bg-[#29a6e033] p-3 rounded-md my-3 mt-10 ">
            <Heading text="Payments" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_] md:grid-cols-[1fr_1fr_1fr_30px]  gap-4 border-b pb-4 bg-[#f6f6f678] p-4 rounded-md mb-5">
            <InputField
              type="text"
              label="Transaction ID"
              name="transactionID"
              control={control}
              errors={errors}
              disabled={!isEditable}
            />
            <InputField
              type="date"
              label="Payment Date"
              name="paymnetDate"
              control={control}
              errors={errors}
              disabled={!isEditable}
            />
            <InputField
              type="description"
              label="Note"
              name="note"
              control={control}
              errors={errors}
              disabled={!isEditable}
            />
            <div className="flex items-end">
              <button className="p-1 rounded-lg back-btn md:block  bg-[#29A6E0] hover:bg-red-500 ease-in-out hover:shadow-lg transform hover:translate-x-[0px] hover:translate-y-[-8px] transition-transform duration-200">
                <Trash2 color="white" width={22} />
              </button>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <Button
              variant="filled"
              onClick={() => {
                setIsEditable(!isEditable);
              }}
              className="primary-gradient black text-white py-[8px] px-[16px] font-bold text-md mt-4 rounded-md flex items-center justify-center bg-gradient-to-r from-[#29A6E0] to-[#2E3494]"
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
        <div className="bg-[#29a6e033] p-3 rounded-md my-3 mt-10">
          <Heading text="Upload Documents" />
        </div>
        <div className="grid grid-cols-3 bg-[#f6f6f678] p-4">
          <form onSubmit={handleAadharSubmit(aadharEdit)}>
            <div className="form-control">
              <p className="font-medium ml-0.5 text-[#000000] mb-3">
                Aadhaar Card
              </p>

              <ImageField
                control={controlAadhar}
                errors={errorsAadhar}
                name={"adhaarImg"}
                maxFiles={1}
              />
              <Button
                type="submit"
                // onClick={handleAadharSubmit}
                // loading={addLoader}
                variant="filled"
                className="primary-gradient black text-white py-[8px] px-[16px] font-bold text-md  rounded-md flex items-center justify-center bg-gradient-to-r from-[#29A6E0] to-[#2E3494]"
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </PageCont>
    </div>
  );
};

export default EditPatient;
