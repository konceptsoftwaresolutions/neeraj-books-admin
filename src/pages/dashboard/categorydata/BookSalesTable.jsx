import React from "react";
import { useSelector } from "react-redux";

const BookSalesTable = () => {
  const { dashboardData } = useSelector((state) => state.dashboard);

  return (
    <div className="bg-white p-4 rounded border-[1px]">
      <h2 className="text-lg font-semibold mb-4">Best Seller Products</h2>

      {/* Table Container with Scroll */}
      <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
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
    </div>
  );
};

export default BookSalesTable;
