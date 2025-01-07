import { createSlice } from "@reduxjs/toolkit";
import { setToken } from "../auth";
import createAxiosInstance from "../../../config/axiosConfig";
import { setBooks } from "../books";
import { setTeamMembers } from "../teamMembers";
import { setOrder } from "../orders";

// import { toast } from "react-hot-toast";
// import { setLoader } from "../loader";

// import { persistor } from "../../store";

const axiosInstance = createAxiosInstance();

const initialState = {
  userData: null,
  allUsers: null,
  userdetailToShow: null,
};

const userSlice = createSlice({
  name: "userDetails",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const logoutThunkMiddleware = (persistor, navigate) => {
  return async (dispatch) => {
    try {
      persistor.purge();
      localStorage.clear();
      dispatch(
        setToken({
          token: null,
          isAuthenticated: false,
          role: null,
          ability: null,
        })
      );
      dispatch(setUser({ user: null }));
      dispatch(setBooks({ allBooks: null }))
      dispatch(setTeamMembers({ allUsers: null }))
      dispatch(setOrder({ allOrders: null }))
      navigate("/");
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data;
      }
      toast.error(message);
    }
  };
};