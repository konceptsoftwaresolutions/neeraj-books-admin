import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginLoader:false,
  dashboardStatsLoader: false,
  dashboardChartLoader: false,
  dashboardListLoader: false,
  dashboardProductLoader: false,

  leadLoader: false,

  getloader: false,
  addLoader: false,
  updateLoader: false,
  deleteLoader: false,
  assignLoader: false,
};

const loaderSlice = createSlice({
  name: "loadersDetails",
  initialState: initialState,
  reducers: {
    setLoader(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
