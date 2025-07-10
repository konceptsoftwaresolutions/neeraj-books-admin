import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allOrders: null,
    shipNowBtnLoader: false,
    generateLabelLoder: false,
    filters: {},

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
        setOrderFilters: (state, action) => {
            state.filters = action.payload;
        },
    },
});

export const { setOrder, setOrderFilters } = orderSlice.actions;
export default orderSlice.reducer;

export const getAllOrders = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/order/getAllOrders', payload);
            if (response.status === 200) {
                const data = response?.data?.orders;
                console.log(response)
                dispatch(setOrder({ allOrders: data }))
                callback(true, data)
            }
        } catch (error) {
            let message = "ERROR";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data
            }
            toast.error(message)
        }
    }
}


export const getFilteredOrders = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/order/getOrdersFiltered', payload);
            if (response.status === 200) {
                const data = response?.data?.orders;
                console.log(response)
                dispatch(setOrder({ allOrders: data }))
                callback(true, data)
            }
        } catch (error) {
            let message = "ERROR";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data
            }
            toast.error(message)
        }
    }
}

export const getOrderById = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/order/getOrderById', { id: payload });
            if (response.status === 200) {
                const data = response?.data?.order;
                console.log(response)

                callback(true, response?.data)
            }
        } catch (error) {
            let message = "ERROR";
            if (error?.hasOwnProperty("response")) {
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


export const cancelOrder = (payload, callback = () => { }, setCancelOrderLoader) => {
    return async (dispatch) => {
        try {
            setCancelOrderLoader(true)
            const response = await axiosInstance.post("/order/makeOrderCancel", { id: payload });
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Order Cancelled successfully!";
                toast.success(message);
                callback(true)
                setCancelOrderLoader(false)
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data;
            }
            toast.error(message);
            setCancelOrderLoader(false)
        }
    };
};

export const createShippingOrder = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            dispatch(setOrder({ shipNowBtnLoader: true }))
            const response = await axiosInstance.post("/order/create-shipping-order", payload);
            if (response.status === 200) {
                dispatch(setOrder({ shipNowBtnLoader: false }))
                console.log("response is ", response)
                const message = response.data?.message || "Successfull !";
                callback(true)
                toast.success(message);
            }
        } catch (error) {
            console.log(error)
            dispatch(setOrder({ shipNowBtnLoader: false }))
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data;
            }
            // callback(error);
            toast.error(message);
        } finally {
            dispatch(setOrder({ shipNowBtnLoader: false }))
        }
    };
};


export const generateLabelShiprocket = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            dispatch(setOrder({ generateLabelLoder: true }))
            const response = await axiosInstance.post("/order/generate-label", payload);
            if (response.status === 200) {
                dispatch(setOrder({ generateLabelLoder: false }))
                const link = response.data
                console.log(link)
                window.open(link, "_blank");

            }
        } catch (error) {
            console.log(error)
            dispatch(setOrder({ generateLabelLoder: false }))
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data;
            }
            // callback(error);
            toast.error(message);
        } finally {
            dispatch(setOrder({ generateLabelLoder: false }))
        }
    };
};





export const getTrackingOrder = (code, callback = () => { }) => {
    return async (dispatch) => {
        try {
            dispatch(setOrder({ generateLabelLoder: true }))
            const response = await axiosInstance.post(`/order/track-shipping-awb/${code}`);
            if (response.status === 200) {
                dispatch(setOrder({ generateLabelLoder: false }))
                const link = response.data
                console.log(link)
                window.open(link, "_blank");

            }
        } catch (error) {
            console.log(error)
            dispatch(setOrder({ generateLabelLoder: false }))
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data;
            }
            // callback(error);
            toast.error(message);
        } finally {
            dispatch(setOrder({ generateLabelLoder: false }))
        }
    };
};




export const createOnSiteDiscount = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/order/onsiteDiscount", payload);
            if (response.status === 200) {
                console.log("response is ", response.data)
                const message = response.data?.message || "Successfull !";
                callback(true)
                toast.success(message);
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data;
            }
            toast.error(message || "Error Occurred");
        }
    };
};



export const getAllCustomerUser = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/order/getAllOrders', payload);
            if (response.status === 200) {
                const data = response?.data?.orders;
                console.log(response)
                dispatch(setOrder({ allOrders: data }))
                callback(true, data)
            }
        } catch (error) {
            let message = "ERROR";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data
            }
            toast.error(message)
        }
    }
}