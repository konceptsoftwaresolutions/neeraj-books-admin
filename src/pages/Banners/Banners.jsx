import React, { useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import ImageField from "../../common/fields/ImageField";

function Banners(props) {
  const navigate = useNavigate();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);

  //states
  const [asset, setAssets] = useState({
    video: true,
    image: false,
  });

  const handleRowClick = (data) => {
    navigate(`/${role}/addbanners`);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleAssetAdd = (key) => {
    setAssets((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the specific key
    }));
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="Banners" />
        </div>
        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
          onClick={() => path.changeEndPoint("addbanners")}
        >
          <Plus className="pr-1" />
          Add Banners
        </Button>
      </div>{" "}
      <div className="mt-5">
        <div className="">
          <Heading text="Hero Section" backIcon="false" />
          <div className="px-2 flex gap-2 mt-2">
            <span
              className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-white  ${
                asset.video
                  ? "border-2 !border-[#1f437f]  !bg-[#1f437f38] text-[#1f437f]"
                  : ""
              }`}
              onClick={() => handleAssetAdd("video")}
            >
              Video{" "}
            </span>
            <span
              className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-white ${
                asset.image
                  ? "border-2 !border-[#1f437f] !bg-[#1f437f38] text-[#1f437f]"
                  : ""
              }`}
              onClick={() => handleAssetAdd("image")}
            >
              Image
            </span>
          </div>
          <div className="mt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-3 px-2">
                <InputField
                  control={control}
                  errors={errors}
                  name="mainHeading"
                  label="Main Heading"
                  type="text"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="subHeading"
                  label="Sub Heading"
                  type="text"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="redirectTo"
                  label="Button Link"
                />
              </div>
              <div className="my-3 px-2">
                {asset.video === true ? (
                  <>
                    <InputField
                      control={control}
                      errors={errors}
                      name="videoCode"
                      label="Video Iframe"
                      type="description"
                    />
                  </>
                ) : null}
                {asset.image === true ? (
                  <>
                    <div className="mt-3">
                      <ImageField
                        control={control}
                        errors={errors}
                        name={"heroBannerImage"}
                        maxFiles={1}
                        label="Uplaod Image"
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="px-2">
                <Button className="bg-cstm-blue">Save</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageCont>
  );
}

export default Banners;
