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
import { Input, Select } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import createAxiosInstance from "../../config/axiosConfig";
import { FaFileExcel, FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
import { stateOptions } from "../../constant/options";
import { getAllCategories } from "../../redux/features/category";
import { transformCategoriesData } from "../../utils/helper";

function Customer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedState, setSelectedState] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState(""); // 👈 new category filter
  const { allCategory } = useSelector((state) => state.category);

  const axiosInstance = createAxiosInstance();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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
            setFilteredCustomers(reversed);
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

  const normalize = (text) =>
    text?.toString().toLowerCase().replace(/\s+/g, "") || "";

  useEffect(() => {
    let filtered = [...customers];

    // search filter
    if (searchText.trim()) {
      const normalizedSearch = normalize(searchText);
      filtered = filtered.filter((cust) => {
        return (
          normalize(cust.name).includes(normalizedSearch) ||
          normalize(cust.profile).includes(normalizedSearch) ||
          normalize(cust.email).includes(normalizedSearch) ||
          normalize(cust.mobile).includes(normalizedSearch) ||
          normalize(cust.state).includes(normalizedSearch) ||
          normalize(cust.category).includes(normalizedSearch)
        );
      });
    }

    // state filter
    if (selectedState && selectedState !== "All") {
      filtered = filtered.filter((cust) => cust.state === selectedState);
    }

    // category filter (match only the main part before `-`)
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((cust) => {
        if (!cust.category) return false;
        const mainCategory = cust.category.split("-")[0]; // take only "BA" part
        return mainCategory === selectedCategory;
      });
    }

    setFilteredCustomers(filtered);
  }, [searchText, selectedState, selectedCategory, customers]);

  const handleRowClick = (data) => {
    navigate(`/${role}/editcustomer`, { state: { customerId: data._id } });
  };

  const exportToExcel = () => {
    if (!filteredCustomers || filteredCustomers.length === 0) return;

    const wb = XLSX.utils.book_new();
    const wsData = filteredCustomers.map((customer) => ({
      Name: customer.name ?? "",
      Email: customer.email ?? "",
      Mobile: customer.mobile ?? "",
      State: customer.state ?? "",
      Category: customer.category ?? "",
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, "Customers.xlsx");
  };

  const transformedData = transformCategoriesData(allCategory);

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

      {/* 🔍 Search + State + Category Filter */}
      <div className="mt-4 flex flex-col md:flex-row gap-3">
        {/* search box */}
        <div className="relative flex-1">
          <FaSearch className="absolute top-3 left-2 z-20 text-cstm-blue" />
          <Input
            type="text"
            placeholder="Search by name, email, mobile, profile, state, category..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 pl-7 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-cstm-blue"
          />
        </div>

        {/* state filter */}
        <div className="w-full md:w-64">
          <Select
            showSearch
            allowClear
            placeholder="Filter by State"
            options={stateOptions}
            value={selectedState || undefined}
            onChange={(value) => setSelectedState(value || "")}
            className="w-full h-[40px] !border-black state-drop "
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>

        {/* category filter */}
        <div className="w-full md:w-64">
          <Select
            showSearch
            allowClear
            placeholder="Filter by Category"
            options={transformedData}
            value={selectedCategory || undefined}
            onChange={(value) => setSelectedCategory(value || "")}
            className="w-full h-[40px] !border-black state-drop "
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>
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
