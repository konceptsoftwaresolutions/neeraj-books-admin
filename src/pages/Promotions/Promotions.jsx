import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { allPromotions } from "../../constant/tableColumns";
import {
  getAllAffiliates,
  updateTheAffiliatePaymnet,
} from "../../redux/features/affiliates";
import { useNavigate } from "react-router-dom";
import AffiliateFilterDrawer from "./AffiliateFilterDrawer"; // 👈 import filter drawer
import { Button } from "@material-tailwind/react";

import { FaFilter } from "react-icons/fa6";

function Promotions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allAffiliates } = useSelector((state) => state.affiliate);
  const { role } = useSelector((state) => state.auth);

  const [filteredData, setFilteredData] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    dispatch(getAllAffiliates());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(allAffiliates || []);
  }, [allAffiliates]);

  const handleStatusChange = (data, status) => {
    if (status === "approve") {
      navigate(`/${role}/affiliateDetails`, { state: { data } });
    } else {
      const payload = { id: data._id, approved: false };
      dispatch(updateTheAffiliatePaymnet(payload));
    }
  };

  const handleRowClick = (data) => {
    navigate(`/${role}/affiliateDetails`, { state: { data } });
  };

  const applyFilters = (filters) => {
    setActiveFilters(filters);

    let result = [...allAffiliates];

    console.log(result);

    if (filters.name) {
      const search = filters.name.toLowerCase();
      result = result.filter((item) => {
        const fullName = `${item.firstName || ""} ${
          item.lastName || ""
        }`.toLowerCase();
        return (
          item.firstName?.toLowerCase().includes(search) ||
          item.lastName?.toLowerCase().includes(search) ||
          fullName.includes(search)
        );
      });
    }

    if (filters.email) {
      result = result.filter((item) =>
        item.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    // if (filters.status !== undefined) {
    //   result = result.filter((item) => item.approved === filters.status);
    // }

    if (filters.date) {
      result = result.filter((item) => {
        const itemDate = new Date(item.createdAt).toISOString().split("T")[0]; // "YYYY-MM-DD"
        return itemDate === filters.date;
      });
    }

    setFilteredData(result);
  };

  const resetFilters = () => {
    setActiveFilters({});
    setFilteredData(allAffiliates || []);
  };

  return (
    <div>
      <PageCont>
        <div className="flex justify-between items-center">
          <Heading text="All Affiliates" />
          {/* <Button type="primary" >
            Filter
          </Button> */}
          <Button
            variant="filled"
            className="bg-gray-700 hover:bg-gray-700 text-white px-4 py-4 rounded-md font-semibold capitalize flex items-center justify-center gap-1"
            onClick={() => setIsFilterVisible(true)}
          >
            <FaFilter size={16} />
            Filter / Search
          </Button>
        </div>

        <div className="mt-4 mb-8">
          <DataTable
            data={filteredData}
            columns={allPromotions(handleRowClick)}
            customStyles={tableStyle}
            onRowClicked={handleRowClick}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
        </div>

        {/* Drawer */}
        <AffiliateFilterDrawer
          isVisible={isFilterVisible}
          onClose={() => setIsFilterVisible(false)}
          onApplyFilter={applyFilters}
          onCancelFilter={resetFilters}
          initialFilters={activeFilters}
        />
      </PageCont>
    </div>
  );
}

export default Promotions;
