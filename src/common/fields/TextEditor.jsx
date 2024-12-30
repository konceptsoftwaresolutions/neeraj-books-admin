import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ name, control, label, errors }) => {
  return (
    <div className="col-span-2 lg:col-span-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ReactQuill
            {...field}
            className="bg-white border rounded-sm border-solid border-[#6E6E6E]"
          />
        )}
      />
      {errors?.[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default RichTextEditor;
