import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allCustomers: null,
};

const customerSlice = createSlice({
    name: "customerDetails",
    initialState,
    reducers: {
        setCustomers: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;



export const getAllCustomers = (setIsLoading) => {
    return async (dispatch) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get("/user/getAll");

            if (response.status === 200) {
                // console.log("response is ", response);
                setIsLoading(false)
                const data = response?.data;

                // Create new array with only required fields
                const customers = data.map((item) => ({
                    _id: item?._id || "",
                    name: item?.name || "",
                    profile: item?.profile || "",
                    email: item?.email || "",
                    mobile: item?.mobile || "",
                }));

                console.log("filtered customers:", customers);

                // Dispatch new array
                dispatch(setCustomers({ allCustomers: customers.reverse() }));

                // You can also call getAllLeads if needed
                // dispatch(getAllLeads());
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            toast.error(message);
        }
    };
};






export const getCustomerById = (payload, callback = () => { }, setCustomerDataLoading) => {
    return async (dispatch) => {
        try {
            setCustomerDataLoading(true)

            const response = await axiosInstance.post("/user/getOne", { _id: payload });
            if (response.status === 200) {
                setCustomerDataLoading(false)
                console.log("response is ", response.data)
                // toast.success(message);
                callback(true , response.data)
            }
        } catch (error) {
            setCustomerDataLoading(false)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            toast.error(message);
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

            const response = await axiosInstance.post("/product/updat", payload);
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


