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
