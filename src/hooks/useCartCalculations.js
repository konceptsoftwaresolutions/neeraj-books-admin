import { useMemo } from 'react';

const useCartCalculations = (cartItems, discountDetails, appliedCouponDiscount) => {


    return useMemo(() => {
        let totalPaperbackOriginalAmount = 0;
        let totalPaperbackAmount = 0;
        let totalPaperbackQuantity = 0;
        let totalEbookAmount = 0;
        let totalEbookQuantity = 0;

        cartItems?.forEach((item) => {
            const {
                productId,
                quantity,
                isEbookAlsoSelected,
                onlyEbookSelected,
                ebookPrice,
                language,
            } = item;

            const bookData = productId?.[language];

            if (!onlyEbookSelected && bookData) {
                const originalPrice = parseFloat(bookData.paperBackOriginalPrice || 0);
                const discountedPrice = parseFloat(bookData.paperBackDiscountedPrice || 0);

                totalPaperbackOriginalAmount += originalPrice * quantity;
                totalPaperbackAmount += discountedPrice * quantity;
                totalPaperbackQuantity += quantity;
            }

            const ebookCost = parseFloat(ebookPrice || 0);

            if (onlyEbookSelected) {
                // Ebook-only items: count full quantity
                totalEbookAmount += ebookCost * quantity;
                totalEbookQuantity += quantity;
            } else if (isEbookAlsoSelected) {
                // Ebook selected as part of combo: count as 1
                totalEbookAmount += ebookCost;
                totalEbookQuantity += 1;
            }
        });

        // Round the totals
        totalPaperbackOriginalAmount = Math.round(totalPaperbackOriginalAmount);
        totalPaperbackAmount = Math.round(totalPaperbackAmount);
        totalEbookAmount = Math.round(totalEbookAmount);

        const totalPaperbackDiscountAmount =
            totalPaperbackOriginalAmount - totalPaperbackAmount;

        const totalPaperbackDiscountPercent =
            totalPaperbackOriginalAmount > 0
                ? Math.round((totalPaperbackDiscountAmount / totalPaperbackOriginalAmount) * 100)
                : 0;

        const totalSpecialDiscountOnPaperback = Math.round(parseFloat(discountDetails || 0));
        const totalSpecialDiscountPercentage =
            totalPaperbackAmount > 0
                ? Math.round((totalSpecialDiscountOnPaperback / totalPaperbackAmount) * 100)
                : 0;

        const paperbackAmountAfterSpecialDiscount =
            Math.round(totalPaperbackAmount - totalSpecialDiscountOnPaperback);

        const subtotalAmount = Math.round(paperbackAmountAfterSpecialDiscount + totalEbookAmount);

        const couponDiscountPercent = parseFloat(appliedCouponDiscount || 0);
        const couponDiscountAmount = Math.round((couponDiscountPercent / 100) * subtotalAmount);

        const totalAmount = Math.round(subtotalAmount - couponDiscountAmount);

        return {
            totalPaperbackOriginalAmount,
            totalPaperbackAmount,
            totalPaperbackDiscountAmount,
            totalPaperbackDiscountPercent,
            totalPaperbackQuantity,

            totalSpecialDiscountOnPaperback,
            totalSpecialDiscountPercentage,

            paperbackAmountAfterSpecialDiscount,
            totalEbookAmount,
            totalEbookQuantity,

            subtotalAmount,
            couponDiscountPercent,
            couponDiscountAmount,
            totalAmount,
        };
    }, [cartItems, discountDetails, appliedCouponDiscount]);
};

export default useCartCalculations;
