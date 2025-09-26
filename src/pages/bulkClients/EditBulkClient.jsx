import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import {
  blulkClientCategoryOptions,
  stateOptions,
} from "../../constant/options";
import { MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";
import { allOrdersColumn } from "../../constant/tableColumns";
import { tableStyle } from "../../constant/tableStyle";
import { IoIosDocument } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import BulkClientInvoice from "../pdf/BulkClientInvoice";
import { pdf } from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  deletBulkClient,
  getBulkClientById,
  updateBulkClient,
} from "../../redux/features/customers";

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

function EditBulkClient() {
  const dummyOrders = [
    {
      orderId: "ORD12345",
      orderDate: "07 july 2025",
      client: "Dipesh Sharma",
      state: 1250.75,
      orderTotal: "300",
      orderStatu: "pending",
    },
  ];

  const dummyColumns = (handleInvoiceClick) => {
    return [
      {
        name: "Order ID",
        selector: (row) => row.orderId || "N/A",
        width: "120px",
        wrap: true,
      },
      {
        name: "Order Date",
        selector: (row) => row.orderDate || "N/A",
        width: "140px",
        wrap: true,
      },
      {
        name: "Client",
        selector: (row) => row.client || "N/A",
        width: "180px",
        wrap: true,
      },
      {
        name: "State",
        selector: (row) => row.state || "N/A",
        width: "120px",
        wrap: true,
      },
      {
        name: "Order Total",
        selector: (row) => `₹${row.orderTotal}` || "N/A",
        width: "130px",
        wrap: true,
      },
      {
        name: "Order Status",
        selector: (row) => row.orderStatu || "N/A",
        width: "150px",
        wrap: true,
      },
      {
        name: "Action",
        width: "300px",
        wrap: true,
        cell: (row) => (
          <div className="flex justify-start items-center">
            <button
              className=" text-white px-3 py-2 rounded primary-gradient transition m-3 w-[100px] flex items-center gap-2"
              onClick={() => handleInvoiceClick(row)}
            >
              <IoIosDocument size={17} /> Invoice
            </button>
          </div>
        ),
      },
    ];
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const [updateLoader, setUpdateLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    if (location.state?.customerId) {
      dispatch(
        getBulkClientById(
          { id: location.state.customerId },
          (success, data) => {
            if (success && data) {
              reset({
                category: data?.category || "",
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                companyName: data.companyName || "",
                email: data.email || "",
                mobile: data.mobile || "",
                notes: data.notes || "",
                addressLine1: data.addressLine1 || "",
                addressLine2: data.addressLine2 || "",
                pincode: data.pincode || "",
                city: data.city || "",
                state: data.state || "",
                country: data.country || "",
              });
            }
          }
        )
      );
    }
  }, [location.state?.customerId]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id: location.state.customerId,
    };
    dispatch(
      updateBulkClient(payload, setUpdateLoader, (success) => {
        if (success) {
          navigate(-1);
        }
      })
    );
  };

  const handleInvoiceClick = async (data) => {
    try {
      const blob = await pdf(<BulkClientInvoice data={data} />).toBlob();

      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF or fetching coupon:", error);
    }
  };

  const handeDeleteClient = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This client will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deletBulkClient(
            { id: location.state.customerId },
            setDeleteLoader,
            (success) => {
              if (success) {
                navigate(-1);
              }
            }
          )
        );
      }
    });
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
      <Heading text="Edit Client" />
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
              label="State"
              type="option"
              options={stateOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="city"
              label="City"
              type='text'
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
          <div className="flex gap-2">
            <Button
              loading={updateLoader}
              type="submit"
              className="primary-gradient mt-4 capitalize"
            >
              Update
            </Button>
            <Button
              type="button"
              loading={deleteLoader}
              onClick={handeDeleteClient}
              className="primary-gradient mt-4 capitalize flex items-center gap-1"
            >
              <MdDelete size={17} /> Delete
            </Button>
          </div>
        </form>

        {/* <div className="mt-4">
          <DataTable
            data={dummyOrders || []}
            columns={dummyColumns(handleInvoiceClick)}
            customStyles={tableStyle}
            // onRowClicked={handleRowClick}
            // pagination
            // paginationPerPage={rowsPerPage}
            // paginationDefaultPage={currentPage}
            // onChangePage={handlePageChange}
            // onChangeRowsPerPage={handlePerRowsChange}
            // paginationServer
            // paginationTotalRows={
            //   ordersData?.length === rowsPerPage
            //     ? currentPage * rowsPerPage + 1
            //     : currentPage * rowsPerPage
            // }
          />
        </div> */}
      </div>

      {/* <BulkClientInvoice /> */}
    </PageCont>
  );
}

export default EditBulkClient;
