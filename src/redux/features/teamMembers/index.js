import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allUsers: null,
};

const teamMembersSlice = createSlice({
    name: "teamMembersDetails",
    initialState,
    reducers: {
        setTeamMembers: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setTeamMembers } = teamMembersSlice.actions;
export default teamMembersSlice.reducer;



export const getAllTeamMembers = () => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/user/getAll",);
            if (response.status === 200) {
                console.log("response is ", response)
                const data = response?.data;
                // callback(null);

                dispatch(setTeamMembers({ allUsers: data }))
                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};

export const addTeamMember = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/user/create", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "User added successfully!";
                // callback(null);

                toast.success(message);
                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};

export const editBookDetails = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/update", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Book added successfully!";
                // callback(null);

                toast.success(message);
                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};

export const deleteTeamMember = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/user/delete", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";
                // callback(null);

                toast.success(message);
                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data;
            }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};