import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";
// import { toast } from "react-toastify";

const initialState = {
  allUsers: null,
  allLeads: null,
  highPriorityLeads: null,
  leadsByLastWeek: null,
  allLeadsSummary: null,
  executiveSummary: null,
  executive: null,
  managers: null,
};

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