import React from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";

import "./styles/OptionStyle.css";

const OptionField = ({
  control,
  errors,
  name,
  options = [],
  placeholder = "",
  className = "",
  onSelectChange = () => {},
  label = "",
  labelClass = "",
  parentClass = "",
  disabled = false,
  defaultValue = null,
  required = false, // New prop for required validation
}) => {
  return (
    <div className={`flex flex-col w-full gap-2 ${parentClass}`}>
      {label && (
        <label
          htmlFor={name}
          className={`font-medium ml-0.5 text-[#000000] ${labelClass}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={required ? { required: "This field is required" } : {}} // Required validation
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            placeholder={placeholder}
            onChange={(selectedOption) => {
              onChange(selectedOption ? selectedOption : null);
              onSelectChange(selectedOption);
            }}
            onBlur={onBlur}
            disabled={disabled}
            ref={ref}
            className={`w-full custom-select !bg-transparent border-[#6E6E6E] ${
              disabled ? "" : "bg-transparent"
            } custom-select rounded-sm disabled:border ${className}`}
            value={value ?? defaultValue} // Ensure correct default value handling
          >
            {options.map((item, index) => (
              <Select.Option
                key={index}
                value={item.value}
                className="capitalize"
              >
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default OptionField;
