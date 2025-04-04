import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const MonthRangePicker = ({
  control,
  errors,
  name,
  defaultValue = "",
  parentClass = "",
  label = "",
  labelClass = "",
  required = false,
}) => {
  // Convert "Jan 2025 - Jul 2025" to ["Jan 2025", "Jul 2025"]
  const formattedDefaultValue =
    typeof defaultValue === "string" && defaultValue.includes(" - ")
      ? defaultValue.split(" - ").map((date) => dayjs(date.trim(), "MMM YYYY"))
      : [];

  return (
    <div className={`flex flex-col w-full gap-2 ${parentClass}`}>
      {label && (
        <label className={`font-medium ml-0.5 text-[#000000] ${labelClass}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={formattedDefaultValue.map((date) =>
          date.format("MMM YYYY")
        )} // Ensure correct format
        rules={required ? { required: "This field is required" } : {}}
        render={({ field }) => (
          <RangePicker
            {...field}
            picker="month"
            format="MMM YYYY"
            value={
              field.value?.length === 2
                ? [
                    dayjs(field.value[0], "MMM YYYY"),
                    dayjs(field.value[1], "MMM YYYY"),
                  ]
                : formattedDefaultValue.length === 2
                ? formattedDefaultValue
                : null
            }
            onChange={(dates) => {
              field.onChange(
                dates && dates.length === 2
                  ? [dates[0].format("MMM YYYY"), dates[1].format("MMM YYYY")]
                  : []
              );
            }}
            className="w-full text-[#000000] px-2.5 py-2 text-sm font-poppins placeholder:text-[#6E6E6E] bg-transparent border border-[#6E6E6E] rounded-sm"
          />
        )}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default MonthRangePicker;
