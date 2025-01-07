import React, { useEffect } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../../constant/tableColumns";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import usePath from "../../hooks/usePath";
import { getAllOrders } from "../../redux/features/orders";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = usePath();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { role } = useSelector((state) => state.auth);

  const Orders = [
    {
      orderId: "ORD001",
      customerName: "John Doe",
      orderDate: "2024-12-25",
      status: "Pending",
      totalAmount: "129.99",
      items: [
        { name: "Product A", quantity: 2, price: 50.0 },
        { name: "Product B", quantity: 1, price: 29.99 },
      ],
    },
    {
      orderId: "ORD002",
      customerName: "Jane Smith",
      orderDate: "2024-12-24",
      status: "Shipped",
      totalAmount: "79.50",
      items: [
        { name: "Product C", quantity: 1, price: 40.0 },
        { name: "Product D", quantity: 2, price: 19.75 },
      ],
    },
    {
      orderId: "ORD003",
      customerName: "Alice Johnson",
      orderDate: "2024-12-23",
      status: "Delivered",
      totalAmount: "200.00",
      items: [{ name: "Product E", quantity: 4, price: 50.0 }],
    },
    {
      orderId: "ORD004",
      customerName: "Bob Brown",
      orderDate: "2024-12-22",
      status: "Cancelled",
      totalAmount: "45.00",
      items: [{ name: "Product F", quantity: 3, price: 15.0 }],
    },
  ];

  const handleRowClick = (data) => {
    navigate(`/${role}/editOrders`);
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="All Orders" />
        </div>
        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
          onClick={() => path.changeEndPoint("addOrders")}
        >
          <Plus className="pr-1" />
          Add Orders
        </Button>
      </div>{" "}
      <div className="mt-4">
        <DataTable
          data={Orders}
          columns={allOrders}
          customStyles={tableStyle}
          onRowClicked={handleRowClick}
        />
      </div>
    </PageCont>
  );
};

export default Orders;
