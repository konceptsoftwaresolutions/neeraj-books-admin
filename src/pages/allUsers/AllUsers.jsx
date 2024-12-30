import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { columns } from "../../constant/tableColumns";
import { Button } from "@material-tailwind/react";
import { Plus, ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const dataTable = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      address: "1234 Elm Street",
      phone: "+1234567890",
      profile: "profile",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: "5678 Oak Avenue",
      phone: "+1987654321",
      profile: "profile",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      address: "9876 Pine Blvd",
      phone: "+1122334455",
      profile: "profile",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      address: "4321 Maple Rd",
      phone: "+1223344556",
      profile: "profile",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      address: "1357 Birch Path",
      phone: "+1334455667",
      profile: "profile",
    },
  ];

  const handleNavigate = () => {
    navigate(`/${role}/addUser`);
  };
  const handleRowClick = (row) => {
    navigate(`/${role}/editUser`, { state: { user: row } });
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 rounded-lg back-btn md:block  bg-[#29A6E0]"
          >
            <ChevronsLeft color="white" width={22} />
          </button>
          <Heading text="All Users" />
        </div>
        <Button
          type="submit"
          variant="filled"
          onClick={handleNavigate}
          className=" black text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-gradient-to-r from-[#29A6E0] to-[#2E3494] "
          // loading={loading}
        >
          <Plus className="pr-1" />
          Add User
        </Button>
      </div>
      <div className="my-5">
        <DataTable
          columns={columns}
          data={dataTable}
          customStyles={tableStyle}
          onRowClicked={handleRowClick}
          // selectableRows
          // onSelectedRowsChange={handleSelectedRows}
          pagination
          highlightOnHover
          striped
          responsive
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </PageCont>
  );
};

export default AllUsers;
