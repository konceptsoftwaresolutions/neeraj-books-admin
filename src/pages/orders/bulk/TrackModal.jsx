import React from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";

const TrackModal = ({ showModal, setShowModal, trackingData }) => {
  const dispatch = useDispatch();

  console.log(trackingData);

  const {
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    setShowModal(false);
  };

  const shipment =
    trackingData?.tracking?.tracking_data?.shipment_track?.[0] || {};
  const activities =
    trackingData?.tracking?.tracking_data?.shipment_track_activities || [];

  return (
    <Dialog
      open={showModal}
      handler={handleCloseModal}
      className="detailModal overflow-hidden"
      style={{ maxHeight: "90vh" }}
    >
      <DialogHeader className="text-xl primary-gradient text-white poppins-font">
        <div className="flex justify-between w-full items-center">
          Shipment Tracking
          <IoIosCloseCircle
            className="h-6 w-6 cursor-pointer"
            onClick={handleCloseModal}
          />
        </div>
      </DialogHeader>

      <DialogBody
        className="overflow-y-auto bg-transparent lg:p-3"
        style={{ maxHeight: "calc(90vh - 64px)" }}
      >
        {trackingData ? (
          <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-6 mb-10">
            {/* Shipment Summary */}
            <h2 className="text-lg font-bold mb-4 border-b pb-1 text-black">
              Shipment Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-6 text-black">
              <p>
                <strong>AWB Code:</strong> {shipment?.awb_code}
              </p>
              <p>
                <strong>Courier:</strong> {shipment?.courier_name}
              </p>
              <p>
                <strong>Status:</strong> {shipment?.current_status}
              </p>
              <p>
                <strong>Consignee:</strong> {shipment?.consignee_name}
              </p>
              <p>
                <strong>Origin:</strong> {shipment?.origin}
              </p>
              <p>
                <strong>Destination:</strong> {shipment?.destination}
              </p>
              <p>
                <strong>EDD:</strong>{" "}
                {shipment?.edd
                  ? new Date(shipment.edd).toLocaleString()
                  : "N/A"}
              </p>
              <p>
                <strong>POD:</strong> {shipment?.pod} ({shipment?.pod_status})
              </p>
            </div>

            {/* Tracking Timeline */}
            <h2 className="text-lg font-bold mb-4 border-b pb-1 text-black">
              Tracking Timeline
            </h2>

            {activities.length > 0 ? (
              <ol className="relative border-l border-gray-300">
                {activities.map((activity, index) => (
                  <li key={index} className="mb-6 ml-4">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white"></div>
                    <time className="block text-sm text-gray-500 mb-1">
                      {activity.date}
                    </time>
                    <h3 className="text-md font-semibold">{activity.status}</h3>
                    <p className="text-sm text-gray-700">{activity.activity}</p>
                    {activity.location && (
                      <p className="text-sm text-gray-500 italic">
                        Location: {activity.location}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-600 italic mt-2">
                No tracking activities available.
                {trackingData?.tracking_data?.error && (
                  <p className="text-center text-black font-semibold mt-4">
                    {trackingData?.tracking_data?.error}
                  </p>
                )}
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">No tracking data found.</p>
        )}
      </DialogBody>
    </Dialog>
  );
};

export default TrackModal;
