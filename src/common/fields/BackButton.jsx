import React from "react";
import { useNavigate } from "react-router-dom";
import {  ChevronsLeft } from "lucide-react";

const BackButton = () => {

    const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="p-1 rounded-lg back-btn md:block  bg-[#29A6E0]"
    >
      <ChevronsLeft color="white" width={22} />
    </button>
  );
};

export default BackButton;
