import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCustomerById } from "../../redux/features/customers";
import CustomerOrder from "./CustomerOrder";

const ViewCustomer = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [customerData, setCustomerData] = useState(null);
  const [customerDataLoading, setCustomerDataLoading] = useState(false);

  const getCustomerData = (id) => {
    dispatch(
      getCustomerById(
        id,
        (success, data) => {
          if (success) {
            setCustomerData(data);
          }
        },
        setCustomerDataLoading
      )
    );
  };

  useEffect(() => {
    if (location?.state?.customerId) {
      getCustomerData(location.state.customerId);
    }
  }, [location]);

  if (customerDataLoading) {
    return (
      <PageCont>
        <Heading text="View Customer" />
        <div className="text-center py-10 text-lg text-gray-600">
          Loading customer data...
        </div>
      </PageCont>
    );
  }

  if (!customerData) {
    return (
      <PageCont>
        <Heading text="View Customer" />
        <div className="text-center py-10 text-lg text-gray-600">
          No customer data found.
        </div>
      </PageCont>
    );
  }

  const address = customerData?.addresses?.[0] || {};

  return (
    <PageCont>
      <Heading text="View Customer" />
      <div className=" mx-auto bg-white shadow rounded p-6 space-y-6 mt-6">
        {/* Basic Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
            Basic Information
          </h3>
          <p>
            <strong>Name:</strong> {customerData?.name || "-"}
          </p>
          <p>
            <strong>Email:</strong> {customerData?.email || "-"}
          </p>
          <p>
            <strong>Mobile:</strong> {customerData?.mobile || "-"}
          </p>
          <p>
            <strong>Category:</strong> {customerData?.category || "-"}
          </p>
          <p>
            <strong>Profile:</strong> {customerData?.profile || "-"}
          </p>
          <p>
            <strong>State:</strong> {customerData?.state || "-"}
          </p>
        </div>

        {/* Address */}
        {customerData?.addresses?.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
              Addresses
            </h3>
            {customerData.addresses.map((addr, index) => (
              <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                <p>
                  <strong>Address #{index + 1}</strong>
                </p>
                <p>
                  <strong>First Name:</strong> {addr?.firstName || "-"}
                </p>
                <p>
                  <strong>Last Name:</strong> {addr?.lastName || "-"}
                </p>
                <p>
                  <strong>Address Line 1:</strong> {addr?.addressLine1 || "-"}
                </p>
                <p>
                  <strong>Address Line 2:</strong> {addr?.addressLine2 || "-"}
                </p>
                <p>
                  <strong>City:</strong> {addr?.city || "-"}
                </p>
                <p>
                  <strong>State:</strong> {addr?.state || "-"}
                </p>
                <p>
                  <strong>Country:</strong> {addr?.country || "-"}
                </p>
                <p>
                  <strong>Pincode:</strong> {addr?.pincode || "-"}
                </p>
                <p>
                  <strong>Mobile:</strong> {addr?.mobile || "-"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Other Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
            Other Information
          </h3>
          <p>
            <strong>Affiliate Referrals:</strong>{" "}
            {customerData?.affiliateDetails?.referrals ?? "-"}
          </p>
          <p>
            <strong>Affiliate Earnings:</strong> ₹
            {customerData?.affiliateDetails?.earnings ?? "0"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(customerData?.createdAt).toLocaleString() || "-"}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(customerData?.updatedAt).toLocaleString() || "-"}
          </p>
        </div>
      </div>
      <CustomerOrder />
    </PageCont>
  );
};

export default ViewCustomer;
