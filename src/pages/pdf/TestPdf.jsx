import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";

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
    marginTop: 10,
  },
  tableHeadings: {
    fontSize: "9px",
    fontWeight: 700,
    padding: 3,
  },
  tableData: {
    fontSize: "10px",
    fontWeight: 500,
    padding: 3,
  },
  yellowBg: {
    backgroundColor: "yellow",
  },
  greenBg: {
    backgroundColor: "#01cc00",
  },
  brownBg: {
    backgroundColor: "#ffc000",
  },
});

// Create the PDF document
const TestPdf = () => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ width: "100%" }}>
            <Text
              style={{ fontSize: 16, textAlign: "center", fontWeight: 800 }}
            >
              JOB CARD
            </Text>
          </View>

          {/* first table  */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 16,
              borderTop: 1,
              borderLeft: 1,
              borderRight: 1,
              borderColor: "#000",
            }}
          >
            <View style={{ width: "50%", borderRight: 1, borderColor: "#000" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    width: "50%",
                    ...styles.tableHeadings,
                    borderRight: 1,

                    borderColor: "#000",
                  }}
                >
                  SEIPL JOB No.
                </Text>
                <Text style={{ width: "50%" }}></Text>
              </View>
            </View>
            <View
              style={{ width: "50%", display: "flex", flexDirection: "row" }}
            >
              <Text
                style={{
                  width: "50%",
                  ...styles.tableHeadings,
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                SEIPL Quotation No::
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderTop: 1,
              borderLeft: 1,
              borderColor: "#000",
              ...styles.yellowBg,
            }}
          >
            <View style={{ width: "50%", borderRight: 1, borderColor: "#000" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    width: "100%",
                    ...styles.tableHeadings,

                    borderColor: "#000",
                  }}
                >
                  On Site Reporting Date & Time at Customer :
                </Text>
              </View>
            </View>
            <View
              style={{ width: "50%", display: "flex", flexDirection: "row" }}
            >
              <Text
                style={{
                  width: "50%",
                  ...styles.tableData,
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                12-03-2025
              </Text>
              <Text
                style={{
                  width: "50%",
                  ...styles.tableData,
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Time - 12-03-2025 AM
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderTop: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderColor: "#000",
            }}
          >
            <View style={{ width: "50%", borderRight: 1, borderColor: "#000" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  ...styles.greenBg,
                }}
              >
                <Text
                  style={{
                    width: "50%",
                    ...styles.tableHeadings,
                    borderRight: 1,
                    borderColor: "#000",
                    height: "100%",
                    borderColor: "#000",
                  }}
                >
                  Site Work Date & Time
                </Text>
                <Text
                  style={{
                    width: "50%",
                    ...styles.tableData,
                  }}
                >
                  12-03-2025 - 09:00
                </Text>
              </View>
            </View>
            <View
              style={{ width: "50%", display: "flex", flexDirection: "row" }}
            >
              <Text
                style={{
                  width: "50%",
                  ...styles.tableHeadings,
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                SEIPL Sales Executive Name:
              </Text>
              <Text
                style={{
                  width: "50%",
                  ...styles.tableData,
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Mr. Sushil Arora
              </Text>
            </View>
          </View>

          {/* customer details table  */}
          <View style={{ borderColor: "#000" }}>
            <View
              style={{
                marginTop: 20,
                borderRight: 1,
                borderLeft: 1,
                borderBottom: 1,
                borderTop: 1,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  borderBottom: 1,
                  borderColor: "#000",
                  ...styles.greenBg,
                }}
              >
                Customer Details
              </Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                {/* left side */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                    borderRight: 1,
                    borderColor: "#000",
                  }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                      }}
                    >
                      Customer Name :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderTop: 1,
                      borderColor: "#000",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                      }}
                    >
                      Address :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderTop: 1,
                      borderColor: "#000",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                      }}
                    >
                      Contact Person Name :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderTop: 1,
                      borderColor: "#000",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                      }}
                    >
                      Contact/Mobile No :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderTop: 1,
                      borderColor: "#000",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                        paddingBottom: 12,
                        height: "100%",
                      }}
                    >
                      Customer P.O/W.O No. :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                </View>
                {/* right side */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                      }}
                    >
                      Site Name :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderTop: 1,
                      borderColor: "#000",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                      }}
                    >
                      Site Address :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderTop: 1,
                      borderColor: "#000",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                      }}
                    >
                      Site Contact Person Name :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderTop: 1,
                      borderColor: "#000",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                      }}
                    >
                      Site Contact/Mobile No. :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderTop: 1,
                      borderColor: "#000",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.tableHeadings,
                        width: "50%",
                        borderRight: 1,
                        borderColor: "#000",
                      }}
                    >
                      Customer Geo Coordinates(Location) :
                    </Text>
                    <Text
                      style={{
                        ...styles.tableData,
                        width: "50%",
                      }}
                    >
                      Delhi Electrical Company
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* work execution team details */}
          <View
            style={{
              marginTop: 20,
              borderRight: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderTop: 1,
              borderColor: "#000",
            }}
          >
            <Text
              style={{
                ...styles.tableHeadings,
                borderBottom: 1,
                borderColor: "#000",
                ...styles.greenBg,
              }}
            >
              Work Execution Team Details
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: 1,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "50%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Job Team Leader Name(SEIPL/Third Party) :
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "50%",
                }}
              >
                MR. Satish Kumar
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: 1,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "50%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Job Team Leader Contact Number :
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "50%",
                }}
              >
                MR. Satish Kumar
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: 1,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "50%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Job Team Member Name (SEIPL) :
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "50%",
                }}
              >
                MR. Satish Kumar
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "50%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Job Team Member Name(Third Party) :
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "50%",
                }}
              >
                MR. Satish Kumar
              </Text>
            </View>
          </View>

          {/* scope of work table  */}
          <View
            style={{
              marginTop: 20,
              borderRight: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderTop: 1,
              borderColor: "#000",
            }}
          >
            <Text
              style={{
                ...styles.tableHeadings,
                borderBottom: 1,
                borderColor: "#000",
                ...styles.greenBg,
              }}
            >
              Scope Of Work
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "8%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                S.No.
              </Text>
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "18%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Service Code
              </Text>
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "60%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Scope Of Work
              </Text>
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "14%",
                  borderColor: "#000",
                }}
              >
                QTY.
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderTop: 1,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableData,
                  width: "8%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                1
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "18%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              ></Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "60%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Earth Pits Checking and Testing
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "14%",
                  borderColor: "#000",
                }}
              >
                144 Nos.
              </Text>
            </View>
          </View>

          {/* required tools and test kit */}
          <View
            style={{
              marginTop: 20,
              borderRight: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderTop: 1,
              borderColor: "#000",
            }}
          >
            <Text
              style={{
                ...styles.tableHeadings,
                borderBottom: 1,
                borderColor: "#000",
                ...styles.greenBg,
              }}
            >
              Required Tools and Test Kit
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "8%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                S.No.
              </Text>
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "22%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Service Code
              </Text>
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "55%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Scope Of Work
              </Text>
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "15%",
                  borderColor: "#000",
                }}
              >
                QTY.
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderTop: 1,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableData,
                  width: "8%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                1
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "22%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              ></Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "55%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Earth Pits Checking and Testing
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "15%",
                  borderColor: "#000",
                }}
              >
                144 Nos.
              </Text>
            </View>
          </View>

          {/* site consumeables table */}
          <View
            style={{
              marginTop: 20,
              borderRight: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderTop: 1,
              borderColor: "#000",
            }}
          >
            <Text
              style={{
                ...styles.tableHeadings,
                borderBottom: 1,
                borderColor: "#000",
                ...styles.greenBg,
              }}
            >
              Site Consumeable
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "8%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                S.No.
              </Text>
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "22%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Goods Code
              </Text>
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "55%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Consumeable Material Name
              </Text>
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "15%",
                  borderColor: "#000",
                }}
              >
                QTY.
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderTop: 1,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  ...styles.tableData,
                  width: "8%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                1
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "22%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              ></Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "55%",
                  borderRight: 1,

                  borderColor: "#000",
                }}
              >
                Earth Pits Checking and Testing
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "15%",
                  borderColor: "#000",
                }}
              >
                144 Nos.
              </Text>
            </View>
          </View>

          {/* way of travelling table */}
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              borderRight: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderTop: 1,
              borderColor: "#000",
            }}
          >
            <View style={{ width: "50%", borderRight: 1, borderColor: "#000" }}>
              <Text
                style={{
                  ...styles.tableHeadings,
                }}
              >
                Way Of Travelling
              </Text>
              <Text style={{ ...styles.tableData, marginTop: "-5px" }}>
                (Bus/Train/CompanyCar/Taxi/Company Bike/Owned Bike/By Air)
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  ...styles.tableHeadings,
                }}
              >
                Company Car
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              borderRight: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderColor: "#000",
            }}
          >
            <View style={{ width: "50%", borderRight: 1, borderColor: "#000" }}>
              <Text style={{ ...styles.tableData }}>
                Advanced required for site Expense(Yes/no)
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  ...styles.tableHeadings,
                }}
              >
                Yes
              </Text>
            </View>
          </View>

          {/* team leader signature table */}
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              borderRight: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderTop: 1,
              borderColor: "#000",
            }}
          >
            <View style={{ width: "50%", borderRight: 1, borderColor: "#000" }}>
              <Text
                style={{
                  ...styles.tableHeadings,
                }}
              >
                Team Leader Signature/Acknowledgement Status
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  ...styles.tableHeadings,
                }}
              >
                Team Members Signature/Acknowledgement Status
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              borderRight: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderColor: "#000",
            }}
          >
            <View style={{ width: "50%", borderRight: 1, borderColor: "#000" }}>
              <Text style={{ ...styles.tableData }}>
                Communication mode (over call / Whatsapp) : Yes/No
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  ...styles.tableData,
                }}
              >
                Communication mode (over call / Whatsapp) : Yes/No
              </Text>
            </View>
          </View>

          {/* work reference by table */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderTop: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderRight: 1,
              borderColor: "#000",
              marginTop: 20,
            }}
          >
            <View
              style={{ width: "50%", display: "flex", flexDirection: "row" }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "50%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Work Reference By :
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "50%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Sushil Arora{" "}
              </Text>
            </View>
            <View
              style={{ width: "50%", display: "flex", flexDirection: "row" }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "52%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Job Card Prepared Date & Time
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "24%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                05-03-2025
              </Text>
              <Text style={{ ...styles.tableData, width: "24%" }}>
                05:50:00 PM
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderLeft: 1,
              borderBottom: 1,
              borderRight: 1,
              borderColor: "#000",
            }}
          >
            <View
              style={{ width: "50%", display: "flex", flexDirection: "row" }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "50%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Job Card Prepared By :
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "50%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Miss. Arti Rajput{" "}
              </Text>
            </View>
            <View
              style={{ width: "50%", display: "flex", flexDirection: "row" }}
            >
              <Text
                style={{
                  ...styles.tableHeadings,
                  width: "52%",
                  borderRight: 1,
                  borderColor: "#000",
                }}
              >
                Service Coordinator Contact No
              </Text>
              <Text
                style={{
                  ...styles.tableData,
                  width: "48%",
                  borderColor: "#000",
                }}
              >
                7736489034
              </Text>
            </View>
          </View>

          {/* general note */}
          <View
            style={{
              paddingHorizontal: 3,
              paddingVertical: 4,
              marginTop: 12,
              backgroundColor: "yellow",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 700 }}>General Note</Text>
          </View>

          {/* special note for team  */}
          <View
            style={{
              paddingHorizontal: 3,
              paddingVertical: 4,
              marginTop: 12,
              backgroundColor: "yellow",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 700 }}>
              Special Note For Team
            </Text>
          </View>
          <Text style={{ fontSize: 11, marginTop: 3 }}>
            <Text style={{ fontWeight: "700" }}>
              Attendance Cum Expense Register:
            </Text>{" "}
            Must be filled if every site work duration is 3 days or more
          </Text>
          <Text style={{ fontSize: 11, marginTop: 3 }}>
            <Text style={{ fontWeight: "700" }}>Hotel Charges:</Text> Allowed
            upto Rs. 750/- without prior approval. Any amount exceeding this
            requires prior approval.
          </Text>
          <Text style={{ fontSize: 11, marginTop: 3 }}>
            <Text style={{ fontWeight: "700" }}>
              Train Sleeper Class Tickets:
            </Text>{" "}
            Permitted without approval.
          </Text>

          {/* mandatory attachements */}
          <View
            style={{
              paddingHorizontal: 3,
              paddingVertical: 4,
              marginTop: 12,
              ...styles.brownBg,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 700 }}>
              Mandatory Attachments
            </Text>
          </View>
          <Text style={{ fontSize: 11, marginTop: 3, fontWeight: "700" }}>
            1. Engineer's Common KRA (Key Responsibility Areas){" "}
          </Text>
          <Text style={{ fontSize: 11, marginTop: 3, fontWeight: "700" }}>
            2. On-Site Work Process Chart{" "}
          </Text>
          <Text style={{ fontSize: 11, marginTop: 3, fontWeight: "700" }}>
            3. Safety , Health & Environment (SHE) Policy{" "}
          </Text>
          <Text style={{ fontSize: 11, marginTop: 3, fontWeight: "700" }}>
            4. Equipment testing blank formats as per scope of work.{" "}
          </Text>
          <Text style={{ fontSize: 11, marginTop: 3, fontWeight: "700" }}>
            5. Service validity stickers as per scope of Quantity{" "}
          </Text>
          <Text style={{ fontSize: 11, marginTop: 3, fontWeight: "700" }}>
            6. Calibration certificates as per test kit Asset code which will be
            sending to site.
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TestPdf;
