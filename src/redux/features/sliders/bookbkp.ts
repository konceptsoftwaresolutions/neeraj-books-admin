// import { createSlice } from "@reduxjs/toolkit";

// import toast from "react-hot-toast";
// import createAxiosInstance from "../../../config/axiosConfig";

// const axiosInstance = createAxiosInstance();

// const initialState = {
//     allBooks: [],
// };

// const booksSlice = createSlice({
//     name: "booksDetails",
//     initialState,
//     reducers: {
//         setBooks: (state, action) => {
//             Object.keys(action.payload).forEach((key) => {
//                 state[key] = action.payload[key];
//             });
//         },
//     },
// });

// export const { setBooks } = booksSlice.actions;
// export default booksSlice.reducer;

// export const getAllBooks = () => {
//     return async (dispatch) => {
//         try {
//             const response = await axiosInstance.get("/product/getAll");
//             if (response.status === 200) {
//                 const books = response?.data;
//                 console.log(books)
//                 dispatch(setBooks({ allBooks: books }))
//             }
//         } catch (error) {
//             console.log(error)
//             let message = "Error"
//             if (error?.hasOwnProperty("response")) {
//                 message = error?.response?.data
//             }
//             toast.error(message)
//         }
//     }
// }

import { createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
  allBooks: null,
};

const bookSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setBooks } = bookSlice.actions;
export default bookSlice.reducer;

export const getAllBooks = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get("/product/getAll");
      if (response.status === 200) {
        const data = response?.data;
        console.log(data);
        dispatch(setBooks({ allBooks: data }));
      }
    } catch (error) {
      console.log(error);
      let message = "Error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data;
      }
      toast.error(message);
    }
  };
};

export const addBook = ({ formData }) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.postForm(
        "/product/create",
        formData
      );
      if (response.status === 201) {
        console.log("response is ", response);
        const message = response.data?.message || "Book added successfully!";
        // callback(null);

        toast.success(message);
        dispatch(getAllBooks());
      }
    } catch (error) {
      console.log(error);
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

export const editBookDetails = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post("/product/update", payload);
      if (response.status === 200) {
        console.log("response is ", response);
        const message = response.data?.message || "Book added successfully!";
        // callback(null);

        toast.success(message);
        // dispatch(getAllLeads());
      }
    } catch (error) {
      console.log(error);
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

export const deleteBook = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post("/product/create", payload);
      if (response.status === 200) {
        console.log("response is ", response);
        const message = response.data?.message || "Deleted successfully!";
        // callback(null);

        toast.success(message);
        // dispatch(getAllLeads());
      }
    } catch (error) {
      console.log(error);
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

export const updateEbookExtraAmount = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(
        "/utility/updateEbookExtraAmount",
        payload
      );
      if (response.status === 200) {
        console.log(response);
        const message = response.data?.message || "Updated successfully!";

        toast.success(message);
      }
    } catch (error) {
      console.log(error);
      let message = "error";
      if (error?.hasOwnProperty("response")) {
        message = error?.response?.data?.message;
      }
      // callback(error);
      toast.error(message);
    }
  };
};
