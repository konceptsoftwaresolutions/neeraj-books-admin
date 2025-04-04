import React from "react";
import { Controller } from "react-hook-form";
import { Select } from "antd";

const InputTagField = ({
  control,
  errors,
  name,
  placeholder = "Type and press Enter",
  className = "",
  label = "",
  labelClass = "",
  parentClass = "",
  required,
  disabled = false,
  defaultValue = [], // Optional default value as an array
}) => {
  return (
    <div
      className={
        "flex flex-col w-full gap-2" +
        (parentClass !== "" ? ` ${parentClass}` : "")
      }
    >
      {label && (
        <label
          htmlFor={name}
          className={
            "font-medium ml-0.5 text-[#000000]" +
            (labelClass !== "" ? ` ${labelClass}` : "")
          }
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue} // ✅ This handles default values
        render={({ field: { onChange, value } }) => (
          <Select
            id={name}
            mode="tags"
            tokenSeparators={[",", " "]} // Optional, separates by comma/space
            showArrow
            allowClear
            placeholder={placeholder}
            onChange={onChange}
            value={value || []}
            disabled={disabled}
            className={`min-h-[40px] max-h-[max-content] w-full custom-multi-select border-[#6E6E6E] ${
              disabled ? "" : "bg-white"
            } rounded-sm disabled:border ${className}`}
          />
        )}
      />
      {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
};

export default InputTagField;
