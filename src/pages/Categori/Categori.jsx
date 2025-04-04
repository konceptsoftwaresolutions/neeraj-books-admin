import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  handleCategoryOrder,
} from "../../redux/features/category";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { allCategoryColumns } from "../../constant/tableColumns";
import { FaFileExcel, FaSearch } from "react-icons/fa";
import UploadExcel from "../../components/UploadExcel";
import { Input } from "antd";

const columns = [
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
  // {
  //   name: 'Parent Category',
  //   selector: row => row.parentId || 'None', // Display parent ID or 'None' if no parent
  //   sortable: true,
  // },
];

function Categori(props) {
  const dispatch = useDispatch();
  const { allParentCategory } = useSelector((state) => state.dummy);
  const { allCategory } = useSelector((state) => state.category);
  const [excelModal, setExcelModal] = useState(false);

  const [searchText, setSearchText] = useState(""); // Search input state
  const [filteredCategory, setFilteredCategory] = useState([]);

  const navigate = useNavigate();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleRowClick = (row) => {
    navigate(`/${role}/editcategory`, { state: { category: row } });
  };

  const flattenCategories = (categories) => {
    let flattenedData = [];

    const flatten = (category, parentId = null) => {
      // Add the category to the flattened data
      flattenedData.push({
        ...category,
        parentId, // Reference to parent category, if any
      });

      // Recursively add subcategories
      category.subcategories.forEach((subcat) => flatten(subcat, category._id));
    };

    categories.forEach((category) => flatten(category));

    return flattenedData;
  };

  const flatData = flattenCategories(allParentCategory);

  console.log(flatData);

  const parentLevelCategories = allCategory?.map(
    ({ subcategories, products, ...rest }) => rest
  );
  console.log(parentLevelCategories);

  const handleCategorySort = (categoryId, sort) => {
    const payload = {
      categoryId,
      sort,
    };
    console.log(payload);
    dispatch(handleCategoryOrder(payload));
  };

  const handleUploadExcel = (data) => {
    console.log(data);
  };

  const templateData = [
    {
      hsnCode: "",
      oemCompany: "",
      price: "",
      productCode: "",
      productDescription: "",
      productType: "",
      type: "",
      productMargin: "",
      taxPercentage: "",
      workscope: "",
      assetCode: "",
      assetCode2: "",
      assetCode3: "",
      assetCode4: "",
      assetCode5: "",
      assetCode6: "",
      assetCode7: "",
      assetCode8: "",
      assetCode9: "",
      assetCode10: "",
    },
  ];

  const normalizeText = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredCategory(parentLevelCategories);
    } else {
      const normalizedSearch = normalizeText(searchText);
      setFilteredCategory(
        parentLevelCategories.filter((category) =>
          normalizeText(category.name).includes(normalizedSearch)
        )
      );
    }
  }, [searchText, parentLevelCategories]);

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="Category" />
        </div>
        <div className="flex gap-x-3">
          <Button
            type="submit"
            variant="filled"
            className="text-white capitalize py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
            onClick={() => path.changeEndPoint("addcategory")}
          >
            <Plus className="pr-1" />
            Add Parent Category
          </Button>
          <Button
            type="submit"
            variant="filled"
            className="text-white capitalize py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
            onClick={() => setExcelModal(!excelModal)}
          >
            <FaFileExcel className="pr-1" />
            Bulk Upload
          </Button>
        </div>
      </div>{" "}
      <div className="mt-4 relative">
        <FaSearch className="absolute top-3 left-2 z-20 text-cstm-blue" />

        <Input
          type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 pl-7 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-cstm-blue "
        />
      </div>
      <div className="mt-4">
        <DataTable
          data={filteredCategory ? filteredCategory : []}
          columns={allCategoryColumns(handleRowClick, handleCategorySort)}
          customStyles={tableStyle}
          // onRowClicked={handleRowClick}
        />
      </div>
      <UploadExcel
        isOpen={excelModal}
        setIsOpen={setExcelModal}
        handleSave={handleUploadExcel}
        templateName="allProductTemplate"
        template={templateData}
      />
    </PageCont>
  );
}

export default Categori;
