import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Quill Toolbar Configuration
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }], // Text and Background Color
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"], // Clear formatting
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "link",
  "image",
];

const RichTextEditor = ({ name, control, label, errors, defaultValue = "", required = false }) => {
  return (
    <div className="col-span-2 lg:col-span-4">
      {label && (
        <label className="block mb-1 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue} // Set default value
        rules={required ? { required: "This field is required" } : {}} // Required validation
        render={({ field }) => (
          <ReactQuill
            {...field}
            value={field.value || defaultValue} // Use value from form or default
            onChange={(content) => field.onChange(content)}
            modules={modules}
            formats={formats}
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
