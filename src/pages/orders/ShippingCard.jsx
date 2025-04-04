import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Steps } from "antd";

const { Step } = Steps;

const ShippingCard = () => {
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStartShipping = () => {
    setShowSteps(true);
  };

  return (
    <div>
      <div className="border-b border-gray-200 flex justify-between items-center mr-3">
        <p className="p-3">Shipping Details</p>
        <Button
          type="button"
          variant="filled"
          onClick={handleStartShipping}
          className="text-white py-[3px] px-[10px] font-medium text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
        >
          Start Shipping
        </Button>
      </div>

      {showSteps && (
        <div className="mt-4 px-4">
          <Steps
            direction="vertical"
            current={currentStep}
            size="small"
            className="text-xs"
          >
            <Step title="Packed" description="Order has been packed" />
            <Step title="Shipped" description="In transit to customer" />
            <Step title="Delivered" description="Delivered successfully" />
          </Steps>
        </div>
      )}
    </div>
  );
};

export default ShippingCard;
