import React from 'react';
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import { useSelector } from "react-redux";


function Categori(props) {

  const navigate = useNavigate();
  const path = usePath();
  const { role } = useSelector((state) => state.auth);


  const handleRowClick = (data) => {
    navigate(`/${role}/editCategori`);
  };
  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <Heading text="Category" />
        </div>
        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
          onClick={() => path.changeEndPoint("editCategori")}
        >
          <Plus className="pr-1" />
          Add Category
        </Button>
      </div>{" "}

    </PageCont>
  );
}

export default Categori;