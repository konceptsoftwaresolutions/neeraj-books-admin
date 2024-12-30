import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { tableStyle } from "../../constant/tableStyle";
// import { allBooksColumns } from "../../constant/tableColumns";
import { useSelector } from "react-redux";
import { allMembers } from "../../constant/tableColumns";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import usePath from "../../hooks/usePath";

function TeamMembers(props) {

    const navigate = useNavigate();
    const path = usePath();
    const { role } = useSelector((state) => state.auth);

    const TeamMembers = [

        {
            id: "TM001",
            name: "Alice Johnson",
            role: "Project Manager",
            email: "alice.johnson@example.com",
            phone: "+1 234 567 8901",
            status: "Active",
            joiningDate: "2023-02-15"
        },
        {
            id: "TM002",
            name: "Bob Brown",
            role: "Frontend Developer",
            email: "bob.brown@example.com",
            phone: "+1 234 567 8902",
            status: "Active",
            joiningDate: "2023-03-10"
        },
        {
            id: "TM003",
            name: "Carol Smith",
            role: "Backend Developer",
            email: "carol.smith@example.com",
            phone: "+1 234 567 8903",
            status: "On Leave",
            joiningDate: "2023-04-20"
        },
        {
            id: "TM004",
            name: "David Lee",
            role: "UI/UX Designer",
            email: "david.lee@example.com",
            phone: "+1 234 567 8904",
            status: "Inactive",
            joiningDate: "2023-01-05"
        },
        {
            id: "TM005",
            name: "Emma Wilson",
            role: "Quality Analyst",
            email: "emma.wilson@example.com",
            phone: "+1 234 567 8905",
            status: "Active",
            joiningDate: "2023-05-12"
        }
    ];

    const handleRowClick = (data) => {
        navigate(`/${role}/addMembers`);
    };


    return (
        <PageCont>
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-3">
                    <Heading text="Team Members" />
                </div>
                <Button
                    type="submit"
                    variant="filled"
                    className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center justify-center bg-cstm-blue"
                    onClick={() => path.changeEndPoint("addMembers")}
                >
                    <Plus className="pr-1" />
                    Add Members
                </Button>
            </div>
            <div className="mt-4">
                <DataTable
                    data={TeamMembers}
                    columns={allMembers}
                    customStyles={tableStyle}
                    onRowClicked={handleRowClick}
                />
            </div>
        </PageCont>
    );
}

export default TeamMembers;