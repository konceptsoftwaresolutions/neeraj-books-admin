import React from "react";
import PageCont from "../../components/PageCont";
// import { Plus } from "lucide-react";
// import Heading from "../../components/Heading";
// import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { allReviews } from "../../constant/tableColumns";
import { useSelector } from "react-redux";


function Reviews(props) {
    const navigate = useNavigate();
    const path = usePath();
    const { role } = useSelector((state) => state.auth);

    const Reviews = [
        {
            Name: "xyz",
            Rating: "4/5",
            Description: "Good",
        },
        {
            Name: "xyz",
            Rating: "4/5",
            Description: "Good",
        },
        {
            Name: "xyz",
            Rating: "4/5",
            Description: "Good",
        },
        {
            Name: "xyz",
            Rating: "4/5",
            Description: "Good",
        },
        {
            Name: "xyz",
            Rating: "4/5",
            Description: "Good",
        },
        {
            Name: "xyz",
            Rating: "4/5",
            Description: "Good",
        },
       
       
    ];
    const handleRowClick = (data) => {
        navigate(`/${role}/editbook`);
    };
    return (
        <PageCont>
            <div className="mt-4">
                <DataTable
                    data={Reviews}
                    columns={allReviews}
                    customStyles={tableStyle}
                    onRowClicked={handleRowClick}
                />
            </div>
        </PageCont>
    );
}

export default Reviews;