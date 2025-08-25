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
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import AddCouponModal from "../coupons/AddCouponModal";

const ViewAffiliate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [affiliateData, setAffiliateData] = useState(null);
  const [imgUrl, setImgUrl] = useState();
  const [tilesData, setTilesData] = useState();
  const [openCouponModal, setOpenCouponModal] = useState(false);

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});

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

    // Initialize formValues when affiliateData changes
    if (affiliateData) {
      setFormValues(affiliateData);
    }
  }, [affiliateData, reset]);

  const onSubmit = (data) => {
    const paylod = {
      ...affiliateData,
      ...data,
      id: location.state.data._id,
      approved: !affiliateData?.approved, // toggle approve/disapprove
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
            setTilesData(data);
          }
        })
      );
    }
  }, [location, dispatch]);

  const handleOrdersClick = () => {
    navigate(`/${role}/affiliateorders`, { state: { affiliateData } });
  };

  const handledelete = () => {
    dispatch(deleteAffiliate(location?.state.data._id));
    navigate(-1);
  };

  const handlePaymnetClick = () => {
    navigate(`/${role}/affiliatepayments`, { state: { affiliateData } });
  };

  // Handle input change for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated affiliate info
  const handleSave = () => {
    const payload = {
      ...affiliateData,
      ...formValues,
      id: location.state.data._id,
    };

    dispatch(
      updateTheAffiliatePaymnet(payload, (success) => {
        if (success) {
          setAffiliateData(payload);
          setIsEditing(false);
        }
      })
    );
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center mb-6">
        <Heading text="Affiliate" />
        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
          onClick={() => setOpenCouponModal(!openCouponModal)}
        >
          <Plus className="pr-1" />
          Create Coupon
        </Button>
      </div>

      {/* Approve/Disapprove Form */}
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
          className={`col-span-3 mt-4 px-4 py-2 rounded transition ${
            affiliateData?.approved
              ? "bg-red-500 hover:bg-red-400 text-white"
              : "bg-green-500 hover:bg-green-400 text-white"
          }`}
        >
          {affiliateData?.approved ? "Disapprove" : "Approve"}
        </button>
      </form>

      {/* Personal Info */}
      {affiliateData && (
        <div className="mt-10 p-6 border rounded-lg bg-white shadow space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Affiliate Personal Details
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-1 bg-blue-600 text-white rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-1 bg-green-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>
                <strong>Name:</strong>{" "}
                {isEditing ? (
                  <>
                    <input
                      name="firstName"
                      value={formValues.firstName || ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-28"
                    />
                    <input
                      name="lastName"
                      value={formValues.lastName || ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-28 ml-2"
                    />
                  </>
                ) : (
                  `${affiliateData.firstName} ${affiliateData.lastName}`
                )}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {isEditing ? (
                  <input
                    name="email"
                    value={formValues.email || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  affiliateData.email
                )}
              </p>
              <p>
                <strong>Mobile:</strong>{" "}
                {isEditing ? (
                  <input
                    name="mobile"
                    value={formValues.mobile || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  affiliateData.mobile
                )}
              </p>
              <p>
                <strong>Institution:</strong>{" "}
                {isEditing ? (
                  <input
                    name="institutionName"
                    value={formValues.institutionName || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  affiliateData.institutionName
                )}
              </p>
              <p className="col-span-2">
                <strong>Address:</strong>{" "}
                {isEditing ? (
                  <input
                    name="address"
                    value={formValues.address || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  `${affiliateData.address}, ${affiliateData.city}, ${affiliateData.state}, ${affiliateData.country}`
                )}
              </p>
              <p>
                <strong>Approved:</strong>{" "}
                {affiliateData.approved ? "Yes" : "No"}
              </p>
              <p>
                <strong>About:</strong>{" "}
                {isEditing ? (
                  <textarea
                    name="aboutYourself"
                    value={formValues.aboutYourself || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  affiliateData.aboutYourself
                )}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(affiliateData.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(affiliateData.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Affiliate Account Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>
                <strong>Account Number:</strong>{" "}
                {isEditing ? (
                  <input
                    name="accountNumber"
                    value={formValues.accountNumber || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  affiliateData.accountNumber
                )}
              </p>
              <p>
                <strong>Bank Name:</strong>{" "}
                {isEditing ? (
                  <input
                    name="bankName"
                    value={formValues.bankName || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  affiliateData.bankName
                )}
              </p>
              <p>
                <strong>Branch Name:</strong>{" "}
                {isEditing ? (
                  <input
                    name="branchName"
                    value={formValues.branchName || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  affiliateData.branchName
                )}
              </p>
              <p>
                <strong>UPI ID:</strong>{" "}
                {isEditing ? (
                  <input
                    name="upiId"
                    value={formValues.upiId || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  affiliateData.upiId
                )}
              </p>
              <p className="col-span-2">
                <strong>Payment QR:</strong>{" "}
                {isEditing ? (
                  <input
                    name="paymentPicture"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        paymentPicture: e.target.files[0],
                      })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  <>
                    {affiliateData.paymentPicture ? (
                      <img
                        src={imgUrl}
                        alt="QR Code"
                        className="w-28 h-28 object-cover mt-2"
                      />
                    ) : (
                      "N/A"
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tiles */}
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

      {/* Actions */}
      <div className="grid grid-cols-5 gap-4 w-full mt-10">
        <button
          className=" mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
          onClick={handleOrdersClick}
        >
          View Orders
        </button>
        <button
          className=" mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
          onClick={handlePaymnetClick}
        >
          View Payments
        </button>
        <button
          className=" mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
          onClick={handledelete}
        >
          Delete Affiliate
        </button>
      </div>
      <AddCouponModal
        openModal={openCouponModal}
        setOpenModal={setOpenCouponModal}
      />
    </PageCont>
  );
};

export default ViewAffiliate;
