import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleAffiliateOrder } from "../../redux/features/affiliates";
import DataTable from "react-data-table-component";
import { affiliateOrderColumns } from "../../constant/tableColumns";
import { tableStyle } from "../../constant/tableStyle";

const AffiliateOrder = () => {
  const location = useLocation();
  //   console.log(location.state.affiliateData);
  const dispatch = useDispatch();

  const [ordersData, setOrdersData] = useState();

  useEffect(() => {
    dispatch(
      getSingleAffiliateOrder(
        location?.state?.affiliateData?._id,
        (success, data) => {
          if (success) {
            setOrdersData(data);
          }
        }
      )
    );
  }, [dispatch]);
  console.log(ordersData);

  return (
    <PageCont>
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-start items-center gap-3">
          <Heading text="Affiliate Orders" />
        </div>
      </div>
      <div>
        <DataTable
          data={ordersData ? ordersData : []}
          columns={affiliateOrderColumns}
          customStyles={tableStyle}
        />
      </div>
    </PageCont>
  );
};

export default AffiliateOrder;
