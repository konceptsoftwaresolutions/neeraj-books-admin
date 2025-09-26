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
  cancelOrder,
  createShippingOrder,
  generateLabelShiprocket,
  getOrderById,
  getShippingCharges,
  getTrackingOrder,
  normalOrderUpdate,
} from "../../redux/features/orders";
import ShipmentPdf from "../pdf/ShipmentPdf";
import RefundModal from "./RefundModal";
import useCartCalculations from "../../hooks/useCartCalculations";
import OnsiteModal from "./OnsiteModal";
import { checkCouponAvailability } from "../../redux/features/books";
import OrderSummaryTable from "./OrderSummaryTable";
import useProductDiscounts from "../../hooks/useProductDiscounts";
import Swal from "sweetalert2";
import TrackModal from "./bulk/TrackModal";
import toast from "react-hot-toast";

const EditOrders = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [orderInitial, setOrderInitial] = useState();
  const [openTrackModal, setOpenTrackModal] = useState(false);
  const [trackingData, setTrackingData] = useState();
  const [shippingPayload, setShippingPayload] = useState();

  const [orderdata, setOrderData] = useState();
  const [cancelOrderLoader, setCancelOrderLoader] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState();
  const [showOnsiteModal, setShowOnsiteModal] = useState();
  const [couponPercentage, setCouponPercentage] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [shippingRate, setShippingRate] = useState();

  const location = useLocation();
  // console.log(orderdata);

  useEffect(() => {
    if (orderdata) {
      dispatch(
        checkCouponAvailability(orderdata.appliedCoupon, (success, data) => {
          if (success) {
            setCouponPercentage(data);
          }
        })
      );
    }
  }, [orderdata]);

  const {
    totalPaperbackOriginalAmount,
    totalPaperbackAmount,
    totalPaperbackDiscountAmount,
    totalPaperbackDiscountPercent,
    totalPaperbackQuantity,

    totalSpecialDiscountOnPaperback, // e.g. 28.50 + 9.00
    totalSpecialDiscountPercentage, // e.g. 5 + 3

    paperbackAmountAfterSpecialDiscount,
    totalEbookAmount,
    totalEbookQuantity,

    subtotalAmount, // before coupon discount
    couponDiscountPercent,
    couponDiscountAmount,
    // totalAmount,
  } = useCartCalculations(
    orderdata?.items,
    orderdata?.additionalDiscount,
    couponPercentage || 0
  );

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
          setOrderItems(data?.order.items);
          // setOrderItems([
          //   {
          //     productId: {
          //       _id: "686643b1d9d1772d0638374b",
          //       english: {
          //         title: "Environmental Studies",
          //         paperBackOriginalPrice: "280",
          //         paperBackDiscountedPrice: "140",
          //         slug: "environmental-studies",
          //         categories: ["67b32bd891a8bde78bdf4bb3"],
          //         weight: "0.235",
          //       },
          //       hindi: {
          //         title: "Paryavaran Adhyan",
          //         paperBackOriginalPrice: "280",
          //         paperBackDiscountedPrice: "140",
          //         slug: "paryavaran-adhyan",
          //         categories: ["67b32bd891a8bde78bdf4bb3"],
          //         weight: "0.245",
          //       },
          //     },
          //     language: "english",
          //     isEbookAlsoSelected: true,
          //     ebookPrice: "70",
          //     quantity: 1,
          //     updatedAt: "2025-07-19T07:11:06.304Z",
          //     _id: "687b450a201bb070a415cd7c",
          //   },
          //   {
          //     productId: {
          //       _id: "68554a244655c950714c9e78",
          //       english: {
          //         title: "European Classic Literature",
          //         paperBackOriginalPrice: "300",
          //         paperBackDiscountedPrice: "150",
          //         slug: "european-classic-literature",
          //         categories: ["67e5937fd9b8c24257aa3501"],
          //         weight: "0.230",
          //       },
          //     },
          //     language: "english",
          //     isEbookAlsoSelected: true,
          //     ebookPrice: "70",
          //     quantity: 1,
          //     updatedAt: "2025-07-19T07:11:41.920Z",
          //     _id: "687b452d201bb070a415cdea",
          //   },
          // ]);
        }
      })
    );
  };

  useEffect(() => {
    if (orderInitial) {
      getTheOrderbyId(orderInitial?._id);
    }
  }, [orderInitial]);

  const totalBooks = orderdata?.items?.reduce((total, item) => {
    const isOnlyEbook = item.onlyEbookSelected;

    if (!isOnlyEbook) {
      const quantity = item.quantity || 1;
      return total + quantity;
    }

    return total;
  }, 0);
  // console.log(totalBooks);

  const totalWeight = Number(
    orderdata?.items
      ?.reduce((total, item) => {
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
      }, 0)
      .toFixed(3)
  );

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
    // console.log(data);
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
      // sub_total: subtotalAmount - couponDiscountAmount,
      sub_total: orderdata?.totalAmount + Number(orderdata?.shippingAmount),

      length: data.length,
      breadth: data.breadth,
      height: data.height,
      weight: data.weight,
      items: orderdata?.items,
    };
    // console.log(payload);
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
    dispatch(generateLabelShiprocket(payload));
  };

  const handleInvoiceClick = async (data) => {
    await toast.promise(
      (async () => {
        const blob = await pdf(
          <ShipmentPdf data={data} couponPercentage={couponPercentage} />
        ).toBlob();

        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
      })(),
      {
        loading: "Generating invoice...",
        success: "Invoice opened in new tab",
        error: "Failed to generate invoice",
      }
    );
  };

  const handleOrderTracking = () => {
    dispatch(
      getTrackingOrder(orderdata?.orderId, (success, data) => {
        if (success) {
          setOpenTrackModal(true);
          setTrackingData(data);
        }
      })
    );
  };

  const handleCancelOrder = () => {
    dispatch(
      cancelOrder(
        location?.state?.data._id,
        (success) => {
          if (success) {
            getTheOrderbyId(location?.state?.data._id);
          }
        },
        setCancelOrderLoader
      )
    );
  };

  const { discountedItems, totalDiscount } = useProductDiscounts(orderItems);
  // console.log(orderItems , );

  const getShippingPayload = (
    cartItems,
    specialDiscount,
    appliedCouponPercentage
  ) => {
    let totalPaperbackMRP = 0;
    let totalPaperbackFinal = 0;
    let totalPaperbackQty = 0;
    let totalOrderWeight = 0;

    let totalEbookFinal = 0;
    let totalEbookQty = 0;

    cartItems?.forEach((item) => {
      const {
        productId,
        quantity,
        isEbookAlsoSelected,
        onlyEbookSelected,
        ebookPrice,
        language,
      } = item;

      const bookDetails = productId?.[language];

      if (isEbookAlsoSelected && bookDetails) {
        const mrp = parseFloat(bookDetails.paperBackOriginalPrice || 0);
        const salePrice = parseFloat(bookDetails.paperBackDiscountedPrice || 0);
        const weight = parseFloat(bookDetails.weight || 0);

        const qty = Number(quantity);

        totalPaperbackMRP += mrp * qty;
        totalPaperbackFinal += salePrice * qty;
        totalPaperbackQty += qty;
        totalOrderWeight += weight * qty;
      }

      const ebookCost = parseFloat(ebookPrice || 0);

      if (onlyEbookSelected) {
        totalEbookFinal += ebookCost;
        totalEbookQty += 1;
      } else if (isEbookAlsoSelected) {
        totalEbookFinal += ebookCost;
        totalEbookQty += 1;
      }
    });

    totalPaperbackMRP = Math.round(totalPaperbackMRP);
    totalPaperbackFinal = Math.round(totalPaperbackFinal);
    totalEbookFinal = Math.round(totalEbookFinal);
    totalOrderWeight = Math.round(totalOrderWeight * 100) / 100; // round to 2 decimals

    const specialDiscountValue = Math.round(parseFloat(specialDiscount || 0));

    const paperbackTotalAfterSpecial = Math.round(
      totalPaperbackFinal - specialDiscountValue
    );

    const preCouponSubtotal = Math.round(
      paperbackTotalAfterSpecial + totalEbookFinal
    );

    const couponPercent = parseFloat(appliedCouponPercentage || 0);
    const couponAmount = Math.round((couponPercent / 100) * preCouponSubtotal);

    const finalTotalAmount = Math.round(preCouponSubtotal - couponAmount);

    return {
      finalTotalAmount,
      totalOrderWeight,
      totalPaperbackQty,
    };
  };

  useEffect(() => {
    // console.log(orderItems);
    const data = getShippingPayload(
      orderItems,
      orderdata?.additionalDiscount,
      couponPercentage || 0
    );
    setShippingPayload(data);
  }, [orderItems]);

  const getShippingRate = () => {
    const data = getShippingPayload(
      orderItems,
      orderdata?.additionalDiscount,
      couponPercentage || 0
    );
    const payload = {
      deliveryPincode: clientData?.pincode,
      isCod: orderdata?.paymentMode === "COD" ? true : false,
      noOfBooksWithoutEbook: data?.totalPaperbackQty,
      orderWeight: data?.totalOrderWeight,
      totalOrderValueAfterDiscount: data?.finalTotalAmount,
    };
    dispatch(
      getShippingCharges(payload, (success, data) => {
        setShippingRate(data);
      })
    );
  };

  const handleOrderUpdate = () => {
    // const data = getShippingPayload(
    //   orderItems,
    //   orderdata?.additionalDiscount,
    //   couponPercentage || 0
    // );

    // console.log(data);
    // const shippingPayload = {
    //   deliveryPincode: orderdata?.shippingAddress?.pincode,
    //   isCod: orderdata?.paymentMode === "COD" ? true : false,
    //   noOfBooksWithoutEbook: data?.totalPaperbackQty,
    //   orderWeight: data?.totalOrderWeight,
    //   totalOrderValueAfterDiscount: data?.finalTotalAmount,
    // };
    // dispatch(
    //   getShippingCharges(shippingPayload, (success, data) => {
    //     setShippingRate(data);
    //   })
    // );
    const payload = {
      id: orderdata?._id,
      orderStatus: orderdata?.orderStatus,
      paymentStatus: orderdata?.paymentStatus,
      shippingAddress: {
        firstName: orderdata?.shippingAddress?.firstName,
        lastName: orderdata?.shippingAddress?.lastName,
        addressLine1: orderdata?.shippingAddress?.addressLine1,
        city: orderdata?.shippingAddress?.city,
        state: orderdata?.shippingAddress?.state,
        country: orderdata?.shippingAddress?.country,
        pincode: orderdata?.shippingAddress?.pincode,
        mobile: orderdata?.shippingAddress?.mobile,
      },
      discountTotal: totalDiscount,
      items: orderItems?.map((item) => {
        const modifiedItem = {
          ...item,
          productId: item.productId?._id,
          language: item.language,
          quantity: item.quantity,
          hsn: item.hsn,
        };

        if (item.isEbookAlsoSelected) {
          modifiedItem.onlyEbookSelected = false;
        }

        return modifiedItem;
      }),
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          normalOrderUpdate(payload, setUpdateLoader, (success) => {
            if (success) {
              getTheOrderbyId(orderInitial?._id);
            }
          })
        );
      }
    });
  };

  const netPayableAmount = Math.round(
    (couponDiscountPercent > 0
      ? subtotalAmount - couponDiscountAmount
      : subtotalAmount) +
      (orderdata?.shippingAmount
        ? Math.round(parseFloat(orderdata?.shippingAmount))
        : 0) -
      (orderdata?.onSiteDiscount ? parseFloat(orderdata?.onSiteDiscount) : 0)
  ).toLocaleString("en-IN");

  return (
    <PageCont>
      <Heading text="Orders Details" />
      <div className="mt-4">
        <div>
          <div className="flex justify-start items-center gap-2 mt-2"></div>
        </div>
      </div>

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
              <Button
                className="bg-green-400 capitalize"
                onClick={handleOrderUpdate}
                loading={updateLoader}
              >
                Update Order
              </Button>
              <Button className="capitalize">SMS</Button>
              <Button
                onClick={() => handleInvoiceClick(orderdata)}
                className="capitalize"
              >
                Print Invoice
              </Button>
              {orderdata?.paymentMode !== "COD" && (
                <Button
                  className="capitalize"
                  onClick={() => setShowRefundModal(!showRefundModal)}
                >
                  Refund
                </Button>
              )}
              {/* )} */}

              {/* first this was the condition for generating label */}
              {/* {orderdata?.shipment_id === "Shipped" && ( */}

              {orderdata?.shipment_id && (
                <Button
                  className="capitalize"
                  onClick={handleGenerateLabel}
                  loading={generateLabelLoder}
                >
                  Genereate label
                </Button>
              )}
              {orderdata?.orderStatus === "Pending" && (
                <Button
                  className="bg-red-400 capitalize"
                  onClick={handleCancelOrder}
                  loading={cancelOrderLoader}
                >
                  Cancel Order
                </Button>
              )}
              {orderdata?.orderStatus === "Shipped" && (
                <Button onClick={handleOrderTracking} className="capitalize">
                  Track Order
                </Button>
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
                  <li>{orderdata?.shippingAddress?.mobile}</li>
                  <li>{orderdata?.shippingAddress?.email}</li>
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
                  {orderdata?.paymentMode !== "COD" && (
                    <li>Ref ID: {orderdata?.mihpayid}</li>
                  )}
                  <li>
                    Order Status :{" "}
                    <span className="text-green-500 font-bold">
                      {orderdata?.orderStatus}
                    </span>
                  </li>
                  <li>
                    Payment Status :{" "}
                    <span className="text-green-500 font-bold">
                      {orderdata?.paymentStatus}
                    </span>
                  </li>
                  {orderdata?.courier && (
                    <li>Shipped By : {orderdata?.courier}</li>
                  )}
                </ul>
                <div className="w-full flex flex-col items-end   justify-end gap-y-2">
                  <p className="p-2 rounded-md text-white px-3 bg-red-400 my-2 cursor-pointer capitalize">
                    Mark As Returned
                  </p>
                  {orderdata?.courier && <p>Courier : {orderdata?.courier}</p>}
                  {orderdata?.awb_code && <p>AWB : {orderdata?.awb_code}</p>}
                </div>
              </div>
            </div>
            <div>
              <OrderSummaryTable
                orderData={orderItems}
                onUpdate={setOrderItems}
              />
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
                    {orderdata?.orderStatus === "Pending" && (
                      <div className="w-full flex justify-end mt-3">
                        <Button
                          className="capitalize"
                          type="submit"
                          loading={shipNowBtnLoader}
                        >
                          Ship Now
                        </Button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="w-[100%] bg-[#e3f2fd61] rounded-md p-5">
                <div className="flex justify-between items-center border-b border-black  mb-5 pb-3">
                  <p className="text-2xl ">Total</p>
                  {orderdata?.paymentMode !== "Prepaid" && (
                    <Button
                      className="capitalize"
                      onClick={() => setShowOnsiteModal(!showOnsiteModal)}
                    >
                      Admin discount
                    </Button>
                  )}
                </div>
                {totalPaperbackQuantity > 0 && (
                  <>
                    <p className="text-lg mt-2">Printed Books Amount</p>
                    <div className="border border-black">
                      <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                        <p> No. of Books:</p>
                        <p>{totalPaperbackQuantity}</p>
                      </div>
                      <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                        <p> MRP Amount:</p>
                        <p>
                          ₹
                          {totalPaperbackOriginalAmount.toLocaleString("en-IN")}
                          /-
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                        <p> Discount ({totalPaperbackDiscountPercent}%) (-)</p>
                        <p>
                          ₹
                          {totalPaperbackDiscountAmount.toLocaleString("en-IN")}
                          /-
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                        <p>Sub Total</p>
                        <p>₹{totalPaperbackAmount.toLocaleString("en-IN")}/-</p>
                      </div>
                      {totalSpecialDiscountPercentage > 0 && (
                        <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                          <p>
                            {" "}
                            Special Discount ({totalSpecialDiscountPercentage}%)
                            (-)
                          </p>
                          <p>
                            ₹
                            {totalSpecialDiscountOnPaperback.toLocaleString(
                              "en-IN"
                            )}
                            /-
                          </p>
                        </div>
                      )}
                      <div className="flex justify-between  border-black p-2 text-md">
                        <p> Printed Books Total Amount:</p>
                        <p>
                          ₹
                          {paperbackAmountAfterSpecialDiscount.toLocaleString(
                            "en-IN"
                          )}
                          /-
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {totalEbookQuantity > 0 && (
                  <>
                    <p className="text-lg mt-4">E-books Amount</p>
                    <div className="border border-black">
                      <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                        <p> No. of E-books:</p>
                        <p>{totalEbookQuantity}</p>
                      </div>
                      <div className="flex justify-between  border-black p-2 text-md">
                        <p> E-books total amount:</p>
                        <p>₹{totalEbookAmount.toLocaleString("en-IN")}/-</p>
                      </div>
                    </div>
                  </>
                )}

                <div className="border border-black mt-6">
                  <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                    <p className="font-semibold">
                      {`Grand Total ${
                        totalPaperbackQuantity > 0 && totalEbookQuantity > 0
                          ? "(Printed Books + E-book)"
                          : totalPaperbackQuantity > 0
                          ? "(Printed Books)"
                          : totalEbookQuantity > 0
                          ? "(E-book)"
                          : ""
                      }`}
                    </p>
                    <p>
                      ₹
                      {(
                        totalEbookAmount + paperbackAmountAfterSpecialDiscount
                      ).toLocaleString("en-IN")}
                      /-
                    </p>
                  </div>

                  {orderdata?.appliedCoupon && (
                    <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                      <p className="font-semibold">
                        {" "}
                        Coupon Code Discount({orderdata?.appliedCoupon} -{" "}
                        {couponDiscountPercent}%) (-)
                      </p>
                      <p>₹{couponDiscountAmount}/-</p>
                    </div>
                  )}

                  {orderdata?.shippingAmount > 0 && (
                    <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                      <p className="font-semibold">
                        {" "}
                        Shipping & Handling Charges (+)
                      </p>
                      <p>
                        ₹
                        {Math.round(
                          parseFloat(orderdata?.shippingAmount)
                        ).toLocaleString("en-IN")}
                        /-
                      </p>
                    </div>
                  )}

                  {orderdata?.onSiteDiscount && (
                    <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                      <p className="font-semibold"> Onsite Discount </p>
                      <p>
                        ₹
                        {parseFloat(orderdata?.onSiteDiscount).toLocaleString(
                          "en-IN"
                        )}
                        /-
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between border-black p-2 text-md">
                    <p className="font-semibold"> Net Payable </p>
                    <p>
                      ₹
                      {Math.round(
                        (couponDiscountPercent > 0
                          ? subtotalAmount - couponDiscountAmount
                          : subtotalAmount) +
                          (orderdata?.shippingAmount
                            ? Math.round(parseFloat(orderdata?.shippingAmount))
                            : 0) -
                          (orderdata?.onSiteDiscount
                            ? parseFloat(orderdata?.onSiteDiscount)
                            : 0)
                      ).toLocaleString("en-IN")}
                      /-
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
      <RefundModal
        openModal={showRefundModal}
        setOpenModal={setShowRefundModal}
        orderdata={orderdata}
        orderTotalAmount={netPayableAmount}
      />

      <OnsiteModal
        openModal={showOnsiteModal}
        setOpenModal={setShowOnsiteModal}
        id={orderdata?._id}
        getTheOrderbyId={getTheOrderbyId}
      />
      <TrackModal
        showModal={openTrackModal}
        setShowModal={setOpenTrackModal}
        trackingData={trackingData}
      />
      {/* <ShipmentPdf /> */}
    </PageCont>
  );
};

export default EditOrders;
