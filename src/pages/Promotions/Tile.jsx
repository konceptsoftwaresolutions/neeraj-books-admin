import React from "react";

const Tile = ({ label, value, isCurrency = false }) => {
  return (
    <div className="bg-white border shadow-sm p-4 rounded-lg flex flex-col justify-between">
      <p className="text-sm text-black-500 mb-1 font-semibold">{label}</p>
      <p className="text-xl font-semibold text-gray-800">
        {isCurrency ? `₹${value ?? 0}` : value}
      </p>
    </div>
  );
};

export default Tile;
