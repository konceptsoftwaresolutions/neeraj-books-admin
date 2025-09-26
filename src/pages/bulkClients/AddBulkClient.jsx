import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { set, useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import {
  blulkClientCategoryOptions,
  stateOptions,
} from "../../constant/options";
import { useDispatch } from "react-redux";
import { addBulkClient } from "../../redux/features/customers";
import { useNavigate } from "react-router-dom";

import {
  westBengalCities,
  uttarakhandCities,
  uttarPradeshCities,
  tripuraCities,
  telanganaCities,
  tamilNaduCities,
  sikkimCities,
  rajasthanCities,
  puducherryCities,
  odishaCities,
  nagalandCities,
  mizoramCities,
  meghalayaCities,
  manipurCities,
  madhyaPradeshCities,
  lakshadweepCities,
  ladakhCities,
  keralaCities,
  karnatakaCities,
  jharkhandCities,
  jammuAndKashmirCities,
  himachalPradeshCities,
  haryanaCities,
  gujaratCities,
  goaCities,
  delhiCities,
  chhattisgarhCities,
  punjabCities,
  biharCities,
  assamCities,
  arunachalPradeshCities,
  maharashtraCities,
  andhraPradeshCities,
} from "../../constant/options";

function AddBulkClient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      addBulkClient(data, setIsLoading, (success) => {
        if (success) {
          navigate(-1);
        }
      })
    );
  };

  const selectedState = watch("state");

  const stateCityMap = {
    "Andhra Pradesh": andhraPradeshCities,
    "Arunachal Pradesh": arunachalPradeshCities,
    Assam: assamCities,
    Bihar: biharCities,
    Punjab: punjabCities,
    Chhattisgarh: chhattisgarhCities,
    Delhi: delhiCities,
    Goa: goaCities,
    Gujarat: gujaratCities,
    Haryana: haryanaCities,
    "Himachal Pradesh": himachalPradeshCities,
    "Jammu and Kashmir": jammuAndKashmirCities,
    Jharkhand: jharkhandCities,
    Karnataka: karnatakaCities,
    Kerala: keralaCities,
    Ladakh: ladakhCities,
    Lakshadweep: lakshadweepCities,
    "Madhya Pradesh": madhyaPradeshCities,
    Maharashtra: maharashtraCities,
    Manipur: manipurCities,
    Meghalaya: meghalayaCities,
    Mizoram: mizoramCities,
    Nagaland: nagalandCities,
    Odisha: odishaCities,
    Puducherry: puducherryCities,
    Rajasthan: rajasthanCities,
    Sikkim: sikkimCities,
    "Tamil Nadu": tamilNaduCities,
    Telangana: telanganaCities,
    Tripura: tripuraCities,
    "Uttar Pradesh": uttarPradeshCities,
    Uttarakhand: uttarakhandCities,
    "West Bengal": westBengalCities,
  };

  const cityOptions = stateCityMap[selectedState] || [];

  return (
    <PageCont>
      <Heading text="Add Client" />
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <InputField
              control={control}
              errors={errors}
              name="companyName"
              label="Company Name"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="firstName"
              label="Name"
              type="text"
            />
            {/* <InputField
              control={control}
              errors={errors}
              name="lastName"
              label="Last Name"
              type="text"
            /> */}

            <InputField
              control={control}
              errors={errors}
              name="category"
              label="Category"
              type="option"
              options={blulkClientCategoryOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="email"
              label="Email"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="mobile"
              label="Mobile"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="notes"
              label="Notes"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="addressLine1"
              label="Address Line 1"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="addressLine2"
              label="Address Line 2"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="pincode"
              label="Pincode"
              type="text"
            />

            <InputField
              control={control}
              errors={errors}
              name="state"
              label="States"
              type="option"
              options={stateOptions}
            />

            <InputField
              control={control}
              errors={errors}
              name="city"
              label="City"
              type="text"
              // type={`${selectedState === "Delhi" ? "text" : "option"}`}
              // options={selectedState !== "Delhi" ? cityOptions : undefined}
            />
            <InputField
              control={control}
              errors={errors}
              name="country"
              label="Country"
              type="text"
            />
          </div>
          <Button
            loading={isLoading}
            type="submit"
            className="primary-gradient mt-4 capitalize"
          >
            Add
          </Button>
        </form>
      </div>
    </PageCont>
  );
}

export default AddBulkClient;
