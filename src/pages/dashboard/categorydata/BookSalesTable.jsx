import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";

const BookSalesTable = ({ initialVisible = 13 }) => {
  const { dashboardData } = useSelector((state) => state.dashboard);
  const [isExpanded, setIsExpanded] = useState(false);

  const bestSellers = dashboardData?.bestSellers || [];

  // Show only a limited number if collapsed
  const displayedBooks = isExpanded
    ? bestSellers
    : bestSellers.slice(0, initialVisible);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      {/* Header with Expand/Collapse button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Best Seller Products</h2>
        {bestSellers.length > initialVisible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-black text-sm"
          >
            {isExpanded ? (
              <span className="flex items-center">
                Collapse <IoIosArrowUp size={20} />{" "}
              </span>
            ) : (
              <span className="flex items-center">
                Expand <MdOutlineKeyboardArrowDown size={20} />{" "}
              </span>
            )}
          </button>
        )}
      </div>

      <div className="border border-gray-200 rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">Book Name</th>
              <th className="px-4 py-2 text-left border-b">Units Sold</th>
            </tr>
          </thead>
          <tbody>
            {displayedBooks.map((book, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{Object.keys(book)[0]}</td>
                <td className="px-4 py-2 border-b">{Object.values(book)[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookSalesTable;
