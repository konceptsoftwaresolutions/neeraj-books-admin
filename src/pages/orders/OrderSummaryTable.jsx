import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useProductOptions from "../../hooks/useProductOptions";
import { Select } from "antd";
import { Button } from "@material-tailwind/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { getAllProducts } from "../../redux/features/books";
import { useDispatch } from "react-redux";

const OrderSummaryTable = ({ orderData = [], onUpdate }) => {
  const [selectedProducts, setSelectedProducts] = useState();
  const [allProducts, setAllProducts] = useState();
  const dispatch = useDispatch();

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

  const handleInputChange = (index, field, value) => {
    const updated = [...orderData];
    const product = { ...updated[index] };

    if (field === "price") {
      product.paperBackOriginalPrice = parseFloat(value) || 0;
    } else if (field === "quantity") {
      product.quantity = parseInt(value) || 0;
    }

    updated[index] = product;
    onUpdate(updated);
  };

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
              : row?.isEbookAlsoSelected
              ? ""
              : ""}
          </p>
          <p className="text-sm capitalize">Medium: {row.language}</p>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Price",
      cell: (row, index) => {
        const isEbookOnly = row.onlyEbookSelected;
        const isEbookRow = row.isEbookAlsoSelected;

        const price =
          isEbookOnly || isEbookRow
            ? row.ebookPrice
            : row?.productId?.[row.language]?.paperBackOriginalPrice;

        return (
          <input
            type="number"
            className="w-20 border border-gray-300 rounded px-2 py-1 text-right"
            value={price}
            min={1}
            onChange={(e) => handleInputChange(index, "price", e.target.value)}
          />
        );
      },
      right: true,
    },
    {
      name: "Qty",
      cell: (row, index) => {
        const quantity = row.onlyEbookSelected ? 1 : row.quantity || 1;
        return row.onlyEbookSelected || row.isEbookAlsoSelected ? (
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
        const isEbookOnly = row.onlyEbookSelected;
        const isEbookRow = row.isEbookAlsoSelected;

        const price =
          isEbookOnly || isEbookRow
            ? parseFloat(row.ebookPrice || 0)
            : parseFloat(
                row?.productId?.[row.language]?.paperBackOriginalPrice || 0
              );

        const qty =
          isEbookOnly || isEbookRow ? 1 : parseFloat(row?.quantity || 0);

        return `₹${(price * qty).toFixed(2)}`;
      },
      right: true,
    },
  ];

  // Flatten ebook+physical rows into separate entries
  const formattedData = orderData.flatMap((item) => {
    const medium = item.language;
    const title = item?.productId?.[medium]?.title;

    const physicalBookRow =
      item.isEbookAlsoSelected === false && item.onlyEbookSelected === false
        ? [item]
        : item.isEbookAlsoSelected
        ? [
            {
              ...item,
              isEbookAlsoSelected: false,
              isEbookOnlyRow: false,
            },
            {
              ...item,
              onlyEbookSelected: true,
              isEbookOnlyRow: true,
              isEbookAlsoSelected: false,
            },
          ]
        : item.onlyEbookSelected
        ? [{ ...item, isEbookOnlyRow: true }]
        : [];

    return physicalBookRow;
  });

  const productOptions = useProductOptions();

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
          title: selected.title,
          product: {
            id: matchedProduct._id,
          },
        };
        console.log(bookData);
        
        // setBooksData((prev) => [...prev, bookData]);
      }
    });
  };

  const handleProductsChange = (value) => {
    setSelectedProducts(value);
    console.log("Selected:", value);
  };

  return (
    <>
      <div className="flex justify-between">
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
          className="flex items-center gap-1 capitalize"
          onClick={handleProductAdd}
        >
          {" "}
          <IoAddCircleOutline size={17} /> Add
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={formattedData}
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
    </>
  );
};

export default OrderSummaryTable;
