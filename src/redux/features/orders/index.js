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




export const getAllBulkOrders = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/bulkOrder/getAll', payload);
            if (response.status === 200) {
                const data = response?.data?.orders;
                dispatch(setOrder({ allBulkOrders: data }))
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



export const getBulkOrderById = (id, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/bulkOrder/getById', { id: id });
            if (response.status === 200) {
                callback(true, response.data.order)
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


export const getShippingCharges = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/order/getShippingCharges", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                toast.success('Shipping Updated')
                callback(true, response.data.rate);
            }

        } catch (error) {
            console.log(error)
            if (error.status === 500) {
                callback(false, "not_available")
            }
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
        }
    };
};



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


export const bulkOrderCancel = (payload, setLoader, callback = () => { },) => {
    return async (dispatch) => {
        try {
            setLoader((prev) => ({
                ...prev,
                cancelLoader: true,
            }));
            const response = await axiosInstance.post("/bulkOrder/makeOrderCancel", { id: payload });
            if (response.status === 200) {
                setLoader((prev) => ({
                    ...prev,
                    cancelLoader: false,
                }));
                const message = response.data?.message || "Order Cancelled successfully!";
                toast.success(message);
                callback(true)

            }
        } catch (error) {
            setLoader((prev) => ({
                ...prev,
                cancelLoader: false,
            }));
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data;
            }
            toast.error(message);

        } finally {
            setLoader((prev) => ({
                ...prev,
                cancelLoader: false,
            }));
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


export const createShippingBulkOrder = (payload, setLoader, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setLoader((prev) => ({
                ...prev,
                shipNowLoader: true
            }))
            const response = await axiosInstance.post("/bulkOrder/create-shipping-order", payload);
            if (response.status === 200) {
                setLoader((prev) => ({
                    ...prev,
                    shipNowLoader: false
                }))
                console.log("response is ", response)
                const message = response.data?.message || "Successfull !";
                callback(true)
                toast.success(message);
            }
        } catch (error) {
            console.log(error)
            setLoader((prev) => ({
                ...prev,
                shipNowLoader: false
            }))
            toast.error(error.response.data.error);
        } finally {
            setLoader((prev) => ({
                ...prev,
                shipNowLoader: false
            }))
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



export const generateLabelBulkOrderShiprocket = (payload, setLoader, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setLoader((prev) => ({
                ...prev,
                labelLoader: true,
            }));
            const response = await axiosInstance.post("/bulkOrder/generate-label", payload);
            if (response.status === 200) {
                setLoader((prev) => ({
                    ...prev,
                    labelLoader: false,
                }));
                const link = response.data
                console.log(link)
                window.open(link, "_blank");

            }
        } catch (error) {
            setLoader((prev) => ({
                ...prev,
                labelLoader: false,
            }));

            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data;
            }
            // callback(error);
            toast.error(message);
        } finally {
            setLoader((prev) => ({
                ...prev,
                labelLoader: false,
            }));
        }
    };
};




export const getTrackingOrder = (code, callback = () => { }) => {
    return async (dispatch) => {
        try {
            dispatch(setOrder({ generateLabelLoder: true }))
            const response = await axiosInstance.get(`/order/track-shipping-awb/${code}`);
            if (response.status === 200) {
                // dispatch(setOrder({ generateLabelLoder: false }))
                callback(true, response.data)

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


export const getTrackingOrderForBulk = (code, setLoader, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setLoader((prev) => ({
                ...prev,
                trackLoader: true,
            }));
            const response = await axiosInstance.post(`/bulkOrder/track-order-website`, {
                orderId: code
            });
            if (response.status === 200) {
                callback(true, response.data)
                setLoader((prev) => ({
                    ...prev,
                    trackLoader: false,
                }));
            }
        } catch (error) {
            setLoader((prev) => ({
                ...prev,
                trackLoader: false,
            }));
            toast.error(error.response.data.error);
        } finally {
            setLoader((prev) => ({
                ...prev,
                trackLoader: false,
            }));
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




export const generateSingleBulkOrder = (payload, setIsLoading, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post('/bulkOrder/create', payload);
            if (response.status === 201) {
                setIsLoading(false)
                console.log(response)
                callback(true)
                toast.success(response.data.message || 'Created Successfully');
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            // setIsLoading(false)
            // let message = "ERROR";
            // if (error?.hasOwnProperty("response")) {
            //     message = error?.response?.data
            // }
            // toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }
}




export const bulkOrderUpdate = (payload, setLoader, callback = () => { },) => {
    return async (dispatch) => {
        try {
            setLoader((prev) => ({
                ...prev,
                updateLoader: true
            }))
            const response = await axiosInstance.post("/bulkOrder/update", payload);
            if (response.status === 200) {
                setLoader((prev) => ({
                    ...prev,
                    updateLoader: false
                }))
                const message = response.data?.message || "Order Updated successfully!";
                toast.success(message);
                callback(true)

            }
        } catch (error) {
            setLoader((prev) => ({
                ...prev,
                updateLoader: false
            }))
            toast.error(error.response.data.message);
        } finally {
            setLoader((prev) => ({
                ...prev,
                updateLoader: false
            }))
        }
    };
};


export const normalOrderUpdate = (payload, setUpdateLoader, callback = () => { },) => {
    return async (dispatch) => {
        try {
            setUpdateLoader(true)
            const response = await axiosInstance.post("/order/editOrde", payload);
            if (response.status === 200) {
                setUpdateLoader(false)
                const message = response.data?.message || "Order Updated successfully!";
                toast.success(message);
                callback(true)
            }
        } catch (error) {
            console.log(error)
            setUpdateLoader(false)
            toast.error(error.response.data.message);
        } finally {
            setUpdateLoader(false)
        }
    };
};