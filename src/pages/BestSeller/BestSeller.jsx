import React, { useEffect } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { ChevronsLeft, Plus } from "lucide-react";
// import { allBooksColumns } from "../../constant/tableColumns";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { tableStyle } from "../../constant/tableStyle";
import { allBooksColumns, allSeller } from "../../constant/tableColumns";
import InputField from "../../common/fields/InputField";
import { useForm } from "react-hook-form";
import { getBestSellers } from "../../redux/features/books";

function BestSeller(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    dispatch(getBestSellers());
  }, []);

  const { bestSellers } = useSelector((state) => state.books);

  const BestSeller = [
    {
      rank: "#0001",
      product: "Wireless Earbuds",
      unitsSold: 1200,
      revenue: "$36,000",
      stockLeft: 20,
      image: "https://via.placeholder.com/50",
    },
    {
      rank: "#0002",
      product: "Gaming Mouse",
      unitsSold: 950,
      revenue: "$28,500",
      stockLeft: 15,
      image: "https://via.placeholder.com/50",
    },
    {
      rank: "#0003",
      product: "Smartphone Stand",
      unitsSold: 800,
      revenue: "$12,000",
      stockLeft: 50,
      image: "https://via.placeholder.com/50",
    },
    {
      rank: "#0004",
      product: "Bluetooth Keyboard",
      unitsSold: 700,
      revenue: "$21,000",
      stockLeft: 30,
      image: "https://via.placeholder.com/50",
    },
    {
      rank: "#0005",
      product: "Portable Charger",
      unitsSold: 650,
      revenue: "$19,500",
      stockLeft: 25,
      image: "https://via.placeholder.com/50",
    },
  ];

  const handleRowClick = (row) => {
    console.log("Clicked row full data:", row.bookDetail);

    navigate(`/${role}/updatebook`, {
      state: {
        rowData: row.bookDetail,
        medium: row.medium,
        outerId: row.outerId,
      },
    });
  };

  const {
    // handleSubmit,
    formState: { errors },
    control,
    // reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const transformData = (books) => {
    let rows = [];
    books?.forEach((book) => {
      if (book.english) {
        rows.push({
          _id: book._id + "-en",
          title: book.english.title,
          description: book.english.description,
          paperBackPrice: book.english.paperBackOriginalPrice,
          eBookPrice: book.english.eBookOriginalPrice,
          averageRating: book.english.averageRating,
          medium: "English",
          bookDetail: book.english,
          outerId: book._id,
        });
      }
      if (book.hindi) {
        rows.push({
          _id: book._id + "-hi",
          title: book.hindi.title,
          description: book.hindi.description,
          paperBackPrice: book.hindi.paperBackOriginalPrice,
          eBookPrice: book.hindi.eBookOriginalPrice,
          averageRating: book.hindi.averageRating,
          medium: "Hindi",
          bookDetail: book.hindi,
          outerId: book._id,
        });
      }
    });
    return rows;
  };

  const tableData = transformData(bestSellers);
  console.log(tableData);

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="Best Sellers" />
        </div>
        {/* <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
          // loading={loading}
          // onClick={() => path.changeEndPoint("addbook")}
        >
          <Plus className="pr-1" />
          Add Seller
        </Button> */}
      </div>{" "}
      {/* <div className="mt-4">
        <DataTable
          data={tableData ? tableData : []}
          columns={allBooksColumns}
          customStyles={tableStyle}
          onRowClicked={handleRowClick}
        />
      </div> */}
    </PageCont>
  );
}

export default BestSeller;
