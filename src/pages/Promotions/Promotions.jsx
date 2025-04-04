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
import Modal from "./Modal";
import ImageField from "../../common/fields/ImageField";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import {
  createDiscountPopUp,
  createHomePopUp,
} from "../../redux/features/sliders";

function Promotions(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);

  const [popupType, setPopupType] = useState("image");
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

  return (
    <div>
      <PageCont>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <Heading text="Discounts" />
          </div>
          <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
            onClick={() => path.changeEndPoint("")}
          >
            <Plus className="pr-1" />
            create discounts
          </Button>
        </div>{" "}
        <div className="mt-4 mb-8">
          <DataTable
            data={Promotions}
            columns={allPromotions}
            customStyles={tableStyle}
          />
        </div>
        {/* <div className="">
          <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            Home Popup
          </h2>
          <div className="flex ">
            <p
              className="bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-white"
              onClick={() => setPopupType("video")}
            >
              Video
            </p>
            <p
              className="bg-gray-300 px-3 rounded-xl cursor-pointer border-2 border-white"
              onClick={() => setPopupType("image")}
            >
              Image
            </p>
          </div>

          
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
        </div> */}
        {/* <div className="mt-4">
          <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            App Installation Discount
          </h2>
          <div>
            <form onSubmit={handleAppDiscountSubmit(appDiscountSubmit)}>
              <InputField
                control={controlAppDiscount}
                errors={errorsAppDiscount}
                label="Enter Discount"
                name="appDiscount"
                type="number"
              />
              <Button type="submit" className="primary-gradient mt-4 mb-4">
                Save
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-black-800 text-[20px] font-semibold border-b mb-3">
            Discount Pop Up
          </h2>
          <div>
            <form onSubmit={handleDiscountPopSubmit(disountPopUpSubmit)}>
              <div className="grid grid-cols-3 gap-3 ">
                <InputField
                  control={controlDiscountPopup}
                  errors={errorsDiscountPopup}
                  label="Discount Heading"
                  name="title"
                  type="text"
                />
                <InputField
                  control={controlDiscountPopup}
                  errors={errorsDiscountPopup}
                  label="Discount Heading"
                  name="heading1"
                  type="text"
                />
                <InputField
                  control={controlDiscountPopup}
                  errors={errorsDiscountPopup}
                  label="Discount Heading"
                  name="heading2"
                  type="text"
                />
              </div>
              <Button type="submit" className="primary-gradient mt-4 mb-4">
                Save
              </Button>
            </form>
          </div>
        </div> */}
      </PageCont>
    </div>
  );
}

export default Promotions;
