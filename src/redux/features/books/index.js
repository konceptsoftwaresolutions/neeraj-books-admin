import { createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allBooks: null,
    brandNames: null,
};

const bookSlice = createSlice({
    name: "bookDetails",
    initialState,
    reducers: {
        setBook: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setBook } = bookSlice.actions;
export default bookSlice.reducer;


export const getAllBooks = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/product/getAll");
            if (response.status === 200) {
                const allBooks = response?.data?.reverse();
                dispatch(setBook({ allBooks: allBooks }))
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

export const getBestSellers = () => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.get("/product/bestsellers");
            if (response.status === 200) {
                const data = response.data.books;
                // console.log("best sellers", data)
                dispatch(setBook({ bestSellers: data }))
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    };
};

export const addBook = ({ formData, setAddLoader = () => { }, callback = () => { } }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.postForm("/product/create", formData);
            if (response.status === 201) {
                console.log("response is ", response)
                const message = response.data?.message || "Book added successfully!";
                callback(true);
                setAddLoader(false)
                toast.success(message);
                dispatch(getAllBooks());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            callback(false);
            setAddLoader(false)
            toast.error(message);
        } finally {
            setAddLoader(false)
        }
    };
};

export const updateBook = ({ formData }, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.postForm("/product/update", formData);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Book added successfully!";

                callback(true);

                toast.success(message);
                dispatch(getAllBooks());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            callback(false);
            toast.error(message);
        } finally {

        }
    };
};

export const deleteBook = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/delete", payload);
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
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};

export const uploadBulkUploadExcel = (formData) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.postForm("/product/importExcel", formData);
            if (response.status === 201) {
                console.log("response is ", response)
                const message = response.data?.message || "Uploaded successfully!";

                dispatch(getAllBooks());
                toast.success(message);
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

export const getSamplePaperCover = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/get-solved-sample-paper-cover", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });
            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(true, imageUrl);
                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            // callback(error);
            // toast.error(message);
        } finally {

        }
    };
};
export const getSamplePaperPdfFile = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/get-solved-sample-paper-file", payload, {
                responseType: 'blob', // Expecting a blob response
            });

            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a URL
                const imageUrl = URL.createObjectURL(data);
                return imageUrl; // Directly return the URL
            }
        } catch (error) {
            console.error(error);
            let message = "Error fetching PDF";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message || message;
            }
            // toast.error(message);
        }
    };
};



export const deleteSamplePaperFilePDF = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/delete-sample-paper-file", payload);
            if (response.status === 200) {
                console.log("asdfadsfadsfasdfadsfasdf", response)
                toast.success(response.data.message);
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


export const getSamplePaperData = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/get-solved-sample-paper-by-paperId", { solvedPaperId: payload });
            if (response.status === 200) {
                console.log(response)
                callback(true, response.data.solvedPaper)
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            // toast.error(message);
        } finally {

        }
    };
};



export const getSingleBook = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/getLocalized", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "";
                // toast.success(message);
                const data = response?.data?.localizedContent;
                callback(true, data)
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


export const deletProductAssignment = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/delete-solved-assignment", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";
                // callback(null);

                toast.success(message);
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            toast.error(message);
        } finally {

        }
    };
};

export const deleteMediumBook = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteLocalizedData", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";
                // callback(null);

                toast.success(message);
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            toast.error(message);
        } finally {

        }
    };
};


export const updateEbookExtraAmount = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/utility/updateEbookExtraAmount", payload);
            if (response.status === 200) {
                console.log(response)
                const message = response.data?.message || "Updated successfully!";

                toast.success(message);
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        }
    }
}

export const setBrandName = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/utility/updateStandardBrand", payload);
            if (response.status === 200) {
                console.log(response)
                const message = response.data?.message || "Updated successfully!";

                toast.success(message);
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        }
    }
}

export const getBrandName = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/utility/getStandardBrand");
            if (response.status === 200) {
                console.log(response)
                const data = response?.data?.standardBrand;
                dispatch(setBook({ brandNames: data }))

            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        }
    }
}

export const getEngProductImagesName = (title, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/getProductImagesByTitle", { title })
            if (response.status === 200) {
                console.log(response)
                const imagesArray = response?.data?.images;
                console.log("asdjhfglkdsjfh", imagesArray)
                callback(imagesArray)
            }
        } catch (error) {
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        }
    }
}

export const getHindiProductImagesName = (title, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/getProductHindiImagesByTitle", { title })
            if (response.status === 200) {
                console.log(response)
                const imagesArray = response?.data?.images;

                callback(imagesArray)
            }
        } catch (error) {
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        }
    }
}

export const getEnglishProdImagesLink = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/getProductImageByFileName", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(imageUrl);
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

export const getHindiProdImagesLink = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/getProductHindiImageByFileName", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(imageUrl);
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

export const getEnglishAssignment = (title, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/findProductAssignmentByTitle", title, {
                responseType: 'blob', // Ensure you're expecting a blob response
            })
            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(imageUrl);
            }
        } catch (error) {
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        }
    }
}

export const getHindiAssignment = (title, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/findHindiProductAssignmentByTitle", title, {
                responseType: 'blob', // Ensure you're expecting a blob response
            })
            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(imageUrl);
            }
        } catch (error) {
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        }
    }
}


export const getEnglishEbook = (title, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/findProductEbookByTitle", { title }, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(imageUrl);
            }

        } catch (error) {
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        }
    };
};

export const getHindiEbook = (title, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/findHindiProductEbookByTitle", { title }, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(imageUrl);
            }

        } catch (error) {
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        }
    };
};


export const deleteEnglishVideoPreview = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteVideoPreview", payload);
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
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};

export const deleteHindiVideoPreview = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteVideoPreview", payload);
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
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};

export const deleteEnglishAssignment = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteEnglishAssignment", payload);
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
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};

export const deleteHindiAssignment = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteEnglishAssignment", payload);
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
                message = error?.response?.data?.message;
            }
            // callback(error);
            toast.error(message);
        } finally {

        }
    };
};

export const deleteEnglishEbook = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteEbook", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";
                callback(true);

                toast.success(message);
                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            callback(false);
            toast.error(message);
        } finally {

        }
    };
};

export const deleteHindiEbook = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteHindiEbook", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";
                callback(true);

                toast.success(message);
                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            callback(false);
            toast.error(message);
        } finally {

        }
    };
};


export const deleteProductImage = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteProductImage", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";
                callback(true);

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



export const handleBookOrder = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/setBookSort", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Ordered successfully!";

                toast.success(message);
                dispatch(getAllBooks());
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



export const getAssignmentImage = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/get-assignment-image", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(true, imageUrl);
            }

        } catch (error) {
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        }
    };
};



export const getAssignmentFile = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/get-assignment-file", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(true, imageUrl);
            }

        } catch (error) {
            console.log(error);
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        }
    };
};




export const uploadBulkImages = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.postForm("/product/uploadSingleImage", payload);
            if (response.status === 200) {
                console.log("response is ", response);
                // No toast here anymore
            }
        } catch (error) {
            console.log(error);
            throw error; // Important: rethrow error to handle in onSubmit
        }
    };
};
