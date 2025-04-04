import React, { useMemo } from "react";

// fields
import TextField from "./TextField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import SelectField from "./SelectField";
import OptionField from "./OptionField";
import DateField from "./DateField";
import UploadField from "./UploadField";
import DescriptionField from "./DescriptionField";
import UploadsField from "./UploadsField";
import NumericField from "./NumericField";
import TextareaField from "./TextareaField";
import RichTextEditor from "./TextEditor";
import FileUploadField from "./FileUploadField";
import VideoUploadField from "./VideoUpload";
import InputTagField from "./InputTagField";
import MonthRangePicker from "./MonthRangePicker";

/**
 * @typedef {'text' | 'email' | 'password' | 'option' | 'select' | 'date' | 'file' | 'upload' | 'description' | 'desc' | 'number' | 'time' | 'datelocal-time' } InputType
 * @typedef {'multiple' | 'tags'} ModeType
 * @typedef {'date' | 'time' | 'month' | 'quarter' | 'time' | 'week' | 'year' } PickerType
 */

/**
 * @param {Object} props
 * @param {import('react-hook-form').Control} props.control - Control object from react-hook-form
 * @param {Object} props.errors - Errors object from react-hook-form
 * @param {string} [props.name] - Name of the input field
 * @param {InputType} [props.type] - Type of the input field
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.label] - Label text
 * @param {string} [props.labelClass] - CSS class for the label
 * @param {Array} [props.options] - Options for select fields
 * @param {string} [props.className] - CSS class for the input field
 * @param {string} [props.parentClass] - CSS class for the parent container
 * @param {string} [props.accept] - Accept attribute for file input
 * @param {boolean} [props.disabled] - Disable the input field
 * @param {ModeType} [props.mode] - Mode for select fields
 * @param {PickerType} [props.picker] - Mode for select fields
 * @param {function} [props.onSelectChange] - Callback for when selection changes
 * @param {string} [props.modalLabel] - Label for the modal when type is 'upload' or 'file'
 * @param {string} [props.modalHeadClass] - CSS class for the modal header
 * @param {string} [props.modalClass] - CSS class for the modal container
 * @param {string} [props.modalBodyClass] - CSS class for the modal body
 * @param {string} [props.modalLabelClass] - CSS class for the modal label
 * @param {number} [props.max] - The maximum allowable value in number.
 */
const InputField = ({
  required,
  control,
  rows,
  errors,
  name = "",
  type = "text",
  placeholder = "",
  label = "",
  labelClass = "",
  options = [],
  className = "",
  parentClass = "",
  accept = "*",
  disabled = false,
  mode = "multiple",
  onSelectChange = function () {},
  defaultValue,
  modalLabel = "",
  modalHeadClass = "",
  modalClass = "",
  modalBodyClass = "",
  modalLabelClass = "",
  max = 1,
  value,
  picker = "date",
}) => {
  const props = {
    required,
    value,
    control,
    errors,
    name,
    type,
    placeholder,
    defaultValue,
    label,
    labelClass,
    options,
    className,
    parentClass,
    rows,
    accept,
    disabled,
    mode,
    onSelectChange,
    modalLabel,
    modalHeadClass,
    modalClass,
    modalBodyClass,
    modalLabelClass,
    max,
    picker,
  };

  const FieldComponent = useMemo(() => {
    switch (type) {
      case "text":
        return <TextField {...props} />;
      case "monthRange":
        return <MonthRangePicker {...props} />;
      case "numeric":
        return <NumericField {...props} />;
      case "email":
        return <EmailField {...props} />;
      case "password":
        return <PasswordField {...props} />;
      case "select":
        return <SelectField {...props} />;
      case "option":
        return <OptionField {...props} />;
      case "date":
        return <DateField {...props} />;
      case "file":
        return <UploadField {...props} />;
      case "upload":
        return <UploadsField {...props} />;
      case "uploadFiles":
        return <FileUploadField {...props} />;
      case "videos":
        return <VideoUploadField {...props} />;
      case "description":
        return <TextareaField {...props} />;
      case "desc":
        return <DescriptionField {...props} />;
      case "textEditor":
        return <RichTextEditor {...props} />;
      case "tags":
        return <InputTagField {...props} />;
      default:
        return <TextField {...props} />;
    }
  }, [type, props]);

  return FieldComponent;
};

export default InputField;
