import { createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allBooks: null,
    brandNames: null,
    menuExpanded: true,
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


export const getAllBooks = (callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/product/getAll");
            if (response.status === 200) {
                const allBooks = response?.data?.reverse();
                callback(true, allBooks)
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


export const getAllProducts = (callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/product/getAll");
            if (response.status === 200) {
                const allBooks = response?.data?.reverse();
                callback(true, allBooks)

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


export const getAllEbooks = (callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/product/all-ebooks-listing");
            if (response.status === 200) {
                const allBooks = response?.data?.reverse();
                callback(true, allBooks)

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



export const getAllOldBooks = (callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/product/oldbooksdata");
            if (response.status === 200) {
                const allBooks = response?.data?.reverse();
                callback(true, allBooks)
                // dispatch(setBook({ allBooks: allBooks }))
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



export const getAIQuesPaper = (payload, setLoading, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setLoading(true)
            const response = await axiosInstance.post("/product/fetchPreviousPdf", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });
            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // console.log(imageUrl)
                // Pass imageUrl and title to the callback
                callback(true, imageUrl);
                setLoading(false)
                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            let message = "error";
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message;
            }
            callback(false);
            // toast.error(message);
        }
    };
};


export const uploadAIQuesPaper = ({
    formData,
    callback = () => { },
}) => {
    return async (dispatch) => {
        let toastId = null;
        try {
            // Start loading toast
            toastId = toast.loading("Uploading the file");

            // Make API call
            const response = await axiosInstance.postForm("/product/savePreviousYearPdf", formData);

            if (response.status === 201) {
                const message = response.data?.message || "Added successfully!";
                toast.success(message);
                toast.dismiss(toastId); // Dismiss loading toast
                callback(true);
            }
        } catch (error) {
            const message = error?.response?.data?.message || "An error occurred.";
            toast.error(message);
            toast.dismiss(toastId); // Dismiss loading toast even if there's an error
            callback(false);
        }
    };
};

export const deleteEnglishAIQuesPaper = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deletePreviousPdf", payload);
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

export const deleteHindiAIQuesPaper = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteHindiAIQuestionPaper", payload);
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





export const updateBook = ({ formData }, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.postForm("/product/update", formData);
            if (response.status === 200) {
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

export const getEngProductImagesName = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/getProductImagesByTitle", payload)
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

export const getHindiProductImagesName = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/getProductHindiImagesByTitle", payload)
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


export const getOldEngProductImagesName = (title, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/getOldProductImagesByTitle", { title })
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

export const getOldHindiProductImagesName = (title, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/getOldProductHindiImagesByTitle", { title })
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





export const getEnglishProdImagesLink = (payload, setImgLoading = () => { }, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setImgLoading(true)
            const response = await axiosInstance.post("/product/getProductImageByFileName", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                setImgLoading(false)
                const data = response?.data;
                const imageUrl = URL.createObjectURL(data);
                callback(imageUrl);
            }

        } catch (error) {
            setImgLoading(false)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        } finally {
            setImgLoading(false)
        }
    };
};

export const getHindiProdImagesLink = (payload, setImgLoading = () => { }, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setImgLoading(true)
            const response = await axiosInstance.post("/product/getProductHindiImageByFileName", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                setImgLoading(false)
                const data = response?.data;
                const imageUrl = URL.createObjectURL(data);
                callback(imageUrl);
            }

        } catch (error) {
            setImgLoading(false)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        } finally {
            setImgLoading(false)
        }
    };
};



export const getOldEnglishProdImagesLink = (payload, setImgLoading = () => { }, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setImgLoading(true)
            const response = await axiosInstance.post("/product/getOldProductImageByFileName", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                setImgLoading(false)
                const data = response?.data;
                const imageUrl = URL.createObjectURL(data);
                callback(imageUrl);
            }

        } catch (error) {
            setImgLoading(false)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        } finally {
            setImgLoading(false)
        }
    };
};

export const getOldHindiProdImagesLink = (payload, setImgLoading = () => { }, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setImgLoading(true)
            const response = await axiosInstance.post("/product/getOldProductHindiImageByFileName", payload, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                setImgLoading(false)
                const data = response?.data;
                const imageUrl = URL.createObjectURL(data);
                callback(imageUrl);
            }

        } catch (error) {
            setImgLoading(false)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        } finally {
            setImgLoading(true)
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


export const getEnglishEbook = (title, setEbookLoader, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setEbookLoader(true)
            const response = await axiosInstance.post("/product/findProductEbookByTitle", { title }, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {

                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(imageUrl);
                setEbookLoader(false)
            }

        } catch (error) {
            console.log(error);
            setEbookLoader(false)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // toast.error(message);
        }
    };
};


export const getHindiEbook = (title, setEbookLoader, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setEbookLoader(true)
            const response = await axiosInstance.post("/product/findHindiProductEbookByTitle", { title }, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });

            if (response.status === 200) {
                const data = response?.data;
                // Convert blob to a 
                const imageUrl = URL.createObjectURL(data);
                // Pass imageUrl and title to the callback
                callback(imageUrl);
                setEbookLoader(false)
            }

        } catch (error) {
            // console.log(error);
            setEbookLoader(false)
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


export const deleteOldProductImage = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/product/deleteOldProductImage", payload);
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





export const checkCouponAvailability = (title, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/utility/getCouponByCouponCodeForAdminUse", { couponCode: title });
            if (response.status === 200) {
                const data = response?.data?.message
                callback(true, response?.data?.coupon?.discount)

            }
        } catch (error) {
            callback(false)
        }
    };
};


export const getEbookNamesList = (payload, setEbookLoader, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setEbookLoader(true)
            const response = await axiosInstance.post("/product/list-ebooks", payload);
            if (response.status === 200) {
                setEbookLoader(false)
                callback(true, response.data.ebooks)
                // dispatch(getAllLeads());
            }
        } catch (error) {
            setEbookLoader(false)
            console.log(error)

        }
    };
};



export const downloadSingleEbook = (payload, callback = () => { }) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading your EBook...");

        try {
            const response = await axiosInstance.post(
                "/product/download-ebook",
                payload,
                { responseType: "blob" } // Expect blob
            );

            if (response.status === 200) {
                const data = response.data;
                const fileUrl = URL.createObjectURL(data);

                // Open in new tab
                window.open(fileUrl, "_blank");

                toast.success("Your eBook is ready!", { id: toastId });
                callback(true, fileUrl);
            } else {
                toast.error("Failed to download eBook.", { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while downloading.", { id: toastId });
        }
    };
};




export const deleteSingleEbook = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/product/delete-ebook", payload);
            if (response.status === 200) {
                toast.success(response.data.message)
                callback(true)
            }
        } catch (error) {
            console.log(error.response.data.message)

        }
    };
};


export const updateUserProfile = (payload, setIsLoading, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post("/user/edit-user", payload);
            if (response.status === 200) {
                console.log(response)
                setIsLoading(false)
                const message = response.data.message;
                toast.success(message);
                callback(true);
            }
        } catch (error) {
            setIsLoading(false)
            toast.error(error.response.data.message);
        }
        finally {
            setIsLoading(false)
        }
    };
};