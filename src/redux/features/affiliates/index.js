import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allAffiliates: null,
};

const affiliateSlice = createSlice({
    name: "affiliate",
    initialState,
    reducers: {
        setAffiliates: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
});

export const { setAffiliates } = affiliateSlice.actions;
export default affiliateSlice.reducer;

export const getAllAffiliates = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/user/affiliate/all', payload);
            if (response.status === 200) {
                const data = response?.data?.affiliates?.reverse();
                dispatch(setAffiliates({ allAffiliates: data }))
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

export const getAllAffiliateById = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/user/affiliate/single', { id: payload });
            if (response.status === 200) {
                const data = response?.data?.affiliate
                console.log(response)
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



export const getAffiliateTiles = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/user/affiliate/aggregates', { id: payload });
            if (response.status === 200) {

                const data = response?.data?.data
                console.log(data)
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


export const getQRImageAffiliate = (payload, callback = () => {}) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(
        "/user/affiliate/payment-picture",
        { id: payload },
        {
          responseType: "blob", // important for getting blob data
        }
      );

      // Check if the response is actually an image blob
      const contentType = response.headers["content-type"];
      if (response.status === 200 && contentType?.includes("image")) {
        const blob = new Blob([response.data], { type: contentType || "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        callback(true, imageUrl);
      } else {
        // Not an image, probably an error message
        callback(false, null);
      }
    } catch (error) {
      console.log(error);
      let message = "ERROR";

      // If the server returned JSON instead of an image
      if (error?.response?.data) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const result = JSON.parse(reader.result);
            console.log(result)
            if (result?.message === "Payment picture not found for this user.") {
              callback(false, null); // handle "no image" case
              toast.error(result?.message);
              return;
            }
          } catch (e) {
            // Not JSON
          }
        };
        reader.readAsText(error.response.data);
      }

    //   toast.error(message);
      callback(false, null);
    }
  };
};



// /user/affiliate/orders
export const getSingleAffiliateOrder = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/user/affiliate/orders', { id: payload });
            if (response.status === 200) {

                const data = response?.data?.orders
                console.log(data)
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

export const getSingleAffiliatePayments = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/user/affiliate/payment', { affiliateId: payload });
            if (response.status === 200) {

                const data = response?.data?.payments
                console.log(response.data)
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




export const addSingleAffiliatePayment = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/user/affiliate/payment/add', payload);
            if (response.status === 201) {

                console.log(response)
                toast.success(response?.data?.message)
                callback(true)
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


export const updateTheAffiliatePaymnet = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/user/affiliate/update', payload);
            if (response.status === 200) {
                // console.log(data)
                callback(true)
            }
        } catch (error) {
            let message = "ERROR";
            console.log(error)
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message
            }
            toast.error(message)
        }
    }
}



export const updateTheAffiliateDetails = (payload, setIsAffiliateLoader, callback = () => { }) => {
    return async (dispatch) => {
        try {
            setIsAffiliateLoader(true)
            const response = await axiosInstance.postForm('/user/affiliate/update-by-admin', payload);
            if (response.status === 200) {
                // console.log(data)
                setIsAffiliateLoader(false)

                callback(true)
            }
        } catch (error) {
            setIsAffiliateLoader(false)

            let message = "ERROR";
            console.log(error)
            if (error?.hasOwnProperty("response")) {
                message = error?.response?.data?.message
            }
            toast.error(message)
        } finally {
            setIsAffiliateLoader(false)

        }
    }
}



export const deleteAffiliate = (payload, callback = () => { }) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/user/affiliate/delete', { id: payload });
            if (response.status === 200) {
                callback(true)
                toast.success('Affiliate Deleted Successfully')
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


