import { useMemo } from "react";

const useBulkOrderSummary = (
    books,
    orderDetails,
    adjustmentPlus = 0,
    adjustmentMinus = 0,
    shippingRate = 0
) => {
    return useMemo(() => {
        if (!Array.isArray(books) || !orderDetails) return null;

        let noOfBooks = 0;
        let totalPrice = 0;
        let totalDiscountAmount = 0;
        let totalFinalAmount = 0;
        let totalDiscountPercent = 0;

        books.forEach((item) => {
            const { price, qty = 1, discount1 = 0, discount2 = 0, discount3 = 0 } = item;

            const originalPrice = price * qty;
            noOfBooks += qty;
            totalPrice += originalPrice;

            // Apply progressive discounts
            let afterD1 = originalPrice * (1 - discount1 / 100);
            let afterD2 = afterD1 * (1 - discount2 / 100);
            let finalAmount = afterD2 * (1 - discount3 / 100);

            const discountAmount = originalPrice - finalAmount;

            totalDiscountAmount += discountAmount;
            totalFinalAmount += finalAmount;

            totalDiscountPercent += discount1 + discount2 + discount3;
        });

        const averageDiscountPercent = books.length > 0 ? totalDiscountPercent / books.length : 0;

        const grandTotal = Math.round(totalFinalAmount + shippingRate + Number(adjustmentPlus) - Number(adjustmentMinus));

        return {
            noOfBooks,
            totalPrice,
            totalDiscountPercent: averageDiscountPercent,
            discountAmount: totalDiscountAmount,
            finalAmount: totalFinalAmount,
            shippingCharges: shippingRate,
            adjustmentPlus,
            adjustmentMinus,
            grandTotal,
        };
    }, [books, orderDetails, adjustmentPlus, adjustmentMinus, shippingRate]);
};

export default useBulkOrderSummary;
