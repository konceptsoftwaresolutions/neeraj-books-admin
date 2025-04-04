


import * as yup from "yup";
export const categorySchema = yup.object().shape({
    categoryFile: yup
        .mixed()
        .test('required', 'Image is required', (value) => {
            return value && value.length > 0; // Check if file is selected
        }),
    name: yup.string().required("Name is required  "),
    order: yup
        .number()
        .typeError("Order must be a number") // If the input is not a number
        .positive("Order must be greater than 0") // Greater than 0
        .integer("Order must be an integer")
});


export const editCategorySchema = yup.object().shape({
    // categoryFile: yup
    //     .mixed()
    //     .test('required', 'Image is required', (value) => {
    //         return value && value.length > 0; // Check if file is selected
    //     }),
    name: yup.string().required("Name is required  "),
    order: yup
        .number()
        .typeError("Order must be a number") // If the input is not a number
        .positive("Order must be greater than 0") // Greater than 0
        .integer("Order must be an integer")
});

export const testimonialSchema = yup.object().shape({
    testimonialUserImg: yup
        .mixed()
        .test("fileRequired", "Image is required", (value) => {
            return value?.length > 0;
        })
        .test("fileSize", "File size must be less than 2MB", (value) => {
            return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB
        })
        .test("fileType", "Only images are allowed", (value) => {
            return (
                value &&
                ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type)
            );
        }),

    name: yup
        .string()
        .required("Name is required")
        .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),

    course: yup.string().required("Course is required"),

    rating: yup
        .number()
        .typeError("Rating must be a number")
        .required("Rating is required")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),

    review: yup
        .string()
        .required("Review is required")
        .min(10, "Review must be at least 10 characters"),
});