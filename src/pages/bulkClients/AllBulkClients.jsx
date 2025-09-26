import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { bulkCustomerColumns } from "../../constant/tableColumns";
import usePath from "../../hooks/usePath";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { getAllBulkClient } from "../../redux/features/customers";
import { FaFilter } from "react-icons/fa6";
import FilterDrawer from "./FilterDrawer";

function AllBulkClients() {
  const navigate = useNavigate();
  const path = usePath();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  const [allBulkClients, setAllBulkClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination state from URL or defaults
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const rowsPerPage = parseInt(searchParams.get("limit") || "10", 10);

  // Mapping keys for filter fields
  const fieldMap = {
    name: "firstName",
    companyName: "companyName",
    mobile: "mobile",
    state: "state",
    city: "city",
    notes: "notes",
    startDate: "createdAt",
    endDate: "createdAt",
  };

  // Load filters from URL on mount
  useEffect(() => {
    const urlFilters = {};
    for (const [key, value] of searchParams.entries()) {
      if (key !== "page" && key !== "limit" && value) {
        urlFilters[key] = value;
      }
    }
    setFilters(urlFilters);
  }, [searchParams]);

  // Fetch data once
  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getAllBulkClient((success, data) => {
        if (success) {
          setAllBulkClients(data);
        }
        setIsLoading(false);
      })
    );
  }, [dispatch]);

  // Apply filters
  useEffect(() => {
    let filtered = [...allBulkClients];

    Object.entries(filters).forEach(([key, value]) => {
      const actualKey = fieldMap[key];
      if (!actualKey || !value) return;

      if (key === "startDate") {
        filtered = filtered.filter((item) => {
          if (!item.createdAt) return false;
          const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
          return itemDate >= value;
        });
      } else if (key === "endDate") {
        filtered = filtered.filter((item) => {
          if (!item.createdAt) return false;
          const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
          return itemDate <= value;
        });
      } else {
        filtered = filtered.filter((item) =>
          (item[actualKey] || "")
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        );
      }
    });

    setFilteredClients(filtered);
  }, [filters, allBulkClients]);

  const handleRowClick = (data) => {
    navigate(`/${role}/edit-bulk-orders-client`, {
      state: { customerId: data._id },
    });
  };

  // Update filters in URL
  const onApplyFilter = (filterValues) => {
    const params = new URLSearchParams();
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set("page", "1"); // reset to page 1 when filters change
    params.set("limit", rowsPerPage);
    setSearchParams(params);
  };

  const onCancelFilter = () => {
    setSearchParams({ page: "1", limit: rowsPerPage.toString() });
  };

  // Update page and limit in URL
  const handleChangePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  const handleChangeRowsPerPage = (newLimit, page) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit.toString());
    params.set("page", "1"); // reset to first page when changing limit
    setSearchParams(params);
  };

  // Calculate pagination slice
  const paginatedData = filteredClients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const filterKeys = [
    "name",
    "companyName",
    "mobile",
    "state",
    "city",
    "notes",
    "startDate",
    "endDate",
  ]; // add your actual filter keys

  // Check if any of the filter keys exist in the URL
  const isFilterActive = filterKeys.some((key) => searchParams.has(key));

  return (
    <PageCont>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex justify-start items-center gap-3 w-full sm:w-auto">
          <Heading text="Bulk Orders Clients" />
        </div>
        <div className="flex justify-end gap-1">
          <Button
            type="submit"
            variant="filled"
            className="capitalize text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue"
            onClick={() => path.changeEndPoint("add-bulk-orders-client")}
          >
            <Plus className="pr-1" />
            Add Client
          </Button>
          <Button
            variant="filled"
            className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center justify-center gap-1"
            onClick={() => setIsDrawerVisible(true)}
          >
            <FaFilter size={16} />
            Filter / Search
          </Button>
        </div>
      </div>

      {isFilterActive && (
        <p className="primary-gradient w-max text-white px-3 py-1 rounded-md">
          Filter Is Active
        </p>
      )}
      <div className="mt-4">
        {isLoading ? (
          <div className="py-10 flex items-center justify-center">
            <p>Loading ...</p>
          </div>
        ) : (
          <DataTable
            data={paginatedData}
            columns={bulkCustomerColumns}
            customStyles={tableStyle}
            onRowClicked={handleRowClick}
            pagination
            paginationServer
            paginationTotalRows={filteredClients.length}
            paginationPerPage={rowsPerPage}
            paginationDefaultPage={currentPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        )}
      </div>

      <FilterDrawer
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        onApplyFilter={onApplyFilter}
        onCancelFilter={onCancelFilter}
        initialFilters={filters}
      />
    </PageCont>
  );
}

export default AllBulkClients;
