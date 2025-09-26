import React, { useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { getShippingCharges } from "../../redux/features/coupons";

const Shipping = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  // state for response
  const [shippingData, setShippingData] = useState(null);
  const [isShippingNotAvailable, setIsShippingNotAvailable] = useState(false);

  const onSubmit = (data) => {
    setShippingData(null); // reset previous results
    setIsShippingNotAvailable(false);

    const payload = {
      deliveryPincode: data.deliveryPincode,
      noOfBooksWithoutEbook: Number(data.noOfBooksWithoutEbook),
      isCod: data.orderType === "cod" ? true : false,
      orderWeight: Number(data.orderWeight),
      totalOrderValueAfterDiscount: Number(data.totalOrderValueAfterDiscount),
    };

    dispatch(
      getShippingCharges(payload, (success, data) => {
        if (success && data && Object.keys(data).length > 0) {
          setShippingData(data); // set shipping data
        } else {
          setIsShippingNotAvailable(true); // show unavailable message
        }
      })
    );
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center mb-6">
        <Heading text="Calculate Shipping" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <InputField
            control={control}
            errors={errors}
            name="deliveryPincode"
            label="Pincode"
            type="number"
          />
          <InputField
            control={control}
            errors={errors}
            name="orderType"
            label="Order Type"
            type="option"
            mode="single"
            options={[
              { label: "COD", value: "cod" },
              { label: "PrePaid", value: "prepaid" },
            ]}
          />

          <InputField
            control={control}
            errors={errors}
            name="noOfBooksWithoutEbook"
            label="Books Without Ebook"
            type="number"
          />
          <InputField
            control={control}
            errors={errors}
            name="orderWeight"
            label="Order Weight"
            type="number"
          />
          <InputField
            control={control}
            errors={errors}
            name="totalOrderValueAfterDiscount"
            label="Order Value After Discount"
            type="number"
          />
        </div>

        <Button
          type="submit"
          className="primary-gradient capitalize mt-4 mb-4"
        >
          Check
        </Button>
      </form>

      {/* Result Section */}
      {shippingData && (
        <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-md">
          <h3 className="text-lg font-semibold text-green-700">
            Shipping Available ✅
          </h3>
          <p className="text-green-700">
            <span className="font-medium">Rate:</span> ₹{Math.round(shippingData.rate)}
          </p>
          <p className="text-green-700">
            <span className="font-medium">Estimated Delivery Date:</span>{" "}
            {shippingData.etd}
          </p>
        </div>
      )}

      {isShippingNotAvailable && (
        <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-md">
          <h3 className="text-lg font-semibold text-red-700">
            Shipping Unavailable ❌
          </h3>
          <p className="text-red-700">
            Sorry, shipping is not available for the entered details.
          </p>
        </div>
      )}
    </PageCont>
  );
};

export default Shipping;
