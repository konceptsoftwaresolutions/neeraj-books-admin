import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";

const initialState = {
  allUsers: null,
  dashboardData: null,
  dashboardLoader: false
};


const axiosInstance = createAxiosInstance();

const dashboardSlice = createSlice({
  name: "dashboardDetails",
  initialState,
  reducers: {
    setDashboard: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;


export const getDashboardData = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDashboard({ dashboardLoader: true }))
      const response = await axiosInstance.post("/dashboard", payload);
      if (response.status === 200) {
        // console.log(response.data)
        dispatch(setDashboard({ dashboardLoader: false }))
        dispatch(setDashboard({ dashboardData: response.data }))
      }
    } catch (error) {
      console.log(error)
      dispatch(setDashboard({ dashboardLoader: false }))
    }
  };
};




