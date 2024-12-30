// utils/dateUtils.js
import moment from "moment";

// Convert date to 'DD/MM/YYYY' format
export const formatDateForDisplay = (date) => {
  return date ? moment(date, "YYYY-MM-DD").format("DD/MM/YYYY") : null;
};

// Convert date to 'YYYY-MM-DD' format for form state
export const formatDateForSubmit = (date) => {
  return date ? moment(date, "DD/MM/YYYY").format("YYYY-MM-DD") : null;
};
