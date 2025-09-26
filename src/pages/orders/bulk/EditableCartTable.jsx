import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { getAllProducts } from "../../../redux/features/books";
import { useDispatch } from "react-redux";
import { Select } from "antd";
import { Button } from "@material-tailwind/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const EditableCartTable = ({ items = [], onChange, setBooksData }) => {
  console.log("book data", items);
  const dispatch = useDispatch();

  const [allProducts, setAllProducts] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    const item = { ...updated[index] };

    if (field === "hsnCode") {
      item[field] = value; // string field
    } else {
      item[field] = parseFloat(value) || 0; // numeric fields
    }

    const price = parseFloat(item.price || 0);
    const qty = parseFloat(item.qty || 0);
    const d1 = parseFloat(item.discount1 || 0);
    const d2 = parseFloat(item.discount2 || 0);
    const d3 = parseFloat(item.discount3 || 0);

    let amount = price * qty;
    amount -= (amount * d1) / 100;
    amount -= (amount * d2) / 100;
    amount -= (amount * d3) / 100;

    item.amount = +amount.toFixed(2);
    updated[index] = item;
    onChange(updated);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => (
        <div>
          <div>{row?.product?.title || row.title}</div>
          {row?.product?.bookCode && (
            <div className="text-gray-500 text-sm">
              BookCode: {row?.product?.bookCode || row.bookCode}
            </div>
          )}
        </div>
      ),
      sortable: true,
      wrap: true,
      width: "200px",
    },

    {
      name: "Price",
      cell: (row, index) => (
        <input
          type="number"
          value={row.price}
          className="w-full border border-gray-300 rounded px-2 py-1"
          onChange={(e) => handleChange(index, "price", e.target.value)}
        />
      ),
    },
    {
      name: "Qty",
      width: "90px",
      cell: (row, index) => (
        <input
          type="number"
          value={row.qty}
          className="w-full border border-gray-300 rounded px-2 py-1"
          onChange={(e) => handleChange(index, "qty", e.target.value)}
        />
      ),
    },
    {
      name: "Discount 1 (%)",
      cell: (row, index) => (
        <input
          type="number"
          value={row.discount1 || ""}
          className="w-full border border-gray-300 rounded px-2 py-1"
          onChange={(e) => handleChange(index, "discount1", e.target.value)}
        />
      ),
    },
    {
      name: "Discount 2 (%)",
      cell: (row, index) => (
        <input
          type="number"
          value={row.discount2 || ""}
          className="w-full border border-gray-300 rounded px-2 py-1"
          onChange={(e) => handleChange(index, "discount2", e.target.value)}
        />
      ),
    },
    {
      name: "Discount 3 (%)",
      cell: (row, index) => (
        <input
          type="number"
          value={row.discount3 || ""}
          className="w-full border border-gray-300 rounded px-2 py-1"
          onChange={(e) => handleChange(index, "discount3", e.target.value)}
        />
      ),
    },
    {
      name: "HSN",
      cell: (row, index) => (
        <input
          type="text"
          value={row.hsnCode || ""}
          className="w-full border border-gray-300 rounded px-2 py-1"
          onChange={(e) => handleChange(index, "hsnCode", e.target.value)}
        />
      ),
    },

    {
      name: "Amount",
      selector: (row) => {
        const price = parseFloat(row.price || 0);
        const qty = parseFloat(row.qty || 0);
        const d1 = parseFloat(row.discount1 || 0);
        const d2 = parseFloat(row.discount2 || 0);
        const d3 = parseFloat(row.discount3 || 0);

        let amount = price * qty;
        amount -= (amount * d1) / 100;
        amount -= (amount * d2) / 100;
        amount -= (amount * d3) / 100;

    return `₹${Math.round(amount)}`;
      },
      right: true,
    },

    {
      name: "Actions",
      cell: (row, index) => (
        <MdDelete
          size={20}
          className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => {
            const updatedItems = [...items];
            updatedItems.splice(index, 1);
            onChange(updatedItems);
          }}
        />
      ),
      right: true,
    },
  ];

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

  const generateDropdownOptions = (bookData) => {
    const options = [];
    if (bookData.english) {
      options.push({
        label: `${bookData.english.title} - ${bookData.english.bookCode} - (English)`,
        value: bookData.english._id,
      });
    }
    if (bookData.hindi) {
      options.push({
        label: `${bookData.hindi.title} - ${bookData.hindi.bookCode} - (Hindi)`,
        value: bookData.hindi._id,
      });
    }
    return options;
  };

  const productOptions = useMemo(() => {
    return allProducts.flatMap(generateDropdownOptions);
  }, [allProducts]);

  const [selectedProducts, setSelectedProducts] = useState();

  const handleProductsChange = (value) => {
    setSelectedProducts(value);
  };

  const handleProductAdd = () => {
    // 🟡 Auto-fill price & qty when product is selected
    selectedProducts.map((item, index) => {
      let matchedProduct;
      if (item) {
        matchedProduct = allProducts.find(
          (prod) => prod?.english?._id === item || prod?.hindi?._id === item
        );

        const selected =
          matchedProduct?.english?._id === item
            ? matchedProduct?.english
            : matchedProduct?.hindi;

        const bookData = {
          price: Number(selected?.paperBackOriginalPrice),
          qty: 1,
          localizedId: selected._id,
          bookCode: selected.bookCode,
          language: matchedProduct?.english?._id === item ? "english" : "hindi",
          title: selected.title,
          product: matchedProduct?._id,
          hsnCode: "",
        };

        setBooksData((prev) => [...prev, bookData]);
      }
    });
  };

  return (
    <div className="mt-6">
      <div className="flex gap-x-3 justify-between mb-4">
        <Select
          mode="multiple"
          allowClear
          showSearch
          placeholder="Search to Select"
          value={selectedProducts}
          onChange={handleProductsChange}
          options={productOptions}
          className="w-[90%] h-max"
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
        />
        <Button
          className="flex items-center gap-1 capitalize py-2 px-4"
          onClick={handleProductAdd}
        >
          {" "}
          <IoAddCircleOutline size={17} /> Add
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={items}
        noHeader
        highlightOnHover
        dense
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

export default EditableCartTable;
