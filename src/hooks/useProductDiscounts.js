import { useMemo } from "react";

// this hook calculate the discount only for single book , or combo 

const useProductDiscounts = (products) => {
    const { discountedItems, totalDiscount } = useMemo(() => {
        if (!Array.isArray(products)) return { discountedItems: [], totalDiscount: 0 };

        const discountedItems = [];
        let totalDiscount = 0;

        for (const item of products) {
            if (item.onlyEbookSelected) continue; // Skip eBook-only items

            const product = item.productId?.english;
            if (!product) continue;

            const original = parseFloat(product.paperBackOriginalPrice || 0);
            const discounted = parseFloat(product.paperBackDiscountedPrice || 0);
            const quantity = parseInt(item.quantity || 0, 10);

            const discountPerItem = original - discounted;
            const totalItemDiscount = discountPerItem * quantity;

            totalDiscount += totalItemDiscount;

            discountedItems.push({
                id: item._id,
                title: product.title,
                quantity,
                discountPerItem,
                totalItemDiscount,
            });
        }

        return { discountedItems, totalDiscount };
    }, [products]);

    return { discountedItems, totalDiscount };
};

export default useProductDiscounts;
