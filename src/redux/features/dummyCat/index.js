import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();

const initialState = {
    allParentCategory: [
        {
            id: "default-id",
            name: "IGNOU",
            description: "this is the description",
            subcategories: [], // Ensure subcategories is initialized
        },
    ],
};

const dummyCatSlice = createSlice({
    name: "dummyCatDetails",
    initialState,
    reducers: {
        setDummyCat: (state, action) => {
            // Ensure that each category added has subcategories as an empty array by default
            state.allParentCategory = [
                ...state.allParentCategory,
                { ...action.payload, subcategories: action.payload.subcategories || [] },
            ];
        },
        addSubcategoryToParentCategory: (state, action) => {
            const { parentId, subcategoryData } = action.payload;

            // Ensure the new subcategory has a subcategories array by default
            const newSubcategory = { ...subcategoryData, subcategories: [] };

            // Recursive function to find and update the correct parent
            const addSubcategory = (categories) => {
                for (const category of categories) {
                    if (category.id === parentId || category._id === parentId) {
                        // Ensure subcategories is initialized as an array if not already
                        if (!Array.isArray(category.subcategories)) {
                            category.subcategories = [];
                        }
                        category.subcategories.push(newSubcategory); // Add the new subcategory with the empty subcategories array
                        return true; // Stop further searching once added
                    }

                    // If subcategories exist, search recursively
                    if (category.subcategories && category.subcategories.length > 0) {
                        const found = addSubcategory(category.subcategories);
                        if (found) return true;
                    }
                }
                return false; // Return false if parentId is not found
            };

            // Call the recursive function on the top-level categories
            const success = addSubcategory(state.allParentCategory);
            if (!success) {
                console.error(`Parent category with ID "${parentId}" not found.`);
            }
        },
    },
});

export const { setDummyCat, addSubcategoryToParentCategory } = dummyCatSlice.actions;
export default dummyCatSlice.reducer;
