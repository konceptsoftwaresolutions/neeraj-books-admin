import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { allMembers } from "../../constant/tableColumns";
import usePath from "../../hooks/usePath";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { getAllCustomers } from "../../redux/features/customers";

function Customer() {
  const navigate = useNavigate();
  const path = usePath();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { allCustomers } = useSelector((state) => state.customer);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cacheKey = "customerCacheTimestamp";
    const cacheDuration = 5 * 60 * 1000; // 5 minutes

    const lastFetched = localStorage.getItem(cacheKey);
    const isStale =
      !lastFetched || Date.now() - parseInt(lastFetched) > cacheDuration;

    if (!allCustomers || allCustomers.length === 0 || isStale) {
      dispatch(getAllCustomers(setIsLoading));
      localStorage.setItem(cacheKey, Date.now().toString());
    }
  }, [allCustomers, dispatch]);

  const handleRowClick = (data) => {
    navigate(`/${role}/editcustomer`, { state: { customerId: data._id } });
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
      <div className="mt-4">
        {isLoading ? (
          <div className="py-10 flex items-center justify-center">
            <p>Loading ...</p>
          </div>
        ) : (
          <DataTable
            data={allCustomers || []}
            columns={allMembers}
            customStyles={tableStyle}
            onRowClicked={handleRowClick}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        )}
      </div>
    </PageCont>
  );
}

export default Customer;
