import React from "react";
import { Controller } from "react-hook-form";
import { Select } from "antd"; // Import Ant Design's Select component

import "./styles/SelectStyle.css";

const SelectField = ({
  control,
  errors,
  name,
  options = [],
  placeholder = "",
  className = "",
  label = "",
  labelClass = "",
  parentClass = "",
  disabled = false,
  mode = "multiple", // Added mode prop to support "multiple" and "tags"
  onSelectChange = function () {}, // Optional prop for handling onSelect change
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
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            id={name}
            mode={mode}
            showSearch
            allowClear
            placeholder={placeholder}
            onChange={(selectedValue) => {
              onChange(selectedValue);
              if (onSelectChange) {
                onSelectChange(selectedValue);
              }
            }}
            disabled={disabled}
            value={value}
            className={`w-full custom-multi-select border-[#6E6E6E] ${
              disabled ? "" : "bg-transparent"
            } rounded-sm disabled:border ${className}`}
            options={options}
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        )}
      />
      {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
};

export default SelectField;
