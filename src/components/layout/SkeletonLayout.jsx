import React from "react";

const SkeletonLayout = ({ height }) => {
  return (
    <div
      className={`grid h-full w-full animate-pulse place-items-center rounded-lg bg-gray-300`}
      style={{
        minHeight: `${height}rem`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-12 w-12 text-gray-500"
      ></svg>
    </div>
  );
};

export default SkeletonLayout;
