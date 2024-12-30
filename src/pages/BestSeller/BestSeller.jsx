import React from 'react';
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import { ChevronsLeft, Plus } from "lucide-react";
// import { allBooksColumns } from "../../constant/tableColumns";
import { useNavigate } from "react-router-dom";
import usePath from "../../hooks/usePath";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { tableStyle } from "../../constant/tableStyle";
import { allSeller } from '../../constant/tableColumns';
import InputField from "../../common/fields/InputField";
import { useForm } from "react-hook-form";

function BestSeller(props) {
    const navigate = useNavigate();
    const path = usePath();
    const { role } = useSelector((state) => state.auth);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };


    const BestSeller = [
        {
            rank: "#0001",
            product: "Wireless Earbuds",
            unitsSold: 1200,
            revenue: "$36,000",
            stockLeft: 20,
            image: "https://via.placeholder.com/50"

        },
        {
            rank: "#0002",
            product: "Gaming Mouse",
            unitsSold: 950,
            revenue: "$28,500",
            stockLeft: 15,
            image: "https://via.placeholder.com/50"
        },
        {
            rank: "#0003",
            product: "Smartphone Stand",
            unitsSold: 800,
            revenue: "$12,000",
            stockLeft: 50,
            image: "https://via.placeholder.com/50"
        },
        {
            rank: "#0004",
            product: "Bluetooth Keyboard",
            unitsSold: 700,
            revenue: "$21,000",
            stockLeft: 30,
            image: "https://via.placeholder.com/50"
        },
        {
            rank: "#0005",
            product: "Portable Charger",
            unitsSold: 650,
            revenue: "$19,500",
            stockLeft: 25,
            image: "https://via.placeholder.com/50"
        }
    ];

    const handleRowClick = (data) => {
        navigate(`/${role}/editbook`);
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

    return (
        <PageCont>
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-3">
                    <Heading text="All Sells" />
                </div>
                <Button
                    type="submit"
                    variant="filled"
                    className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue "
                // loading={loading}
                // onClick={() => path.changeEndPoint("addbook")}
                >
                    <Plus className="pr-1" />
                    Add Seller
                </Button>
            </div>{" "}
            <div className="mt-3">
                <InputField
                    control={control}
                    errors={errors}
                    name="suggestedBooks"
                    label="Suggested Books"
                    type="select"
                />
            </div>
            <div className="mt-4">
                <DataTable
                    data={BestSeller}
                    columns={allSeller}
                    customStyles={tableStyle}
                // onRowClicked={handleRowClick}
                />
            </div>
        </PageCont>
    );
}

export default BestSeller;