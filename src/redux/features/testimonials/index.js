import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allTestimonials: null,
};

const testimonialSlice = createSlice({
    name: "testimonialDetails",
    initialState: initialState,
    reducers: {
        setTestimonials(state, action) {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setTestimonials } = testimonialSlice.actions;
export default testimonialSlice.reducer;

export const getAllTestimonials = () => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/testimonial/getAll");
            if (response.status === 200) {
                const data = response.data.data;
                console.log(data)
                dispatch(setTestimonials({ allTestimonials: data }))
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    };
};

export const addTestimonial = ({ formData }, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.postForm("/testimonial/create", formData);
            if (response.status === 201) {
                console.log("response is ", response)
                const message = response.data?.message || "Book added successfully!";
                callback(true);

                toast.success(message);
                dispatch(getAllTestimonials());
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



export const deleteTestimonial = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/testimonial/dele", payload);
            if (response.status === 201) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";
                callback(true);

                toast.success(message);
                dispatch(getAllTestimonials());
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
