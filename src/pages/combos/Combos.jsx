import React from "react";
import Heading from "../../components/Heading";
import { Button, ButtonGroup } from "@material-tailwind/react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import usePath from "../../hooks/usePath";

const ComboCard = ({ onViewClick }) => {
  return (
    <div className="border p-2 rounded-xl text-center px-5 bg-[#fbfcfe]">
      <p className="text-base text-center py-3">
        MA Economics 1st Semester Combo Including MEC-101, MEC-102, MEC-203
        Medium: English
      </p>
      <div className="rounded-xl bg-[#F0F8FF] p-4">
        <img
          src="https://www.neerajbooks.com/image/data/4be4325e1073edd7ac5ad136b7e4f4ff.png"
          className="rounded-lg border-none"
        />
      </div>
      <Button className="mt-3 bg-cstm-blue" onClick={onViewClick}>
        View
      </Button>
    </div>
  );
};

const Combos = () => {
  const path = usePath();

  const handleViewClick = () => {
    // Change the path when the "View" button is clicked
    path.changeEndPoint("editcombo");
  };

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="All Combos" />
        </div>

        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue"
          onClick={() => path.changeEndPoint("createcombo")}
        >
          <Plus className="pr-1" />
          Create Combo
        </Button>
      </div>{" "}
      {/* <div className="mt-4">
        <DataTable
          data={booksData}
          columns={allBooksColumns}
          customStyles={tableStyle}
          onRowClicked={handleRowClick}
        />
      </div> */}
      <div className="grid grid-cols-3 gap-10 mt-3">
        <ComboCard onViewClick={handleViewClick} />
        <ComboCard />
        <ComboCard />
        <ComboCard />
      </div>
    </PageCont>
  );
};

export default Combos;
