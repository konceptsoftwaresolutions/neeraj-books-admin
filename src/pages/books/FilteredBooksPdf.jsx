import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for landscape layout
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000",
    // borderWidth: 1,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "12.5%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#eee",
    padding: 4,
    fontWeight: "bold",
  },
  tableCol: {
    width: "12.5%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    padding: 4,
  },
});

const FilteredBooksPdf = ({ data = [] }) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Title</Text>
            <Text style={styles.tableColHeader}>Book Code</Text>
            <Text style={styles.tableColHeader}>Category</Text>
            <Text style={styles.tableColHeader}>Edition</Text>
            <Text style={styles.tableColHeader}>Paperback </Text>
            <Text style={styles.tableColHeader}>eBook </Text>
            <Text style={styles.tableColHeader}>ISBN</Text>
            <Text style={styles.tableColHeader}>Stock</Text>
          </View>

          {data.map((book, index) => {
            const detail = book.bookDetail || {};
            const category = book.categoriesArray?.[0]?.name || "";

            return (
              <View key={book._id || index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{book.title}</Text>
                <Text style={styles.tableCol}>{book.bookCode}</Text>
                <Text style={styles.tableCol}>{category}</Text>
                <Text style={styles.tableCol}>{detail.edition || "N/A"}</Text>
                <Text style={styles.tableCol}>
                  Rs.{detail.paperBackDiscountedPrice || "0"}
                </Text>
                <Text style={styles.tableCol}>
                  Rs.{detail.eBookOriginalPrice || "0"}
                </Text>
                <Text style={styles.tableCol}>{detail.isbn || "N/A"}</Text>
                <Text style={styles.tableCol}>{detail.stock || "0"}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default FilteredBooksPdf;
