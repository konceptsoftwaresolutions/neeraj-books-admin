import React, { useRef, useEffect } from "react";
import { LuImagePlus } from "react-icons/lu";
import { Controller, useWatch } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";

const ImageFieldWithNumber = ({
  control,
  errors,
  name,
  maxFiles,
  label = "",
  labelClass = "",
  numberLabel = "Order", // Label for number field
}) => {
  const fileInputRef = useRef(null);
  const images = useWatch({ control, name }) || [];

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.blobURL) {
          URL.revokeObjectURL(image.blobURL);
        }
      });
    };
  }, [images]);

  return (
    <div>
      <div className="mb-2">
        {label && (
          <label
            htmlFor={name}
            className={`font-medium ml-0.5 text-[#000000] ${labelClass}`}
          >
            {label}
          </label>
        )}
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field: { value = [], onChange } }) => (
          <>
            <div className="border border-solid border-gray-500 rounded-md sm:p-3">
              <div className="flex justify-center gap-8 flex-wrap w-full">
                {value.map((image, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center flex-col"
                  >
                    <div className="relative flex w-full mx-auto my-2 justify-center flex-col items-center border border-solid border-slate-300 rounded-md overflow-hidden">
                      <img
                        src={image.blobURL ? image.blobURL : image.url}
                        alt={`Selected ${index}`}
                        className="object-cover w-full h-[220px]"
                      />
                      <div className="w-full p-2">
                        <Input
                          label={numberLabel}
                          type="number"
                          value={image.order || ""}
                          onChange={(e) => {
                            const updated = [...value];
                            updated[index].order = e.target.value;
                            onChange(updated);
                          }}
                          className="text-sm text-black"
                        />
                      </div>
                      <Button
                        onClick={() => {
                          const updated = value.filter((_, i) => i !== index);
                          onChange(updated);
                        }}
                        className="my-4 bg-red-500"
                      >
                        <MdDelete size={20} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {value.length < maxFiles && (
                <div
                  className="flex justify-center items-center w-full py-12 border border-dashed text-slate-600 border-slate-600 cursor-pointer rounded-lg"
                  onClick={handleClick}
                >
                  <LuImagePlus size={"32px"} />
                  <h2 className="font-poppins font-semibold not-italic text-[16px] text-slate-700 leading-normal ml-2">
                    Add Images
                  </h2>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(event) => {
                const files = Array.from(event.target.files);
                const newImages = files.map((file) => ({
                  file,
                  blobURL: URL.createObjectURL(file),
                  order: "", // Set order instead of value
                }));

                const total = value.length + newImages.length;
                const finalImages =
                  total <= maxFiles
                    ? [...value, ...newImages]
                    : [...value, ...newImages.slice(0, maxFiles - value.length)];

                onChange(finalImages);
                fileInputRef.current.value = "";
              }}
            />

            <div className="flex flex-col justify-start items-start mt-4">
              {errors[name] && (
                <span className="text-red-500 text-sm">
                  {errors[name].message}
                </span>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default ImageFieldWithNumber;
