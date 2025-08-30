import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { tableStyle } from "../../constant/tableStyle";
import DataTable from "react-data-table-component";
import {
  affiliateOrderColumns,
  affiliatePaymentColumns,
} from "../../constant/tableColumns";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addSingleAffiliatePayment,
  getSingleAffiliatePayments,
} from "../../redux/features/affiliates";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";

const AffiliatePayment = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [paymentData, setPaymentData] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (location?.state?.affiliateData?._id) {
      dispatch(
        getSingleAffiliatePayments(
          location.state.affiliateData._id,
          (success, data) => {
            if (success) {
              setPaymentData(data);
            }
          }
        )
      );
    }
  }, [dispatch, location]);

  const onSubmit = (formData) => {
    console.log("Payment Form Data:", formData);
    const payload = {
      ...formData,
      affiliateUser: location?.state?.affiliateData?._id,
    };
    // Call your API here to submit the payment
    // You can also dispatch another action if needed
    dispatch(
      addSingleAffiliatePayment(payload, (success) => {
        if (success) {
          dispatch(
            getSingleAffiliatePayments(
              location.state.affiliateData._id,
              (success, data) => {
                if (success) {
                  setPaymentData(data);
                }
              }
            )
          );
        }
      })
    );
    reset();
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-start items-center gap-3">
          <Heading text="Affiliate Payments" />
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className=" mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            control={control}
            errors={errors}
            name="amount"
            label="Amount"
            type="number"
            rules={{ required: "Amount is required" }}
          />

          <InputField
            control={control}
            errors={errors}
            name="paymentMode"
            label="Payment Mode"
            type="option"
            options={[
              { label: "Select Mode", value: "" },
              { label: "UPI", value: "UPI" },
              { label: "Bank Transfer", value: "Bank Transfer" },
              { label: "Cash", value: "Cash" },
            ]}
            rules={{ required: "Payment mode is required" }}
          />

          <InputField
            control={control}
            errors={errors}
            name="referenceNumber"
            label="Reference Number"
            type="text"
          />

          <InputField
            control={control}
            errors={errors}
            name="comment"
            label="Comment"
            type="textarea"
            rows={3}
          />
        </div>

        <div className="md:col-span-2 mt-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Payment
          </button>
        </div>
      </form>

      {/* Payment Table */}
      <div>
        <DataTable
          data={paymentData || []}
          columns={affiliatePaymentColumns}
          customStyles={tableStyle}
        />
      </div>
    </PageCont>
  );
};

export default AffiliatePayment;
