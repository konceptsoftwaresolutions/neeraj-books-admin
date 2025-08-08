import React, { useEffect } from "react";
import PageCont from "../../components/PageCont";
import { Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { allPromotions } from "../../constant/tableColumns";

import { useForm } from "react-hook-form";
import {
  getAllAffiliates,
  updateTheAffiliatePaymnet,
} from "../../redux/features/affiliates";
import { useNavigate } from "react-router-dom";

function Promotions(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allAffiliates } = useSelector((state) => state.affiliate);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllAffiliates());
  }, [dispatch]);

  const handleStatusChange = (data, status) => {
    if (status === "approve") {
      navigate(`/${role}/affiliateDetails`, { state: { data } });
    } else {
      console.log(data, status);
      const payload = {
        id: data._id,
        approved: false,
      };
      dispatch(updateTheAffiliatePaymnet(payload));
    }
  };

  const handleRowClick = (data) => {
    navigate(`/${role}/affiliateDetails`, { state: { data } });
  };

  return (
    <div>
      <PageCont>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <Heading text="All Affiliates" />
          </div>
          {/* <Button
            type="submit"
            variant="filled"
            className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
            onClick={() => path.changeEndPoint("")}
          >
            <Plus className="pr-1" />
            create discounts
          </Button> */}
        </div>{" "}
        <div className="mt-4 mb-8">
          <div className="mt-4 mb-8">
            <DataTable
              data={allAffiliates ? allAffiliates : []}
              columns={allPromotions(handleRowClick)}
              customStyles={tableStyle}
              onRowClicked={handleRowClick}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
            />
          </div>
        </div>
      </PageCont>
    </div>
  );
}

export default Promotions;
