import React from "react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { allCustomer } from "../../constant/tableColumns";
import usePath from "../../hooks/usePath";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";

function Customer(props) {
  const navigate = useNavigate();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);

  const customersData = [
    {
      customerName: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main Street, Springfield, USA",
      purchaseAmount: "1200",
      membershipStatus: "Gold",
    },
    {
      customerName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Elm Street, Metropolis, USA",
      purchaseAmount: "800",
      membershipStatus: "Silver",
    },
    {
      customerName: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "456-789-1234",
      address: "789 Oak Avenue, Gotham City, USA",
      purchaseAmount: "1500",
      membershipStatus: "Platinum",
    },
    {
      customerName: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "321-654-9870",
      address: "321 Maple Lane, Star City, USA",
      purchaseAmount: "600",
      membershipStatus: "Silver",
    },
    {
      customerName: "Chris Wilson",
      email: "chris.wilson@example.com",
      phone: "654-321-9876",
      address: "654 Pine Road, Central City, USA",
      purchaseAmount: "1000",
      membershipStatus: "Gold",
    },
  ];

  const handleRowClick = (data) => {
    navigate(`/${role}/editcustomer`);
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
      </div>{" "}
      <div className="mt-4">
        <DataTable
          data={customersData}
          columns={allCustomer}
          customStyles={tableStyle}
          onRowClicked={handleRowClick}
        />
      </div>
    </PageCont>
  );
}

export default Customer;
