import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";
import { IoCalendarOutline } from "react-icons/io5";
import { IoPrintOutline } from "react-icons/io5";
import { Dropdown, Space } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { IoClipboardOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import CustomerCard from "./CustomerCard";
import SummaryCard from "./SummaryCard";
import ShippingCard from "./ShippingCard";
import CancelOrder from "./CancelOrder";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
        className="text-[#677788] text-[11px] flex items-center gap-1"
      >
        <IoClipboardOutline />
        Duplicate
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
        className="text-[#677788] text-[11px] flex items-center gap-1"
      >
        <MdOutlineCancel />
        Cancel Order
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
        className="text-[#677788] text-[11px] flex items-center gap-1"
      >
        <BiArchiveIn /> Archive
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
        className="text-[#677788] text-[11px] flex items-center gap-1"
      >
        <CiEdit />
        Edit Order
      </a>
    ),
  },
];

const EditOrders = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageCont>
      <Heading text="Orders Details" />
      <div className="mt-4">
        <div>
          <div className="flex justify-start items-center gap-4">
            <span className="text-xl font-medium">Order #32453</span>
            <span className="bg-[#00c9a71a] text-[#00c9a7] px-3 text-[12px] rounded-md">
              Paid
            </span>
            <span className="flex items-center gap-2 text-[12px]">
              <IoCalendarOutline size={18} />
              Aug 17, 2020, 5:48 (ET)
            </span>
          </div>
          <div className="flex justify-start items-center gap-2 mt-2">
            <p className="flex items-center  text-sm gap-1 text-[#677788] cursor-pointer">
              <IoPrintOutline size={18} /> Print Order
            </p>
            {/* <Dropdown menu={{ items }}>
              <a
                onClick={(e) => e.preventDefault()}
                className="text-[#677788] text-sm cursor-pointer"
              >
                More Options
                <DownOutlined />
              </a>
            </Dropdown> */}
          </div>
        </div>
      </div>

      <div className="border-t-[1px] border-solid border-gray-200 mt-5 pt-5">
        <div className="flex justify-center items-start gap-5">
          <div className="w-[65%] border-[1px] border-solid border-gray-200 rounded-md ">
            <p className="border-b-[1px] p-3 border-solid border-gray-200">
              Order Details
            </p>
            <div className="px-5">
              <SummaryCard />
            </div>
          </div>
          <div className="w-[35%] border border-gray-200 rounded-md sticky top-5 h-fit ">
            <div>
              <p className="border-b-[1px] p-3 border-solid border-gray-200">
                Customer Details
              </p>
              <div className="px-5">
                <CustomerCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-start gap-5 ">
        <div className="w-[65%] border-[1px] border-solid border-gray-200 rounded-md mt-9">
          <ShippingCard />
        </div>
        <div className="w-[35%] "></div>
      </div>
      <div className="flex justify-start items-start gap-5 ">
        <div className="w-[65%] border-[1px] border-solid border-gray-200 rounded-md mt-9">
          <CancelOrder />
        </div>
        <div className="w-[35%] "></div>
      </div>
    </PageCont>
  );
};

export default EditOrders;
