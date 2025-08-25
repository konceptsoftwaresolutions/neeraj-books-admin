import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCustomerById } from "../../redux/features/customers";
import CustomerOrder from "./CustomerOrder";
import { updateUserProfile } from "../../redux/features/books";

const ViewCustomer = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [customerDataLoading, setCustomerDataLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    email: customerData?.email || "",
    mobile: customerData?.mobile || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // console.log(formValues);
    const payload = {
      ...customerData,
      ...formValues,
      userId: customerData?._id,
    };

    dispatch(
      updateUserProfile(payload, setIsLoading, (success) => {
        if (success) {
          setIsEditing(false);
          getCustomerData(payload?._id);
        } else {
          setIsEditing(false);
        }
      })
    );

    // console.log(payload);
    // onSave(formValues); // send to API or parent
  };

  const getCustomerData = (id) => {
    dispatch(
      getCustomerById(
        id,
        (success, data) => {
          if (success) {
            setCustomerData(data);
            setFormValues({
              email: data.email || "",
              mobile: data.mobile || "",
            });
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
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="border px-2 py-1 rounded my-2"
              />
            ) : (
              customerData?.email || "-"
            )}
          </p>
          <p>
            <strong>Mobile:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="mobile"
                value={formValues.mobile}
                onChange={handleChange}
                className="border px-2 py-1 rounded mb-2"
              />
            ) : (
              customerData?.mobile || "-"
            )}
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

          {/* Buttons */}
          <div className="mt-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-1 rounded mr-2"
                >
                  {isLoading ? "Saving" : "Save"}
                  {/* Save */}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
            )}
          </div>
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
