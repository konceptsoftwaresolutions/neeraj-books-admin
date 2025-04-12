import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../components/Heading";
import PageCont from "../../components/PageCont";
import InputField from "../../common/fields/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAffiliate,
  getAffiliateTiles,
  getAllAffiliateById,
  getQRImageAffiliate,
  updateTheAffiliatePaymnet,
} from "../../redux/features/affiliates";
import Tile from "./Tile";

const ViewAffiliate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [affiliateData, setAffiliateData] = useState(null);
  const [imgUrl, setImgUrl] = useState();
  const [tilesData, setTilesData] = useState();

  const { role } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      couponCode: affiliateData?.couponCode,
      commission: affiliateData?.commission,
      perVideo: affiliateData?.perVideo,
      perReel: affiliateData?.perReel,
      perPost: affiliateData?.perPost,
    });
  }, [affiliateData]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const paylod = {
      ...affiliateData,
      ...data,
      id: location.state.data._id,
      approved: true,
    };
    dispatch(
      updateTheAffiliatePaymnet(paylod, (success) => {
        if (success) {
          dispatch(
            getAllAffiliateById(location.state.data._id, (success, data) => {
              if (success) {
                setAffiliateData(data);
              }
            })
          );
        }
      })
    );
  };

  useEffect(() => {
    if (location?.state?.data) {
      dispatch(
        getAllAffiliateById(location.state.data._id, (success, data) => {
          if (success) {
            setAffiliateData(data);
          }
        })
      );
      dispatch(
        getQRImageAffiliate(location.state.data._id, (success, data) => {
          if (success) {
            setImgUrl(data);
          }
        })
      );
      dispatch(
        getAffiliateTiles(location?.state.data._id, (success, data) => {
          if (success) {
            console.log(data);
            setTilesData(data);
          }
        })
      );
    }
  }, [location]);

  const handleOrdersClick = () => {
    console.log(affiliateData);
    navigate(`/${role}/affiliateorders`, { state: { affiliateData } });
  };

  const handledelete = () => {
    dispatch(deleteAffiliate(location?.state.data._id));
    navigate(-1);
  };

  const handlePaymnetClick = () => {
    navigate(`/${role}/affiliatepayments`, { state: { affiliateData } });
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-start items-center gap-3">
          <Heading text="Affiliate" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-3 gap-3 w-full">
          <InputField
            control={control}
            errors={errors}
            name="couponCode"
            label="Coupon Code"
            type="text"
          />
          <InputField
            control={control}
            errors={errors}
            name="commission"
            label="Commission (%)"
            type="number"
          />
          <InputField
            control={control}
            errors={errors}
            name="perVideo"
            label="Per Video Rate"
            type="text"
          />
          <InputField
            control={control}
            errors={errors}
            name="perReel"
            label="Per Reel Rate"
            type="text"
          />
          <InputField
            control={control}
            errors={errors}
            name="perPost"
            label="Per Post Rate"
            type="text"
          />
        </div>

        <button
          type="submit"
          className={`col-span-3 mt-4  text-black px-4 py-2 rounded  transition ${
            affiliateData?.approved
              ? "bg-red-400 hover:bg-red-300 text-white"
              : "bg-yellow-400 hover:bg-yellow-300"
          }`}
        >
          {affiliateData?.approved ? "Disapprove" : "Approve"}{" "}
        </button>
      </form>

      {console.log(affiliateData?.approved)}

      {/* Display affiliate data below the form */}
      {affiliateData && (
        <div className="mt-10 p-6 border rounded-lg bg-white shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Affiliate Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p>
              <strong>Name:</strong> {affiliateData.firstName}{" "}
              {affiliateData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {affiliateData.email}
            </p>
            <p>
              <strong>Mobile:</strong> {affiliateData.mobile}
            </p>
            <p>
              <strong>Institution:</strong> {affiliateData.institutionName}
            </p>
            <p>
              <strong>Address:</strong> {affiliateData.address}
            </p>
            <p>
              <strong>City:</strong> {affiliateData.city}
            </p>
            <p>
              <strong>State:</strong> {affiliateData.state}
            </p>
            <p>
              <strong>Country:</strong> {affiliateData.country}
            </p>
            <p>
              <strong>Account Number:</strong> {affiliateData.accountNumber}
            </p>
            <p>
              <strong>Bank Name:</strong> {affiliateData.bankName}
            </p>
            <p>
              <strong>Branch Name:</strong> {affiliateData.branchName}
            </p>
            <p>
              <strong>UPI ID:</strong> {affiliateData.upiId}
            </p>
            <p>
              <strong>Approved:</strong> {affiliateData.approved ? "Yes" : "No"}
            </p>
            <p>
              <strong>About:</strong> {affiliateData.aboutYourself}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(affiliateData.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(affiliateData.updatedAt).toLocaleString()}
            </p>
            <p className="col-span-2">
              <strong>Payment QR:</strong>{" "}
              {affiliateData.paymentPicture ? (
                <img
                  src={imgUrl}
                  alt="QR Code"
                  className="w-28 h-28 object-cover mt-2"
                />
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      )}

      {/* Tiles Data Section */}
      {tilesData && (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          <Tile label="Pending Orders" value={tilesData.totalPendingOrders} />
          <Tile label="Shipped Orders" value={tilesData.totalShippedOrders} />
          <Tile
            label="Delivered Orders"
            value={tilesData.totalDeliveredOrders}
          />
          <Tile label="Total Sales" value={tilesData.totalSales} isCurrency />
          <Tile
            label="Total Commission"
            value={tilesData.totalCommission}
            isCurrency
          />
          <Tile
            label="Total Payments"
            value={tilesData.totalPayments ?? 0}
            isCurrency
          />
          <Tile label="Balance" value={tilesData.balance ?? 0} isCurrency />
        </div>
      )}

      <div className="grid grid-cols-5 gap-4 w-full mt-10">
        <button
          className=" mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
          onClick={handleOrdersClick}
        >
          View Orders{" "}
        </button>
        <button
          className=" mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
          onClick={handlePaymnetClick}
        >
          View Payments{" "}
        </button>
        <button
          className=" mt-4 bg-red-400 text-white px-4 py-2 rounded hover:bg-yellow-300 hover:text-red-400 transition"
          onClick={handledelete}
        >
          Delete Affiliate{" "}
        </button>
      </div>
    </PageCont>
  );
};

export default ViewAffiliate;
