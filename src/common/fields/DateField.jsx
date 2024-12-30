import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import { formatDateForDisplay, formatDateForSubmit } from "../../utils/dateUtils"; // Import utility functions
import moment from "moment";

import "./styles/DateStyle.css";

const DateField = ({
  control,
  errors,
  name,
  placeholder = "",
  className = "",
  parentClass = "",
  label = "",
  labelClass = "",
  disabled = false,
  picker = "date",
}) => {
  const dateFormat = "DD-MM-YYYY"; // The display format

  return (
    <div className={`flex flex-col w-full gap-2 ${parentClass}`}>
      {label && (
        <label htmlFor={name} className={`font-medium ml-0.5 text-[#000000] ${labelClass}`}>
          {label}
        </label>
      )}
      <div className="flex items-center border w-full border-solid border-[#6E6E6E] overflow-hidden bg-transparent rounded-sm">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            // Use utility to format the value for display
            const parsedValue = field.value ? formatDateForDisplay(field.value) : null;

            return (
              <DatePicker
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                picker={picker}
                {...field}
                className={`w-full text-[#000000] px-2.5 py-[7.5px] text-sm font-poppins placeholder:font-poppins placeholder:not-italic placeholder:text-sm placeholder:leading-normal placeholder:font-medium placeholder:text-[#6E6E6E] not-italic leading-normal custom-date font-medium disabled:bg-[#eceff1] outline-none border-none ${className}`}
                format={dateFormat}  // The format used for displaying the date
                value={parsedValue ? moment(parsedValue, dateFormat) : null}  // Ensure moment object or null
                onChange={(date) => {
                  // Use utility to format the date for submission in 'YYYY-MM-DD' format
                  field.onChange(formatDateForSubmit(date ? date.format(dateFormat) : null));
                }}
              />
            );
          }}
        />
      </div>
      {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
};

export default DateField;
