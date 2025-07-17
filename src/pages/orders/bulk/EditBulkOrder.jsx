import React, { useEffect, useState } from "react";
import PageCont from "../../../components/PageCont";
import Heading from "../../../components/Heading";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  bulkOrderCancel,
  bulkOrderUpdate,
  createShippingBulkOrder,
  generateLabelBulkOrderShiprocket,
  getBulkOrderById,
  getShippingCharges,
  getTrackingOrderForBulk,
} from "../../../redux/features/orders";
import { getBulkClientById } from "../../../redux/features/customers";
import EditableCartTable from "./EditableCartTable";
import { useForm } from "react-hook-form";
import InputField from "../../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import BulkClientInvoice from "../../pdf/BulkClientInvoice";
import { pdf } from "@react-pdf/renderer";
import useBulkOrderSummary from "../../../hooks/useBulkOrderSummary";
import TrackModal from "./TrackModal";
import Swal from "sweetalert2";

const EditBulkOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState();

  const [loader, setLoader] = useState({
    cancelLoader: false,
    trackLoader: false,
    labelLoader: false,
    shipNowLoader: false,
    updateLoader: false,
  });
  // console.log(orderDetails);
  const [totalOrderWeight, setTotalOrderWeight] = useState();

  const [clientData, setClientData] = useState();
  // console.log(clientData);
  const [booksData, setBooksData] = useState([]); // <-- local state for editable table

  const [shippingRate, setShippingRate] = useState();
  

  const [finalAmountAfterDiscounts, setFinalAmountAfterDiscounts] = useState(0);
  
  

  const [openTrackModal, setOpenTrackModal] = useState(false);
  const [trackingData, setTrackingData] = useState();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm();

  const getOrderData = (id) => {
    dispatch(
      getBulkOrderById(id, (success, data) => {
        if (success) {
          // console.log(data);
          setOrderDetails(data);
          setValue("discount1", data.discount1);
          setValue("discount2", data.discount2);
          setValue("discount3", data.discount3);
          setValue("adjustmentMinus", data.adjustmentMinus);
          setValue("adjustmentPlus", data.adjustmentPlus);
          setValue("plusRemark", data.plusRemark);
          setValue("minusRemark", data.minusRemark);
          setBooksData(data.books || []); // <-- initialize editable books
        }
      })
    );
  };

  const getClientData = (id) => {
    dispatch(
      getBulkClientById({ id: id }, (success, data) => {
        if (success && data) {
          // console.log(data);
          setClientData(data);
        }
      })
    );
  };

  useEffect(() => {
    if (orderDetails) {
      getClientData(orderDetails?.client?._id);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (location.state.data._id) {
      getOrderData(location.state.data._id);
    }
  }, [location]);

  const discount1 = watch("discount1");
  const discount2 = watch("discount2");
  const discount3 = watch("discount3");

  const totalBooks = booksData.reduce((sum, book) => sum + (book.qty || 0), 0);

  // Total price (before any discounts)
  const totalPrice = booksData.reduce(
    (sum, book) => sum + (book.price || 0) * (book.qty || 0),
    0
  );

  useEffect(() => {
    const d1 = parseFloat(discount1) || 0;
    const d2 = parseFloat(discount2) || 0;
    const d3 = parseFloat(discount3) || 0;

    const totalDiscountPercent = d1 + d2 + d3;
    

    let discounted = parseFloat(totalPrice) || 0;

    discounted -= (discounted * d1) / 100;
    discounted -= (discounted * d2) / 100;
    discounted -= (discounted * d3) / 100;

    const finalAmount = +discounted.toFixed(2);
    const value = (totalPrice - finalAmount).toFixed(2);
    

    setFinalAmountAfterDiscounts(finalAmount);
    setValue("amountAfterDiscounts", finalAmount);
  }, [totalPrice, discount1, discount2, discount3]);

  // Total discount
  const totalDiscount = booksData.reduce(
    (sum, book) =>
      sum +
      (parseFloat(book.discount1 || 0) +
        parseFloat(book.discount2 || 0) +
        parseFloat(book.discount3 || 0)),
    0
  );

  // Optional: Final total amount
  const totalAmount = booksData.reduce(
    (sum, book) => sum + (book.amount || 0),
    0
  );

  const adjPlus = watch("adjustmentPlus");
  const adjMinus = watch("adjustmentMinus");
  const plusRemark = watch("plusRemark");
  const minusRemark = watch("minusRemark");

  const summary = useBulkOrderSummary(
    booksData,
    orderDetails,
    adjPlus,
    adjMinus,
    shippingRate
  );

  useEffect(() => {
    if (booksData) {
      const totalWeight = booksData.reduce((sum, item) => {
        const weight = parseFloat(item.product?.weight || 0);
        return sum + weight * (item?.qty || 0);
      }, 0);

      const fixedWeight = totalWeight.toFixed(3); // Format only after full sum

      setTotalOrderWeight(fixedWeight);
      setValue("length", 24);
      setValue("breadth", 18);
      setValue("height", totalBooks);
      setValue("weight", fixedWeight);
    }
  }, [booksData, totalBooks, setValue]);

  const getShippingRate = () => {
    const payload = {
      deliveryPincode: clientData?.pincode,
      isCod: true,
      noOfBooksWithoutEbook: totalBooks,
      orderWeight: Number(totalOrderWeight),
      totalOrderValueAfterDiscount: finalAmountAfterDiscounts,
    };
    dispatch(
      getShippingCharges(payload, (success, data) => {
        setShippingRate(data);
      })
    );
  };

  useEffect(() => {
    if (
      totalBooks &&
      clientData &&
      finalAmountAfterDiscounts &&
      totalOrderWeight
    ) {
      const timeout = setTimeout(() => {
        getShippingRate();
      }, 1000);

      return () => clearTimeout(timeout); // cleanup to avoid memory leaks
    }
  }, [totalBooks, clientData, finalAmountAfterDiscounts, totalOrderWeight]);

  const netPayableAmt =
    finalAmountAfterDiscounts +
    shippingRate +
    orderDetails?.adjustmentPlus -
    orderDetails?.adjustmentMinus;

  const handleShippingClicked = () => {
    const length = watch("length");
    const breadth = watch("breadth");
    const height = watch("height");
    const weight = watch("weight");
    const payload = {
      order_id: orderDetails?.orderId,
      billing_customer_name: clientData?.firstName,
      billing_address: clientData?.addressLine1,
      billing_address_2: clientData?.addressLine2,
      billing_city: clientData?.city,
      billing_pincode: clientData?.pincode,
      billing_state: clientData?.state,
      billing_country: clientData?.country,
      billing_email: clientData?.email,
      billing_phone: clientData?.mobile,
      payment_method:
        orderDetails?.shipping?.paymentMode === "cod" ? "COD" : "Prepaid",
      sub_total: Math.round(summary?.grandTotal),
      length: length,
      breadth: breadth,
      height: height,
      weight: weight,
      books: booksData,
    };
    dispatch(
      createShippingBulkOrder(payload, setLoader, (success) => {
        if (success) {
          getOrderData(location.state.data._id);
          window.scrollTo(0, 0);
        }
      })
    );
  };

  const handleCancelOrder = () => {
    dispatch(
      bulkOrderCancel(
        orderDetails?._id,
        setLoader,
        (success) => {
          if (success) {
            getOrderData(location.state.data._id);
          }
        },
        
      )
    );
  };

  const handleOrderTracking = () => {
    dispatch(
      getTrackingOrderForBulk(
        orderDetails?.orderId,
        setLoader,
        (success, data) => {
          if (success) {
            setOpenTrackModal(true);
            setTrackingData(data);
          }
        }
      )
    );
  };

  const handleInvoiceClick = async (data) => {
    // console.log(data);
    try {
      const blob = await pdf(<BulkClientInvoice data={data} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      // console.error("Error generating PDF or fetching coupon:", error);
    }
  };

  // if (summary) {
  //   console.log("No of Books:", summary?.noOfBooks);
  //   console.log("Total Price:", summary?.totalPrice);
  //   console.log("Total Discount %:", summary?.totalDiscountPercent);
  //   console.log("Discount Amount:", summary?.discountAmount);
  //   console.log("Final Amount:", summary?.finalAmount);
  //   console.log("Shipping Charges:", summary?.shippingCharges);
  //   console.log("Adjustment Plus:", summary?.adjustmentPlus);
  //   console.log("Adjustment Minus:", summary?.adjustmentMinus);
  //   console.log("Grand Total:", summary?.grandTotal);
  // }

  const handleGenerateLabel = () => {
    const payload = {
      shipment_id: orderDetails?.shipment_id,
    };
    dispatch(generateLabelBulkOrderShiprocket(payload, setLoader));
  };

  const handleOrderUpdate = () => {
    const length = watch("length");
    const breadth = watch("breadth");
    const height = watch("height");
    const weight = watch("weight");
    const payload = {
      id: orderDetails?._id,
      client: orderDetails?.client,
      books: booksData.map((book) => ({
        ...book,
        product: book.productId || book.product, // Only send the product ID
      })),
      shipping: {
        length: length,
        width: breadth,
        height: height,
        weight: weight,
        paymentMode: orderDetails?.shipping?.paymentMode,
        total: summary?.finalAmount,
        shippingCharges: shippingRate,
      },
      paymentStatus: orderDetails?.paymentStatus,
      date: orderDetails?.date,
      adjustmentPlus: adjPlus,
      adjustmentMinus: adjMinus,
      grandTotal: summary?.grandTotal,
      plusRemark: plusRemark,
      minusRemark: minusRemark,
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
          bulkOrderUpdate(payload, setLoader, (success) => {
            if (success) {
              getOrderData(location.state.data._id);
            }
          })
        );
      }
    });
  };

  return (
    <div>
      <PageCont>
        <Heading text="Bulk Order Detail" />
        <div className="mt-5">
          <p className="text-center text-3xl">
            Order No -{" "}
            <span className="text-blue-700 font-semibold">
              {orderDetails?.orderId}
            </span>
          </p>

          <div className="flex justify-end gap-1 my-5">
            <Button
              className="bg-green-400 capitalize"
              onClick={handleOrderUpdate}
              loading={loader?.updateLoader}
            >
              Update Order
            </Button>
            <Button
              className="bg-black capitalize"
              onClick={() => handleInvoiceClick(orderDetails)}
              // loading={cancelOrderLoader}
            >
              Print Invoice
            </Button>

            {orderDetails?.orderStatus === "Pending" && (
              <Button
                className="bg-red-400 capitalize"
                onClick={handleCancelOrder}
                loading={loader?.cancelLoader}
              >
                Cancel Order
              </Button>
            )}

            {orderDetails?.orderStatus === "Shipped" && (
              <Button
                onClick={handleOrderTracking}
                className="capitalize"
                loading={loader?.trackLoader}
              >
                Track Order
              </Button>
            )}
            {orderDetails?.orderStatus === "Shipped" && (
              <Button
                onClick={handleGenerateLabel}
                className="capitalize"
                loading={loader?.labelLoader}
              >
                Generate Label
              </Button>
            )}
          </div>
          <div className="flex justify-between ">
            <div className="w-[50%]">
              <p>Ship to :</p>
              <ul className="space-y-2">
                <li className="capitalize">
                  {clientData?.firstName} {clientData?.lastName}
                </li>

                <li>
                  {clientData?.addressLine1} {clientData?.addressLine2} ,
                </li>
                <li>
                  {clientData?.city} , {clientData?.state} ,{" "}
                  {clientData?.pincode}
                </li>
                <li>{clientData?.country}</li>
                <li>{clientData?.mobile}</li>
              </ul>
            </div>
            <div className="w-[50%]">
              <ul className="text-right space-y-2">
                <li>
                  Order Date :{" "}
                  {new Date(orderDetails?.date).toLocaleDateString("en-GB")}
                </li>

                <li>
                  Mode :{" "}
                  {orderDetails?.shipping?.paymentMode === "cod"
                    ? "Cash On Delivery"
                    : "Pre-Paid"}{" "}
                </li>
                <li>Ref ID: </li>
                <li>
                  Order Status :{" "}
                  <span className="text-green-500 font-bold">
                    {orderDetails?.orderStatus}
                  </span>
                </li>
                <li>
                  Payment Status :{" "}
                  <span className="text-green-500 font-bold">
                    {orderDetails?.paymentStatus}
                  </span>
                </li>
                <li>Shipped By : {orderDetails?.courier}</li>
              </ul>
              <div className="w-full flex flex-col items-end   justify-end gap-y-2">
                <p className="p-2 rounded-md text-white px-3 bg-red-400 my-2 cursor-pointer capitalize">
                  Mark As Returned
                </p>
              </div>
            </div>
          </div>

          <EditableCartTable
            items={booksData}
            onChange={setBooksData}
            setBooksData={setBooksData}
          />

          <div className="w-[100%] bg-[#e3f2fd61] rounded-md p-5 my-10">
            <p className="text-2xl border-b border-black  mb-3 pb-3">
              Adjustments
            </p>

            <div className="grid grid-cols-2 gap-3">
              <InputField
                control={control}
                errors={errors}
                name="adjustmentPlus"
                label="ADJ +"
                type="number"
              />
              <InputField
                control={control}
                errors={errors}
                name="plusRemark"
                label="Remark"
                type="description"
              />
              <InputField
                control={control}
                errors={errors}
                name="adjustmentMinus"
                label="ADJ -"
                type="number"
              />
              <InputField
                control={control}
                errors={errors}
                name="minusRemark"
                label="Remark"
                type="description"
              />
            </div>
          </div>
          <form>
            <div className="grid grid-cols-2 gap-3 mt-7">
              <div className="w-[100%] bg-[#e3f2fd61] rounded-md p-5">
                <p className="text-2xl border-b border-black  mb-3 pb-3">
                  Shipping Info
                </p>

                <div className="flex flex-col gap-3">
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
                  {orderDetails?.orderStatus === "Shipped" ? null : (
                    <Button
                      className="capitalize w-max"
                      type="button"
                      onClick={handleShippingClicked}
                      loading={loader?.shipNowLoader}
                    >
                      Ship Now
                    </Button>
                  )}
                </div>
              </div>

              <div className="w-[100%] bg-[#e3f2fd61] rounded-md p-5">
                <p className="text-2xl border-b-[1px] border-black pb-2">
                  Total
                </p>

                <p className="text-lg mt-2">Printed Books Amount</p>
                <div className="border border-black">
                  <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                    <p>No. of Books:</p>
                    <p>{summary?.noOfBooks}</p>
                  </div>
                  <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                    <p>Total Price:</p>
                    <p>₹{summary?.totalPrice}</p>
                  </div>
                  {summary?.discountAmount > 0 && (
                    <>
                      <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                        <p>Discount ({summary?.totalDiscountPercent}%)</p>
                        <p>₹{summary?.discountAmount}</p>
                      </div>
                      <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                        <p>Total</p>
                        <p>₹{summary?.finalAmount}</p>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                    <p>Shipping & Handling Charges</p>
                    <p>₹{shippingRate}</p>
                  </div>
                  {adjPlus > 0 && (
                    <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                      <p>Adjustment +</p>
                      <p>₹{adjPlus}</p>
                    </div>
                  )}
                  {adjMinus > 0 && (
                    <div className="flex justify-between border-b-[1px] border-black p-2 text-md">
                      <p>Adjustment -</p>
                      <p>₹{adjMinus}</p>
                    </div>
                  )}
                  <div className="flex justify-between border-black p-2 text-md">
                    <p>Net Payable Amount:</p>
                    <p>
                      ₹{summary?.grandTotal}
                      /-
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </PageCont>
      <TrackModal
        showModal={openTrackModal}
        setShowModal={setOpenTrackModal}
        trackingData={trackingData}
      />
      {/* <BulkClientInvoice /> */}
    </div>
  );
};

export default EditBulkOrder;
