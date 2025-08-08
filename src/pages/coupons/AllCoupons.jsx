import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { couponColumns } from "../../constant/tableColumns";
import AddCouponModal from "./AddCouponModal";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import EditCouponModal from "./EditCouponModal";
import { getAllCoupons } from "../../redux/features/coupons";
import { Input } from "antd";
import { FaSearch } from "react-icons/fa";

const AllCoupons = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCoupons());
  }, []);

  const { allCoupons } = useSelector((state) => state.coupons);

  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [editCouponModal, setEditCouponModal] = useState(false);
  const [couponToEdit, setCouponToEdit] = useState();
  const [searchText, setSearchText] = useState("");

  const handleRowClick = (e) => {
    setCouponToEdit(e);
    setEditCouponModal(!editCouponModal);
  };

  const filteredCoupons = allCoupons?.filter(
    (coupon) =>
      coupon.couponCode?.toLowerCase().includes(searchText.toLowerCase()) ||
      coupon.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <PageCont>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-3 w-full">
          <Heading text="All Coupons" />
          <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue capitalize"
            onClick={() => setOpenCouponModal(!openCouponModal)}
          >
            <Plus className="pr-1" />
            Create Coupon
          </Button>
        </div>
      </div>

      <div className="mt-4 relative">
        <FaSearch className="absolute top-3 left-2 z-20 text-cstm-blue" />
        <Input
          type="text"
          placeholder="Search by coupon code..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 pl-7 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-cstm-blue"
        />
      </div>

      <div className="my-5">
        <DataTable
          columns={couponColumns}
          data={filteredCoupons || []}
          customStyles={tableStyle}
          onRowClicked={handleRowClick}
          pagination
          highlightOnHover
          striped
          responsive
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>

      <AddCouponModal
        openModal={openCouponModal}
        setOpenModal={setOpenCouponModal}
      />
      <EditCouponModal
        openModal={editCouponModal}
        setOpenModal={setEditCouponModal}
        rowData={couponToEdit}
      />
    </PageCont>
  );
};

export default AllCoupons;
