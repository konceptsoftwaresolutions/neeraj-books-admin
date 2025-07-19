import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Select } from "antd";
import { Button } from "@material-tailwind/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/features/books";
import { MdDelete } from "react-icons/md";

const OrderSummaryTable = ({ orderData, onUpdate }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const dispatch = useDispatch();

  // Fetch all product data
  const fetchAllProductsData = useCallback(() => {
    dispatch(
      getAllProducts((success, data) => {
        if (success) {
          setAllProducts(data);
        }
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchAllProductsData();
  }, [fetchAllProductsData]);

  // Dropdown options
  const generateDropdownOptions = (bookData) => {
    const options = [];
    if (bookData.english) {
      options.push({
        label: `${bookData.english.title} - ${bookData.english.bookCode}`,
        value: bookData.english._id,
        language: "english",
        book: bookData,
      });
    }
    if (bookData.hindi) {
      options.push({
        label: `${bookData.hindi.title} - ${bookData.hindi.bookCode}`,
        value: bookData.hindi._id,
        language: "hindi",
        book: bookData,
      });
    }
    return options;
  };

  const productOptions = useMemo(() => {
    return allProducts.flatMap(generateDropdownOptions);
  }, [allProducts]);

  // Format incoming orderData to rows
  useEffect(() => {
    const transformed = orderData?.flatMap((item) => {
      // console.log(item);
      if (item.isEbookAlsoSelected) {
        return [
          {
            ...item,
            isEbookAlsoSelected: true,
            onlyEbookSelected: false,
            isEbookOnlyRow: false,
          },
          {
            ...item,
            // onlyEbookSelected: true,
            isEbookOnlyRow: true,
            // isEbookAlsoSelected: false,
          },
        ];
      }

      if (item.onlyEbookSelected) {
        return [{ ...item, isEbookOnlyRow: true }];
      }

      return [{ ...item, isEbookOnlyRow: false }];
    });

    setFormattedData(transformed);
  }, [orderData]);

  console.log(formattedData);

  // Update editable fields
  const handleInputChange = (index, field, value) => {
    const updatedData = [...formattedData];
    updatedData[index][field] = value;
    setFormattedData(updatedData);

    if (onUpdate) {
      const mergedData = mergeEbooksWithPaperbacks(updatedData);
      onUpdate(mergedData);
    }
  };

  // Merge physical+ebook rows back to single objects
  const mergeEbooksWithPaperbacks = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const id = item._id;
      if (!grouped[id]) {
        grouped[id] = { ...item };
      }

      if (item.isEbookOnlyRow) {
        grouped[id].onlyEbookSelected = true;
      } else {
        grouped[id] = { ...grouped[id], ...item };
      }
    });

    return Object.values(grouped);
  };

  // Add selected products
  const handleProductAdd = () => {
    const newProducts = selectedProducts.map((selectedId) => {
      const match = productOptions.find((opt) => opt.value === selectedId);
      if (!match) return null;

      const book = match.book;
      const lang = match.language;
      const bookInfo = book[lang];

      return {
        // _id: selectedId + "-" + Date.now(), // Or generate UUID
        productId: {
          _id: book._id,
          [lang]: {
            title: bookInfo?.title || "",
            paperBackOriginalPrice: bookInfo?.paperBackOriginalPrice || "0",
            eBookOriginalPrice: bookInfo?.eBookOriginalPrice || "0",
            paperBackDiscountedPrice: bookInfo?.paperBackDiscountedPrice || "0",
            slug: bookInfo?.slug || "",
            weight: bookInfo?.weight || "0",
          },
        },
        language: lang,
        quantity: 1,
        hsn: "4901",
        isEbookAlsoSelected: false,
        onlyEbookSelected: false,
      };
    });

    const filtered = newProducts.filter(Boolean);
    const merged = [...orderData, ...filtered];

    onUpdate(merged);
    setSelectedProducts([]);
  };

  const handleProductsChange = (value) => {
    setSelectedProducts(value);
  };

  const handleDeleteRow = (indexToDelete) => {
    const updatedData = [...formattedData];
    const rowToDelete = updatedData[indexToDelete];

    // Remove both physical and ebook parts if needed
    let filtered;

    if (rowToDelete.isEbookOnlyRow) {
      // Just remove this ebook row
      filtered = updatedData.filter((_, idx) => idx !== indexToDelete);
    } else {
      // Remove both physical and its ebook row (if exists)
      const targetId = rowToDelete._id;
      filtered = updatedData.filter((item) => item._id !== targetId);
    }

    setFormattedData(filtered);

    if (onUpdate) {
      const mergedData = mergeEbooksWithPaperbacks(filtered);
      onUpdate(mergedData);
    }
  };

  console.log(formattedData);
  const columns = [
    {
      name: "Book Details",
      selector: (row) => row?.productId?.[row.language]?.title,
      cell: (row) => (
        <div>
          <p className="font-medium">
            {row?.productId?.[row.language]?.title}
            {row?.onlyEbookSelected
              ? " - (Ebook Only)"
              : row?.isEbookOnlyRow
              ? " - (Ebook)"
              : ""}
          </p>
          <p className="text-sm capitalize">Medium: {row.language}</p>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Price",
      cell: (row) => {
        const isEbookOnlyRow = row.onlyEbookSelected || row.isEbookOnlyRow;
        const price = isEbookOnlyRow
          ? row.ebookPrice
          : row?.productId?.[row.language]?.paperBackOriginalPrice;

        return <span className="text-right block w-full">₹{price}</span>;
      },
      right: true,
    },
    {
      name: "Qty",
      cell: (row, index) => {
        const isEbookOnlyRow = row.onlyEbookSelected || row.isEbookOnlyRow;
        const quantity = isEbookOnlyRow ? 1 : row.quantity || 1;

        return isEbookOnlyRow ? (
          <span className="text-right block w-full">1</span>
        ) : (
          <input
            type="number"
            className="w-16 border border-gray-300 rounded px-2 py-1 text-right"
            value={quantity}
            onChange={(e) =>
              handleInputChange(index, "quantity", e.target.value)
            }
          />
        );
      },
      right: true,
    },
    {
      name: "Total",
      selector: (row) => {
        const isEbookOnlyRow = row.onlyEbookSelected || row.isEbookOnlyRow;
        const price = isEbookOnlyRow
          ? parseFloat(row.ebookPrice || 0)
          : parseFloat(
              row?.productId?.[row.language]?.paperBackOriginalPrice || 0
            );
        const qty = isEbookOnlyRow ? 1 : parseFloat(row?.quantity || 1);

        return `₹${(price * qty).toFixed(2)}`;
      },
      right: true,
    },
    {
      name: "Action",
      cell: (row, index) => {
        if (row.onlyEbookSelected === false) {
          return (
            <button
              onClick={() => handleDeleteRow(index)}
              className="text-red-600 hover:underline"
            >
              <MdDelete size={20} />
            </button>
          );
        } else {
          return <p>-</p>;
        }
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="mt-6">
      <div className="flex justify-between mb-4">
        <Select
          mode="multiple"
          allowClear
          showSearch
          placeholder="Search to Select"
          value={selectedProducts}
          onChange={handleProductsChange}
          options={productOptions}
          className="w-[600px] h-max"
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
        />
        <Button
          className="flex items-center gap-1 capitalize py-2 px-4"
          onClick={handleProductAdd}
        >
          <IoAddCircleOutline size={17} /> Add
        </Button>
      </div>

      <DataTable
        // title="Order Summary"
        columns={columns}
        data={formattedData}
        dense
        highlightOnHover
        responsive
        persistTableHead
        customStyles={{
          rows: {
            style: {
              minHeight: "56px",
            },
          },
          headCells: {
            style: {
              fontWeight: "600",
              fontSize: "14px",
              backgroundColor: "#f3f4f6",
            },
          },
        }}
      />
    </div>
  );
};

export default OrderSummaryTable;
