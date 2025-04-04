import React from "react";

const SummaryCard = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="cart-summary-table w-full border-collapse">
          <thead className="w-full hidden sm:table-header-group">
            <tr className="text-left border-b text-xs md:text-sm">
              <th className="py-2 px-4">Product Details</th>
              <th className="py-2 px-4 text-right" colSpan={3}>
                Price Info
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Product Row */}
            <tr className="border-b text-xs md:text-sm">
              <td className="py-4 px-4" colSpan={4}>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Image and book details */}
                  <div className="flex gap-3 items-start">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Book Title"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md"
                    />
                    <div className="text-gray-700">
                      <p className="font-medium">Basic Mathematics Book</p>
                      <p>BK-001</p>
                      <p className="capitalize">Medium: English</p>
                    </div>
                  </div>

                  {/* Price info */}
                  <div className="flex flex-col sm:flex-row gap-6 text-right font-semibold text-black">
                    <p>Price: ₹350.00</p>
                    <p>Qty: 2</p>
                    <p>Total: ₹700.00</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b text-xs md:text-sm">
              <td className="py-4 px-4" colSpan={4}>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Image and book details */}
                  <div className="flex gap-3 items-start">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Book Title"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md"
                    />
                    <div className="text-gray-700">
                      <p className="font-medium">Basic Mathematics Book</p>
                      <p>BK-001</p>
                      <p className="capitalize">Medium: English</p>
                    </div>
                  </div>

                  {/* Price info */}
                  <div className="flex flex-col sm:flex-row gap-6 text-right font-semibold text-black">
                    <p>Price: ₹350.00</p>
                    <p>Qty: 2</p>
                    <p>Total: ₹700.00</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b text-xs md:text-sm">
              <td className="py-4 px-4" colSpan={4}>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Image and book details */}
                  <div className="flex gap-3 items-start">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Book Title"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md"
                    />
                    <div className="text-gray-700">
                      <p className="font-medium">Basic Mathematics Book</p>
                      <p>BK-001</p>
                      <p className="capitalize">Medium: English</p>
                    </div>
                  </div>

                  {/* Price info */}
                  <div className="flex flex-col sm:flex-row gap-6 text-right font-semibold text-black">
                    <p>Price: ₹350.00</p>
                    <p>Qty: 2</p>
                    <p>Total: ₹700.00</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b text-xs md:text-sm">
              <td className="py-4 px-4" colSpan={4}>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Image and book details */}
                  <div className="flex gap-3 items-start">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Book Title"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md"
                    />
                    <div className="text-gray-700">
                      <p className="font-medium">Basic Mathematics Book</p>
                      <p>BK-001</p>
                      <p className="capitalize">Medium: English</p>
                    </div>
                  </div>

                  {/* Price info */}
                  <div className="flex flex-col sm:flex-row gap-6 text-right font-semibold text-black">
                    <p>Price: ₹350.00</p>
                    <p>Qty: 2</p>
                    <p>Total: ₹700.00</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b text-xs md:text-sm">
              <td className="py-4 px-4" colSpan={4}>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Image and book details */}
                  <div className="flex gap-3 items-start">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Book Title"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md"
                    />
                    <div className="text-gray-700">
                      <p className="font-medium">Basic Mathematics Book</p>
                      <p>BK-001</p>
                      <p className="capitalize">Medium: English</p>
                    </div>
                  </div>

                  {/* Price info */}
                  <div className="flex flex-col sm:flex-row gap-6 text-right font-semibold text-black">
                    <p>Price: ₹350.00</p>
                    <p>Qty: 2</p>
                    <p>Total: ₹700.00</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b text-xs md:text-sm">
              <td className="py-4 px-4" colSpan={4}>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Image and book details */}
                  <div className="flex gap-3 items-start">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Book Title"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md"
                    />
                    <div className="text-gray-700">
                      <p className="font-medium">Basic Mathematics Book</p>
                      <p>BK-001</p>
                      <p className="capitalize">Medium: English</p>
                    </div>
                  </div>

                  {/* Price info */}
                  <div className="flex flex-col sm:flex-row gap-6 text-right font-semibold text-black">
                    <p>Price: ₹350.00</p>
                    <p>Qty: 2</p>
                    <p>Total: ₹700.00</p>
                  </div>
                </div>
              </td>
            </tr>

            {/* Subtotal */}
            <tr className="text-right border-b text-sm md:text-base font-medium">
              <td className="py-2 px-4" colSpan={4}>
                <div className="flex justify-end gap-4">
                  <span>SubTotal:</span>
                  <span>₹1,100.00</span>
                </div>
              </td>
            </tr>

            {/* Shipping */}
            <tr className="text-right border-b text-sm md:text-base font-medium">
              <td className="py-2 px-4" colSpan={4}>
                <div className="flex justify-end gap-4">
                  <span>Shipping & Handling Charges:</span>
                  <span>₹100.00</span>
                </div>
              </td>
            </tr>

            {/* Grand Total */}
            <tr className="text-right border-b text-sm md:text-base font-semibold">
              <td className="py-2 px-4" colSpan={4}>
                <div className="flex justify-end gap-4">
                  <span>Grand Total:</span>
                  <span>₹1,200.00</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryCard;
