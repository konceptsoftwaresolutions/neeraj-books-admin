import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { allCustomer, allMembers } from "../../constant/tableColumns";
import usePath from "../../hooks/usePath";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { getAllCustomers } from "../../redux/features/customers";

function AllBulkClients(props) {
  const navigate = useNavigate();
  const path = usePath();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { allCustomers } = useSelector((state) => state.customer);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllCustomers(setIsLoading));
  }, []);

  const handleRowClick = (data) => {
    navigate(`/${role}/edit-bulk-orders-client`, {
      state: { customerId: data._id },
    });
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="Bulk Orders Clients" />
        </div>
        <Button
          type="submit"
          variant="filled"
          className="capitalize text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
          onClick={() => path.changeEndPoint("add-bulk-orders-client")}
        >
          <Plus className="pr-1" />
          Add Client
        </Button>
      </div>{" "}
      <div className="mt-4">
        {isLoading ? (
          <div className="py-10 flex items-center justify-center">
            <p>Loading ...</p>
          </div>
        ) : (
          <>
            <DataTable
              data={allCustomers ? allCustomers : []}
              columns={allMembers}
              customStyles={tableStyle}
              onRowClicked={handleRowClick}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50]}
            />
          </>
        )}
      </div>
    </PageCont>
  );
}

export default AllBulkClients;
