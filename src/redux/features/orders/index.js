import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allOrders: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const getAllOrders = () => {
    return async(dispatch) => {
        try{
            const response = await axiosInstance.get('/order/getAll');
            if(response.status === 200) {
                const data = response?.data;
                dispatch(setOrder({allOrders:data}))
            }
        } catch(error){
            let message = "ERROR";
            if(error?.hasOwnProperty("response")){
                message = error?.response?.data
            }
            toast.error(message)
        }
    }
}

export const addOrder = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/order/create", payload)
            if (response.status === 200) {
                console.log(response)
                const message = response.data?.message || "Order added successfully!";
                toast.success(message);
            }
        } catch (error) {
            let message = "ERROR"
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data
            }
            toast.error(message)
        }
    }
}

export const editOrderDetails = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/order/update", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Updated successfully!";
                toast.success(message);
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            toast.error(message);
        } finally {

        }
    };
};

export const deleteOrder = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/order/delete", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";

                toast.success(message);
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
