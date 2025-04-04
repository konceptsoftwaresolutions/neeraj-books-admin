import { createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allCategory: null,
};

const categorySlice = createSlice({
    name: "categoryDetails",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;


export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/category/tree");
            if (response.status === 200) {
                const data = response?.data?.categories;
                console.log(data)
                dispatch(setCategories({ allCategory: data }))
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

export const addCategory = (formData, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.postForm("/category/create", formData);
            if (response.status === 201) {
                console.log("response is ", response)
                const message = response.data?.message || "Category added successfully!";
                callback(true);
                dispatch(getAllCategories())
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


export const editCategory = (formData, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.postForm("/category/edit", formData);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Category added successfully!";
                callback(true);
                dispatch(getAllCategories())
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

export const deleteCategory = (id, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/category/delete", { id });
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Category Deleted successfully!";
                dispatch(getAllCategories())
                toast.success(message);
                // dispatch(getAllLeads());
            }
        } catch (error) {
            // console.log(error)
            let message = error.response.data.message;
            // console.log(message)
            // if (error?.hasOwnProperty("message")) {
            //     message = error?.message;
            // }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};

export const getCategoryById = (id) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/category/getById", { categoryId: id });
            if (response.status === 200) {
                console.log("response is id ", response)
                // const message = response.data?.message || "Category added successfully!";
                const data = response?.data?.category;
                dispatch(setCategories({ categoryForHeirarchy: data }))
                // callback(null);
                // dispatch(getAllCategories())
                // toast.success(message);
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

export const getSingleCategoryBySearch = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/category/search", payload);
            if (response.status === 200) {
                console.log("response is id ", response)
                // const message = response.data?.message || "Category added successfully!";
                const data = response?.data?.category;
                dispatch(setCategories({ categoryForHeirarchy: data }))
                // callback(null);
                // dispatch(getAllCategories())
                // toast.success(message);
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

// export const getCategoryImage = (name , callback = () => {}) => {
//     return async(dispatch) => {
//         try {   
//             const response = await axiosInstance.post(`/category/findCategoryImageByTitle/${name}`)
//             if(response.status === 200 ){

//             }
//         } catch (error) {

//         }
//     }
// }

export const getCategoryImage = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/category/findCategoryImageByTitle", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a URL
                const imageUrl = URL.createObjectURL(data);

                // Pass imageUrl and title to the callback
                callback(imageUrl, payload.title);
            }

        } catch (error) {
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            toast.error(message);
        }
    };
};

// export const editBookDetails = (payload) => {
//     return async (dispatch) => {
//         try {

//             const response = await axiosInstance.post("/product/update", payload);
//             if (response.status === 200) {
//                 console.log("response is ", response)
//                 const message = response.data?.message || "Book added successfully!";
//                 // callback(null);

//                 toast.success(message);
//                 // dispatch(getAllLeads());
//             }
//         } catch (error) {
//             console.log(error)
//             let message = "error";
//             if (error?.hasOwnProperty("message")) {
//                 message = error?.message;
//             }
//             // callback(error);
//             toast.error(message);
//         } finally {

//         }
//     };
// };

// export const deleteBook = (payload) => {
//     return async (dispatch) => {
//         try {

//             const response = await axiosInstance.post("/product/create", payload);
//             if (response.status === 200) {
//                 console.log("response is ", response)
//                 const message = response.data?.message || "Deleted successfully!";
//                 // callback(null);

//                 toast.success(message);
//                 // dispatch(getAllLeads());
//             }
//         } catch (error) {
//             console.log(error)
//             let message = "error";
//             if (error?.hasOwnProperty("response")) {
//                 message = error?.response?.data?.message;
//             }
//             // callback(error);
//             toast.error(message);
//         } finally {

//         }
//     };
// };


export const handleCategoryOrder = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/category/setSort", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Sorted successfully!";

                toast.success(message);
                dispatch(getAllCategories());
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