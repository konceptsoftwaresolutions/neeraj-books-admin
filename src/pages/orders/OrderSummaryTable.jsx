import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Select, Tooltip } from "antd";
import { Button } from "@material-tailwind/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getAllEbooks, getAllProducts } from "../../redux/features/books";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const OrderSummaryTable = ({ orderData, onUpdate }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [allEbooksData, setAllEbooksData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedEbooks, setSelectedEbooks] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [formattedDataCopy, setFormattedDataCopy] = useState();
  const dispatch = useDispatch();

  console.log(orderData);

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

  // Fetch all ebooks data
  const fetchAllEbooksData = useCallback(() => {
    dispatch(
      getAllEbooks((success, data) => {
        if (success) {
          setAllEbooksData(data);
        }
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchAllProductsData();
    fetchAllEbooksData();
  }, [fetchAllProductsData, fetchAllEbooksData]);

  // Dropdown options
  const generateDropdownOptions = (bookData) => {
    const options = [];
    if (bookData.english) {
      options.push({
        label: `${bookData.english.title} - ${bookData.english.bookCode} - (English)`,
        value: bookData.english._id,
        language: "english",
        book: bookData,
      });
    }
    if (bookData.hindi) {
      options.push({
        label: `${bookData.hindi.title} - ${bookData.hindi.bookCode} - (Hindi)`,
        value: bookData.hindi._id,
        language: "hindi",
        book: bookData,
      });
    }
    return options;
  };

  const generateEbookOptions = (bookData) => {
    const options = [];
    if (bookData.english && bookData?.english?.ebook?.length > 0) {
      options.push({
        label: `${bookData.english.title} - ${bookData.english.bookCode} - (English)`,
        value: bookData.english._id,
        language: "english",
        book: bookData,
      });
    }
    if (bookData.hindi && bookData?.hindi?.ebook?.length > 0) {
      options.push({
        label: `${bookData.hindi.title} - ${bookData.hindi.bookCode} - (Hindi)`,
        value: bookData.hindi._id,
        language: "hindi",
        book: bookData,
      });
    }
    return options;
  };

  const productOptions = useMemo(() => {
    return allProducts?.flatMap(generateDropdownOptions);
  }, [allProducts]);

  const ebookOptions = useMemo(() => {
    return allEbooksData?.flatMap(generateEbookOptions);
  }, [allEbooksData]);

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
  const handleProductAdd = (type) => {
    let productsSelected;
    if (type === "combo") {
      productsSelected = selectedCombo;
    } else if (type === "ebook") {
      productsSelected = selectedEbooks;
    } else {
      productsSelected = selectedProducts;
    }
    const newProducts = productsSelected.map((selectedId) => {
      const match = productOptions.find((opt) => opt.value === selectedId);
      if (!match) return null;

      const book = match.book;
      const lang = match.language;
      const bookInfo = book[lang];
      // console.log(bookInfo);

      const ebookAmount = () => {
        if (type === "paperback" || type === "ebook") {
          return bookInfo?.ebookDiscountedPrice || bookInfo?.eBookOriginalPrice;
        } else if (type === "combo") {
          return bookInfo?.addEbookPrice;
        } else {
          return null;
        }
      };
      const ebookPrice = ebookAmount();
      return {
        // _id: selectedId + "-" + Date.now(), // Or generate UUID
        productId: {
          _id: book._id,
          [lang]: {
            title: bookInfo?.title || "",
            paperBackOriginalPrice: bookInfo?.paperBackOriginalPrice || "0",
            eBookOriginalPrice: ebookPrice,
            paperBackDiscountedPrice: bookInfo?.paperBackDiscountedPrice || "0",
            slug: bookInfo?.slug || "",
            weight: bookInfo?.weight || "0",
          },
        },
        language: lang,
        quantity: 1,
        hsn: "4901",
        ebookPrice: ebookPrice,
        isEbookAlsoSelected: type === "combo" ? true : false,
        onlyEbookSelected: type === "ebook" ? true : false,
        bookCode: bookInfo?.bookCode,
      };
    });
    const filtered = newProducts.filter(Boolean);

    if (type === "combo") {
      const hasConflict = filtered.some((filteredItem) => {
        return orderData.some((orderItem) => {
          return (
            filteredItem.productId._id === orderItem.productId._id &&
            filteredItem.language === orderItem.language &&
            filteredItem.isEbookAlsoSelected &&
            orderItem.isEbookAlsoSelected
          );
        });
      });

      if (hasConflict) {
        toast.error("Combo is already there in the order");
        return;
      }
      // Find and remove the matched orderItem from orderData
      let updatedOrderData = [...orderData];
      filtered.forEach((filteredItem) => {
        updatedOrderData = updatedOrderData.filter((orderItem) => {
          const isMatch =
            filteredItem.productId._id === orderItem.productId._id &&
            filteredItem.language === orderItem.language;
          // console.log(filteredItem, orderItem);
          return !isMatch; // Remove the matched item
        });
        // console.log(updatedOrderData);
      });

      // Merge the updated orderData with the filtered items
      const merged = [...updatedOrderData, ...filtered];
      // console.log("after removing", updatedOrderData);
      // Update the state with the merged array and clear the selected products
      onUpdate(merged);
      setSelectedCombo([]);
    } else if (type === "ebook") {
      const hasConflict = filtered.some((filteredItem) => {
        return orderData.some((orderItem) => {
          return (
            filteredItem.productId._id === orderItem.productId._id &&
            filteredItem.language === orderItem.language &&
            filteredItem.onlyEbookSelected &&
            orderItem.onlyEbookSelected
          );
        });
      });

      if (hasConflict) {
        toast.error("Ebook is already there in the order");
        return;
      }

      // Find and remove the matched orderItem from orderData
      let updatedOrderData = [...orderData];
      filtered.forEach((filteredItem) => {
        updatedOrderData = updatedOrderData.filter((orderItem) => {
          const isMatch =
            filteredItem.productId._id === orderItem.productId._id &&
            filteredItem.language === orderItem.language;
          // console.log(filteredItem, orderItem);
          return !isMatch; // Remove the matched item
        });
        // console.log(updatedOrderData);
      });

      // Merge the updated orderData with the filtered items
      const merged = [...updatedOrderData, ...filtered];
      // console.log("after removing", updatedOrderData);
      // Update the state with the merged array and clear the selected products
      onUpdate(merged);
      setSelectedEbooks([]);
    } else if (type === "paperback") {
      const hasConflict = filtered.some((filteredItem) => {
        return orderData.some((orderItem) => {
          return (
            filteredItem.productId._id === orderItem.productId._id &&
            filteredItem.language === orderItem.language &&
            !orderItem.isEbookAlsoSelected &&
            !orderItem.onlyEbookSelected
          );
        });
      });

      if (hasConflict) {
        toast.error("Printed Book is already there in the order");
        return;
      }
      // Find and remove the matched orderItem from orderData
      let updatedOrderData = [...orderData];
      filtered.forEach((filteredItem) => {
        updatedOrderData = updatedOrderData.filter((orderItem) => {
          const isMatch =
            filteredItem.productId._id === orderItem.productId._id &&
            filteredItem.language === orderItem.language;
          // console.log(filteredItem, orderItem);
          return !isMatch; // Remove the matched item
        });
        // console.log(updatedOrderData);
      });

      // Merge the updated orderData with the filtered items
      const merged = [...updatedOrderData, ...filtered];
      // console.log("after removing", updatedOrderData);
      // Update the state with the merged array and clear the selected products
      onUpdate(merged);
      setSelectedProducts([]);
    }
  };

  // Paperback
  const handlePaperbackChange = (value) => {
    setSelectedProducts(value);
  };

  // Ebook
  const handleEbookChange = (value) => {
    setSelectedEbooks(value);
  };

  // Combo
  const handleComboChange = (value) => {
    setSelectedCombo(value);
  };

  const handleDeleteRow = (rowToDelete) => {
    const updatedData = formattedData.filter((item) => {
      console.log(item);
      const isSameBook =
        item.productId?._id === rowToDelete.productId?._id &&
        item.language === rowToDelete.language;

      console.log(rowToDelete, isSameBook);

      if (rowToDelete.onlyEbookSelected || rowToDelete.isEbookOnlyRow) {
        // Delete only the ebook row
        return !(isSameBook && (item.onlyEbookSelected || item.isEbookOnlyRow));
      } else if (rowToDelete.isEbookAlsoSelected) {
        // Delete both parts of the combo
        return !isSameBook;
      } else {
        // Only paperback, remove only physical book
        return !(
          isSameBook &&
          !item.isEbookAlsoSelected &&
          !item.onlyEbookSelected &&
          !item.isEbookOnlyRow
        );
      }
    });

    setFormattedData(updatedData);

    if (onUpdate) {
      const mergedData = mergeEbooksWithPaperbacks(updatedData);
      onUpdate(mergedData);
    }
  };

  const columns = [
    {
      name: "Book Code",
      selector: (row) => row.bookCode, // concise syntax (recommended)
      width: "150px",
      wrap: true,
    },
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
        if (row.isEbookAlsoSelected && row.isEbookOnlyRow) {
          return null; // ✅ safely return nothing
        }
        let title;
        if (
          row?.isEbookAlsoSelected === false &&
          row?.isEbookOnlyRow === false
        ) {
          title = "Delete Paperback";
        } else if (
          row?.isEbookAlsoSelected === true &&
          row?.isEbookOnlyRow === false
        ) {
          title = "Delete Combo";
        } else {
          title = "Delete Ebook";
        }

        return (
          <button
            onClick={() => handleDeleteRow(row)}
            className="text-red-600 hover:underline"
          >
            <Tooltip title={title}>
              <MdDelete size={20} />
            </Tooltip>
          </button>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  console.log(formattedData);

  useEffect(() => {
    if (formattedData.length > 0) {
      setFormattedDataCopy(formattedData);
    }
  }, [formattedData]);

  // 1. Only Ebook Selected
  const onlyEbookArray = formattedDataCopy?.filter(
    (item) =>
      (item.isEbookAlsoSelected === false && item.isEbookOnlyRow === true) ||
      (item.isEbookAlsoSelected === true && item.isEbookOnlyRow === true)
  );

  const paperBackArray = formattedDataCopy?.filter(
    (item) =>
      (item.isEbookAlsoSelected === true && item.isEbookOnlyRow === false) ||
      (item.isEbookAlsoSelected === false && item.isEbookOnlyRow === false)
  );

  // 2. Ebook Also Selected
  // const ebookAlsoArray = formattedDataCopy?.filter(
  //   (item) => item.isEbookAlsoSelected === true
  // );

  // 3. Neither of the above (both false)
  // const noneArray = formattedDataCopy?.filter(
  //   (item) =>
  //     item.onlyEbookSelected === false && item.isEbookAlsoSelected === false
  // );

  // console.log("Ebook:", onlyEbookArray);
  // console.log("Paperback:", paperBackArray);
  // console.log("None:", noneArray);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-4 bg-gray-100 rounded-lg mb-6 p-3">
        {/* Paperback */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end mb-4">
          <div className="flex-1 w-full">
            <p className="font-semibold">Paperback</p>
            <Select
              mode="multiple"
              allowClear
              showSearch
              placeholder="Search to Select"
              value={selectedProducts}
              onChange={handlePaperbackChange}
              options={productOptions}
              className="w-full h-max"
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>
          <Button
            className="flex items-center gap-1 capitalize py-2 px-4"
            onClick={() => handleProductAdd("paperback")}
          >
            {/* <IoAddCircleOutline size={17} /> */}
            Add
          </Button>
        </div>

        {/* E-books */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end mb-4">
          <div className="flex-1 w-full">
            <p className="font-semibold">E-books</p>
            <Select
              mode="multiple"
              allowClear
              showSearch
              placeholder="Search to Select"
              value={selectedEbooks}
              onChange={handleEbookChange}
              options={ebookOptions}
              className="w-full h-max"
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>
          <Button
            className="flex items-center gap-1 capitalize py-2 px-4"
            onClick={() => handleProductAdd("ebook")}
          >
            {/* <IoAddCircleOutline size={17} />  */}
            Add
          </Button>
        </div>

        {/* Combo */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end mb-4">
          <div className="flex-1 w-full">
            <p className="font-semibold">Combo</p>
            <Select
              mode="multiple"
              allowClear
              showSearch
              placeholder="Search to Select"
              value={selectedCombo}
              onChange={handleComboChange}
              options={productOptions}
              className="w-full h-max"
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>
          <Button
            className="flex items-center gap-1 capitalize py-2 px-4"
            onClick={() => handleProductAdd("combo")}
          >
            {/* <IoAddCircleOutline size={17} /> */}
            Add
          </Button>
        </div>
      </div>

      <div className="mt-3">
        {/* <DataTable
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
                paddingTop: "7px",
                paddingBottom: "7px",
                fontSize: "15px",
              },
            },
            headCells: {
              style: {
                fontWeight: "600",
                fontSize: "17px",
                paddingTop: "7px",
                paddingBottom: "7px",
                backgroundColor: "#f3f4f6",
              },
            },
          }}
          // conditionalRowStyles={[
          //   {
          //     when: (row) =>
          //       row.isEbookAlsoSelected === false &&
          //       row.onlyEbookSelected === false, // condition
          //     style: {
          //       backgroundColor: "#fff3cd", // light yellow
          //       color: "#856404",
          //     },
          //   },
          //   {
          //     when: (row) => row.onlyEbookSelected === true,
          //     style: {
          //       backgroundColor: "#d4edda", // light green
          //       color: "#155724",
          //     },
          //   },
          //   {
          //     when: (row) => row.isEbookAlsoSelected === true,
          //     style: {
          //       backgroundColor: "#f8d7da", // light red
          //       color: "#721c24",
          //     },
          //   },
          // ]}
        /> */}

        <DataTable
          title="Printed Books"
          columns={columns}
          data={paperBackArray}
          dense
          highlightOnHover
          responsive
          persistTableHead
            noDataComponent="No printed books "

          customStyles={{
            rows: {
              style: {
                minHeight: "56px",
                paddingTop: "7px",
                paddingBottom: "7px",
                fontSize: "15px",
              },
            },
            headCells: {
              style: {
                fontWeight: "600",
                fontSize: "17px",
                paddingTop: "7px",
                paddingBottom: "7px",
                backgroundColor: "#f3f4f6",
              },
            },
          }}
          // conditionalRowStyles={[
          //   {
          //     when: (row) =>
          //       row.isEbookAlsoSelected === false &&
          //       row.onlyEbookSelected === false, // condition
          //     style: {
          //       backgroundColor: "#fff3cd", // light yellow
          //       color: "#856404",
          //     },
          //   },
          //   {
          //     when: (row) => row.onlyEbookSelected === true,
          //     style: {
          //       backgroundColor: "#d4edda", // light green
          //       color: "#155724",
          //     },
          //   },
          //   {
          //     when: (row) => row.isEbookAlsoSelected === true,
          //     style: {
          //       backgroundColor: "#f8d7da", // light red
          //       color: "#721c24",
          //     },
          //   },
          // ]}
        />

        <div className="mt-9 border-t-2">
          <DataTable
            title="E Books"
            columns={columns}
            data={onlyEbookArray}
            dense
            highlightOnHover
            responsive
            persistTableHead
            noDataComponent="No ebooks "
            customStyles={{
              rows: {
                style: {
                  minHeight: "56px",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                  fontSize: "15px",
                },
              },
              headCells: {
                style: {
                  fontWeight: "600",
                  fontSize: "17px",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                  backgroundColor: "#f3f4f6",
                },
              },
            }}
            // conditionalRowStyles={[
            //   {
            //     when: (row) =>
            //       row.isEbookAlsoSelected === false &&
            //       row.onlyEbookSelected === false, // condition
            //     style: {
            //       backgroundColor: "#fff3cd", // light yellow
            //       color: "#856404",
            //     },
            //   },
            //   {
            //     when: (row) => row.onlyEbookSelected === true,
            //     style: {
            //       backgroundColor: "#d4edda", // light green
            //       color: "#155724",
            //     },
            //   },
            //   {
            //     when: (row) => row.isEbookAlsoSelected === true,
            //     style: {
            //       backgroundColor: "#f8d7da", // light red
            //       color: "#721c24",
            //     },
            //   },
            // ]}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryTable;
