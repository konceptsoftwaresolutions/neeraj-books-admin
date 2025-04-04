import { ChevronsLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Heading({ text, backIcon = "true" }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      {backIcon === "true" ? (
        <>
          <button
            onClick={() => navigate(-1)}
            className="p-1 rounded-lg back-btn md:block  bg-cstm-blue"
          >
            <ChevronsLeft color="white" width={22} />
          </button>{" "}
        </>
      ) : null}

      <h2
        className={`text-lg lg:text-2xl head-color font-medium	ml-2 ${
          backIcon === "true" ? "ml-2" : "ml-0"
        }`}
      >
        {text}
      </h2>
    </div>
  );
}

export default Heading;
