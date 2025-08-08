import React, { useRef, useEffect } from "react";
import { LuFilePlus } from "react-icons/lu";
import { Controller, useWatch } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";

const FileFieldWithText = ({
  control,
  errors,
  name,
  maxFiles,
  label = "",
  labelClass = "",
  numberLabel = "Name", // Label for order field
}) => {
  const fileInputRef = useRef(null);
  const files = useWatch({ control, name }) || [];

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.blobURL) {
          URL.revokeObjectURL(file.blobURL);
        }
      });
    };
  }, [files]);

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
              <div className="flex justify-center gap-6 flex-wrap w-full">
                {value.map((fileItem, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center flex-col w-full sm:w-64"
                  >
                    <div className="border w-full p-4 border-gray-300 rounded-md">
                      <p className="truncate font-semibold">
                        {fileItem.file?.name || fileItem.name}
                      </p>
                      <div className="mt-3">
                        <Input
                          label={numberLabel}
                          type="text"
                          value={fileItem.name || ""}
                          onChange={(e) => {
                            const updated = [...value];
                            updated[index].name = e.target.value;
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
                  <LuFilePlus size={"32px"} />
                  <h2 className="font-poppins font-semibold text-[16px] ml-2">
                    Add Files
                  </h2>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="application/pdf"
              multiple
              onChange={(event) => {
                const selectedFiles = Array.from(event.target.files);

                // Only keep PDF files
                const pdfFiles = selectedFiles.filter(
                  (file) => file.type === "application/pdf"
                );

                const newFiles = pdfFiles.map((file) => ({
                  file,
                  blobURL: URL.createObjectURL(file),
                }));

                const total = value.length + newFiles.length;
                const finalFiles =
                  total <= maxFiles
                    ? [...value, ...newFiles]
                    : [...value, ...newFiles.slice(0, maxFiles - value.length)];

                onChange(finalFiles);
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

export default FileFieldWithText;
