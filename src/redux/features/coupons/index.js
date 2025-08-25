import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allCoupons: null,
};

const couponSlice = createSlice({
    name: "couponDetails",
    initialState: initialState,
    reducers: {
        setCoupon(state, action) {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setCoupon } = couponSlice.actions;
export default couponSlice.reducer;

export const getAllCoupons = () => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/utility/getAllCoupon");
            if (response.status === 200) {
                const allCoupons = response.data.foundCoupons;
                console.log(allCoupons)
                dispatch(setCoupon({ allCoupons: [...allCoupons].reverse() }))
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    };
};

export const createCoupon = (payload, setIsLoading) => {
    return async (dispatch) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post("/utility/addCoupon", payload);
            if (response.status === 201) {
                // console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
                // callback(true);
                toast.success(message);
                dispatch(getAllCoupons())
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // callback(error);
            setIsLoading(false)
            toast.error(message);
        }
    };
};

export const editCoupon = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/utility/editCoupon", payload);
            if (response.status === 200) {

                const message = response.data?.message || "Edited successfully!";
                // callback(null);
                toast.success(message);
                dispatch(getAllCoupons())

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

export const initiateRefund = (payload, setIsLoading, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post("/order/initiate-refund", payload);
            if (response.status === 200) {
                console.log(response)
                const message = response.data?.message + "-" + response?.data?.refundData?.msg || "Initiated successfully!";
                toast.success(message);
                setIsLoading(false)
                callback(true)
            }
        } catch (error) {
            setIsLoading(false)
            // console.log(error)
            if (error.response.data.error) {
                toast.error(error.response.data.error);

            } else {
                toast.error(error.response.data);

            }

            // callback(error);
            callback(false)
        } finally {
            setIsLoading(false)
            callback(false)
        }
    };
};