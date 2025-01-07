import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import InputField from "../../common/fields/InputField";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { mediumOptions } from "../../constant/options";
import ImageField from "../../common/fields/ImageField";

const CreateCombo = () => {
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
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="Create Combo" />
        </div>

        {/* <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue"
          //   onClick={() => path.changeEndPoint("addbook")}
        >
          <Plus className="pr-1" />
          Add Book
        </Button> */}
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InputField
              control={control}
              errors={errors}
              name="comboTitle"
              label="Combo Title"
            />
            <InputField
              control={control}
              errors={errors}
              name="subInfo"
              label="Sub Info"
            />
            <InputField
              control={control}
              errors={errors}
              name="medium"
              type="option"
              options={mediumOptions}
              label="Medium"
            />
            <InputField
              control={control}
              errors={errors}
              name="paperBackMRP"
              label="Paperback (MRP)"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="paperBackSalePrice"
              label="Paperback (Sale Price)"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="stock"
              label="Stock"
              type="number"
            />
          </div>
          <div>
            <InputField
              control={control}
              errors={errors}
              name="medium"
              type="select"
              label="Select Books"
            />
          </div>
          <div className="mt-3">
            <ImageField
              control={control}
              errors={errors}
              name={"comboImg"}
              maxFiles={5}
              label="Upload Combo Images (900px X 450px)"
            />
          </div>
          <Button type="submit" className="primary-gradient ">
            Add
          </Button>
        </form>
      </div>
    </PageCont>
  );
};

export default CreateCombo;
