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


export const createHomePopUp = ({ formData }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.postForm("/popup/update", formData);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
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
        }
    }
}

export const createAppPopUp = ({ formData }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.postForm("/popup/updateRegistrationPopup", formData);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
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
            // callback(false);

            toast.error(message);
        }
    }
}



export const createDiscountPopUp = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/popup/updateTextPopup", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
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


export const createYoutubePopUp = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/popup/updateSecondTextPopup", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
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


export const createAIsection = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/popup/updateAiDiv", payload);
            if (response.status === 200) {
                console.log("response is ", response)
                const message = response.data?.message || "Added successfully!";
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