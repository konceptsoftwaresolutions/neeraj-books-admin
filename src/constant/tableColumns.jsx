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
      padding: "10px"
    }
  },
  {
    name: "Address",
    width: "200px",
    wrap: true,
    selector: (row) => row.address || "N/A",
    style: {
      padding: "10px"
    }
  },
  {
    name: "Phone",
    width: "200px",
    wrap: true,
    selector: (row) => row.phone || "N/A",
    style: {
      padding: "10px"
    }
  },
  {
    name: "Profile",
    width: "200px",
    wrap: true,
    selector: (row) => row.profile || "N/A",
    style: {
      padding: "10px"
    }
  }
];

export const allPatientsColumn = [
  {
    name: 'S.No.',
    width: "80px",
    selector: ((row, index) => index + 1),
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: 'Patient ID',
    width: "150px",
    wrap: true,
    selector: ((row, index) => row.patientId),
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: 'Date',
    width: "150px",
    selector: ((row, index) => row.date),
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: 'Name',
    width: "180px",
    wrap: true,
    selector: ((row, index) => row.name),
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: 'Email',
    width: "250px",
    wrap: true,
    selector: ((row, index) => row.email),
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: 'Address',
    width: "300px",
    wrap: true,
    selector: ((row, index) => row.address),
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: 'Phone',
    width: "150px",
    wrap: true,
    selector: ((row, index) => row.phone),
    style: {
      padding: "10px 10px 10px 20px",
    },
  },
  {
    name: 'Ward',
    width: "150px",
    wrap: true,
    selector: ((row, index) => row.ward),
    style: {
      padding: "10px 10px 10px 20px",
    },
  }
]

export const allBooksColumns = [
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
    name: "Book Name",
    width: "250px",
    wrap: true,
    selector: (row) => row.bookName || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Author",
    width: "200px",
    wrap: true,
    selector: (row) => row.author || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Medium",
    width: "150px",
    wrap: true,
    selector: (row) => row.medium || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Edition",
    width: "120px",
    wrap: true,
    selector: (row) => row.edition || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "E-Book Price",
    width: "150px",
    wrap: true,
    selector: (row) => `₹${row.ebookPrice}` || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Paperback Price",
    width: "150px",
    wrap: true,
    selector: (row) => `₹${row.paperBookPrice}` || "N/A",
    style: {
      padding: "10px",
    },
  },
];

export const allOrders = [
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
    name: "OrderId",
    width: "170px",
    wrap: true,
    selector: (row) => row.orderId || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "CustomerName",
    width: "200px",
    wrap: true,
    selector: (row) => row.customerName || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "OrderDate",
    width: "150px",
    wrap: true,
    selector: (row) => row.orderDate || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Status",
    width: "120px",
    wrap: true,
    selector: (row) => row.status || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "TotalAmount",
    width: "150px",
    wrap: true,
    selector: (row) => `₹${row.totalAmount}` || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Items",
    width: "150px",
    wrap: true,
    selector: (row) => `₹${row.items}` || "N/A",
    style: {
      padding: "10px",
    },
  },
];

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
  {
    name: "Id",
    width: "130px",
    wrap: true,
    selector: (row) => row.id || "N/A",
    style: {
      padding: "10px",
    },
  },
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
    selector: (row) => row.role || "N/A",
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
    selector: (row) => `₹${row.phone}` || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Status",
    width: "150px",
    wrap: true,
    selector: (row) => `₹${row.Status}` || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "JoiningDate",
    width: "150px",
    wrap: true,
    selector: (row) => `₹${row.joiningDate}` || "N/A",
    style: {
      padding: "10px",
    },
  },
]

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
]

export const allPromotions = [
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
    name: "Discount Code",
    width: "230px",
    wrap: true,
    selector: (row) => row.discount || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Active",
    width: "210px",
    wrap: true,
    selector: (row) => row.active || "N/A",
    style: {
      padding: "10px",
    },
  },
  {
    name: "Status",
    width: "200px",
    wrap: true,
    selector: (row) => row.status || "N/A",
    style: {
      padding: "10px",
    },
  },

]
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

]
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
]
