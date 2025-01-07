import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import ImageField from "../../common/fields/ImageField";

function AddBanners(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      banners: [{ desktopBanner: "", mobileBanner: "" }], // Default values for the banners
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "banners", // Name of the field array
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // Add a new banner form
  const addBanner = () => {
    append({ desktopBanner: "", mobileBanner: "" });
  };

  return (
    <PageCont>
      <Heading text="Add Banners" />
      <div className="mt-4">
        <p>
          Desktop Banner Size - (1400px X 700px)<br></br>
          Mobile Banner Size - (600px X 760px)
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {fields.map((banner, index) => (
              <div key={banner.id} className="w-full">
                <ImageField
                  control={control}
                  errors={errors}
                  name={`banners[${index}].desktopBanner`} // Dynamic name for each input
                  maxFiles={1}
                  label={`Desktop Banner ${index + 1}`}
                />
                <ImageField
                  control={control}
                  errors={errors}
                  name={`banners[${index}].mobileBanner`} // Dynamic name for each input
                  maxFiles={1}
                  label={`Mobile Banner ${index + 1}`}
                />
                {/* Delete Button */}
                <Button
                  type="button"
                  onClick={() => remove(index)} // Removes the banner at the specific index
                  className="mt-2 text-red-500"
                >
                  Delete Banner {index + 1}
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={addBanner}
            className="primary-gradient mt-4"
          >
            <span className="mr-2">+</span> Add Another Banner
          </Button>
          <Button type="submit" className="primary-gradient mt-4 ml-4">
            Save
          </Button>
        </form>
      </div>
    </PageCont>
  );
}

export default AddBanners;
