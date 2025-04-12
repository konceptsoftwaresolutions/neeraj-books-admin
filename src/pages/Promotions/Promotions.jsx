import React, { useEffect } from "react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { allPromotions } from "../../constant/tableColumns";

import { useForm } from "react-hook-form";
import {
  getAllAffiliates,
  updateTheAffiliatePaymnet,
} from "../../redux/features/affiliates";
import { useNavigate } from "react-router-dom";

function Promotions(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allAffiliates } = useSelector((state) => state.affiliate);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllAffiliates());
  }, [dispatch]);

  const handleStatusChange = (data, status) => {
    if (status === "approve") {
      navigate(`/${role}/affiliateDetails`, { state: { data } });
    } else {
      console.log(data, status);
      const payload = {
        id: data._id,
        approved: false,
      };
      dispatch(updateTheAffiliatePaymnet(payload));
    }
  };

  const handleRowClick = (data) => {
    navigate(`/${role}/affiliateDetails`, { state: { data } });
  };

  return (
    <div>
      <PageCont>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <Heading text="All Affiliates" />
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
        <div className="mt-4 mb-8">
          <DataTable
            data={allAffiliates ? allAffiliates : []}
            columns={allPromotions(handleRowClick)}
            customStyles={tableStyle}
            onRowClicked={(row) => handleRowClick(row)}
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
