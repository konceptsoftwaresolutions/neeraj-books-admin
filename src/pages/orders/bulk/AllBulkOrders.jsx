import React, { useEffect, useState } from "react";
import PageCont from "../../../components/PageCont";
import Heading from "../../../components/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../../constant/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrdersColumn,
  bulkOrderColumns,
} from "../../../constant/tableColumns";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import usePath from "../../../hooks/usePath";
import {
  getAllBulkOrders,
  getAllOrders,
  getFilteredOrders,
  setOrderFilters,
} from "../../../redux/features/orders";
import AllOrdersPdf from "../AllOrdersPdf";
import { FaFileCsv } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { IoMdPrint } from "react-icons/io";
import { pdf } from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel, FaFilter } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";

// Import the FilterDrawer component
import FilterDrawer from "../FilterDrawer"; // 🆕 Import the Drawer component
import OrderModal from "../OrderModal";
import ShipmentPdf from "../../pdf/ShipmentPdf";

import Papa from "papaparse";
import { checkCouponAvailability } from "../../../redux/features/books";
import BulkClientInvoice from "../../pdf/BulkClientInvoice";

const AllBUlkOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = usePath();

  // const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Drawer visibility state
  const [filters, setFilters] = useState({}); // Applied filters state
  const [ordersData, setOrdersData] = useState();
  const [showBulkModal, setShowBulkModal] = useState(false);

  const { role } = useSelector((state) => state.auth);
  const { allBulkOrders } = useSelector((state) => state.order);
  const storedFilters = useSelector((state) => state.order.filters);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const handlePageChange = (page) => {
    setSearchParams({ page });
    setCurrentPage(page);
  };

  useEffect(() => {
    if (storedFilters && Object.keys(storedFilters).length > 0) {
      setFilters(storedFilters);
    }
  }, [storedFilters]);

  const handlePerRowsChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  };

  useEffect(() => {
    const payload = {
      page: currentPage,
      limit: rowsPerPage,
    };

    dispatch(
      getAllBulkOrders(payload, (success, data) => {
        setOrdersData(data);
      })
    );
  }, [dispatch, currentPage, rowsPerPage]);

  const handleRowClick = (data) => {
    navigate(`/${role}/editbulkOrders`, { state: { data } });
  };

  const fetchCouponPercentage = (couponCode) => {
    return new Promise((resolve, reject) => {
      dispatch(
        checkCouponAvailability(couponCode, (success, data) => {
          if (success) {
            resolve(data);
          } else {
            reject(0);
          }
        })
      );
    });
  };

  const handleInvoiceClick = async (data) => {
    console.log(data);
    try {
      const blob = await pdf(<BulkClientInvoice data={data} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF or fetching coupon:", error);
    }
  };

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const onCancelFilter = () => {
    setFilters({}); // Reset filters
    closeDrawer(); // Close the drawer
  };

  // Handle filter changes
  const onApplyFilter = (filterPayload) => {
    setFilters(filterPayload);
    dispatch(setOrderFilters(filterPayload));
  };

  const exportToExcel = () => {
    if (!ordersData || ordersData.length === 0) return;

    const flattenedData = ordersData.flatMap((order) => {
      return order.items.map((item) => {
        const product = item?.productId?.english;

        return {
          OrderID: order.orderId,
          CustomerName: `${order.shippingAddress?.firstName ?? ""} ${
            order.shippingAddress?.lastName ?? ""
          }`,
          Address: `${order.shippingAddress?.addressLine1 ?? ""}, ${
            order.shippingAddress?.city ?? ""
          }, ${order.shippingAddress?.state ?? ""} - ${
            order.shippingAddress?.pincode ?? ""
          }`,
          Mobile: order.shippingAddress?.mobile,
          ProductTitle: product?.title ?? "",
          Quantity: item?.quantity ?? "",
          HSN: item?.hsn ?? "",
          OnlyEbookSelected: item?.onlyEbookSelected ? "Yes" : "No",
          IsEbookAlsoSelected: item?.isEbookAlsoSelected ? "Yes" : "No",
          PaperBackPrice: product?.paperBackOriginalPrice ?? "",
          DiscountedPrice: product?.paperBackDiscountedPrice ?? "",
          OrderStatus: order.orderStatus,
          PaymentStatus: order.paymentStatus,
          PaymentMode: order.paymentMode,
          TotalAmount: order.totalAmount,
          ShippingAmount: order.shippingAmount,
          DiscountTotal: order.discountTotal,
          Reference: order.fromWhereYouGetTheReference,
          OrderWeight: order.orderWeight,
          NoOfBooks: order.noOfBooksWithoutEbook,
          ShipmentID: order.shipment_id,
          ShipmentOrderID: order.shipment_order_id,
          Courier: order.courier,
          CreatedAt: new Date(order.createdAt).toLocaleString(),
        };
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Orders.xlsx");
  };

  const exportToCSV = () => {
    if (!ordersData || ordersData.length === 0) return;

    const flattenedData = ordersData.flatMap((order) => {
      return order.items.map((item) => {
        const product = item?.productId?.english;

        return {
          OrderID: order.orderId,
          CustomerName: `${order.shippingAddress?.firstName ?? ""} ${
            order.shippingAddress?.lastName ?? ""
          }`,
          Address: `${order.shippingAddress?.addressLine1 ?? ""}, ${
            order.shippingAddress?.city ?? ""
          }, ${order.shippingAddress?.state ?? ""} - ${
            order.shippingAddress?.pincode ?? ""
          }`,
          Mobile: order.shippingAddress?.mobile,
          ProductTitle: product?.title ?? "",
          Quantity: item?.quantity ?? "",
          OrderStatus: order.orderStatus,
          PaymentStatus: order.paymentStatus,
          TotalAmount: order.totalAmount,
          CreatedAt: new Date(order.createdAt).toLocaleString(),
        };
      });
    });

    const csv = Papa.unparse(flattenedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Orders.csv");
  };

  const exportAllToPDF = async () => {
    try {
      const blob = await pdf(<AllOrdersPdf data={ordersData} />).toBlob();
      saveAs(blob, "AllOrders.pdf");
    } catch (error) {
      console.error("Failed to export PDF", error);
    }
  };

  const printMultipleOrders = (orders = []) => {
    const ordersHtml = orders
      .map((order, orderIndex) => {
        const itemsHtml = order.items
          .map((item, index) => {
            const product = item.productId?.english || {};
            return `
            <tr>
              <td>${index + 1}</td>
              <td>${product.title ?? ""}</td>
              <td>${item.language ?? ""}</td>
              <td>${item.quantity ?? ""}</td>
              <td>${product.paperBackDiscountedPrice ?? ""}</td>
              <td>${item.hsn ?? ""}</td>
            </tr>
          `;
          })
          .join("");

        return `
        <div class="order-section">
          <h2>Order ${orderIndex + 1} - ${order.orderId}</h2>
          <p><strong>Customer:</strong> ${order.shippingAddress.firstName} ${
          order.shippingAddress.lastName
        }</p>
          <p><strong>Mobile:</strong> ${order.shippingAddress.mobile}</p>
          <p><strong>Address:</strong> ${order.shippingAddress.addressLine1}, ${
          order.shippingAddress.city
        }, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Language</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>HSN</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <p><strong>Payment Mode:</strong> ${order.paymentMode}</p>
          <p><strong>Order Status:</strong> ${order.orderStatus}</p>
          <p><strong>Total Amount:</strong> ₹${order.totalAmount} (Shipping: ₹${
          order.shippingAmount
        })</p>
          <hr style="margin: 30px 0;" />
        </div>
      `;
      })
      .join("");

    const html = `
    <html>
      <head>
        <title>All Orders</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            text-align: center;
            margin-bottom: 40px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            font-size: 14px;
          }
          th {
            background-color: #f5f5f5;
          }
          .order-section {
            margin-bottom: 30px;
          }
        </style>
      </head>
      <body>
        <h1>Order Summary</h1>
        ${ordersHtml}
      </body>
    </html>
  `;

    const printWindow = window.open("", "", "width=900,height=700");
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleAddBulkOrder = () => {
    navigate(`/${role}/addbulkOrders`);
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="Bulk Orders" />
        </div>
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
            onClick={handleAddBulkOrder}
          >
            Create
          </Button>

          {/* <Button
            variant="filled"
            className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center justify-center gap-1"
            onClick={showDrawer}
          >
            <FaFilter size={16} />
            Filter / Search
          </Button> */}
          {/* <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize "
            onClick={() => path.changeEndPoint("addbulkOrders")}
          >
            <Plus className="pr-1" />
            Add Orders
          </Button> */}
        </div>
      </div>

      <div className="mt-4">
        {/* {Object.values(filters).some((val) => val) && (
          <p className="bg-red-300 text-white w-max p-2 rounded-md mb-3">
            Filter is active
          </p>
        )}
        <div className="flex justify-start gap-2 mb-3">
          <Button
            variant="filled"
            className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center gap-1"
            onClick={exportToCSV}
          >
            <FaFileCsv size={17} /> Export CSV
          </Button>
          <Button
            variant="filled"
            className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center justify-center gap-1"
            onClick={exportToExcel}
          >
            <FaFileExcel size={16} />
            Export Excel
          </Button>
          <Button
            variant="filled"
            className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center gap-1"
            onClick={exportAllToPDF}
          >
            <FaFilePdf size={17} /> Export PDF
          </Button>
          <Button
            variant="filled"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center gap-1"
            onClick={() => printMultipleOrders(ordersData)}
          >
            <IoMdPrint size={17} />
            Print Table
          </Button>
        </div> */}

        {ordersData ? (
          <DataTable
            data={ordersData || []}
            columns={bulkOrderColumns(handleInvoiceClick, handleRowClick)}
            customStyles={tableStyle}
            // onRowClicked={handleRowClick}
            pagination
            paginationPerPage={rowsPerPage}
            paginationDefaultPage={currentPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationServer
            paginationTotalRows={
              ordersData?.length === rowsPerPage
                ? currentPage * rowsPerPage + 1
                : currentPage * rowsPerPage
            }
          />
        ) : (
          <div className="w-full flex justify-center py-10">
            <Spinner />
          </div>
        )}
      </div>

      {/* 🆕 Filter Drawer Component */}
      <FilterDrawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        onApplyFilter={onApplyFilter}
        onCancelFilter={onCancelFilter} // 🆕 pass down
        initialFilters={storedFilters} // ← Accept initial filters
      />
      <OrderModal showModal={showBulkModal} setShowModal={setShowBulkModal} />
      {/* <ShipmentPdf /> */}
      {/* <BulkClientInvoice /> */}
    </PageCont>
  );
};

export default AllBUlkOrders;
