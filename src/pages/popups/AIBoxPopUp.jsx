import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import {
  createAIsection,
  getAISectionData,
} from "../../redux/features/sliders";

const AIBoxPopUp = () => {
  const dispatch = useDispatch();
  const [sectionData, setSectionData] = useState();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const getDefaultData = () => {
    dispatch(
      getAISectionData((success, data) => {
        if (success) setSectionData(data);
        else setSectionData("");
      })
    );
  };

  useEffect(() => {
    getDefaultData();
  }, []);

  useEffect(() => {
    if (sectionData) {
      reset({
        tagTitle: sectionData?.tagTitle,
      });
      console.log(sectionData);
    }
  }, [sectionData]);

  const aiTextSubmit = (data) => {
    console.log("ssssss", data);
    const payload = {
      ...data,
      title: data?.tagTitle,
    };
    dispatch(
      createAIsection(payload, (success) => {
        if (success) {
          getDefaultData();
        }
      })
    );
  };
  return (
    <>
      <div className="my-8 border-t-2 pt-8">
        <Heading text="AI Box" backIcon="false" />
      </div>
      <div className="mt-4 p-3 rounded-lg bg-gray-100">
        {/* <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            AI NO
            </h2> */}
        <div>
          <form onSubmit={handleSubmit(aiTextSubmit)}>
            <div className="grid grid-cols-1 gap-3 ">
              <InputField
                control={control}
                errors={errors}
                label="Title"
                name="tagTitle"
                type="textEditor"
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

export default AIBoxPopUp;
