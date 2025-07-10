import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allQuiz: null,
};

const quizSlice = createSlice({
    name: "quizDetails",
    initialState: initialState,
    reducers: {
        setQuiz(state, action) {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setQuiz } = quizSlice.actions;
export default quizSlice.reducer;

export const getAllQuiz = (callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/product/getQuizzes");
            if (response.status === 200) {
                const allQuiz = response.data.quizzesByBook;
                callback(true, allQuiz)
                // dispatch(setQuiz({ allQuiz: allQuiz }))
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    };
};

export const addQuiz = (formData, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/addQuiz", formData);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
                // callback(null);
                toast.success(message);

                callback(true)
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


export const deleteQuizQuestion = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/deleteQuiz", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
                // callback(null);
                toast.success(message);

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