import { createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allSliders: null,
};

const sliderSlice = createSlice({
    name: "sliderDetails",
    initialState,
    reducers: {
        setSliders: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setSliders } = sliderSlice.actions;
export default sliderSlice.reducer;


export const getAllSliders = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/slider/getAll");
            if (response.status === 200) {
                const data = response?.data?.sliders;
                console.log(response)
                dispatch(setSliders({ allSliders: data }))
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


export const addSlider = ({ formData }, callback = () => { }) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.postForm("/slider/create", formData);
            if (response.status === 201) {
                console.log("response is ", response)
                const message = response.data?.message || "Book added successfully!";
                // callback(null);

                toast.success(message);
                callback(true);

                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // callback(error);
            callback(false);

            toast.error(message);
        } finally {

        }
    };
};

export const deleteSlider = (payload) => {
    return async (dispatch) => {
        try {

            const response = await axiosInstance.post("/slider/delete", { id: payload });
            if (response.status === 201) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";
                // callback(null);

                toast.success(message);
                dispatch(getAllSliders());
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

export const createInsideSlider = ({ formData }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.postForm("/slider/addStandardSlider", formData)
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || " added successfully!";
                // callback(null);

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
        }
    }
}

export const deleteStandardSliderImage = (index, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/slider/removeStandardSlider', { index });
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Deleted successfully!";
                // callback(null);
                callback(true)
                toast.success(message);

            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            callback(false);
            toast.error(message);
        }
    }
}



export const getStandardSlider = (callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/slider/getStandardSlider");
            if (response.status === 200) {
                const data = response?.data?.slider;
                console.log(response)
                callback(true, data)
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

export const getStandardImgSlider = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/slider/findStandardImageByTitle", payload, {
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


export const createHomePopUp = ({ formData }, setIsLoading, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.postForm("/popup/update", formData);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";

                toast.success(message);
                callback(true);
                setIsLoading(false)

                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // callback(error);
            callback(false);
            setIsLoading(false)
            toast.error(message);
        } finally {
            setIsLoading(false)
        }
    }
}

export const getHomePopUp = (callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/popup/get");
            if (response.status === 200) {
                console.log(response);
                callback(true, response?.data?.popup);
            }
        } catch (error) {
            let message = 'ERROR';
            if (error.hasOwnProperty('response')) {
                message = error?.response?.data;
            }
            // toast.error(message);
            if (callback) {
                callback(false); // Pass the error to the callback
            }
        }
    };
};

export const getHomePopupImage = (title, callback) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get(`/popup/download/${title}`, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });
            if (response.status === 200) {
                const data = response?.data;
                const imageUrl = URL.createObjectURL(data); // Convert blob to URL
                console.log("fetched ", imageUrl)
                callback(imageUrl); // Send imageUrl via callback ✅
            }
        } catch (error) {
            let message = 'ERROR';
            if (error.hasOwnProperty('response')) {
                message = error?.response?.data;
            }
            // toast.error(message);
            if (callback) {
                callback(false); // Pass the error to the callback
            }
        }
    };
};


export const getAISectionData = (callback) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/popup/getAiDiv");
            if (response.status === 200) {
                console.log(response);
                const data = response?.data?.popup;
                console.log(data, "0000000000")
                if (callback) {
                    callback(true, data); // Pass the data to the callback
                }
            }
        } catch (error) {
            let message = 'ERROR';
            if (error.hasOwnProperty('response')) {
                message = error?.response?.data;
            }
            // toast.error(message);
            if (callback) {
                callback(false); // Pass the error to the callback
            }
        }
    };
};

export const getAppPopUp = (callback) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/popup/getRegistrationPopup");
            if (response.status === 200) {
                console.log(response);
                console.log(response.data)
                callback(true, response.data.popup);
            }
        } catch (error) {
            let message = 'ERROR';
            if (error.hasOwnProperty('response')) {
                message = error?.response?.data;
            }
            // toast.error(message);
            if (callback) {
                callback(false); // Pass the error to the callback
            }
        }
    };
};

export const getAppPopupImage = (title, callback) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get(`/popup/downloadRegistration/${title}`, {
                responseType: 'blob', // Ensure you're expecting a blob response
            });
            if (response.status === 200) {
                const data = response?.data;
                const imageUrl = URL.createObjectURL(data); // Convert blob to URL
                console.log("fetched ", imageUrl)
                callback(imageUrl); // Send imageUrl via callback ✅
            }
        } catch (error) {
            let message = 'ERROR';
            if (error.hasOwnProperty('response')) {
                message = error?.response?.data;
            }
            // toast.error(message);
            if (callback) {
                callback(false); // Pass the error to the callback
            }
        }
    };
};

export const createAppPopUp = ({ formData }, callback = () => { }, setIsLoading) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.postForm("/popup/updateRegistrationPopup", formData);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
                callback(true);

                toast.success(message);
                setIsLoading(false)

                // dispatch(getAllLeads());
            }
        } catch (error) {
            console.log(error)
            let message = "error";
            if (error?.hasOwnProperty("message")) {
                message = error?.message;
            }
            // callback(error);
            // callback(false);
            setIsLoading(false)

            toast.error(message);
        } finally {
            setIsLoading(false)
        }
    }
}



export const createDiscountPopUp = (payload, callback = () => { }, setIsLoading) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/popup/updateTextPopup", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
                callback(true);
                setIsLoading(false)
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
            setIsLoading(false)
            toast.error(message);
        } finally {
            setIsLoading(false)
        }
    }
}


export const createYoutubePopUp = (payload, setIsLoading) => {
    return async (dispatch) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.post("/popup/updateSecondTextPopup", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
                // callback(null);

                toast.success(message);
                setIsLoading(false)

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
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
}


export const getYTPopUpData = (callback = () => {
}) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/popup/getSecondTextPopup");
            if (response.status === 200) {
                console.log(response);
                const data = response?.data?.popup;
                callback(true, data);
            }
        } catch (error) {
            let message = 'ERROR';
            if (error.hasOwnProperty('response')) {
                message = error?.response?.data;
            }
            // toast.error(message);
            if (callback) {
                callback(false); // Pass the error to the callback
            }
        }
    };
};


export const getHeroSectionData = (callback) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/popup/getHeroDiv");
            if (response.status === 200) {
                console.log("hero popup ", response);
                const data = response?.data?.popup;
                if (callback) {
                    callback(true, data); // Pass the data to the callback
                }
            }
        } catch (error) {
            let message = 'ERROR';
            if (error.hasOwnProperty('response')) {
                message = error?.response?.data;
            }
            // toast.error(message);
            if (callback) {
                callback(false); // Pass the error to the callback
            }
        }
    };
};


export const createAIsection = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/popup/updateAiDiv", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";

                toast.success(message);
                callback(true);

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
        }
    }
}



export const getSliderImage = ({ payload, callback = () => { } }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/slider/findImageByTitle", payload, {
                responseType: 'blob', // Important: Ensure you're expecting a blob response
            });
            if (response.status === 200) {
                const data = response?.data;


                // Convert blob to a URL
                const imageUrl = URL.createObjectURL(data);

                console.log("Image URL:", imageUrl);

                // Optionally, you could also pass this URL to the callback
                callback(imageUrl, payload.title);

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


export const createHeroSection = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/popup/updateHeroDiv", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
                toast.success(message);
            }
        } catch (error) {
            // console.log(error)
            toast.error(error?.response?.data?.message);
        }
    }
}


export const getDiscountPopUpData = (callback) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/popup/getTextPopup");
            if (response.status === 200) {
                const data = response?.data?.popup;
                if (callback) {
                    callback(true, data); // Pass the data to the callback
                }
            }
        } catch (error) {
            let message = 'ERROR';
            if (error.hasOwnProperty('response')) {
                message = error?.response?.data;
            }
            // toast.error(message);
            if (callback) {
                callback(false); // Pass the error to the callback
            }
        }
    };
};