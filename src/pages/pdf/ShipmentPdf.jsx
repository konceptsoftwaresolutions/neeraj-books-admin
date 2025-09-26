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
  console.log(data)
  // const data = {
  //   _id: "68a5a44877719ed4949a24ca",
  //   orderId: "NB-00267",
  //   txnid: "NB-00267",
  //   user: "6899b0dea468492ec1059ffe",
  //   items: [
  //     {
  //       productId: {
  //         _id: "68554a244655c950714c9e78",
  //         english: {
  //           title: "European Classic Literature",
  //           paperBackOriginalPrice: "300",
  //           eBookOriginalPrice: "1",
  //           paperBackDiscountedPrice: "150",
  //           slug: "european-classic-literature",
  //           weight: "0.230",
  //           bookCode: "BEGC-102",
  //         },
  //         bookCodeResolved: "BEGC-102",
  //       },
  //       language: "english",
  //       quantity: 1,
  //       hsn: "4901",
  //       isEbookAlsoSelected: true,
  //       onlyEbookSelected: false,
  //       ebookPrice: 70,
  //       _id: "68a5a41f77719ed4949a03f7",
  //       bookCode: "BEGC-102",
  //     },
  //   ],
  //   shippingAddress: {
  //     firstName: "Yatin Chopra",
  //     lastName: "Chopra",
  //     addressLine1: "D-4/6",
  //     addressLine2: "Rana Pratap Bagh",
  //     city: "Delhi",
  //     state: "Delhi",
  //     country: "India",
  //     pincode: "110007",
  //     mobile: "9910009880",
  //     _id: "68a59f2077719ed4949811b3",
  //   },
  //   orderStatus: "Pending",
  //   paymentStatus: "Pending",
  //   paymentMode: "Prepaid",
  //   totalAmount: 132,
  //   shippingAmount: "30.1",
  //   fromWhereYouGetTheReference: "Youtube",
  //   discountTotal: 150,
  //   additionalDiscount: null,
  //   discountDetails: [{}],
  //   appliedCoupon: "BADALFOURTY",
  //   orderWeight: "0.23",
  //   noOfBooksWithoutEbook: "0",
  //   createdAt: "2025-08-20T10:32:40.749Z",
  //   updatedAt: "2025-08-20T10:32:40.749Z",
  //   __v: 0,
  // };
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
    mihpayid,
    additionalDiscount,
    onSiteDiscount,
  } = data;

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
            marginTop: "-15px",
            paddingBottom: "10px",
            borderBottom: 1,
          }}
        >
          <View>
            <Image
              src={neerajLogo}
              style={{
                width: 100,
                paddingTop: 3,
                height: 60, // add height to maintain aspect ratio or size
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
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
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
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                marginTop: "6px",
              }}
            >
              <Text style={{ fontSize: "10px" }}>
                M. : 8510009872 , 9510009878 , E-mail : info@neerajbooks.com
              </Text>

              <Text
                style={{
                  fontSize: "10px",
                  // paddingTop: "8px",
                  fontWeight: 600,
                }}
              >
                {" "}
                Website : neerajbooks.com
              </Text>
            </View>
          </View>

          <Text>
            <Image
              src={hatlogo}
              style={{
                width: 70,
                height: 70, // add height to maintain aspect ratio or size
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
                width: "180px",
                borderRight: 1,
                borderColor: "#efefef",
                textAlign: "left",
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
                  <Text style={{ fontSize: "9px" }}>Txn ID: - {mihpayid}</Text>
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
                  borderWidth: 1,
                  borderColor: "#000",
                  marginTop: 10,
                  backgroundColor: "#efefef",
                  paddingHorizontal: 4,
                  marginBottom: "-6px",
                }}
              >
                {/* <Text
                  style={{
                    fontSize: 9,
                    width: "7%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  S.No.
                </Text> */}

                <Text
                  style={{
                    fontSize: 12,
                    width: "55%",
                    paddingLeft: 4,
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  Product
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    width: "12%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  Medium
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    width: "10%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  Qty
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    width: "10%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  Price
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    width: "12%",
                    textAlign: "right",
                    paddingVertical: 6,
                  }}
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
                        // paddingVertical: 4,
                      }}
                    >
                      {/* <Text
                        style={{
                          fontSize: 9,
                          width: "7%",
                          textAlign: "center",
                          borderRightWidth: 1,
                          borderColor: "#000",
                          paddingVertical: 6,
                        }}
                      >
                        {index + 1}
                      </Text> */}
                      <Text
                        style={{
                          fontSize: 9,
                          width: "55%",
                          paddingLeft: 4,
                          borderRightWidth: 1,
                          borderColor: "#000",
                          paddingVertical: 6,
                        }}
                      >
                        {product?.bookCode} {"\n"}
                        {bookTitle} 
                      </Text>
                      <Text
                        style={{
                          fontSize: 9,
                          width: "12%",
                          textAlign: "center",
                          borderRightWidth: 1,
                          borderColor: "#000",
                          paddingVertical: 6,
                          textTransform: "capitalize",
                        }}
                      >
                        {medium}
                      </Text>
                      <Text
                        style={{
                          fontSize: 9,
                          width: "10%",
                          textAlign: "center",
                          borderRightWidth: 1,
                          borderColor: "#000",
                          paddingVertical: 6,
                        }}
                      >
                        {quantity}
                      </Text>
                      <Text
                        style={{
                          fontSize: 9,
                          width: "10%",
                          textAlign: "center",
                          borderRightWidth: 1,
                          borderColor: "#000",
                          paddingVertical: 6,
                        }}
                      >
                        Rs. {originalSellingPrice}
                      </Text>

                      <Text
                        style={{
                          fontSize: 9,
                          width: "12%",
                          textAlign: "right",
                          paddingVertical: 6,
                        }}
                      >
                        Rs. {sellingPrice * quantity}
                      </Text>
                    </View>
                  );
                }

                return rows;
              })}

              <View
                style={{
                  borderWidth: 1,
                  borderTop: 0,
                  borderColor: "black",
                }}
              >
                {/* <View
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
                  <Text style={{ fontSize: "9px" }}>No. of Books: </Text>
                  <Text style={{ fontSize: "9px" }}>
                    {totalPaperbackQuantity}
                  </Text>
                </View> */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderColor: "#000",
                    borderBottom: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: "9px",
                      width: "86%",
                      paddingVertical: "5px",
                      paddingHorizontal: "5px",
                      textAlign: "right",
                    }}
                  >
                    MRP Amount:
                  </Text>
                  <Text
                    style={{
                      fontSize: "9px",
                      width: "13%",
                      paddingVertical: "5px",
                      paddingHorizontal: "5px",
                      borderLeft: 1,
                      textAlign: "right",
                    }}
                  >
                    Rs. {totalPaperbackOriginalAmount}/-
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderColor: "#000",
                    borderBottom: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: "9px",
                      width: "86%",
                      paddingVertical: "5px",
                      paddingHorizontal: "5px",
                      textAlign: "right",
                    }}
                  >
                    Discount ({totalPaperbackDiscountPercent}%) (-)
                  </Text>
                  <Text
                    style={{
                      fontSize: "9px",
                      width: "13%",
                      paddingVertical: "5px",
                      paddingHorizontal: "5px",
                      borderLeft: 1,
                      textAlign: "right",
                    }}
                  >
                    Rs. {totalPaperbackDiscountAmount}/-
                  </Text>
                </View>

                {/* <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderColor: "#000",
                        borderBottom: 1,
                        textAlign:'right'


                    }}
                  >
                    <Text
                      style={{
                        fontSize: "9px",
                        width: "88%",
                        paddingVertical: "5px",
                        paddingHorizontal: "5px",
                      }}
                    >
                      Sub Total
                    </Text>
                    <Text
                      style={{
                        fontSize: "9px",
                        width: "12%",
                        paddingVertical: "5px",
                        paddingHorizontal: "5px",
                        borderLeft: 1,
                        textAlign: "right",
                      }}
                    >
                      Rs. {totalPaperbackAmount}/-
                    </Text>
                  </View> */}

                {totalSpecialDiscountPercentage > 0 && (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderColor: "#000",
                      borderBottom: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "9px",
                        width: "86%",
                        paddingVertical: "5px",
                        paddingHorizontal: "5px",
                        textAlign: "right",
                      }}
                    >
                      Special Discount: ({totalSpecialDiscountPercentage}%){" "} (-)
                    </Text>
                    <Text
                      style={{
                        fontSize: "9px",
                        width: "13%",
                        paddingVertical: "5px",
                        paddingHorizontal: "5px",
                        borderLeft: 1,
                        textAlign: "right",
                      }}
                    >
                      Rs. {totalSpecialDiscountOnPaperback}/-
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderColor: "#000",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "9px",
                      width: "86%",
                      paddingVertical: "5px",
                      paddingHorizontal: "5px",
                      textAlign: "right",
                    }}
                  >
                    Printed Books Total Amount:
                  </Text>
                  <Text
                    style={{
                      fontSize: "9px",
                      width: "13%",
                      paddingVertical: "5px",
                      paddingHorizontal: "5px",
                      borderLeft: 1,
                      textAlign: "right",
                    }}
                  >
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
                  borderWidth: 1,
                  borderColor: "#000",
                  marginTop: 10,
                  backgroundColor: "#efefef",
                  paddingHorizontal: 4,
                  marginBottom: "-6px",
                }}
              >
                {/* <Text
                  style={{
                    fontSize: 9,
                    width: "7%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  S.No.
                </Text> */}

                <Text
                  style={{
                    fontSize: 12,
                    width: "55%",
                    paddingLeft: 4,
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  Product
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    width: "12%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  Medium
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    width: "10%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  Qty
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    width: "10%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  Price
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    width: "12%",
                    textAlign: "right",
                    paddingVertical: 6,
                  }}
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
                        // paddingVertical: 5,
                      }}
                    >
                      
                      <Text
                        style={{
                          fontSize: 9,
                          width: "55%",
                          paddingLeft: 4,
                          borderRightWidth: 1,
                          borderColor: "#000",
                          paddingVertical: 6,
                        }}
                      >
                        {product?.bookCode} {"\n"}
                        {bookTitle} 
                      </Text>
                      <Text
                        style={{
                          fontSize: 9,
                          width: "12%",
                          textAlign: "center",
                          borderRightWidth: 1,
                          borderColor: "#000",
                          paddingVertical: 6,
                          textTransform: "capitalize",
                        }}
                      >
                        {medium}
                      </Text>
                      <Text
                        style={{
                          fontSize: 9,
                          width: "10%",
                          textAlign: "center",
                          borderRightWidth: 1,
                          borderColor: "#000",
                          paddingVertical: 6,
                        }}
                      >
                        1
                      </Text>
                      <Text
                        style={{
                          fontSize: 9,
                          width: "10%",
                          textAlign: "center",
                          borderRightWidth: 1,
                          borderColor: "#000",
                          paddingVertical: 6,
                        }}
                      >
                        Rs. {ebookPrice}
                      </Text>
                      <Text
                        style={{
                          fontSize: 9,
                          width: "12%",
                          textAlign: "right",
                          paddingVertical: 6,
                        }}
                      >
                        Rs. {ebookPrice}
                      </Text>
                    </View>
                  );
                }

                return rows;
              })}

              <View
                style={{
                  borderWidth: 1,
                  borderTop: 0,
                  borderColor: "black",
                  // marginTop: "10px",
                }}
              >
                {/* <View
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
                    <Text style={{ fontSize: "9px" }}>No. of E-books: </Text>
                    <Text style={{ fontSize: "9px" }}>
                      {totalEbookQuantity}
                    </Text>
                  </View> */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderColor: "#000",
                    textAlign: "right",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "9px",
                      width: "86%",
                      paddingVertical: "5px",
                      paddingHorizontal: "5px",
                    }}
                  >
                    Ebooks Total
                  </Text>
                  <Text
                    style={{
                      fontSize: "9px",
                      width: "13%",
                      paddingVertical: "5px",
                      paddingHorizontal: "5px",
                      borderLeft: 1,
                      textAlign: "right",
                    }}
                  >
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
              backgroundColor: "#efefef",
              marginTop: "12px",
              marginBottom: "-5px",
              borderLeft: 1,
              borderRight: 1,
            }}
          >
            <Text
              style={{
                fontSize: "11px",
                fontWeight: 600,
                paddingHorizontal: "5px",
                paddingVertical: "3px",
                textAlign: "right",
                width: "86%",
              }}
            >
              Grand Total ( {totalPaperbackQuantity > 0 ? "Printed Books" : ""}
              {totalPaperbackQuantity > 0 && totalEbookQuantity > 0
                ? " + "
                : null}
              {totalEbookAmount > 0 ? "E-book" : null} )
            </Text>
            <Text
              style={{
                fontSize: "11px",
                fontWeight: 600,
                width: "13%",
                borderLeft: 1,
                paddingHorizontal: "5px",
                paddingVertical: "3px",
                textAlign: "right",
              }}
            >
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
                // paddingVertical: "3px",
                backgroundColor: "#efefef",
                // paddingHorizontal: "5px",
                marginBottom: "-5px",
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  paddingHorizontal: "5px",
                  paddingVertical: "3px",
                  textAlign: "right",

                  width: "86%",
                }}
              >
                Coupon Code Discount ({appliedCoupon} - {appliedCouponDiscount}%) (-)
              </Text>

              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  width: "13%",
                  borderLeft: 1,
                  paddingHorizontal: "5px",
                  paddingVertical: "3px",
                  textAlign: "right",
                }}
              >
                Rs. {couponDiscountAmount}
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
                backgroundColor: "#efefef",
                marginBottom: "-5px",
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  paddingHorizontal: "5px",
                  paddingVertical: "3px",
                  textAlign: "right",

                  width: "86%",
                }}
              >
                Shipping & Handling Charges (+)
              </Text>
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  width: "13%",
                  borderLeft: 1,
                  paddingHorizontal: "5px",
                  paddingVertical: "3px",
                  textAlign: "right",
                }}
              >
                Rs. {Math.round(shippingAmount)}
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
                backgroundColor: "#efefef",
                marginBottom: "-5px",
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  paddingHorizontal: "5px",
                  paddingVertical: "3px",
                  textAlign: "right",

                  width: "86%",
                }}
              >
                Onsite Discount (-)
              </Text>
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  width: "13%",
                  borderLeft: 1,
                  paddingHorizontal: "5px",
                  paddingVertical: "3px",
                  textAlign: "right",
                }}
              >
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
              backgroundColor: "#efefef",
              marginBottom: "-5px",
              borderBottom: 1,
              borderLeft: 1,
              borderRight: 1,
            }}
          >
            <Text
              style={{
                fontSize: "11px",
                fontWeight: 600,
                paddingHorizontal: "5px",
                paddingVertical: "3px",
                textAlign: "right",

                width: "86%",
              }}
            >
              Net Payable Amount:
            </Text>
            <Text
              style={{
                fontSize: "11px",
                fontWeight: 600,
                width: "13%",
                borderLeft: 1,
                paddingHorizontal: "5px",
                paddingVertical: "3px",
                textAlign: "right",
              }}
            >
              Rs.{" "}
              {(
                (couponDiscountPercent > 0
                  ? subtotalAmount - couponDiscountAmount
                  : subtotalAmount) +
                (shippingAmount ? Math.round(parseFloat(shippingAmount)) : 0) -
                (onSiteDiscount ? parseFloat(onSiteDiscount) : 0)
              ).toFixed(0)}
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