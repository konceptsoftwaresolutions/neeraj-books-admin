import React from "react";
import { MdEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";

import { FaCircleUser } from "react-icons/fa6";

const CustomerCard = () => {
  return (
    <div>
      <div className="flex justify-start items-center border-b-[1px] border-gray-300 p-3">
        <span className="text-gray-500">
          {" "}
          <FaCircleUser size={20} className="mr-2" />{" "}
        </span>
        <span className="text-[#677788]"> Amanda Harvey</span>
      </div>
      <div className=" border-b-[1px] border-gray-300 p-3">
        <p className="text-black">Contact Info</p>
        <p className="text-sm flex justify-start items-center gap-2 text-[#677788] mt-2">
          <MdEmail /> <span>abc@gamil.com</span>
        </p>
        <p className="text-sm flex justify-start items-center gap-2 text-[#677788] mt-1">
          <IoPhonePortraitOutline /> <span>abc@gamil.com</span>
        </p>
      </div>
      <div className=" border-b-[1px] border-gray-300 p-3">
        <p className="text-black">Shipping Info</p>
        <p className="text-sm flex justify-start items-center gap-2 text-[#677788] mt-2">
          45 Roker Terrace Latheronwheel KW5 8NW, London UK Great
        </p>
      </div>
      <div className="  p-3">
        <p className="text-black">Billing Address</p>
        <p className="text-sm flex justify-start items-center gap-2 text-[#677788] mt-2">
          45 Roker Terrace Latheronwheel KW5 8NW, London UK Great
        </p>
      </div>
    </div>
  );
};

export default CustomerCard;
