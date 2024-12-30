import React from "react";
import PageCont from "../../components/PageCont";
import BackButton from "../../common/fields/BackButton";
import Heading from "../../components/Heading";
import DataTable from "react-data-table-component";
import { allPatientsColumn, columns } from "../../constant/tableColumns";
import { tableStyle } from "../../constant/tableStyle";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AllPatients = () => {
  const { role } = useSelector((state) => state.auth);
  const dataTable = [
    {
      id: 1,
      patientId: "ARU230",
      date: "2024-11-01",
      name: "John Doe",
      email: "john.doe@example.com",
      address: "1234 Elm Street",
      phone: "1234567890",
      ward: "Ward A",
    },
    {
      id: 2,
      patientId: "BRU231",
      date: "2024-11-02",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: "5678 Oak Avenue",
      phone: "9876543210",
      ward: "Ward B",
    },
    {
      id: 3,
      patientId: "CRU232",
      date: "2024-11-03",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      address: "9876 Pine Blvd",
      phone: "1122334455",
      ward: "Ward C",
    },
    {
      id: 4,
      patientId: "DRU233",
      date: "2024-11-04",
      name: "Bob Brown",
      email: "bob.brown@example.com",
      address: "4321 Maple Rd",
      phone: "1223344556",
      ward: "Ward D",
    },
    {
      id: 5,
      patientId: "ERU234",
      date: "2024-11-05",
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      address: "1357 Birch Path",
      phone: "1334455667",
      ward: "Ward E",
    },
    {
      id: 6,
      patientId: "FRU235",
      date: "2024-11-06",
      name: "David Wilson",
      email: "david.wilson@example.com",
      address: "2468 Cedar Lane",
      phone: "1445566778",
      ward: "Ward F",
    },
    {
      id: 7,
      patientId: "GRU236",
      date: "2024-11-07",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      address: "3690 Spruce St",
      phone: "1556677889",
      ward: "Ward G",
    },
    {
      id: 8,
      patientId: "HRU237",
      date: "2024-11-08",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      address: "123 Oakwood Dr",
      phone: "1667788990",
      ward: "Ward H",
    },
    {
      id: 9,
      patientId: "IRU238",
      date: "2024-11-09",
      name: "Sarah Lee",
      email: "sarah.lee@example.com",
      address: "456 Pineview Ln",
      phone: "1778899001",
      ward: "Ward I",
    },
    {
      id: 10,
      patientId: "JRU239",
      date: "2024-11-10",
      name: "Chris Green",
      email: "chris.green@example.com",
      address: "789 Maplewood Rd",
      phone: "1889900112",
      ward: "Ward J",
    },
  ];
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${role}/addPatient`);
  }

  const handleRowClick = (row) => {
    navigate(`/${role}/editPatient` , {state:{patient:row}})
  }

  return (
    <PageCont>
      <div className="flex justify-between">
        <div className="flex justify-start items-center gap-3">
          <BackButton />
          <Heading text="All Patients" />
        </div>
        <Button
          type="submit"
          variant="filled"
            onClick={handleNavigate}
          className=" black text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-gradient-to-r from-[#29A6E0] to-[#2E3494] "
          // loading={loading}
        >
          <Plus className="pr-1" />
          Add Patient
        </Button>
      </div>
      <div className="my-5">
        <DataTable
          columns={allPatientsColumn}
          customStyles={tableStyle}
          onRowClicked={handleRowClick}
          data={dataTable}
          highlightOnHover
          striped
          responsive
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </PageCont>
  );
};

export default AllPatients;
