import React, { useState } from "react";
import PageCont from "../../components/PageCont";
import { ChevronsLeft, Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { allPromotions } from "../../constant/tableColumns";
// import Modal from "./Modal";
import ImageField from "../../common/fields/ImageField";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import {
  createAIsection,
  createAppPopUp,
  createDiscountPopUp,
  createHomePopUp,
  createYoutubePopUp,
} from "../../redux/features/sliders";
import HeroSection from "./HeroSection";

function AllPopups(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);

  const [popupType, setPopupType] = useState("image");
  const [appPopupType, setAppPopupType] = useState("image");
  const [active, setActive] = useState("image");

  const Promotions = [
    {
      active: "Active",
      discount: "#250302",
      medium: "English",
      status: "From Dec 10",
    },
    {
      active: "Active",
      discount: "#250302",
      medium: "English",
      status: "From Dec 10",
    },
    {
      active: "Active",
      discount: "#250302",
      medium: "English",
      status: "From Dec 10",
    },
    {
      active: "Active",
      discount: "#250302",
      medium: "English",
      status: "From Dec 10",
    },
    {
      active: "Active",
      discount: "#250302",
      medium: "English",
      status: "From Dec 10",
    },
    {
      active: "Active",
      discount: "#250302",
      medium: "English",
      status: "From Dec 10",
    },
  ];

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const {
    handleSubmit: handleAppDiscountSubmit,
    formState: { errors: errorsAppDiscount },
    control: controlAppDiscount,
    reset: appReset,
  } = useForm();

  const {
    handleSubmit: handleDiscountTextSubmit,
    formState: { errors: errorsDiscountText },
    control: controlDiscountText,
    reset: discountTextReset,
  } = useForm();

  const {
    handleSubmit: handleAITextSubmit,
    formState: { errors: errorsAIText },
    control: controlAIText,
    reset: AITextReset,
  } = useForm();

  const {
    handleSubmit: handleDiscountPopSubmit,
    formState: { errors: errorsDiscountPopup },
    control: controlDiscountPopup,
    reset: discountPopUpReset,
  } = useForm();

  const convertToPlainText = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    const plainText = tempElement.textContent || tempElement.innerText || "";

    // Get the first word after trimming any leading/trailing spaces
    const firstWord = plainText.trim().split(" ")[0];
    return firstWord;
  };

  const onsubmit = (data) => {
    reset();
    console.log(data);
    const normalTitle = convertToPlainText(data.tagTitle);
    const formData = new FormData();
    formData.append("title", normalTitle);
    formData.append("tagTitle", data.tagTitle);
    if (popupType === "image") {
      formData.append("file", data.popUpBanner[0].file);
      formData.append("type", popupType);
    }
    if (popupType === "video") {
      formData.append("youtubeLink", data.youtubeLink);
      formData.append("type", popupType);
    }
    dispatch(createHomePopUp({ formData }));
  };

  const appDiscountSubmit = (data) => {
    console.log(data);
    appReset({
      appDiscount: "", // Resetting fields explicitly
    });
  };

  const disountPopUpSubmit = (data) => {
    console.log(data);

    dispatch(createDiscountPopUp(data));

    discountPopUpReset({
      title: "",
      heading1: "",
      heading2: "",
    });
  };

  const discountTextSubmit = (data) => {
    console.log(data);
    const title = data.firstLinkName?.split(" ")[0] || ""; // Extract first word
    const payload = {
      ...data,
      title,
    };
    dispatch(createYoutubePopUp(payload));
  };

  const aiTextSubmit = (data) => {
    console.log("ssssss", data);
    const payload = {
      ...data,
      title: data?.tagTitle,
    };
    dispatch(createAIsection(payload));
  };

  const onAppPopUpSubmit = (data) => {
    console.log(data);
    const normalTitle = convertToPlainText(data?.appTitle);
    const formData = new FormData();
    formData.append("title", normalTitle);
    formData.append("tagTitle", data.appTitle);
    if (appPopupType === "image") {
      formData.append("file", data.appImage[0].file);
      formData.append("type", popupType);
    }
    if (appPopupType === "video") {
      formData.append("youtubeLink", data.youtubeLink);
      formData.append("type", appPopupType);
    }
    dispatch(createAppPopUp({ formData }));
    appReset({
      appTitle: "",
      appImage: "",
      youtubeLink: "",
    });
  };

  return (
    <div>
      <PageCont>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <Heading text="All PopUps" />
          </div>
          {/* <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
            onClick={() => path.changeEndPoint("")}
          >
            <Plus className="pr-1" />
            create discounts
          </Button> */}
        </div>{" "}
        {/* <div className="mt-4 mb-8">
          <DataTable
            data={Promotions}
            columns={allPromotions}
            customStyles={tableStyle}
          />
        </div> */}
        <div className="mt-6 p-3 rounded-lg bg-gray-100">
          <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            Home Popup
          </h2>
          <div className="flex gap-x-2 mb-2">
            <p
              className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-gray-300 ${
                popupType === "image"
                  ? "!bg-[#1f437f38] text-[#1f437f] border-[#1f437f]"
                  : ""
              }`}
              onClick={() => setPopupType("image")}
            >
              Image
            </p>
            <p
              className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-gray-300 ${
                popupType === "video"
                  ? "!bg-[#1f437f38] text-[#1f437f] border-[#1f437f]"
                  : ""
              }`}
              onClick={() => setPopupType("video")}
            >
              Video
            </p>
          </div>

          {/* <Modal /> */}
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="mb-3">
              <InputField
                type="textEditor"
                control={control}
                errors={errors}
                label="Pop Up text"
                name="tagTitle"
              />
            </div>
            {popupType === "image" && (
              <div>
                <ImageField
                  control={control}
                  errors={errors}
                  name={"popUpBanner"}
                  maxFiles={1}
                  label="Select Image"
                />
              </div>
            )}
            {popupType === "video" && (
              <div>
                <InputField
                  control={control}
                  errors={errors}
                  name="youtubeLink"
                  maxFiles={1}
                  label="Youtube Link"
                  type="text"
                />
              </div>
            )}
            <Button type="submit" className="primary-gradient mt-4 mb-4">
              Save
            </Button>
          </form>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-gray-100">
          <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            App Installation Discount
          </h2>
          <div className="flex gap-x-2 mb-2">
            <p
              className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-gray-300 ${
                appPopupType === "image"
                  ? "!bg-[#1f437f38] text-[#1f437f] border-[#1f437f]"
                  : ""
              }`}
              onClick={() => setAppPopupType("image")}
            >
              Image
            </p>
            <p
              className={`bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-gray-300 ${
                appPopupType === "video"
                  ? "!bg-[#1f437f38] text-[#1f437f] border-[#1f437f]"
                  : ""
              }`}
              onClick={() => setAppPopupType("video")}
            >
              Video
            </p>
          </div>
          <div>
            <form onSubmit={handleAppDiscountSubmit(onAppPopUpSubmit)}>
              <div className="mb-3">
                <InputField
                  type="textEditor"
                  control={controlAppDiscount}
                  errors={errorsAppDiscount}
                  label="Pop Up text"
                  name="appTitle"
                />
              </div>
              {appPopupType === "image" && (
                <div>
                  <ImageField
                    control={controlAppDiscount}
                    errors={errorsAppDiscount}
                    name="appImage"
                    maxFiles={1}
                    label="Select Image"
                  />
                </div>
              )}
              {appPopupType === "video" && (
                <div>
                  <InputField
                    control={controlAppDiscount}
                    errors={errorsAppDiscount}
                    name="youtubeLink"
                    maxFiles={1}
                    label="Youtube Link"
                    type="text"
                  />
                </div>
              )}
              <Button type="submit" className="primary-gradient mt-4 mb-4">
                Save
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-gray-100">
          <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            Discount Pop Up
          </h2>
          <div>
            <form onSubmit={handleDiscountPopSubmit(disountPopUpSubmit)}>
              <div className="grid grid-cols-3 gap-3 ">
                <InputField
                  control={controlDiscountPopup}
                  errors={errorsDiscountPopup}
                  label="Link Text"
                  name="firstLinkName"
                  type="text"
                />
                <InputField
                  control={controlDiscountPopup}
                  errors={errorsDiscountPopup}
                  label="Title"
                  name="title"
                  type="text"
                />
                <InputField
                  control={controlDiscountPopup}
                  errors={errorsDiscountPopup}
                  label="First Heading"
                  name="heading1"
                  type="text"
                />
                <InputField
                  control={controlDiscountPopup}
                  errors={errorsDiscountPopup}
                  label="Second Heading"
                  name="heading2"
                  type="text"
                />
                {/* <InputField
                  control={controlDiscountPopup}
                  errors={errorsDiscountPopup}
                  label="Pop Up Text"
                  name="normalDiscount"
                  type="textEditor"
                /> */}
              </div>
              <Button type="submit" className="primary-gradient mt-4 mb-4">
                Save
              </Button>
            </form>
          </div>
        </div>
        {/* -----------------top bar fields --------------*/}
        <div className="my-8 border-t-2 pt-8">
          <Heading text="Top Bar Fields" backIcon="false" />
        </div>
        <div className="mt-4 p-3 rounded-lg bg-gray-100">
          <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            YT Link
          </h2>
          <div>
            <form onSubmit={handleDiscountTextSubmit(discountTextSubmit)}>
              <div className="grid grid-cols-2 gap-3 ">
                <InputField
                  control={controlDiscountText}
                  errors={errorsDiscountText}
                  label="Enter Text"
                  name="firstLinkName"
                  type="text"
                />
                <InputField
                  control={controlDiscountText}
                  errors={errorsDiscountText}
                  label="YT link"
                  name="youtubeLink"
                  type="text"
                />
              </div>
              <Button type="submit" className="primary-gradient mt-4 mb-4">
                Save
              </Button>
            </form>
          </div>
        </div>
        {/* -----------------AIbox  --------------*/}
        <div className="my-8 border-t-2 pt-8">
          <Heading text="AI Box" backIcon="false" />
        </div>
        <div className="mt-4 p-3 rounded-lg bg-gray-100">
          {/* <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            AI NO
          </h2> */}
          <div>
            <form onSubmit={handleAITextSubmit(aiTextSubmit)}>
              <div className="grid grid-cols-1 gap-3 ">
                <InputField
                  control={controlAIText}
                  errors={errorsAIText}
                  label="Title"
                  name="tagTitle"
                  type="textEditor"
                />
              </div>
              <Button type="submit" className="primary-gradient mt-4 mb-4">
                Save
              </Button>
            </form>
          </div>
        </div>
        <HeroSection />
      </PageCont>
    </div>
  );
}

export default AllPopups;
