import { Button } from "@material-tailwind/react";
import { Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdSimCardDownload } from "react-icons/md";
import useCategoryName from "../hooks/useCategoryName";
import { format } from "date-fns-tz";
import { FiEye } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";

export const columns = [
  {
    name: "S.No.",
    width: "80px",
    wrap: true,
    selector: (row, index) => index + 1,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Client Name",
    width: "200px",
    wrap: true,
    selector: (row) => row.name || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Email",
    width: "300px",
    wrap: true,
    selector: (row) => row.email || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Address",
    width: "200px",
    wrap: true,
    selector: (row) => row.address || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Phone",
    width: "200px",
    wrap: true,
    selector: (row) => row.phone || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Profile",
    width: "200px",
    wrap: true,
    selector: (row) => row.profile || "N/A",
    style: {
      padding: "10px",
    },
  },
];

export const allPatientsColumn = [
  {
    name: "S.No.",
    width: "80px",
    selector: (row, index) => index + 1,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Patient ID",
    width: "150px",
    wrap: true,
    selector: (row, index) => row.patientId,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Date",
    width: "150px",
    selector: (row, index) => row.date,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Name",
    width: "180px",
    wrap: true,
    selector: (row, index) => row.name,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Email",
    width: "250px",
    wrap: true,
    selector: (row, index) => row.email,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Address",
    width: "300px",
    wrap: true,
    selector: (row, index) => row.address,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Phone",
    width: "150px",
    wrap: true,
    selector: (row, index) => row.phone,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Ward",
    width: "150px",
    wrap: true,
    selector: (row, index) => row.ward,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
];

export const allBooksColumns = (
  handleRowClick,

  getCategoryName,
  allCategory,
  handleBookSort
) => {
  return [
    {
      name: "S.No.",
      width: "80px",
      wrap: true,
      selector: (row, index) => index + 1,
    },
    {
      name: "Action",
      width: "80px",
      selector: (row) => (
        <div className="flex justify-center items-center gap-x-2">
          <Tooltip title="Edit Book">
            <Button
              className="primary-gradient rounded-md py-2 px-3 text-white"
              onClick={() => handleRowClick(row)}
            >
              <CiEdit size={18} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      name: "Book Name",
      width: "250px",
      wrap: true,
      selector: (row) => row.title || "N/A",
    },
    {
      name: "Category",
      selector: (row) =>
        row.categories?.length
          ? getCategoryName(row.categories, allCategory)
          : "N/A",
    },
    {
      name: "Stock",
      width: "130px",
      wrap: true,
      selector: (row) => row.stock || "N/A",
    },
    {
      name: "Medium",
      width: "120px",
      wrap: true,
      selector: (row) => row.medium || "N/A",
    },

    {
      name: "Paperback Price",
      width: "170px",
      wrap: true,
      selector: (row) => `₹${row.paperBackPrice}` || "N/A",
      // style: {
      //   padding: "10px",
      // },
    },
    {
      name: "E-Book Price",
      width: "150px",
      wrap: true,
      selector: (row) => `₹${row.eBookPrice}` || "N/A",
    },
    {
      name: "Order",
      width: "150px",
      selector: (row) => (
        <div className="">
          <input
            type="number"
            className="border-[1px] border-black p-1 w-full text-center max-w-[80px]"
            defaultValue={row.sort}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleBookSort(row.outerId, row.localisedId, e.target.value);
              }
            }}
          />
        </div>
      ),
    },

    // {
    //   name: "E-Book Discounted Price",
    //   width: "270px",
    //   wrap: true,
    //   selector: (row) => `₹${row.eBookDiscountedPrice}` || "N/A",
    //   style: {
    //     padding: "10px",
    //   },
    // },
  ];
};

export const allCategoryColumns = (handleRowClick, handleCategorySort) => {
  return [
    {
      name: "S.No.",
      width: "80px",
      wrap: true,
      selector: (row, index) => index + 1,
      style: {
        padding: "10px 10px 10px 20px",
      },
    },
    {
      name: "Action",
      width: "100px",
      selector: (row) => (
        <div className="flex justify-center items-center ">
          <Tooltip title="Edit Category">
            <Button
              className="primary-gradient rounded-md py-2 px-3 text-white"
              onClick={() => handleRowClick(row)}
            >
              <CiEdit size={18} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      name: "Parent Category Name",
      selector: (row) => row.name,
      style: {
        padding: "10px 10px 10px 20px",
      },
      width: "300px",
    },
    {
      name: "Description",
      selector: (row) => row.description1,
      style: {
        padding: "10px 10px 10px 20px",
      },
      width: "300px",
    },
    {
      name: "Order",
      width: "150px",
      selector: (row) => (
        <div className="">
          <input
            type="number"
            className="border-[1px] border-black p-1 w-full text-center max-w-[80px]"
            defaultValue={row.sort}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCategorySort(row._id, e.target.value);
              }
            }}
          />
        </div>
      ),
    },

    // {
    //   name: 'Parent Category',
    //   selector: row => row.parentId || 'None', // Display parent ID or 'None' if no parent
    //   sortable: true,
    // },
  ];
};

export const allOrdersColumn = (handleInvoiceClick, handleRowClick) => {
  return [
    {
      name: "S.No.",
      width: "80px",
      wrap: true,
      selector: (row, index) => index + 1,
    },
    {
      name: "OrderId",
      width: "150px",
      wrap: true,
      selector: (row) => row.orderId || "N/A",
    },

    {
      name: "Order Date",
      width: "120px",
      wrap: true,
      selector: (row) =>
        row.createdAt ? format(new Date(row.createdAt), "dd MMM yyyy") : "N/A",
      // style: {
      //   padding: "10px",
      // },
    },
    {
      name: "Client ",
      width: "200px",
      wrap: true,
      selector: (row) =>
        row.shippingAddress.firstName + " " + row.shippingAddress.lastName ||
        "N/A",
      style: {
        padding: "10px",
      },
    },
    {
      name: "State",
      width: "150px",
      wrap: true,
      selector: (row) => row.shippingAddress.state || "N/A",
    },
    {
      name: "Order Total",
      width: "150px",
      wrap: true,
      selector: (row) => `₹${row.totalAmount}` || "N/A",
    },
    {
      name: "Order Status",
      width: "150px",
      wrap: true,
      selector: (row) => row.orderStatus || "N/A",
    },
    // {
    //   name: "Payment Mode",
    //   width: "150px",
    //   wrap: true,
    //   selector: (row) => row.paymentMode || "N/A",
    // },
    // {
    //   name: "Payment Status",
    //   width: "200px",
    //   wrap: true,
    //   selector: (row) => row.paymentStatus || "N/A",
    // },

    // {
    //   name: "Total Items",
    //   width: "150px",
    //   wrap: true,
    //   selector: (row) => row.items.length || "N/A",
    // },

    {
      name: "Action",
      width: "300px",
      wrap: true,
      cell: (row) => (
        <div className="flex justify-start items-center">
          <button
            className=" text-white px-3 py-2 rounded primary-gradient transition m-3 w-[80px] flex items-center gap-2"
            onClick={() => handleRowClick(row)}
          >
            <IoEye size={17} /> View
          </button>
          <button
            className=" text-white px-3 py-2 rounded primary-gradient transition m-3 w-[100px] flex items-center gap-2"
            onClick={() => handleInvoiceClick(row)}
          >
            <IoIosDocument size={17} /> Invoice
          </button>
        </div>
      ),
    },
  ];
};

export const allMembers = [
  {
    name: "S.No.",
    width: "80px",
    wrap: true,
    selector: (row, index) => index + 1,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  // {
  //   name: "Id",
  //   width: "130px",
  //   wrap: true,
  //   selector: (row) => row.id || "N/A",
  //   style: {
  //     padding: "10px",
  //   },
  // },
  {
    name: "Name",
    width: "180px",
    wrap: true,
    selector: (row) => row.name || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Role",
    width: "150px",
    wrap: true,
    selector: (row) => row.profile || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Email",
    width: "120px",
    wrap: true,
    selector: (row) => row.email || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Phone",
    width: "150px",
    wrap: true,
    selector: (row) => row.mobile || "N/A",
    style: {
      padding: "10px",
    },
  },
  // {
  //   name: "Status",
  //   width: "150px",
  //   wrap: true,
  //   selector: (row) => `₹${row.Status}` || "N/A",
  //   style: {
  //     padding: "10px",
  //   },
  // },
  // {
  //   name: "JoiningDate",
  //   width: "150px",
  //   wrap: true,
  //   selector: (row) => `₹${row.joiningDate}` || "N/A",
  //   style: {
  //     padding: "10px",
  //   },
  // },
];

export const allCustomer = [
  {
    name: "S.No.",
    width: "80px",
    wrap: true,
    selector: (row, index) => index + 1,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "CustomerName",
    width: "130px",
    wrap: true,
    selector: (row) => row.customerName || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Email",
    width: "180px",
    wrap: true,
    selector: (row) => row.email || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Phone",
    width: "150px",
    wrap: true,
    selector: (row) => row.phone || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "MembershipStatus",
    width: "150px",
    wrap: true,
    selector: (row) => `₹${row.membershipStatus}` || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Address",
    width: "150px",
    wrap: true,
    selector: (row) => `₹${row.address}` || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "PurchaseAmount",
    width: "150px",
    wrap: true,
    selector: (row) => `₹${row.purchaseAmount}` || "N/A",
    style: {
      padding: "10px",
    },
  },
];

export const allPromotions = (handleRowClick) => {
  return [
    {
      name: "Action",
      width: "120px",
      cell: (row) => (
        <button
          onClick={() => handleRowClick(row)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          View
        </button>
      ),

      button: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
    },
    {
      name: "State",
      selector: (row) => row.state,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Institution",
      selector: (row) => row.institutionName,
    },
    {
      name: "Approved",
      selector: (row) => (row.approved ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
      sortable: true,
    },
    // {
    //   name: "Payment QR",
    //   cell: (row) =>
    //     row.paymentPicture ? (
    //       <img
    //         src={row.paymentPicture}
    //         alt="QR"
    //         className="w-10 h-10 object-cover rounded"
    //       />
    //     ) : (
    //       "N/A"
    //     ),
    // },
  ];
};

export const affiliateOrderColumns = [
  // {
  //   name: "Order ID",
  //   selector: (row) => row.orderId,
  //   sortable: true,
  // },
  {
    name: "User",
    selector: (row) => row.user,
    sortable: true,
  },
  {
    name: "Total Amount",
    selector: (row) => `₹${row.totalAmount}`,
    sortable: true,
    right: true,
  },
  {
    name: "Order Status",
    selector: (row) => row.orderStatus,
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded text-white text-xs font-medium ${
          row.orderStatus === "Canceled"
            ? "bg-red-500"
            : row.orderStatus === "Shipped"
            ? "bg-green-500"
            : "bg-yellow-500 !text-green-500"
        }`}
      >
        {row.orderStatus}
      </span>
    ),
  },
  {
    name: "Created At",
    selector: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

export const affiliatePaymentColumns = [
  // {
  //   name: "Affiliate User ID",
  //   selector: (row) => row.affiliateUser,
  //   sortable: true,
  //   wrap: true,
  // },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
    // right: true,
  },
  {
    name: "Payment Mode",
    selector: (row) => row.paymentMode,
    sortable: true,
  },
  {
    name: "Reference Number",
    selector: (row) => row.referenceNumber,
    sortable: true,
  },
  {
    name: "Comment",
    selector: (row) => row.comment,
    wrap: true,
  },
  {
    name: "Created At",
    selector: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

export const allSeller = [
  {
    name: "S.No.",
    width: "250px",
    wrap: true,
    selector: (row, index) => index + 1,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Rank",
    width: "230px",
    wrap: true,
    selector: (row) => row.rank || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Product",
    width: "210px",
    wrap: true,
    selector: (row) => row.product || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Revenue",
    width: "200px",
    wrap: true,
    selector: (row) => row.revenue || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "StockLeft",
    width: "200px",
    wrap: true,
    selector: (row) => row.stockLeft || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Image",
    width: "200px",
    wrap: true,
    selector: (row) => row.image || "N/A",
    style: {
      padding: "10px",
    },
  },
];
export const allReviews = [
  {
    name: "S.No.",
    width: "250px",
    wrap: true,
    selector: (row, index) => index + 1,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Name",
    width: "230px",
    wrap: true,
    selector: (row) => row.Name || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Rating",
    width: "220px",
    wrap: true,
    selector: (row) => row.Rating || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Description",
    width: "230px",
    wrap: true,
    selector: (row) => row.Description || "N/A",
    style: {
      padding: "10px",
    },
  },
];

export const abandonedColumns = (handleRowClick) => {
  return [
    {
      name: "S.No.",
      width: "80px",
      wrap: true,
      selector: (row, index) => index + 1,
      style: {
        padding: "10px 10px 10px 20px",
      },
    },
    {
      name: "Action",
      width: "200px",
      wrap: true,
      cell: (row) => (
        <button
          onClick={() => handleRowClick(row)}
          className=" text-white px-3 py-1 rounded primary-gradient transition"
        >
          View Cart Products
        </button>
      ),
      style: {
        padding: "10px",
      },
    },

    {
      name: "Customer Name",
      width: "200px",
      wrap: true,
      selector: (row) => row.name || "N/A",
      style: {
        padding: "10px",
      },
    },
    {
      name: "Registered At",
      width: "200px",
      wrap: true,
      selector: (row, index) =>
        format(new Date(row.createdAt), "dd MMM yyyy, hh:mm a"),
      style: {
        padding: "10px 10px 10px 20px",
      },
    },
    {
      name: "Email",
      width: "300px",
      wrap: true,
      selector: (row) => row.email || "N/A",
      style: {
        padding: "10px",
      },
    },
    {
      name: "Mobile",
      width: "200px",
      wrap: true,
      selector: (row) => row.mobile || "N/A",
      style: {
        padding: "10px",
      },
    },
    {
      name: "Remark",
      width: "200px",
      wrap: true,
      selector: (row) => row.abondonedRemark || "N/A",
      style: {
        padding: "10px",
      },
    },
  ];
};

export const couponColumns = [
  {
    name: "S.No.",
    width: "80px",
    wrap: true,
    selector: (row, index) => index + 1,
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: "Title",
    width: "200px",
    wrap: true,
    selector: (row) => row.title || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Discount",
    width: "190px",
    wrap: true,
    selector: (row) => (row.discount ? `${row.discount}%` : "N/A"),
    style: {
      padding: "10px",
    },
  },

  {
    name: "Coupon Code",
    width: "180px",
    wrap: true,
    selector: (row) => row.couponCode || "N/A",
    style: {
      padding: "10px",
    },
  },

  {
    name: "Total Uses",
    width: "180px",
    wrap: true,
    selector: (row) => row.totalUses || "N/A",
    style: {
      padding: "10px",
    },
  },

  {
    name: "Expiry Date",
    width: "180px",
    wrap: true,
    selector: (row) => row.expiryDate || "N/A",
    style: {
      padding: "10px",
    },
  },
];
