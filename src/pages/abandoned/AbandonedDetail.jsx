import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import Emailer from "./Emailer";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserCartItems } from "../../redux/features/allUsers";
import { format } from "date-fns-tz";
import { Button } from "@material-tailwind/react";

const AbandonedDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userData } = location.state || {}; // Extract userData safely
  const [cartItemsData, setCartItemsData] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  // Debugging logs
  console.log("Location State:", location.state);
  console.log("User Data:", userData);

  // Fetch Cart Items
  const getCartItems = () => {
    if (userData?._id) {
      dispatch(
        getUserCartItems(userData._id, (success, data) => {
          if (success) {
            setCartItemsData(data);
          }
        })
      );
    }
  };

  // Set user data in form when available
  useEffect(() => {
    if (userData) {
      reset({
        name: userData?.name || "",
        mobile: userData?.mobile || "",
        email: userData?.email || "",
      });

      getCartItems(); // Fetch cart items only when userData exists
    }
  }, [userData, reset]);

  // Update form when cartItemsData is available
  useEffect(() => {
    if (cartItemsData) {
      reset((prevValues) => ({
        ...prevValues,
        totalQuantity: cartItemsData?.totalQuantity || "",
      }));
    }
  }, [cartItemsData, reset]);

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  console.log(cartItemsData);

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <Heading text="Abandoned Cart Detail" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputField
            type="text"
            control={control}
            errors={errors}
            label="Customer Name"
            name="name"
          />
          <InputField
            type="email"
            control={control}
            errors={errors}
            label="Email"
            name="email"
          />
          <InputField
            type="text"
            control={control}
            errors={errors}
            label="Mobile"
            name="mobile"
          />
          <InputField
            type="text"
            control={control}
            errors={errors}
            label="Total Quantity"
            name="totalQuantity"
          />
          {/* <InputField
            type="date"
            control={control}
            errors={errors}
            label="Abandoned Date"
          /> */}
          <InputField
            type="text"
            control={control}
            errors={errors}
            label="Remark"
            name="abondonedRemark"
          />
        </div>
        <p className="font-medium ml-0.5 text-[#000000] mt-5">Cart Items</p>
        {cartItemsData?.cart?.items.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {cartItemsData?.cart?.items?.map((item, index) => {
                const bookLang =
                  item.language === "english" ? "english" : "hindi";
                return (
                  <div className="bg-[#f5f7fb] p-2 border rounded-md">
                    <p>Name : {item?.productId?.[bookLang]?.title}</p>
                    <p>Quantity : {item?.quantity}</p>
                    <p>
                      Date : {format(item?.updatedAt, "dd MMM yyyy, hh:mm a")}
                    </p>
                    <p>
                      Language :{" "}
                      <span className="capitalize">{item.language}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-center">No Items In the cart !!!</p>
        )}
        <Button type="submit" className="primary-gradient mt-4 mb-4 capitalize">
          Save
        </Button>
      </form>

      <Emailer />
    </PageCont>
  );
};

export default AbandonedDetail;
