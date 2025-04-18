import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

import logo from "../../assets/pdf_logo.jpeg";
import { PDFViewer } from "@react-pdf/renderer";
import { format } from "date-fns";

// Define styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    color: "#000",
    padding: 20,
  },

  flex: {
    flex: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 170,
    height: 50,
    marginRight: 10,
    marginTop: -3,
  },
  companyDetail: {
    fontSize: 11,
    textAlign: "right",
  },
  companyDetailSmall: {
    fontSize: 10,
    textAlign: "right",
  },
  dateDetailSmall: {
    fontSize: 10,
    textAlign: "left",
  },
  boldHeading: {
    fontSize: 10,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 6,
  },
  bodyFont: {
    fontSize: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  footLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 4,
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 10,
  },
  section: {
    marginVertical: 10,
    marginLeft: 3,
  },
  summary: {
    marginLeft: "auto",
    width: "30%",
    marginTop: 10,
    marginRight: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    borderTopWidth: 1,
    borderTopColor: "#000",
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: "bold",
  },
  summaryValue: {
    fontSize: 10,
  },
  amountInWords: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
  },
  signatureCont: {
    marginTop: 10,
    marginRight: 3,
  },
  signatureImg: {
    width: 70,
    height: 70,
    marginLeft: "auto",
    marginTop: 5,
    marginBottom: 5,
  },
  font12: {
    fontSize: 11,
  },
  font11: {
    fontSize: 11,
  },
  font10: {
    fontSize: 10,
  },
  font9: {
    fontSize: 9,
  },
  test: {
    textAlign: "center", // 'center' should be in quotes
    fontSize: "8px", // Specify the unit for font size
    width: "100%",
    wordWrap: "break-word", // Corrected value for word-wrap
  },
  font8: {
    fontSize: 8,
  },
  paddingY4: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  paddingY3: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  paddingY2: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  paddingY1: {
    paddingTop: 1,
    paddingBottom: 1,
  },

  underline: {
    position: "absolute",
    bottom: -1, // Adjust this to move the underline up or down
    left: 0,
    right: 0,
    height: 1, // Thickness of the underline
    backgroundColor: "#000",
    width: "100%",
  },

  table: {
    display: "table",
    width: "100%",
    marginBottom: 20,
    borderWidth: 1, // Adds border around the entire table
    borderBottom: 0,
    borderColor: "#000",
  },

  tableHeader: {
    flexDirection: "row",
    color: "#000",
    textAlign: "left",
    padding: 2,
    borderBottomWidth: 1, // Adds bottom border for header row
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1, // Adds bottom border for each row
    borderColor: "#000",
  },
  tableCellHeader: {
    padding: 5,
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    // borderTopWidth: 1, // Adds top border for header cells
    borderRightWidth: 1, // Adds right border for header cells

    borderColor: "#000",
    marginBottom: "-2px",
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    textAlign: "center",
    // borderLeftWidth: 1, // Adds right border for table cells
    // borderColor: "#000",
  },
});

// Create the PDF document

// Component to download the PDF
const ShipmentPdf = ({ data = {} }) => {
  const {
    createdAt,
    discountTotal,
    fromWhereYouGetTheReference,
    appliedCouponDiscount,
    items,
    orderId,
    orderStatus,
    paymentMode,
    paymentStatus,
    shippingAddress,
    shippingAmount,
    totalAmount,
    user,
    appliedCoupon,
    _id,
    additionalDiscount,
  } = data;

  // const originalAmountCalculate = items.reduce((total, product) => {
  //   const medium = product.language;
  //   const bookTitle = product?.productId?.[medium]?.title;
  //   const originalSellingPrice = parseFloat(
  //     product?.productId?.[medium]?.paperBackOriginalPrice || 0
  //   );
  //   const quantity = parseFloat(product?.quantity || 0);
  //   const ebookPrice = parseFloat(product?.ebookPrice || 0);
  //   const onlyEbook = product?.onlyEbookSelected;
  //   const isEbookAlso = product?.isEbookAlsoSelected;

  //   let originalAmount = 0;

  //   if (onlyEbook) {
  //     originalAmount = ebookPrice;
  //   } else if (isEbookAlso) {
  //     originalAmount = quantity * originalSellingPrice + ebookPrice;
  //   } else {
  //     originalAmount = originalSellingPrice * quantity;
  //   }

  //   return total + originalAmount;
  // }, 0);

  const originalAmountCalculate = items?.reduce((total, product) => {
    const medium = product.language;
    const bookTitle = product?.productId?.[medium]?.title;
    const originalSellingPrice = parseFloat(
      product?.productId?.[medium]?.paperBackOriginalPrice || 0
    );
    const quantity = parseFloat(product?.quantity || 0);
    const ebookPrice = parseFloat(product?.ebookPrice || 0);
    const onlyEbook = product?.onlyEbookSelected;
    const isEbookAlso = product?.isEbookAlsoSelected;

    let originalAmount = 0;

    if (onlyEbook) {
      originalAmount = ebookPrice;
    } else if (isEbookAlso) {
      originalAmount = quantity * originalSellingPrice + ebookPrice;
    } else {
      originalAmount = originalSellingPrice * quantity;
    }

    return total + originalAmount;
  }, 0);

  const discountedAmountCalculate = items?.reduce((total, product) => {
    const medium = product.language;
    const bookTitle = product?.productId?.[medium]?.title;
    const originalSellingPrice = parseFloat(
      product?.productId?.[medium]?.paperBackOriginalPrice || 0
    );
    const discountedSellingPrice = parseFloat(
      product?.productId?.[medium]?.paperBackDiscountedPrice || 0
    );
    const quantity = parseFloat(product?.quantity || 0);
    const ebookPrice = parseFloat(product?.ebookPrice || 0);
    const onlyEbook = product?.onlyEbookSelected;
    const isEbookAlso = product?.isEbookAlsoSelected;

    let originalAmount = 0;

    if (onlyEbook) {
      originalAmount = ebookPrice;
    } else if (isEbookAlso) {
      originalAmount = quantity * discountedSellingPrice + ebookPrice;
    } else {
      originalAmount = discountedSellingPrice * quantity;
    }

    return total + originalAmount;
  }, 0);

  const amountAfterAdditionalDiscount =
    discountedAmountCalculate - additionalDiscount;

  const couponDiscountOff =
    (Number(amountAfterAdditionalDiscount || 0) *
      Number(appliedCouponDiscount || 0)) /
    100;

  const couponDiscountCalculated =
    amountAfterAdditionalDiscount - couponDiscountOff;

  const grandTotalCalculated =
    Number(couponDiscountCalculated) + Number(shippingAmount);

  // ---------------------

  return (
    // <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.font9}>4/7/25, 4:54 PM </Text>
          <Text style={{ fontSize: "9px", marginLeft: "-50px" }}>
            View Shipment | NeerajPublications
          </Text>
          <Text></Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: "23px",
              textAlign: "center",
              marginTop: "20px",
              fontWeight: 300, // default, but can be explicitly added
              letterSpacing: 1, // adds spacing for a lighter feel
            }}
          >
            NEERAJ PUBLICATIONS
          </Text>
          <Text
            style={{ fontSize: "9px", textAlign: "center", marginTop: "6px" }}
          >
            Nai Sarak, Delhi-110006, India
          </Text>
          <Text
            style={{ fontSize: "9px", textAlign: "center", marginTop: "3px" }}
          >
            Email: info@neerajbooks.com | Mobile: 8510009872, 8510009878
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 12,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#00", // Customize color here
            }}
          >
            Invoice / Order{" "}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#007BFF", // Default or another color for the order number
            }}
          >
            {orderId}
          </Text>
        </View> */}

        <View
          style={{
            paddingHorizontal: "30px",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
        >
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 5,
              backgroundColor: "#efefef",
            }}
          >
            <Text style={{ fontSize: 12 }}>Order Details</Text>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
              borderLeft: 1,
              borderBottom: 1,
              borderRight: 1,
              marginTop: "-5px",
              borderColor: "#efefef",
              gap: 10,
            }}
          >
            {/* Left: Address Section */}
            <View
              style={{
                width: "35%",
                borderRight: 1,
                borderColor: "#efefef",
                paddingVertical: 5,
              }}
            >
              <Text style={{ fontSize: "15px", marginBottom: 2, color: "red" }}>
                {orderId}
              </Text>
              <Text style={{ fontSize: "9px" }}>
                Payment Mode - {paymentMode}
              </Text>
              <Text style={{ fontSize: "9px", paddingTop: "3px" }}>
                Date -{" "}
                {createdAt ? format(new Date(createdAt), "dd/MM/yyyy") : ""}
              </Text>
              <Text style={{ fontSize: "9px", paddingTop: "3px" }}>
                Coupon - {appliedCoupon}
              </Text>
              {/* <Text style={{ fontSize: "9px" }}>
                  {shippingAddress?.city} {shippingAddress?.state}{" "}
                  {shippingAddress?.pincode}
                </Text>
                <Text style={{ fontSize: "9px" }}>
                  {shippingAddress?.country}
                </Text> */}
              {/* <Text style={{ fontSize: "9px" }}>
                  {shippingAddress?.mobile}
                </Text> */}
              {/* <Text style={{ fontSize: "9px" }}>1234567890</Text> */}
            </View>

            {/* Right: Order Info */}
            <View
              style={{
                width: "65%",
                paddingVertical: 5,
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View style={{ width: "80%" }}>
                <Text
                  style={{
                    fontSize: "9px",
                    marginBottom: 2,
                    textAlign: "left",
                  }}
                >
                  {shippingAddress?.firstName} {shippingAddress?.lastName}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    textAlign: "left",
                    paddingTop: 3,
                    lineHeight: 1.5,
                  }}
                >
                  {[
                    shippingAddress?.addressLine1,
                    shippingAddress?.addressLine2,
                    shippingAddress?.city,
                    shippingAddress?.state,
                    shippingAddress?.pincode,
                    shippingAddress?.country,
                  ]
                    .filter(Boolean) // removes falsy values like null, undefined, ''
                    .join(", ")}
                </Text>

                <Text
                  style={{
                    fontSize: "9px",
                    textAlign: "left",
                    paddingTop: "2px",
                  }}
                >
                  Mobile - {shippingAddress?.mobile}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  width: "20%",
                }}
              >
                <Image
                  src={logo}
                  style={{
                    width: 50,
                    height: 50, // add height to maintain aspect ratio or size
                    borderRadius: 25, // use a numeric value for circular shape (half of width/height)
                    border: "1 solid black", // border format for react-pdf (no "px", no CSS-style string)
                  }}
                />
              </View>
            </View>
          </View>

          {/* table */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderTop: 1,
              marginTop: "20px",
              borderColor: "#000",
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 9, width: "10%" }}>#</Text>
            <Text style={{ fontSize: 12, width: "35%" }}>Product</Text>
            <Text style={{ fontSize: 12, width: "10%", textAlign: "center" }}>
              Qty
            </Text>
            <Text style={{ fontSize: 12, width: "15%", textAlign: "center" }}>
              Price
            </Text>
            <Text style={{ fontSize: 12, width: "15%", textAlign: "center" }}>
              HSN
            </Text>
            <Text style={{ fontSize: 12, width: "15%", textAlign: "right" }}>
              Amount
            </Text>
          </View>

          {items?.map((product) => {
            const medium = product.language;
            const bookTitle = product?.productId?.[medium]?.title;
            const sellingPrice = parseFloat(
              product?.productId?.[medium]?.paperBackDiscountedPrice || 0
            );
            const originalSellingPrice = parseFloat(
              product?.productId?.[medium]?.paperBackOriginalPrice || 0
            );
            const onlyEbook = product?.onlyEbookSelected;
            const isEbookAlso = product?.isEbookAlsoSelected;
            const quantity = parseFloat(product?.quantity || 0);
            const ebookPrice = parseFloat(product?.ebookPrice || 0);

            let originalAmount = 0;

            if (onlyEbook) {
              originalAmount = ebookPrice * 1;
            } else if (isEbookAlso) {
              originalAmount = quantity * originalSellingPrice + ebookPrice;
            } else {
              originalAmount = originalSellingPrice * quantity;
            }

            const rows = [];
            if (!isEbookAlso && !product?.onlyEbookSelected) {
              rows.push(
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTop: 1,
                    borderColor: "#000",
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: 9, width: "10%" }}>1</Text>
                  <Text style={{ fontSize: 9, width: "35%" }}>
                    {bookTitle} x ({medium})
                  </Text>
                  <Text
                    style={{ fontSize: 9, width: "10%", textAlign: "center" }}
                  >
                    {product?.quantity}
                  </Text>
                  <Text
                    style={{ fontSize: 9, width: "15%", textAlign: "center" }}
                  >
                    {originalSellingPrice}
                  </Text>
                  <Text
                    style={{ fontSize: 9, width: "15%", textAlign: "center" }}
                  >
                    {product?.hsn}
                  </Text>
                  <Text
                    style={{ fontSize: 9, width: "15%", textAlign: "right" }}
                  >
                    {originalSellingPrice * quantity}
                  </Text>
                </View>
              );
            }

            if (isEbookAlso) {
              rows.push(
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderTop: 1,
                      borderColor: "#000",
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={{ fontSize: 9, width: "10%" }}>1</Text>
                    <Text style={{ fontSize: 9, width: "35%" }}>
                      {bookTitle} x ({medium})
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      {product?.quantity}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        width: "15%",
                        textAlign: "center",
                      }}
                    >
                      {originalSellingPrice}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        width: "15%",
                        textAlign: "center",
                      }}
                    >
                      {product?.hsn}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        width: "15%",
                        textAlign: "right",
                      }}
                    >
                      {originalSellingPrice * quantity}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderTop: 1,
                      borderColor: "#000",
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={{ fontSize: 9, width: "10%" }}>1</Text>
                    <Text style={{ fontSize: 9, width: "35%" }}>
                      {bookTitle} x ({medium}) - E-book
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      1
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        width: "15%",
                        textAlign: "center",
                      }}
                    >
                      {ebookPrice}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        width: "15%",
                        textAlign: "center",
                      }}
                    >
                      {product?.hsn}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        width: "15%",
                        textAlign: "right",
                      }}
                    >
                      {ebookPrice * 1}
                    </Text>
                  </View>
                </>
              );
            }

            if (product?.onlyEbookSelected) {
              rows.push(
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTop: 1,
                    borderColor: "#000",
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: 9, width: "10%" }}>1</Text>
                  <Text style={{ fontSize: 9, width: "35%" }}>
                    {bookTitle} x ({medium}) - E-booksdsds
                  </Text>
                  <Text
                    style={{ fontSize: 9, width: "10%", textAlign: "center" }}
                  >
                    1
                  </Text>
                  <Text
                    style={{ fontSize: 9, width: "15%", textAlign: "center" }}
                  >
                    {ebookPrice}
                  </Text>
                  <Text
                    style={{ fontSize: 9, width: "15%", textAlign: "center" }}
                  >
                    {product?.hsn}
                  </Text>
                  <Text
                    style={{ fontSize: 9, width: "15%", textAlign: "right" }}
                  >
                    {ebookPrice * 1}
                  </Text>
                </View>
              );
            }

            return rows;
          })}

          <View>
            {/* <Text style={{ fontSize: "10px", marginVertical: 7 }}>Total</Text> */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 0,
                borderColor: "#000",
                paddingVertical: "7px",
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: "9px" }}>Total</Text>
              <Text style={{ fontSize: "9px" }}>
                Rs. {originalAmountCalculate}/-
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "7px",
              }}
            >
              <Text style={{ fontSize: "9px" }}>Discount</Text>
              <Text style={{ fontSize: "9px" }}>
                Rs. {originalAmountCalculate - discountedAmountCalculate}/-
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "7px",
              }}
            >
              <Text style={{ fontSize: "9px" }}>Sub Total</Text>
              <Text style={{ fontSize: "9px" }}>
                Rs. {discountedAmountCalculate}/-
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "7px",
              }}
            >
              <Text style={{ fontSize: "9px" }}>Additional Discount -</Text>
              <Text style={{ fontSize: "9px" }}>
                Rs. {additionalDiscount}
                /-
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "7px",
              }}
            >
              <Text style={{ fontSize: "9px" }}>Sub-Total </Text>
              <Text style={{ fontSize: "9px" }}>
                Rs. {amountAfterAdditionalDiscount}/-
              </Text>
            </View>

            {appliedCouponDiscount && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTop: 1,
                  borderColor: "#000",
                  paddingVertical: "7px",
                }}
              >
                <Text style={{ fontSize: "9px" }}>Coupon Discount -</Text>
                <Text style={{ fontSize: "9px" }}>
                  {appliedCouponDiscount}%
                </Text>
              </View>
            )}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "7px",
              }}
            >
              <Text style={{ fontSize: "9px" }}>Total -</Text>
              <Text style={{ fontSize: "9px" }}>
                Rs. {couponDiscountCalculated} /-
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "7px",
              }}
            >
              <Text style={{ fontSize: "9px" }}>Shipping</Text>
              <Text style={{ fontSize: "9px" }}>Rs. {shippingAmount} /-</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "7px",
              }}
            >
              <Text style={{ fontSize: "12px" }}> Grannd Total</Text>
              <Text style={{ fontSize: "12px" }}>
                Rs. {grandTotalCalculated}
                /-
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default ShipmentPdf;
