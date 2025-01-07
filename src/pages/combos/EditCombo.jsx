import React, { useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import InputField from "../../common/fields/InputField";
import ImageField from "../../common/fields/ImageField";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { mediumOptions } from "../../constant/options";

const EditCombo = () => {
  const [isEditable, setIsEditable] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      comboTitle:
        "MA Economics 1st Semester Combo Including MEC-101, MEC-102, MEC-203",
      subInfo: "(JUNE 2024 EDITION)",
      medium: "English",
      paperBackMRP: "1000",
      paperBackSalePrice: "500",
      stock: "10",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="Combo Details" />
        </div>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="comboTitle"
              label="Combo Title"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="subInfo"
              label="Sub Info"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="medium"
              type="option"
              options={mediumOptions}
              label="Medium"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="paperBackMRP"
              label="Paperback (MRP)"
              type="number"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="paperBackSalePrice"
              label="Paperback (Sale Price)"
              type="number"
              disabled={!isEditable}
            />
            <InputField
              control={control}
              errors={errors}
              name="stock"
              label="Stock"
              type="number"
              disabled={!isEditable}
            />
          </div>
          <div>
            <InputField
              control={control}
              errors={errors}
              name="selectedBooks"
              type="select"
              label="Select Books"
              disabled={!isEditable}
            />
          </div>
          <p className="font-medium ml-0.5 text-[#000000] mt-3">Combo Images</p>
          <div className="grid grid-cols-4 gap-3">
            <img src="https://www.neerajbooks.com/image/data/4be4325e1073edd7ac5ad136b7e4f4ff.png" />
            <img src="https://www.neerajbooks.com/image/data/4be4325e1073edd7ac5ad136b7e4f4ff.png" />
            <img src="https://www.neerajbooks.com/image/data/4be4325e1073edd7ac5ad136b7e4f4ff.png" />
            <img src="https://www.neerajbooks.com/image/data/4be4325e1073edd7ac5ad136b7e4f4ff.png" />
          </div>

          {isEditable && (
            <div className="mt-3">
              <ImageField
                control={control}
                errors={errors}
                name={"comboImg"}
                maxFiles={5}
                label="Upload Combo Images (900px X 450px)"
              />
            </div>
          )}
          <div className="mt-3 flex gap-3">
            <Button
              type="button"
              className="primary-gradient "
              onClick={() => setIsEditable(!isEditable)}
            >
              Edit
            </Button>
            <Button type="submit" className="primary-gradient ">
              Save
            </Button>
          </div>
        </form>
      </div>
    </PageCont>
  );
};

export default EditCombo;
