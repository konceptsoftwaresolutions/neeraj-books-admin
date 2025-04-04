import { createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allBooksData: null,
};

const allBooksSlice = createSlice({
    name: "allBooksDetails",
    initialState,
    reducers: {
        setAllBooks: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setAllBooks } = allBooksSlice.actions;
export default allBooksSlice.reducer;