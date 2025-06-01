import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
  },
  orderHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  row: {
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  col: {
    paddingRight: 4,
  },
  col1: { width: "5%" },
  col2: { width: "35%" },
  col3: { width: "15%" },
  col4: { width: "15%" },
  col5: { width: "15%" },
  col6: { width: "15%" },
});

const AllOrdersPdf = ({ data = [] }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {data.map((order, index) => (
          <View key={order._id || index} style={styles.section}>
            <Text style={styles.orderHeader}>Order ID: {order.orderId}</Text>
            <Text style={styles.row}>
              Customer: {order.shippingAddress?.firstName ?? ""}{" "}
              {order.shippingAddress?.lastName ?? ""}
            </Text>
            <Text style={styles.row}>
              Address: {order.shippingAddress?.addressLine1 ?? ""},{" "}
              {order.shippingAddress?.city ?? ""},{" "}
              {order.shippingAddress?.state ?? ""} -{" "}
              {order.shippingAddress?.pincode ?? ""}
            </Text>
            <Text style={styles.row}>
              Mobile: {order.shippingAddress?.mobile}
            </Text>
            <Text style={styles.row}>Status: {order.orderStatus}</Text>
            <Text style={styles.row}>Payment Mode: {order.paymentMode}</Text>
            <Text style={styles.row}>Total: Rs.{order.totalAmount}</Text>
            <Text style={styles.row}>
              Created: {new Date(order.createdAt).toLocaleString()}
            </Text>

            <Text style={[styles.row, { marginTop: 6, fontWeight: "bold" }]}>
              Items:
            </Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.col, styles.col1]}>#</Text>
              <Text style={[styles.col, styles.col2]}>Product</Text>
              <Text style={[styles.col, styles.col3]}>Lang</Text>
              <Text style={[styles.col, styles.col4]}>Qty</Text>
              <Text style={[styles.col, styles.col5]}>Price</Text>
              <Text style={[styles.col, styles.col6]}>HSN</Text>
            </View>

            {/* Table Rows */}
            {order.items?.map((item, idx) => {
              const product = item?.productId?.english || {};
              const price = product.paperBackDiscountedPrice ?? 0;
              const original = product.paperBackOriginalPrice ?? 0;
              const title = product.title || "";

              const ebookText = item.onlyEbookSelected
                ? " (eBook Only)"
                : item.isEbookAlsoSelected
                ? " (PB + eBook)"
                : "";

              return (
                <View key={idx} style={styles.tableRow}>
                  <Text style={[styles.col, styles.col1]}>{idx + 1}</Text>
                  <Text style={[styles.col, styles.col2]}>
                    {title}
                    {ebookText}
                  </Text>
                  <Text style={[styles.col, styles.col3]}>
                    {item.language ?? ""}
                  </Text>
                  <Text style={[styles.col, styles.col4]}>
                    {item.quantity ?? ""}
                  </Text>
                  <Text style={[styles.col, styles.col5]}>
                    Rs.{price}
                    {/* / Rs.{original} */}
                  </Text>
                  <Text style={[styles.col, styles.col6]}>
                    {item.hsn ?? ""}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default AllOrdersPdf;
