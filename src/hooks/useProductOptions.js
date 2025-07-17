import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../redux/features/books"; // Adjust the path as needed

const useProductOptions = () => {
    const dispatch = useDispatch();
    const [allProducts, setAllProducts] = useState([]);

    const fetchAllProductsData = useCallback(() => {
        dispatch(
            getAllProducts((success, data) => {
                if (success) {
                    setAllProducts(data);
                }
            })
        );
    }, [dispatch]);

    useEffect(() => {
        fetchAllProductsData();
    }, [fetchAllProductsData]);

    const generateDropdownOptions = (bookData) => {
        const options = [];
        if (bookData.english) {
            options.push({
                label: `${bookData.english.title} - ${bookData.english.bookCode}`,
                value: bookData.english._id,
            });
        }
        if (bookData.hindi) {
            options.push({
                label: `${bookData.hindi.title} - ${bookData.hindi.bookCode}`,
                value: bookData.hindi._id,
            });
        }
        return options;
    };

    const productOptions = useMemo(() => {
        return allProducts.flatMap(generateDropdownOptions);
    }, [allProducts]);

    return productOptions;
};

export default useProductOptions;
