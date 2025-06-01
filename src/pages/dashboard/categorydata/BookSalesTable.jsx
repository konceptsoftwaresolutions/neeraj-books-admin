import React from "react";
import { useSelector } from "react-redux";

const BookSalesTable = ({ data }) => {
  const { dashboardData } = useSelector((state) => state.dashboard);

  return (
    <div className="overflow-x-auto bg-white p-4 rounded border-[1px]">
      <h2 className="text-lg font-semibold mb-4">Best Seller Products</h2>
      <table className="min-w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border-b">Book Name</th>
            <th className="px-4 py-2 text-left border-b">Units Sold</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData?.bestSellers?.map((book, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{Object.keys(book)[0]}</td>
              <td className="px-4 py-2 border-b">{Object.values(book)[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookSalesTable;
