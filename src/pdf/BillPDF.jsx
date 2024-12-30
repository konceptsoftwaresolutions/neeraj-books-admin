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

import logo from "../assets/renepho.jpg";

const formatHsnCode = (value) => {
  const parts = []; // Array to hold the formatted parts
  const chunkSize = 8; // Set chunk size to 4

  // Split the value into parts of 4 characters
  for (let i = 0; i < value.length; i += chunkSize) {
    parts.push(value.slice(i, i + chunkSize)); // Push each part to the array
  }

  // Return formatted text without any hyphen or additional characters
  return parts.map((part, index) => (
    <Text key={index}>
      {part}
      {index < parts.length - 1 && <Text>{"\n"}</Text>}{" "}
      {/* Add line break except for the last part */}
    </Text>
  ));
};

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
  //   table: {
  //     display: "table",
  //     width: "100%",
  //     // borderStyle: "solid",
  //     // borderColor: "#000",
  //     // borderWidth: 1,
  //     borderTopStyle: "solid",
  //     borderTopColor: "#000",
  //     borderTopWidth: 1,
  //     marginBottom: 20,
  //     // marginTop: 20,
  //   },
  //   tableHeader: {
  //     flexDirection: "row",
  //     backgroundColor: "#008c38",
  //     color: "#fff",
  //     fontWeight: "bold",
  //     textAlign: "left",
  //     borderBottomWidth: 1,
  //     borderBottomColor: "#000",
  //     padding: 2,
  //   },
  //   tableRow: {
  //     flexDirection: "row",
  //     borderBottomWidth: 1,
  //     borderBottomColor: "#000",
  //   },
  //   tableCell: {
  //     flex: 1,
  //     padding: 2,
  //     textAlign: "left",
  //     fontSize: 10,
  //   },
  //   tableCellHeader: {
  //     flex: 1,
  //     padding: 2,
  //     textAlign: "left",
  //     fontWeight: "bold",
  //     fontSize: 10,
  //   },
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
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
            position: "relative",
          }}
        >
          <Image src={logo} style={styles.logo} />
        </View>
        <View
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ position: "relative", top: 10 }}>
            <Text
              style={{
                fontSize: 11,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {/* GSTIN:07AAXCS5699B1ZM{"\n"} */}
              {/* CIN:U74999DL2016PTC305403 PAN No.: AAXCS5699B{"\n"} */}
              Receipt No :- 9012020-312{"\n"}
              Date :- 9-Jan-20{"\n"}
              Time :- 8:17 AM{"\n"}
            </Text>
          </View>
        </View>
      </View>

      <View style={{width:"100%"}}>
        <Text
          style={{
            fontSize: 11,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
            District Hospital Campus{"\n"}
              Jail Road{"\n"}
              Buxar{"\n"}
              Bihar 802101
        </Text>
      </View>

      <View style={{ marginTop: "10px", marginBottom: "5px" }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            display: "flex",
            fontWeight: "700",
          }}
        >
          Cash Receipt
        </Text>
        
      </View>

      {/* Horizontal Line */}
      <View style={styles.line} />

      {/* Content Section */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          margin:"0 auto",
          marginTop: "30px",
          justifyContent: "space-between",
        }}
      >
        <View style={{  width: "25%",}}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "right",
              paddingRight:"10px",
              marginBottom: "10px",
            }}
          >
            Received from Mr/Mrs :
          </Text>
          
        </View>
        <View style={{ width: "75%" ,
        borderBottomWidth: 1, // Adds bottom border for header row
        borderColor: "#000",
        }}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            
          </Text>
          
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          margin:"0 auto",
          marginTop: "80px",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "25%", }}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "right",
              paddingRight:"10px",
              marginBottom: "10px",
            }}
          >
            Receipt To :
          </Text>
          
        </View>
        <View style={{ width: "75%" ,
        borderBottomWidth: 1, // Adds bottom border for header row
        borderColor: "#000",
        }}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            Baban Chaudhary
          </Text>
          
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          margin:"0 auto",
          marginTop: "20px",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "25%", }}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "right",
              paddingRight:"10px",
              marginBottom: "10px",
            }}
          >
            Amount Received Rs. :
          </Text>
          
        </View>
        <View style={{ width: "75%" ,
        borderBottomWidth: 1, // Adds bottom border for header row
        borderColor: "#000",
        }}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            1587 
          </Text>
          
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          margin:"0 auto",
          marginTop:"5px",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width:"25%" }}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            
          </Text>
          
        </View>
        <View style={{ width: "75%" }}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            (One Thousand Five Hundered Eighty Seven Only)
          </Text>
          
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          margin:"0 auto",
          marginTop:"70px",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "65%" }}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            
          </Text>
          
        </View>
        <View style={{ width:"35%" }}>
          <Text
            style={{
              width: "100%",
              fontSize: 11,
              textAlign: "right",
              marginBottom: "10px",
            }}
          >
            By Renepho medical pvt. ltd.
          </Text>
          
        </View>
        
      </View>

      
    </Page>
  </Document>
);

// Component to download the PDF
const BillPDF = () => (
  <div>
    {/* <h1>Generate and Download PDF</h1> */}
    <PDFDownloadLink document={<MyDocument />} fileName="basic_document.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Bill PDF"
      }
    </PDFDownloadLink>
  </div>
);

export default BillPDF;
