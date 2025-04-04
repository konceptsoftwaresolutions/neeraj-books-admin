import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
  allDummyBooks: [],
};

const dummyBookSlice = createSlice({
  name: "dummyBookDetails",
  initialState,
  reducers: {
    setDummyBooks: (state, action) => {
      state.allDummyBooks.push(...action.payload); // Add new books to the store
    },
    updateDummyBook: (state, action) => {
      const { _id, updatedData } = action.payload;
      const bookIndex = state.allDummyBooks.findIndex((book) => book._id === _id);
      if (bookIndex !== -1) {
        state.allDummyBooks[bookIndex] = {
          ...state.allDummyBooks[bookIndex],
          ...updatedData,
        };
        toast.success("Book updated successfully!");
      } else {
        toast.error("Book not found!");
      }
    },
    deleteDummyBook: (state, action) => {
      const { _id } = action.payload;
      const filteredBooks = state.allDummyBooks.filter((book) => book._id !== _id);
      if (filteredBooks.length < state.allDummyBooks.length) {
        state.allDummyBooks = filteredBooks; // Update the state with the filtered list
        toast.success("Book deleted successfully!");
      } else {
        toast.error("Book not found!");
      }
    },
  },
});

export const { setDummyBooks, updateDummyBook, deleteDummyBook } = dummyBookSlice.actions;
export default dummyBookSlice.reducer;
