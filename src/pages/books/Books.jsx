import React from "react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { allBooksColumns } from "../../constant/tableColumns";
import { useSelector } from "react-redux";

const Books = () => {
  const navigate = useNavigate();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);

  const booksData = [
    {
      bookName: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      medium: "English",
      edition: "2nd",
      ebookPrice: "299",
      paperBookPrice: "599",
    },
    {
      bookName: "To Kill a Mockingbird",
      author: "Harper Lee",
      medium: "English",
      edition: "1st",
      ebookPrice: "199",
      paperBookPrice: "399",
    },
    {
      bookName: "1984",
      author: "George Orwell",
      medium: "English",
      edition: "3rd",
      ebookPrice: "249",
      paperBookPrice: "449",
    },
    {
      bookName: "Pride and Prejudice",
      author: "Jane Austen",
      medium: "English",
      edition: "5th",
      ebookPrice: "299",
      paperBookPrice: "699",
    },
    {
      bookName: "The Catcher in the Rye",
      author: "J.D. Salinger",
      medium: "English",
      edition: "4th",
      ebookPrice: "229",
      paperBookPrice: "529",
    },
  ];

  const handleRowClick = (data) => {
    navigate(`/${role}/editbook`);
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="All Books" />
        </div>
        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue"
          onClick={()=>path.changeEndPoint("addbook")}
        >
          <Plus className="pr-1" />
          Add Book
        </Button>
      </div>{" "}
      <div className="mt-4">
        <DataTable
          data={booksData}
          columns={allBooksColumns}
          customStyles={tableStyle}
          onRowClicked={handleRowClick}
        />
      </div>
    </PageCont>
  );
};

export default Books;
