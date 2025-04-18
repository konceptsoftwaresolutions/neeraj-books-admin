import React, { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pdf } from "@react-pdf/renderer";
import {
  createShippingOrder,
  generateLabelShiprocket,
  getOrderById,
  getTrackingOrder,
} from "../../redux/features/orders";
import ShipmentPdf from "../pdf/ShipmentPdf";

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
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [orderInitial, setOrderInitial] = useState();
  const [orderdata, setOrderData] = useState();

  const location = useLocation();
  console.log(location.state.data);

  const { shipNowBtnLoader, generateLabelLoder } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    setOrderInitial(location?.state?.data);
  }, [location]);

  const getTheOrderbyId = (id) => {
    dispatch(
      getOrderById(id, (success, data) => {
        if (success) {
          setOrderData(data?.order);
        }
      })
    );
  };

  useEffect(() => {
    if (orderInitial) {
      getTheOrderbyId(orderInitial?._id);
    }
  }, [orderInitial]);

  console.log(orderdata);

  const originalAmountCalculate = orderdata?.items?.reduce((total, product) => {
    const medium = product.language;
    const bookTitle = product?.productId?.[medium]?.title;
    const originalSellingPrice = parseFloat(
      product?.productId?.[medium]?.paperBackOriginalPrice || 0
    );
    const quantity = parseFloat(product?.quantity || 0);
    const ebookPrice = parseFloat(product?.ebookPrice || 0);
    const onlyEbook = product?.onlyEbookSelected;
    const isEbookAlso = product?.isEbookAlsoSelected;

    let originalAmount = 0;

    if (onlyEbook) {
      originalAmount = ebookPrice;
    } else if (isEbookAlso) {
      originalAmount = quantity * originalSellingPrice + ebookPrice;
    } else {
      originalAmount = originalSellingPrice * quantity;
    }

    return total + originalAmount;
  }, 0);

  const discountedAmountCalculate = orderdata?.items?.reduce(
    (total, product) => {
      const medium = product.language;
      const bookTitle = product?.productId?.[medium]?.title;
      const originalSellingPrice = parseFloat(
        product?.productId?.[medium]?.paperBackOriginalPrice || 0
      );
      const discountedSellingPrice = parseFloat(
        product?.productId?.[medium]?.paperBackDiscountedPrice || 0
      );
      const quantity = parseFloat(product?.quantity || 0);
      const ebookPrice = parseFloat(product?.ebookPrice || 0);
      const onlyEbook = product?.onlyEbookSelected;
      const isEbookAlso = product?.isEbookAlsoSelected;

      let originalAmount = 0;

      if (onlyEbook) {
        originalAmount = ebookPrice;
      } else if (isEbookAlso) {
        originalAmount = quantity * discountedSellingPrice + ebookPrice;
      } else {
        originalAmount = discountedSellingPrice * quantity;
      }

      return total + originalAmount;
    },
    0
  );

  const amountAfterAdditionalDiscount =
    discountedAmountCalculate - orderdata?.additionalDiscount;

  const couponDiscountOff =
    (Number(amountAfterAdditionalDiscount || 0) *
      Number(orderdata?.appliedCouponDiscount || 0)) /
    100;

  const couponDiscountCalculated =
    amountAfterAdditionalDiscount - couponDiscountOff;

  const grandTotalCalculated =
    Number(couponDiscountCalculated) + Number(orderdata?.shippingAmount);

  const totalBooks = orderdata?.items?.reduce((total, item) => {
    const isOnlyEbook = item.onlyEbookSelected;

    if (!isOnlyEbook) {
      const quantity = item.quantity || 1;
      return total + quantity;
    }

    return total;
  }, 0);

  const totalWeight = orderdata?.items?.reduce((total, item) => {
    const isOnlyEbook = item.onlyEbookSelected;

    const medium = item?.language;
    const bookTitle = item?.productId?.[medium]?.title;
    const weightStr = item?.productId?.[medium]?.weight;

    if (!isOnlyEbook && weightStr) {
      const weight = parseFloat(weightStr);
      const quantity = item.quantity || 1;
      return total + weight * quantity;
    }

    return total;
  }, 0);

  useEffect(() => {
    if (totalBooks && totalWeight) {
      reset({
        length: 24,
        breadth: 18,
        height: totalBooks,
        weight: totalWeight,
      });
    }
  }, [totalBooks, totalWeight]);

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      order_id: orderdata?.orderId,
      billing_customer_name: orderdata?.shippingAddress?.firstName,
      billing_last_name: orderdata?.shippingAddress?.lastName,
      billing_address: orderdata?.shippingAddress?.addressLine1,
      billing_address_2: orderdata?.shippingAddress?.addressLine2,
      billing_city: orderdata?.shippingAddress?.city,
      billing_pincode: orderdata?.shippingAddress?.pincode,
      billing_state: orderdata?.shippingAddress?.state,
      billing_country: orderdata?.shippingAddress?.country,
      billing_email: orderdata?.shippingAddress?.email,
      billing_phone: orderdata?.shippingAddress?.mobile,
      payment_method: orderdata?.paymentMode,
      sub_total: additionalDiscountCalculated,
      length: data.length,
      breadth: data.breadth,
      height: data.height,
      weight: data.weight,
      items: orderdata?.items,
    };
    console.log(payload);
    dispatch(
      createShippingOrder(payload, (success) => {
        if (success) {
          getTheOrderbyId(orderInitial?._id);
          window.scrollTo(0, 0);
        }
      })
    );
  };

  const handleGenerateLabel = () => {
    const payload = {
      shipment_id: orderdata?.shipment_id,
    };
    console.log(payload);
    dispatch(generateLabelShiprocket(payload));
  };

  const handleInvoiceClick = async (data) => {
    console.log(data);
    try {
      const blob = await pdf(<ShipmentPdf data={data} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleOrderTracking = () => {
    dispatch(getTrackingOrder(1234));
  };

  return (
    <PageCont>
      <Heading text="Orders Details" />
      <div className="mt-4">
        <div>
          {/* <div className="flex justify-start items-center gap-4">
            <span className="text-xl font-medium">Order #32453</span>
            <span className="bg-[#00c9a71a] text-[#00c9a7] px-3 text-[12px] rounded-md">
              Paid
            </span>
            <span className="flex items-center gap-2 text-[12px]">
              <IoCalendarOutline size={18} />
              Aug 17, 2020, 5:48 (ET)
            </span>
          </div> */}
          <div className="flex justify-start items-center gap-2 mt-2">
            {/* <p className="flex items-center  text-sm gap-1 text-[#677788] cursor-pointer">
              <IoPrintOutline size={18} /> Print Order
            </p> */}
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

      {/* <div className="border-t-[1px] border-solid border-gray-200 mt-5 pt-5">
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
      </div> */}
      {orderdata ? (
        <>
          <div className="mt-10">
            <div className="mb-10">
              <p className="text-center text-3xl">
                Order No -{" "}
                <span className="text-blue-700 font-semibold">
                  {orderdata?.orderId}
                </span>
              </p>
            </div>
            <div className="flex justify-end gap-1 mb-6">
              <Button>SMS</Button>
              <Button onClick={() => handleInvoiceClick(orderdata)}>
                Invoice
              </Button>
              {orderdata?.orderStatus === "Shipped" && (
                <Button
                  className=""
                  onClick={handleGenerateLabel}
                  loading={generateLabelLoder}
                >
                  Genereate label
                </Button>
              )}
              {orderdata?.orderStatus === "Shipped" && (
                <Button onClick={handleOrderTracking}>Track Order</Button>
              )}
            </div>
            <div className="flex justify-between ">
              <div className="w-[50%]">
                <p>Ship to :</p>
                <ul className="space-y-2">
                  <li>
                    {orderdata?.shippingAddress?.firstName}
                    {orderdata?.shippingAddress?.lastName}
                  </li>
                  <li>{orderdata?.shippingAddress?.mobile}</li>
                  <li>{orderdata?.shippingAddress?.addressLine1}</li>
                  {orderdata?.shippingAddress?.addressline2 && (
                    <li>{orderdata?.shippingAddress?.addressline2}</li>
                  )}
                  <li>
                    {orderdata?.shippingAddress?.city} ,{" "}
                    {orderdata?.shippingAddress?.state} ,
                    {orderdata?.shippingAddress?.pincode}{" "}
                  </li>
                  <li>{orderdata?.shippingAddress?.country}</li>
                </ul>
              </div>
              <div className="w-[50%]">
                <ul className="text-right space-y-2">
                  <li>
                    Order Date :{" "}
                    {orderdata?.createdAt &&
                      new Date(orderdata.createdAt).toLocaleDateString("en-GB")}
                  </li>

                  <li>Mode : {orderdata?.paymentMode}</li>
                  <li>Ref ID: </li>
                  <li>
                    Status :{" "}
                    <span className="text-green-500 font-bold">
                      {orderdata?.orderStatus}
                    </span>
                  </li>
                  <li>Shipped By : </li>
                </ul>
                <div className="w-full flex flex-col items-end   justify-end gap-y-2">
                  <p className="p-2 rounded-md text-white px-3 bg-red-400 my-2 cursor-pointer">
                    Mark As Returned
                  </p>
                  {orderdata?.courier && <p>Courier : {orderdata?.courier}</p>}
                  {orderdata?.awb_code && <p>AWB : {orderdata?.awb_code}</p>}
                </div>
              </div>
            </div>
            <div>
              <table className="cart-summary-table w-full border-collapse mt-10">
                <thead className="bg-gray-100 text-xs md:text-sm text-black-700 font-semibold">
                  <tr>
                    {/* Book Details Header */}
                    <th className="py-3 px-4 text-left">Book Details</th>

                    {/* Price Header */}
                    <th className="py-3 px-4 text-right">Price</th>

                    {/* Quantity Header */}
                    <th className="py-3 px-4 text-right">Quantity</th>

                    {/* Total Header */}
                    <th className="py-3 px-4 text-right">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {orderdata?.items?.map((product, index) => {
                    const isOnlyEbook = product?.onlyEbookSelected;
                    const isEbookAlsoAdded = product?.isEbookAlsoSelected;
                    const medium = product.language;
                    const bookTitle = product?.productId?.[medium]?.title;
                    const originalSellingPrice = parseFloat(
                      product?.productId?.[medium]?.paperBackOriginalPrice || 0
                    );
                    const quantity = parseFloat(product?.quantity || 0);
                    return (
                      <>
                        {isEbookAlsoAdded && (
                          <>
                            <tr className="border-b text-xs md:text-sm">
                              {/* Book Details */}
                              <td className="py-4 px-4 text-gray-700">
                                <p className="font-medium text-lg">
                                  {bookTitle}
                                </p>

                                <p className="capitalize">
                                  Medium:{" "}
                                  <span className="capitalize">{medium}</span>
                                </p>
                              </td>

                              {/* Price */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                ₹{originalSellingPrice}
                              </td>

                              {/* Quantity */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                {quantity}
                              </td>

                              {/* Total */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                ₹{originalSellingPrice * quantity}
                              </td>
                            </tr>
                            <tr className="border-b text-xs md:text-sm">
                              {/* Book Details */}
                              <td className="py-4 px-4 text-gray-700">
                                <p className="font-medium">
                                  {bookTitle} - (Ebook)
                                </p>

                                <p className="capitalize">
                                  Medium:{" "}
                                  <span className="capitalize">{medium}</span>
                                </p>
                              </td>

                              {/* Price */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                ₹{product?.ebookPrice}
                              </td>

                              {/* Quantity */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                1
                              </td>

                              {/* Total */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                ₹{product?.ebookPrice * 1}
                              </td>
                            </tr>
                          </>
                        )}
                        {isOnlyEbook && (
                          <>
                            <tr className="border-b text-xs md:text-sm">
                              {/* Book Details */}
                              <td className="py-4 px-4 text-gray-700">
                                <p className="font-medium text-lg">
                                  {bookTitle} - (Ebook Only)
                                </p>
                                <p className="capitalize">
                                  Medium:{" "}
                                  <span className="capitalize">{medium}</span>
                                </p>
                              </td>

                              {/* Price */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                ₹{product?.ebookPrice}
                              </td>

                              {/* Quantity */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                1
                              </td>

                              {/* Total */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                ₹{product?.ebookPrice * 1}
                              </td>
                            </tr>
                          </>
                        )}
                        {isEbookAlsoAdded === false &&
                          isOnlyEbook === false && (
                            <tr className="border-b text-xs md:text-sm">
                              {/* Book Details */}
                              <td className="py-4 px-4 text-gray-700">
                                <p className="font-medium text-lg">
                                  {bookTitle}
                                </p>

                                <p className="capitalize text-base">
                                  Medium:{" "}
                                  <span className="capitalize">{medium}</span>
                                </p>
                              </td>

                              {/* Price */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                ₹{originalSellingPrice}
                              </td>

                              {/* Quantity */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                {quantity}
                              </td>

                              {/* Total */}
                              <td className="py-4 px-4 font-semibold text-black text-right">
                                ₹{originalSellingPrice * quantity}
                              </td>
                            </tr>
                          )}
                      </>
                    );
                  })}

                  {/* <tr className="text-right border-b text-sm md:text-base font-medium">
                <td className="py-2 px-4" colSpan={4}>
                  <div className="flex justify-end gap-4">
                    <span>SubTotal:</span>
                    <span>₹1,100.00</span>
                  </div>
                </td>
              </tr>

              
              <tr className="text-right border-b text-sm md:text-base font-medium">
                <td className="py-2 px-4" colSpan={4}>
                  <div className="flex justify-end gap-4">
                    <span>Shipping & Handling Charges:</span>
                    <span>₹100.00</span>
                  </div>
                </td>
              </tr>

              
              <tr className="text-right border-b text-sm md:text-base font-semibold">
                <td className="py-2 px-4" colSpan={4}>
                  <div className="flex justify-end gap-4">
                    <span>Grand Total:</span>
                    <span>₹1,200.00</span>
                  </div>
                </td>
              </tr> */}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between w-full gap-10 mt-7 ">
              <div className="w-[100%] bg-[#e3f2fd61] rounded-md p-5">
                <p className="text-2xl border-b border-black  mb-3 pb-3">
                  Shipping Info
                </p>
                <div className="">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                  >
                    <InputField
                      control={control}
                      errors={errors}
                      name="length"
                      label="Length (in cm)"
                      type="number"
                    />

                    <InputField
                      control={control}
                      errors={errors}
                      name="breadth"
                      label="Breadth (in cm)"
                      type="number"
                    />
                    <InputField
                      control={control}
                      errors={errors}
                      name="height"
                      label="Height (in cm)"
                      type="number"
                    />
                    <InputField
                      control={control}
                      errors={errors}
                      name="weight"
                      label="Weight (in kg)"
                      type="number"
                    />
                    <div className="w-full flex justify-end mt-3">
                      <Button
                        className="capitalize"
                        type="submit"
                        loading={shipNowBtnLoader}
                      >
                        Ship Now
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="w-[100%] bg-[#e3f2fd61] rounded-md p-5">
                <p className="text-2xl border-b border-black  mb-5 pb-3">
                  Total
                </p>
                <div className="border border-black">
                  <div className="flex justify-between border-b-[1px] border-black p-3 text-lg">
                    <p> Total </p>
                    <p>₹{originalAmountCalculate}/-</p>
                  </div>
                  <div className="flex justify-between border-b-[1px] border-black p-3 text-lg">
                    <p>Discount </p>
                    <p>
                      ₹{originalAmountCalculate - discountedAmountCalculate}/-
                    </p>
                  </div>
                  <div className="flex justify-between border-b-[1px] border-black p-3 text-lg">
                    <p> Sub-Total </p>
                    <p>₹{discountedAmountCalculate}/- </p>
                  </div>
                  <div className="flex justify-between border-b-[1px] border-black p-3 text-lg">
                    <p>Additional Discount </p>
                    <p>₹{orderdata?.additionalDiscount || 0}/- </p>
                  </div>
                  <div className="flex justify-between border-b-[1px] border-black p-3 text-lg">
                    <p>Sub-Total </p>
                    <p>₹{amountAfterAdditionalDiscount}/- </p>
                  </div>
                  {orderdata?.appliedCouponDiscount && (
                    <div className="flex justify-between border-b-[1px] border-black p-3 text-lg">
                      <p>Coupon Discount </p>
                      <p>{orderdata?.appliedCouponDiscount}% </p>
                    </div>
                  )}
                  <div className="flex justify-between border-b-[1px] border-black p-3 text-lg">
                    <p>Total </p>
                    <p>₹{couponDiscountCalculated}/- </p>
                  </div>

                  <div className="flex justify-between border-b-[1px] border-black p-3 text-lg">
                    <p>Shipping </p>
                    <p>₹{orderdata?.shippingAmount}/- </p>
                  </div>
                  <div className="flex justify-between p-3 text-lg">
                    <p className="text-red-400 text-xl">Grand-Total</p>
                    <p className="text-red-400 text-xl">
                      ₹{grandTotalCalculated} /-
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center w-full items-center py-20">
            <p className="text-2xl font-semibold ">Loading ...</p>
          </div>
        </>
      )}
    </PageCont>
  );
};

export default EditOrders;
