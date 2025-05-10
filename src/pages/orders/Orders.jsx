import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { allOrdersColumn } from "../../constant/tableColumns";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import usePath from "../../hooks/usePath";
import { getAllOrders, getFilteredOrders } from "../../redux/features/orders";
import ShipmentPdf from "../pdf/ShipmentPdf";
import { pdf } from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel, FaFilter } from "react-icons/fa";

// Import the FilterDrawer component
import FilterDrawer from "./FilterDrawer"; // 🆕 Import the Drawer component
import OrderModal from "./OrderModal";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = usePath();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Drawer visibility state
  const [filters, setFilters] = useState({}); // Applied filters state
  const [ordersData, setOrdersData] = useState();
  const [showBulkModal, setShowBulkModal] = useState(false);

  const { role } = useSelector((state) => state.auth);
  const { allOrders } = useSelector((state) => state.order);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  };

  useEffect(() => {
    const payload = {
      page: currentPage,
      limit: rowsPerPage,
      ...filters,
    };

    const isFilterApplied = Object.keys(filters).length > 0;

    const fetchData = isFilterApplied ? getFilteredOrders : getAllOrders;

    dispatch(
      fetchData(payload, (success, data) => {
        setOrdersData(data);
      })
    );
  }, [dispatch, currentPage, rowsPerPage, filters]);

  const handleRowClick = (data) => {
    navigate(`/${role}/editOrders`, { state: { data } });
  };

  const handleInvoiceClick = async (data) => {
    try {
      const blob = await pdf(<ShipmentPdf data={data} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
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

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="All Orders" />
        </div>
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
            onClick={() => setShowBulkModal(!showBulkModal)}
          >
            Bulk Order
          </Button>
          <Button
            variant="filled"
            className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center justify-center gap-1"
            onClick={exportToExcel}
          >
            <FaFileExcel size={16} />
            Export to Excel
          </Button>
          <Button
            variant="filled"
            className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center justify-center gap-1"
            onClick={showDrawer}
          >
            <FaFilter size={16} />
            Filter / Search
          </Button>
          <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize "
            onClick={() => path.changeEndPoint("addOrders")}
          >
            <Plus className="pr-1" />
            Add Orders
          </Button>
        </div>
      </div>

      <div className="mt-4">
        {Object.values(filters).some((val) => val) && (
          <p className="bg-red-300 text-white w-max p-2 rounded-md mb-3">
            Filter is active
          </p>
        )}

        <DataTable
          data={ordersData ? ordersData : []}
          columns={allOrdersColumn(handleInvoiceClick, handleRowClick)}
          customStyles={tableStyle}
          onRowClicked={handleRowClick}
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
      </div>

      {/* 🆕 Filter Drawer Component */}
      <FilterDrawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        onApplyFilter={onApplyFilter}
        onCancelFilter={onCancelFilter} // 🆕 pass down
      />
      <OrderModal showModal={showBulkModal} setShowModal={setShowBulkModal} />
    </PageCont>
  );
};

export default Orders;
