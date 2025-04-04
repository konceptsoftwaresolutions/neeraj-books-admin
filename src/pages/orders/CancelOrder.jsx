import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Steps } from "antd";

const { Step } = Steps;

const CancelOrder = () => {
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStartReturn = () => {
    setShowSteps(true);
  };

  return (
    <div>
      <div className="border-b border-gray-200 flex justify-between items-center mr-3">
        <p className="p-3">Return Order</p>
        <Button
          type="button"
          variant="filled"
          onClick={handleStartReturn}
          className="text-white py-[3px] px-[10px] font-medium text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
        >
          Start Process
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
            <Step
              title="Return Requested"
              description="Customer requested a return"
            />
            <Step
              title="Pickup Scheduled"
              description="Pickup arranged for the item"
            />
            <Step
              title="Item Received"
              description="Item returned and received by seller"
            />
            <Step
              title="Refund Processed"
              description="Refund issued to customer"
            />
          </Steps>
        </div>
      )}
    </div>
  );
};

export default CancelOrder;
