import React, { useEffect } from "react";
import PageCont from "../../components/PageCont";
import { ChevronsLeft } from "lucide-react";
import Heading from "../../components/Heading";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { abandonedColumns, columns } from "../../constant/tableColumns";
import { tableStyle } from "../../constant/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/features/allUsers";

const dataTable = [
  {
    id: 1,
    customerName: "John Doe",
    email: "john.doe@example.com",
    cartItems: "Laptop, Wireless Mouse",
    totalValue: "$1,200",
    abandonedDate: "2025-03-15",
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    email: "jane.smith@example.com",
    cartItems: "Smartphone, Earbuds",
    totalValue: "$850",
    abandonedDate: "2025-03-14",
    status: "Follow-up",
  },
  {
    id: 3,
    customerName: "Alice Johnson",
    email: "alice.johnson@example.com",
    cartItems: "Tablet, Stylus Pen",
    totalValue: "$600",
    abandonedDate: "2025-03-13",
    status: "Recovered",
  },
  {
    id: 4,
    customerName: "Bob Brown",
    email: "bob.brown@example.com",
    cartItems: "Gaming Chair, Mechanical Keyboard",
    totalValue: "$450",
    abandonedDate: "2025-03-12",
    status: "Pending",
  },
  {
    id: 5,
    customerName: "Charlie Davis",
    email: "charlie.davis@example.com",
    cartItems: "Monitor, HDMI Cable",
    totalValue: "$320",
    abandonedDate: "2025-03-11",
    status: "Follow-up",
  },
];

const AbandonedCart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { allUsers } = useSelector((state) => state.allUsers);

  const handleRowClick = (row) => {
    console.log(row);
    navigate(`/${role}/abandoned-detail`, { state: { userData: row } });
  };
  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="Abandoned Carts" />
        </div>
      </div>
      <div className="my-5">
        <DataTable
          columns={abandonedColumns(handleRowClick)}
          data={allUsers ? allUsers : []}
          customStyles={tableStyle}
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

export default AbandonedCart;
