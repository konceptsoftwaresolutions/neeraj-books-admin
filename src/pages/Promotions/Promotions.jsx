import React from "react";
import PageCont from "../../components/PageCont";
import { ChevronsLeft, Plus } from "lucide-react";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
import { useSelector } from "react-redux";
import { allPromotions } from "../../constant/tableColumns";
import Modal from "./Modal";

function Promotions(props) {
    const navigate = useNavigate();
    const path = usePath();
    const { role } = useSelector((state) => state.auth);

    const Promotions = [
        {
            active: "Active",
            discount: "#250302",
            medium: "English",
            status: "From Dec 10",
        },
        {
            active: "Active",
            discount: "#250302",
            medium: "English",
            status: "From Dec 10",
        },
        {
            active: "Active",
            discount: "#250302",
            medium: "English",
            status: "From Dec 10",
        },
        {
            active: "Active",
            discount: "#250302",
            medium: "English",
            status: "From Dec 10",
        },
        {
            active: "Active",
            discount: "#250302",
            medium: "English",
            status: "From Dec 10",
        },
        {
            active: "Active",
            discount: "#250302",
            medium: "English",
            status: "From Dec 10",
        },

    ];


    return (
        <div>
            <PageCont>
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center gap-3">
                        <Heading text="Discounts" />
                    </div>
                    <Button
                        type="submit"
                        variant="filled"
                        className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
                        onClick={() => path.changeEndPoint("")}
                    >
                        <Plus className="pr-1" />
                        create discounts
                    </Button>
                </div>{" "}
                <div className="mt-4 mb-8">
                    <DataTable
                        data={Promotions}
                        columns={allPromotions}
                        customStyles={tableStyle}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="text-black-800 text-[20px] sm:pl-5">
                        Home Popup
                    </h2>
                    <Modal />
                </div>
            </PageCont>
        </div>
    );
}

export default Promotions;