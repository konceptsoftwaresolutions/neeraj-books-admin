import React, { useState } from "react";
import Heading from "../../components/Heading";
import InputField from "../../common/fields/InputField";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import TemplateModal from "./TemplateModal";

const Emailer = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const [openModal, setOpenModal] = useState(false);
  const [emailName, setEmailName] = useState("");
  const [emailLink, setEmailLink] = useState("");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className=" border-t-2 mt-10 ">
      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mt-5">
          <h2 className="text-lg lg:text-2xl head-color font-medium ">
            Send Email
          </h2>
          <div className="flex  gap-2">
            <button
              className="  bg-green-500 text-white py-2 px-3"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4  mt-3">
          <InputField
            type="text"
            control={control}
            errors={errors}
            label="Subject : "
            name="subject"
          />
          <InputField
            control={control}
            errors={errors}
            label="Body"
            name="body"
            type="textEditor"
          />
        </div>
        {/* <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <p>Email : </p>
            <p className="border border-black p-2 min-h-[120px]">
              Dear Message: Thank You!
            </p>
          </div>
          <div>
            <p>Sample Email</p>
            <p className="border border-black p-2 min-h-[120px] break-words whitespace-pre-wrap overflow-hidden">
              Dear {emailName === "" ? "{$var1}" : emailName}
              <span className="pl-2">Message: </span>{" "}
              {emailLink === "" ? "{$var2}" : emailLink}
              Thank You!
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="grid grid-cols-2 border border-black ">
            <div>
              <p className="p-3">Name($var1):</p>
            </div>
            <div>
              <input
                type="text"
                className=" outline-none w-full h-full p-3 border-l-[1px] border-black"
                onChange={(e) => setEmailName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="grid grid-cols-2 border border-black  border-t-0">
            <div>
              <p className="p-3">Link($var2):</p>
            </div>
            <div>
              <input
                type="text"
                className=" outline-none w-full h-full p-3 border-l-[1px] border-black"
                onChange={(e) => setEmailLink(e.target.value)}
              ></input>
            </div>
          </div>
        </div> */}
      </form>
      <TemplateModal showModal={openModal} setShowModal={setOpenModal} />
    </div>
  );
};

export default Emailer;
