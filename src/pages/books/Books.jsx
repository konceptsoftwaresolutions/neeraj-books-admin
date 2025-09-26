import React, { useEffect, useMemo, useState } from "react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { allBooksColumns } from "../../constant/tableColumns";
import { useDispatch, useSelector } from "react-redux";
import { FaFileExcel } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa6";
import { IoMdPrint } from "react-icons/io";
import * as XLSX from "xlsx"; // Import xlsx library

import {
  getAllBooks,
  handleBookOrder,
  uploadBulkUploadExcel,
} from "../../redux/features/books";
import { useForm } from "react-hook-form";
import EbookPriceModal from "./EbookPriceModal";
import { getAllCategories } from "../../redux/features/category";
import useCategoryName from "../../hooks/useCategoryName";
import UploadExcel from "../../components/UploadExcel";
import ImageUpload from "./ImageUpload";
import Papa from "papaparse";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import FilteredBooksPdf from "./FilteredBooksPdf";
import { FaFilePdf } from "react-icons/fa6";

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const getCategoryName = useCategoryName;
  const path = usePath();

  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getAllCategories());
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const { role } = useSelector((state) => state.auth);
  const { allBooks } = useSelector((state) => state.books);
  const { allCategory } = useSelector((state) => state.category);

  const [ebookModal, setEbookModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [excelModal, setExcelModal] = useState(false);
  const [searchText, setSearchText] = useState(""); // Search input state
  const [filteredBooks, setFilteredBooks] = useState([]);
  console.log(filteredBooks);

  const transformData = (books) => {
    let rows = [];
    books?.forEach((book) => {
      if (book.english) {
        rows.push({
          _id: book._id + "-en",
          title: book.english.title,
          bookCode: book.english.bookCode,
          categoriesArray: book.english.categories,
          description: book.english.description,
          paperBackPrice: book.english.paperBackOriginalPrice,
          eBookPrice: book.english.eBookOriginalPrice,
          averageRating: book.english.averageRating,
          medium: "English",
          bookDetail: book.english,
          sort: book.english.sort,
          outerId: book._id,
          localisedId: book.english._id,
          categories: book.english.categories,
          stock: book.english.stock,
        });
      }
      if (book.hindi) {
        rows.push({
          _id: book._id + "-hi",
          title: book.hindi.title,
          bookCode: book.hindi.bookCode,
          categoriesArray: book.hindi.categories,
          description: book.hindi.description,
          paperBackPrice: book.hindi.paperBackOriginalPrice,
          eBookPrice: book.hindi.eBookOriginalPrice,
          averageRating: book.hindi.averageRating,
          medium: "Hindi",
          bookDetail: book.hindi,
          sort: book.hindi.sort,
          outerId: book._id,
          localisedId: book.hindi._id,
          categories: book.hindi.categories,
          stock: book.hindi.stock,
        });
      }
    });
    return rows;
  };

  const tableData = useMemo(() => transformData(allBooks), [allBooks]);

  const normalizeText = (text) =>
    text?.toLowerCase()?.replace(/[^a-z0-9]/g, "");

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredBooks(tableData);
      return;
    }

    const normalizedSearch = normalizeText(searchText);

    const filtered = tableData?.filter((book) => {
      const bookCodeMatch = normalizeText(book.bookCode)?.includes(
        normalizedSearch
      );
      const mediumMatch = normalizeText(book.medium)?.includes(
        normalizedSearch
      );
      const paperBackPriceMatch =
        String(book.paperBackPrice) === normalizedSearch;
      const eBookPriceMatch = String(book.eBookPrice) === normalizedSearch;

      // New: check if any category name matches the search text
      const categoryMatch = book.categoriesArray?.some((category) =>
        normalizeText(category.name)?.includes(normalizedSearch)
      );

      return (
        bookCodeMatch ||
        mediumMatch ||
        paperBackPriceMatch ||
        eBookPriceMatch ||
        categoryMatch
      );
    });

    setFilteredBooks(filtered);
  }, [searchText, tableData]);

  const handleRowClick = (row) => {
    const bookId = row.bookDetail._id;
    const medium = row.medium;
    const outerId = row.outerId;
    navigate(`/${role}/updatebook/${bookId}/${medium}/${outerId}`, {
      state: { data: { bookId, outerId } },
    });
  };

  const handleBookSort = (productId, localizedId, sort) => {
    const payload = {
      productId,
      localizedId,
      sort,
    };
    dispatch(handleBookOrder(payload));
  };

  const handleUploadExcel = (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("file", data); // 👈 "excel" should match backend field key
    dispatch(uploadBulkUploadExcel(formData));
  };

  // Function to create a lookup object for categories
  const getCategoryName = (categoryIds, allCategory) => {
    // Flatten the category tree
    const categoryLookup = {};

    const flattenCategories = (categories) => {
      categories?.forEach((category) => {
        categoryLookup[category._id] = category.name;
        if (category.subcategories && category.subcategories.length) {
          flattenCategories(category.subcategories);
        }
      });
    };

    flattenCategories(allCategory);

    // Map category IDs to names
    return categoryIds
      .map((id) => categoryLookup[id] || "Unknown Category")
      .join(", ");
  };

  const template = [
    {
      medium: "",
      category1: "",
      category2: "",
      category3: "",
      bookCode: "",
      title: "",
      paperbackOriginalPrice: "",
      paperbackDiscountedPrice: "",
      ebookOriginalPrice: "",
      ebookDiscountedPrice: "",
      ebookAdditionPrice: "",
      active: "",
      weight: "",
      isbn: "",
      brand: "",
      forSession: "",
      commonLine: "",
      stock: "",
      bestSeller: "",
      isEbookDownloadable: "",
      title1: "",
      description1: "",
      title2: "",
      description2: "",
      title3: "",
      description3: "",
      title4: "",
      description4: "",
      metaTitle: "",
      metaTag: "",
      metaDescription: "",
      totalPages: "",
      totalNoOfPapers: "",
      authorName: "",
      first: " ",
      revisedUpdated: "",
      reprint: "",
      startPages: "",
      quesPaperPages: "",
      bookPages: "",
      extraPages: "",
      totalPages: "",
      noOfForms: "",
      editorRevisor: "",
      bookType: "",
      bookSize: "",
      bookColour: "",
    },
  ];

  const exportToCSV = () => {
    if (!filteredBooks || filteredBooks.length === 0) return;

    const flattenedData = filteredBooks.map((book) => {
      const details = book.bookDetail || {};
      const category = book.categoriesArray?.[0] || {};

      return {
        Title: book.title ?? "",
        BookCode: book.bookCode ?? "",
        ISBN: details.isbn ?? "",
        Edition: details.edition ?? "",
        Medium: book.medium ?? "",
        Category: category.name ?? "",
        SubCategory: category.description1 ?? "",
        Price_Paperback: details.paperBackOriginalPrice ?? "",
        Discounted_Price_Paperback: details.paperBackDiscountedPrice ?? "",
        Price_eBook: details.eBookOriginalPrice ?? "",
        Discounted_Price_eBook: details.eBookDiscountedPrice ?? "",
        Weight_kg: details.weight ?? "",
        Brand: details.brand ?? "",
        Stock: details.stock ?? "",
        Description_Summary: details.commonLine ?? "",
      };
    });

    const csv = Papa.unparse(flattenedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Books.csv");
  };

  const exportBooksToPDF = async () => {
    try {
      const blob = await pdf(
        <FilteredBooksPdf data={filteredBooks} />
      ).toBlob();
      saveAs(blob, "FilteredBooks.pdf");
    } catch (error) {
      console.error("Failed to export books PDF:", error);
    }
  };

  const printFilteredBooksHtml = (books = []) => {
    const htmlContent = books
      .map((book, index) => {
        const detail = book.bookDetail || {};
        const category =
          book.categoriesArray?.[0]?.name ||
          book.categories?.[0]?.name ||
          "N/A";

        return `
        <div class="book-section">
          <h2>Book ${index + 1}: ${book.title}</h2>
          <table>
            <tr><th>Book Code</th><td>${book.bookCode}</td></tr>
            <tr><th>Category</th><td>${category}</td></tr>
            <tr><th>Language</th><td>${book.medium}</td></tr>
            <tr><th>Paperback Price</th><td>₹${book.paperBackPrice}</td></tr>
            <tr><th>eBook Price</th><td>₹${book.eBookPrice}</td></tr>
            <tr><th>Paperback Discounted</th><td>₹${
              detail.paperBackDiscountedPrice ?? "-"
            }</td></tr>
            <tr><th>eBook Discounted</th><td>₹${
              detail.eBookDiscountedPrice || "-"
            }</td></tr>
            <tr><th>Edition</th><td>${detail.edition || "-"}</td></tr>
            <tr><th>ISBN</th><td>${detail.isbn || "-"}</td></tr>
            <tr><th>Weight</th><td>${detail.weight || "-"} kg</td></tr>
            <tr><th>Stock</th><td>${detail.stock}</td></tr>
          </table>
          <hr/>
        </div>
      `;
      })
      .join("");

    const printWindow = window.open("", "", "width=900,height=700");
    printWindow.document.write(`
    <html>
      <head>
        <title>Books</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          h2 {
            margin-top: 30px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
          hr {
            margin: 30px 0;
            border: none;
            border-top: 1px solid #ccc;
          }
        </style>
      </head>
      <body>
        <h1>Books List</h1>
        ${htmlContent}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // Function to export filtered books to Excel
  const exportToExcel = () => {
    if (!filteredBooks || filteredBooks.length === 0) return;

    const wb = XLSX.utils.book_new(); // Create a new workbook
    const wsData = filteredBooks.map((book) => {
      const details = book.bookDetail || {};
      const category = book.categoriesArray?.[0] || {};

      return {
        Title: book.title ?? "",
        BookCode: book.bookCode ?? "",
        ISBN: details.isbn ?? "",
        Edition: details.edition ?? "",
        Medium: book.medium ?? "",
        Category: category.name ?? "",
        SubCategory: category.description1 ?? "",
        Price_Paperback: details.paperBackOriginalPrice ?? "",
        Discounted_Price_Paperback: details.paperBackDiscountedPrice ?? "",
        Price_eBook: details.eBookOriginalPrice ?? "",
        Discounted_Price_eBook: details.eBookDiscountedPrice ?? "",
        Weight_kg: details.weight ?? "",
        Brand: details.brand ?? "",
        Stock: details.stock ?? "",
        Description_Summary: details.commonLine ?? "",
      };
    });

    const ws = XLSX.utils.json_to_sheet(wsData); // Convert JSON to sheet
    XLSX.utils.book_append_sheet(wb, ws, "Books"); // Append sheet to workbook
    XLSX.writeFile(wb, "Books.xlsx"); // Trigger download
  };

  // console.log(filteredBooks);

  return (
    <PageCont>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex justify-start items-center gap-3 w-full sm:w-auto">
          <Heading text="All Books" />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-1 w-full sm:w-auto">
          <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
            onClick={() => setImageModal(!imageModal)}
          >
            Bulk Images
          </Button>
          <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
            onClick={() => setEbookModal(!ebookModal)}
          >
            Set Brand
          </Button>

          <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
            onClick={() => path.changeEndPoint("createbook")}
          >
            <Plus className="pr-1" />
            Add Book
          </Button>

          <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
            onClick={() => setExcelModal(!excelModal)}
          >
            <FaFileExcel className="pr-1" />
            Bulk Upload
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-start gap-2 mt-5">
        <Button
          variant="filled"
          className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center gap-1"
          onClick={exportToCSV}
        >
          <FaFileCsv size={17} /> Export CSV
        </Button>
        <Button
          variant="gradient"
          color="blue"
          onClick={exportToExcel}
          className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center gap-1"
        >
          <FaFileExcel className="mr-2" />
          Export to Excel
        </Button>
        <Button
          variant="filled"
          className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center gap-1"
          onClick={exportBooksToPDF}
        >
          <FaFilePdf size={17} /> Export PDF
        </Button>
        <Button
          variant="filled"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold capitalize flex items-center gap-1"
          onClick={() => printFilteredBooksHtml(filteredBooks)}
        >
          <IoMdPrint size={17} />
          Print Table
        </Button>
      </div>

      {/* Search Input */}
      <div className="mt-4 relative">
        <FaSearch className="absolute top-3 left-2 z-20 text-cstm-blue" />

        <Input
          type="text"
          placeholder="Search by book code , Medium..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 pl-7 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-cstm-blue "
        />
      </div>

      {/* DataTable */}
      <div className="mt-4">
        <DataTable
          data={filteredBooks}
          columns={allBooksColumns(
            handleRowClick,
            getCategoryName,
            allCategory,
            handleBookSort
          )}
          customStyles={tableStyle}
          pagination
          paginationPerPage={12}
          paginationRowsPerPageOptions={[10, 25, 50]}
        />
      </div>

      <EbookPriceModal showModal={ebookModal} setShowModal={setEbookModal} />
      <ImageUpload showModal={imageModal} setShowModal={setImageModal} />

      <UploadExcel
        isOpen={excelModal}
        setIsOpen={setExcelModal}
        handleSave={handleUploadExcel}
        templateName="allProductTemplate"
        template={template}
      />
    </PageCont>
  );
};

export default Books;
