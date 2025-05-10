export function getSubcategoryOptionsByIds(categories, targetIds) {
    const options = [];

    const findCategories = (categoryList) => {
        for (const category of categoryList) {
            if (targetIds.includes(category._id)) {
                const subs = category.subcategories || [];
                options.push(
                    ...subs.map((sub) => ({
                        label: sub.name,
                        value: sub._id,
                    }))
                );
            }

            if (category.subcategories && category.subcategories.length > 0) {
                findCategories(category.subcategories);
            }
        }
    };

    findCategories(categories);
    return options;
}


export const getCategories = (data) => {
    if (
        Array.isArray(data?.viewSubSubCategory) &&
        data.viewSubSubCategory.length > 0
    ) {
        return data.viewSubSubCategory;
    }
    if (
        Array.isArray(data?.viewSubCategory) &&
        data.viewSubCategory.length > 0
    ) {
        return data.viewSubCategory;
    }
    if (
        Array.isArray(data?.viewParentCategory) &&
        data.viewParentCategory.length > 0
    ) {
        return data.viewParentCategory;
    }
    return data?.categories;
};



export const getCategory = (parentCategory, subCategory, subSubCategory) => {
    if (Array.isArray(subSubCategory) && subSubCategory.length > 0) {
        return subSubCategory;
    } else if (Array.isArray(subCategory) && subCategory.length > 0) {
        return subCategory;
    } else {
        return Array.isArray(parentCategory) ? parentCategory : [parentCategory];
    }
};
