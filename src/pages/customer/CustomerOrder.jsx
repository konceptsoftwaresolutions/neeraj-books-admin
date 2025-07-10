import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";

// Dummy Data
const customerOrdersData = [
  {
    id: 1,
    bookCode: "BK101",
    medium: "English",
    category: "Science",
    paperbackPrice: "₹250",
    ebookPrice: "₹150",
  },
  {
    id: 2,
    bookCode: "BK102",
    medium: "Hindi",
    category: "Maths",
    paperbackPrice: "₹200",
    ebookPrice: "₹120",
  },
  {
    id: 3,
    bookCode: "BK103",
    medium: "English",
    category: "History",
    paperbackPrice: "₹180",
    ebookPrice: "₹100",
  },
  {
    id: 4,
    bookCode: "BK104",
    medium: "Hindi",
    category: "Geography",
    paperbackPrice: "₹220",
    ebookPrice: "₹140",
  },
  {
    id: 5,
    bookCode: "BK105",
    medium: "English",
    category: "Literature",
    paperbackPrice: "₹300",
    ebookPrice: "₹180",
  },
];

// Table Columns
const customerOrderColumns = [
  {
    name: "S.No.",
    selector: (row, index) => index + 1,
    width: "70px",
  },
  {
    name: "Book Code",
    selector: (row) => row.bookCode,
    sortable: true,
  },
  {
    name: "Medium",
    selector: (row) => row.medium,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category,
    sortable: true,
  },
  {
    name: "Paperback Price",
    selector: (row) => row.paperbackPrice,
  },
  {
    name: "E-Book Price",
    selector: (row) => row.ebookPrice,
  },
];

const CustomerOrder = () => {
  return (
    <div>
      <PageCont>
        <div className="mt-4">
          <DataTable
            data={customerOrdersData}
            columns={customerOrderColumns}
            pagination
            highlightOnHover
            customStyles={tableStyle}
          />
        </div>
      </PageCont>
    </div>
  );
};

export default CustomerOrder;
