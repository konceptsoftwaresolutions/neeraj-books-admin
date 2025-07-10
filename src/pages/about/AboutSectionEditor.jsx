import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import InputField from "../../common/fields/InputField";
import ImageField from "../../common/fields/ImageField";

const AboutSectionEditor = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sections: [{ description: "", image: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const onSubmit = (data) => {
    console.log("Submitted About Sections:", data.sections);
    // You can integrate with an API or store here
  };

  return (
    <div className=" rounded-md bg-white  w-full  mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Manage About Sections</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 rounded-md border border-gray-300 bg-gray-50 relative"
          >
            <div className="flex justify-between items-center mb-2">
              <p className=" text-black font-semibold underline">
                Section {index + 1}
              </p>
              {fields.length > 1 && (
                <TrashIcon
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={() => remove(index)}
                />
              )}
            </div>

            <ImageField
              control={control}
              errors={errors}
              name={`sections[${index}].image`}
              maxFiles={1}
              label="Upload Image"
            />

            <InputField
              type="textEditor"
              control={control}
              errors={errors}
              name={`sections[${index}].description`}
              label="Description"
            />
          </div>
        ))}

        <div className="flex items-center gap-4">
          <Button
            type="button"
            className="bg-blue-600 text-white capitalize"
            onClick={() => append({ description: "", image: [] })}
          >
            Add Section
          </Button>

          <Button type="submit" className="bg-green-600 text-white capitalize">
            Save All
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AboutSectionEditor;
