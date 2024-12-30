import React from "react";
import PageCont from "../../components/PageCont";
import StatsCard from "./StatsCard";
import Heading from "../../components/Heading";
import BillPDF from "../../pdf/billPdf";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import InputField from "../../common/fields/InputField";
import { FaUser, FaWallet, FaCarAlt, FaTruck, FaWindowClose, FaSync, FaBook, FaShoppingCart } from "react-icons/fa";

const Home = () => {

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
      <div className="flex justify-start items-center gap-3   ">
        <Heading text="Admin Dashboard" /> <BillPDF />
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-sm">Select Date to Filter Date</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <InputField
              control={control}
              errors={errors}
              name="bookCover"
              type="Date"
            />
            <InputField
              control={control}
              errors={errors}
              name="previewPdf"
              type="Date"
            />
            <div className="flex justify-center gap-5 items-center">
              <Button type="submit" className="bg-[#1ABC9C] w-[300px]">
                Filter
              </Button>
              <Button type="submit" className="bg-[#FF7979] w-[300px]">
                Reset
              </Button>
            </div>
          </div>
          <Button type="submit" className="bg-[#1ABC9C] w-[200px] mt-4">
            Remettance Loge
          </Button>

        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-5 max-h-screen overflow-auto">
        <StatsCard title={"Today's Patients"} icon={<FaWallet />} value="100" growth="100" />
        <StatsCard title={"Weekly Patients"} icon={<FaUser />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaWallet />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaWallet />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaCarAlt />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaTruck />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaWindowClose />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaSync />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaBook />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaShoppingCart />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaWallet />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaUser />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaUser />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaBook />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaShoppingCart />} value="100" growth="100" />
        <StatsCard title={"Monthly Patients"} icon={<FaWallet />} value="100" growth="100" />
      </div>
    </PageCont>
  );
};

export default Home;
