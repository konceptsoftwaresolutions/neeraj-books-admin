import { createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allUsers: null,
};

const allUsersSlice = createSlice({
    name: "allUserDetails",
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/user/getAll");
            if (response.status === 200) {
                console.log(response)
                const allBooks = response?.data?.reverse();
                dispatch(setAllUsers({ allUsers: allBooks }))
            }
        } catch (error) {
            console.log(error)
            let message = "Error"
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data
            }
            toast.error(message)
        }
    }
}

export const getUserCartItems = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/cart-get", { userId: payload });
            if (response.status === 200) {
                callback(true, response.data)
            }
        } catch (error) {
            console.log(error)
            let message = "Error"
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data
            }
            toast.error(message)
        }
    }
}

