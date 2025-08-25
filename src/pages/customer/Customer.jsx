import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { allMembers } from "../../constant/tableColumns";
import usePath from "../../hooks/usePath";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { Input } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import createAxiosInstance from "../../config/axiosConfig";
import { FaFileExcel, FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";

function Customer() {
  const navigate = useNavigate();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const axiosInstance = createAxiosInstance();

  useEffect(() => {
    const fetchCustomers = async () => {
      const cacheKey = "customerCacheTimestamp";
      const cacheDuration = 5 * 60 * 1000;
      const lastFetched = localStorage.getItem(cacheKey);
      const isStale =
        !lastFetched || Date.now() - parseInt(lastFetched) > cacheDuration;

      if (customers.length === 0 || isStale) {
        try {
          setIsLoading(true);
          const response = await axiosInstance.get("/user/getAll");

          if (response.status === 200) {
            const data = response.data;
            const parsedCustomers = data.map((item) => ({
              _id: item?._id || "",
              name: item?.name || "",
              profile: item?.profile || "",
              email: item?.email || "",
              mobile: item?.mobile || "",
              state: item?.state || "",
              category: item?.category || "",
            }));

            const reversed = parsedCustomers.reverse();
            setCustomers(reversed);
            setFilteredCustomers(reversed); // initially show all
            localStorage.setItem(cacheKey, Date.now().toString());
          }
        } catch (error) {
          console.error(error);
          let message = "Something went wrong";
          if (error?.response?.data?.message) {
            message = error.response.data.message;
          }
          toast.error(message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCustomers();
  }, []);

  // Normalize string for flexible search
  const normalize = (text) =>
    text?.toString().toLowerCase().replace(/\s+/g, "") || "";

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredCustomers(customers);
      return;
    }

    const normalizedSearch = normalize(searchText);

    const filtered = customers.filter((cust) => {
      return (
        normalize(cust.name).includes(normalizedSearch) ||
        normalize(cust.profile).includes(normalizedSearch) ||
        normalize(cust.email).includes(normalizedSearch) ||
        normalize(cust.mobile).includes(normalizedSearch) ||
        normalize(cust.state).includes(normalizedSearch)
      );
    });

    setFilteredCustomers(filtered);
  }, [searchText, customers]);

  const handleRowClick = (data) => {
    navigate(`/${role}/editcustomer`, { state: { customerId: data._id } });
  };

  const exportToExcel = () => {
    if (!filteredCustomers || filteredCustomers.length === 0) return;

    const wb = XLSX.utils.book_new(); // Create a new workbook

    const wsData = filteredCustomers.map((customer) => ({
      Name: customer.name ?? "",
      // Profile: customer.profile ?? "",
      Email: customer.email ?? "",
      Mobile: customer.mobile ?? "",
      State: customer.state ?? "",
      Category: customer.category ?? "",
    }));

    const ws = XLSX.utils.json_to_sheet(wsData); // Convert JSON to sheet
    XLSX.utils.book_append_sheet(wb, ws, "Customers"); // Append sheet to workbook
    XLSX.writeFile(wb, "Customers.xlsx"); // Trigger download
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="All Customer" />
        </div>
        <Button
          type="submit"
          variant="filled"
          className="capitalize text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
          onClick={() => path.changeEndPoint("addcustomer")}
        >
          <Plus className="pr-1" />
          Add Customer
        </Button>
      </div>

      <div className="mt-4 relative">
        <FaSearch className="absolute top-3 left-2 z-20 text-cstm-blue" />
        <Input
          type="text"
          placeholder="Search by name, email, mobile, profile, state..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 pl-7 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-cstm-blue"
        />
      </div>

      <div className="mt-3">
        <Button
          variant="gradient"
          color="blue"
          onClick={exportToExcel}
          className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center gap-1"
        >
          <FaFileExcel className="mr-2" />
          Export to Excel
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="py-10 flex items-center justify-center">
            <p>Loading ...</p>
          </div>
        ) : (
          <DataTable
            data={filteredCustomers || []}
            columns={allMembers}
            customStyles={tableStyle}
            onRowClicked={handleRowClick}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
            noDataComponent={
              <div className="py-5 text-gray-500 text-sm">
                No matching records found.
              </div>
            }
          />
        )}
      </div>
    </PageCont>
  );
}

export default Customer;
