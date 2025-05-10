import React, { useEffect, useState } from "react";
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

  const tableData = transformData(allBooks);

  const normalizeText = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredBooks(tableData);
    } else {
      const normalizedSearch = normalizeText(searchText);
      setFilteredBooks(
        tableData.filter((book) =>
          normalizeText(book.bookCode).includes(normalizedSearch)
        )
      );
    }
  }, [searchText, allBooks]);

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
    console.log(data);
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
    },
  ];

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="All Books" />
        </div>

        <div className="flex gap-1">
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

      {/* Search Input */}
      <div className="mt-4 relative">
        <FaSearch className="absolute top-3 left-2 z-20 text-cstm-blue" />

        <Input
          type="text"
          placeholder="Search by book code..."
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
