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
import neerajLogo from "../../assets/neerajlogo.jpeg";
import hatlogo from "../../assets/hatlogo.png";
import { PDFViewer } from "@react-pdf/renderer";
import { format } from "date-fns";
import useCartCalculations from "../../hooks/useCartCalculations";

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
const ShipmentPdf = ({ data = {}, couponPercentage }) => {
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
    discountDetails,
    _id,
    txnid,
    additionalDiscount,
    onSiteDiscount,
  } = data;

  console.log("items in pdf ", data);

  const {
    totalPaperbackOriginalAmount,
    totalPaperbackAmount,
    totalPaperbackDiscountAmount,
    totalPaperbackDiscountPercent,
    totalPaperbackQuantity,

    totalSpecialDiscountOnPaperback, // e.g. 28.50 + 9.00
    totalSpecialDiscountPercentage, // e.g. 5 + 3

    paperbackAmountAfterSpecialDiscount,
    totalEbookAmount,
    totalEbookQuantity,

    subtotalAmount, // before coupon discount
    couponDiscountPercent,
    couponDiscountAmount,
    // totalAmount,
  } = useCartCalculations(items, additionalDiscount, couponPercentage);

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
            alignItems: "center",
            marginTop: "-10px",
            paddingBottom: "10px",
            borderBottom: 1,
          }}
        >
          <View>
            <Image
              src={neerajLogo}
              style={{
                width: 80,
                height: 50, // add height to maintain aspect ratio or size
              }}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: "10px", fontStyle: "italic" }}>
              Based on Various Courses of
            </Text>{" "}
            <Text style={{ fontSize: "10px" }}>
              IGNOU - (BA , B.Com , MA , M.Com., MBA , BCA , MCA etc)
            </Text>{" "}
            <Text style={{ fontSize: "10px" }}>
              NIOS - Class - X & XII , IP Universtiy, Skill Courses{" "}
            </Text>
            <Text style={{ fontSize: "10px" }}>
              M. : 8510009872 , 9510009878
            </Text>
            <Text style={{ fontSize: "10px" }}>
              {" "}
              E-mail : info@neerajbooks.com
            </Text>
          </View>
          <Text>
            <Image
              src={hatlogo}
              style={{
                width: 65,
                height: 65, // add height to maintain aspect ratio or size
              }}
            />
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: "10px",
            marginTop: "20px",
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
                width: "140px",
                borderRight: 1,
                borderColor: "#efefef",
                paddingVertical: 5,
              }}
            >
              <Text style={{ fontSize: "15px", marginBottom: 2, color: "red" }}>
                {orderId}
              </Text>

              <Text style={{ fontSize: "9px", paddingTop: "3px" }}>
                Date -{" "}
                {createdAt ? format(new Date(createdAt), "dd/MM/yyyy") : ""}
              </Text>
              <Text style={{ fontSize: "9px", paddingTop: "3px" }}>
                Time -{" "}
                {createdAt ? format(new Date(createdAt), "hh:mm:ss a") : ""}
              </Text>
              {appliedCoupon && (
                <Text style={{ fontSize: "9px", paddingTop: "3px" }}>
                  Coupon - {appliedCoupon}
                </Text>
              )}

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

            <View
              style={{
                width: "100px",
                borderRight: 1,
                borderColor: "#efefef",
                textAlign: "center",
                paddingVertical: 5,
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              <Text style={{ fontSize: "9px" }}>
                Payment Mode - {paymentMode}
              </Text>
              {paymentMode === "Prepaid" && (
                <>
                  <Text style={{ fontSize: "9px" }}>
                    Txn ID: - {paymentMode}
                  </Text>
                  <Text style={{ fontSize: "9px" }}>Mode: - UPI</Text>
                </>
              )}
              <Text style={{ fontSize: "9px" }}>
                Net Payable - Rs.{" "}
                {Math.round(
                  (couponDiscountPercent > 0
                    ? subtotalAmount - couponDiscountAmount
                    : subtotalAmount) +
                    (shippingAmount ? parseFloat(shippingAmount) : 0) -
                    (onSiteDiscount ? parseFloat(onSiteDiscount) : 0)
                )}
                /-
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
                width: "300px",
                paddingVertical: 5,
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: "9px",
                    marginBottom: 2,
                    textAlign: "right",
                  }}
                >
                  {shippingAddress?.firstName} {shippingAddress?.lastName}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    textAlign: "right",
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
                    textAlign: "right",
                    paddingTop: "2px",
                  }}
                >
                  Mobile - {shippingAddress?.mobile}
                </Text>
              </View>
              {/* <View
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
              </View> */}
            </View>
          </View>

          {totalPaperbackQuantity > 0 && (
            <>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 5,
                  backgroundColor: "#efefef",
                  marginTop: "20px",
                }}
              >
                <Text style={{ fontSize: "12px", textAlign: "left" }}>
                  Printed Book
                </Text>
              </View>

              {/* table */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTop: 1,
                  borderLeft: 1,
                  borderRight: 1,
                  borderBottom: 1,
                  marginBottom: "-5px",
                  paddingHorizontal: 4,
                  backgroundColor: "#efefef",
                  marginTop: "10px",
                  borderColor: "#000",
                  paddingVertical: 4,
                }}
              >
                <Text style={{ fontSize: 9, width: "10%" }}>S.No.</Text>
                <Text style={{ fontSize: 12, width: "35%" }}>Product</Text>
                <Text
                  style={{ fontSize: 12, width: "10%", textAlign: "center" }}
                >
                  Qty
                </Text>
                <Text
                  style={{ fontSize: 12, width: "15%", textAlign: "center" }}
                >
                  Price
                </Text>
                {/* <Text style={{ fontSize: 12, width: "15%", textAlign: "center" }}>
              HSN
            </Text> */}
                <Text
                  style={{ fontSize: 12, width: "15%", textAlign: "right" }}
                >
                  Amount
                </Text>
              </View>

              {items?.map((product, index) => {
                const medium = product.language;
                const bookTitle = product?.productId?.[medium]?.title;
                const sellingPrice = parseFloat(
                  product?.productId?.[medium]?.paperBackDiscountedPrice || 0
                );
                const originalSellingPrice = parseFloat(
                  product?.productId?.[medium]?.paperBackOriginalPrice || 0
                );

                const quantity = parseFloat(product?.quantity || 0);
                const ebookPrice = parseFloat(product?.ebookPrice || 0);

                const rows = [];
                if (product.onlyEbookSelected === true) {
                  return;
                } else {
                  rows.push(
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottom: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        marginBottom: "-5px",
                        paddingHorizontal: 4,
                        borderColor: "#000",
                        paddingVertical: 4,
                      }}
                    >
                      <Text style={{ fontSize: 9, width: "10%" }}>
                        {index + 1}
                      </Text>
                      <Text style={{ fontSize: 10, width: "35%" }}>
                        {bookTitle}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          width: "10%",
                          textAlign: "center",
                        }}
                      >
                        {quantity}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          width: "15%",
                          textAlign: "center",
                        }}
                      >
                        {originalSellingPrice}
                      </Text>
                      {/* <Text style={{ fontSize: 10, width: "15%", textAlign: "center" }}>
              HSN
            </Text> */}
                      <Text
                        style={{
                          fontSize: 10,
                          width: "15%",
                          textAlign: "right",
                        }}
                      >
                        {sellingPrice * quantity}
                      </Text>
                    </View>
                  );
                }

                return rows;
              })}

              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  marginTop: "10px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTop: 0,
                    borderColor: "#000",
                    paddingVertical: "7px",
                    paddingHorizontal: "7px",
                  }}
                >
                  <Text style={{ fontSize: "9px" }}>Total Items : </Text>
                  <Text style={{ fontSize: "9px" }}>
                    {totalPaperbackQuantity}
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
                    paddingHorizontal: "7px",
                  }}
                >
                  <Text style={{ fontSize: "9px" }}>Total</Text>
                  <Text style={{ fontSize: "9px" }}>
                    Rs. {totalPaperbackOriginalAmount}/-
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
                    paddingHorizontal: "7px",
                  }}
                >
                  <Text style={{ fontSize: "9px" }}>
                    Discount ({totalPaperbackDiscountPercent}%)
                  </Text>
                  <Text style={{ fontSize: "9px" }}>
                    Rs. {totalPaperbackDiscountAmount}/-
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTop: 1,
                    borderColor: "#000",
                    paddingHorizontal: "7px",
                    paddingVertical: "7px",
                  }}
                >
                  <Text style={{ fontSize: "9px" }}>Sub Total</Text>
                  <Text style={{ fontSize: "9px" }}>
                    Rs. {totalPaperbackAmount}/-
                  </Text>
                </View>
                {totalSpecialDiscountPercentage > 0 && (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderTop: 1,
                      borderColor: "#000",
                      paddingVertical: "7px",
                      paddingHorizontal: "7px",
                    }}
                  >
                    <Text style={{ fontSize: "9px" }}>
                      Special Discount: ({totalSpecialDiscountPercentage}%){" "}
                    </Text>
                    <Text style={{ fontSize: "9px" }}>
                      Rs. {totalSpecialDiscountOnPaperback}/-
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
                    paddingHorizontal: "7px",
                  }}
                >
                  <Text style={{ fontSize: "9px" }}>Total:</Text>
                  <Text style={{ fontSize: "9px" }}>
                    Rs. {paperbackAmountAfterSpecialDiscount}/-
                  </Text>
                </View>

                {/* <View
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
              <Text style={{ fontSize: "9px" }}>Rs. /-</Text>
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
              <Text style={{ fontSize: "9px" }}>
                Shipping & Handling Charges
              </Text>
              <Text style={{ fontSize: "9px" }}>Rs. /-</Text>
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
              <Text style={{ fontSize: "12px" }}> Grand Total</Text>
              <Text style={{ fontSize: "12px" }}>Rs. /-</Text>
            </View> */}
              </View>
            </>
          )}

          {totalEbookAmount > 0 && (
            <>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 5,
                  backgroundColor: "#efefef",
                  marginTop: "20px",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                  }}
                >
                  Ebooks
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTop: 1,
                  borderBottom: 1,
                  borderLeft: 1,
                  borderRight: 1,
                  marginTop: "10px",
                  backgroundColor: "#efefef",
                  borderColor: "#000",
                  paddingVertical: 4,
                  paddingHorizontal: 4,
                  marginBottom: "-5px",
                }}
              >
                <Text style={{ fontSize: 9, width: "10%" }}>S.No.</Text>
                <Text style={{ fontSize: 12, width: "35%" }}>Product</Text>
                <Text
                  style={{ fontSize: 12, width: "10%", textAlign: "center" }}
                >
                  Qty
                </Text>
                <Text
                  style={{ fontSize: 12, width: "15%", textAlign: "center" }}
                >
                  Price
                </Text>
                {/* <Text style={{ fontSize: 12, width: "15%", textAlign: "center" }}>
              HSN
            </Text> */}
                <Text
                  style={{ fontSize: 12, width: "15%", textAlign: "right" }}
                >
                  Amount
                </Text>
              </View>

              {items?.map((product, index) => {
                const medium = product.language;
                const bookTitle = product?.productId?.[medium]?.title;
                const isEbookThere =
                  product?.isEbookAlsoSelected === true ||
                  product?.onlyEbookSelected === true
                    ? true
                    : false;
                const ebookPrice = parseFloat(product?.ebookPrice || 0);

                const rows = [];
                let serialNumber = 1; // Initialize serial number for S. No.

                if (isEbookThere === true) {
                  rows.push(
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottom: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderColor: "#000",
                        paddingHorizontal: 4,
                        marginBottom: "-5px",
                        paddingVertical: 5,
                      }}
                    >
                      <Text style={{ fontSize: 9, width: "10%" }}>
                        {serialNumber++}{" "}
                        {/* Increment serial number for each item */}
                      </Text>
                      <Text style={{ fontSize: 10, width: "35%" }}>
                        {bookTitle}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          width: "10%",
                          textAlign: "center",
                        }}
                      >
                        1
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          width: "15%",
                          textAlign: "center",
                        }}
                      >
                        {ebookPrice}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          width: "15%",
                          textAlign: "right",
                        }}
                      >
                        {ebookPrice}
                      </Text>
                    </View>
                  );
                }

                return rows;
              })}

              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  marginTop: "10px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTop: 0,
                    borderColor: "#000",
                    paddingHorizontal: "7px",
                    paddingVertical: "7px",
                  }}
                >
                  <Text style={{ fontSize: "9px" }}>Total Items : </Text>
                  <Text style={{ fontSize: "9px" }}>{totalEbookQuantity}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTop: 1,
                    borderColor: "#000",
                    paddingVertical: "7px",
                    paddingHorizontal: "7px",
                  }}
                >
                  <Text style={{ fontSize: "9px" }}>Total</Text>
                  <Text style={{ fontSize: "9px" }}>
                    Rs. {totalEbookAmount}/-
                  </Text>
                </View>
              </View>
            </>
          )}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderTop: 1,
              borderColor: "#000",
              paddingVertical: "3px",
              paddingHorizontal: "5px",
              backgroundColor: "#efefef",
              marginTop: "12px",
              marginBottom: "-5px",
              borderLeft: 1,
              borderRight: 1,
            }}
          >
            <Text style={{ fontSize: "11px", fontWeight: 600 }}>
              Grand Total
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: 600 }}>
              Rs. {totalEbookAmount + paperbackAmountAfterSpecialDiscount}
            </Text>
          </View>

          {/* net payable  */}
          {appliedCoupon && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "3px",
                backgroundColor: "#efefef",
                paddingHorizontal: "5px",
                marginBottom: "-5px",
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                Coupon Discount
              </Text>
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                {couponDiscountPercent}%
              </Text>
            </View>
          )}

          {shippingAmount && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "3px",
                backgroundColor: "#efefef",
                paddingHorizontal: "5px",
                marginBottom: "-5px",
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                Shipping & Handling Charges
              </Text>
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                Rs. {shippingAmount}
              </Text>
            </View>
          )}
          {onSiteDiscount && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "3px",
                backgroundColor: "#efefef",
                paddingHorizontal: "5px",
                marginBottom: "-5px",
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                Onsite Discount
              </Text>
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                Rs. {onSiteDiscount}
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
              paddingVertical: "3px",
              paddingHorizontal: "5px",
              backgroundColor: "#efefef",
              marginBottom: "-5px",
              borderBottom: 1,
              borderLeft: 1,
              borderRight: 1,
            }}
          >
            <Text style={{ fontSize: "11px", fontWeight: 600 }}>
              Net Payable :
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: 600 }}>
              Rs.{" "}
              {Math.round(
                (couponDiscountPercent > 0
                  ? subtotalAmount - couponDiscountAmount
                  : subtotalAmount) +
                  (shippingAmount ? parseFloat(shippingAmount) : 0) -
                  (onSiteDiscount ? parseFloat(onSiteDiscount) : 0)
              )}
              /-
            </Text>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default ShipmentPdf;
