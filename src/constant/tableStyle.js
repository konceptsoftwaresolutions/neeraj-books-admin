export const tableStyle = {
  headRow: {
    style: {
      background: "linear-gradient(90deg, #1f437f, #be2220)",
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: "14px",
      // borderRadius: "5px",
      minHeight: "38px",
      whiteSpace: "normal", // Allow wrapping
      wordBreak: "break-word", // Break long words
    },
  },
  rows: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      cursor: "pointer",
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#29A6E0",
      },
    },
  },
  table: {
    style: {
      overflowX: 'auto', // Allow horizontal scrolling only when needed
      width: '100%', // Ensure the table stretches across the container
    },
  },
};
