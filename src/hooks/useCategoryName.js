import { useSelector } from "react-redux";
import { useMemo } from "react";

const useCategoryName = (categoryId) => {
    const { allCategory } = useSelector((state) => state.category);

    return useMemo(() => {
        if (!allCategory?.length) {
            return "Categories loading..."; // or return an empty string if you prefer
        }

        const findCategoryPath = (categories, id, parentName = "") => {
            for (const category of categories) {
                if (category._id === id) {
                    return parentName ? `${parentName} > ${category.name}` : category.name;
                }
                if (category.subcategories?.length) {
                    const foundName = findCategoryPath(category.subcategories, id, category.name);
                    if (foundName) return foundName;
                }
            }
            return ""; // Return an empty string if category is not found
        };

        return categoryId ? findCategoryPath(allCategory, categoryId) : "";
    }, [allCategory, categoryId]); // useMemo dependencies
};

export default useCategoryName;
