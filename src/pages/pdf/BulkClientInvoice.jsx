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
import useBulkOrderSummary from "../../hooks/useBulkOrderSummary";

// Define styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    color: "#000",
    padding: 20,
    // paddingBottom: 120, // Add this - reserves space for footer
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
  companyNameDetail: {
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
  footer: {
    position: "absolute",
    bottom: 10,
    left: 20, // Change from 40 to match page padding
    right: 20, // Change from 40 to match page padding
    fontSize: 7, // Reduce from 10 to fit more content
    color: "grey",
  },
  footerTitle: {
    fontSize: 8, // Reduce from 10
    fontWeight: "bold",
    color: "black",
    marginBottom: 4,
  },
  bulletPoint: {
    marginBottom: 2, // Reduce from 6
    fontSize: 6, // Reduce from 7
    color: "black",
  },
  bullet: {
    width: 3, // Reduce from 4
    height: 3, // Reduce from 4
    borderRadius: 1.5, // Adjust accordingly
    backgroundColor: "#000",
    marginRight: 4, // Reduce from 6
    marginTop: 1.5, // Adjust for smaller size
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

// Create the PDF document

// Component to download the PDF
const BulkClientInvoice = ({ data = {}, couponPercentage = 0 }) => {
  console.log(data);
  // const data = {
  //   _id: "687778c8f0e30816cb24cde9",
  //   orderId: "BO-00009",
  //   client: {
  //     _id: "6870e7cd9b07412cb7e63c08",
  //     firstName: "dipesh",
  //     lastName: "sharma",
  //     companyName: "Koncept Software Solutions",
  //   },
  //   date: "2025-07-16T00:00:00.000Z",
  //   books: [
  //     {
  //       product: {
  //         _id: "68554a244655c950714c9e78",
  //         english: {
  //           title: "European Classic Literature",
  //           viewParentCategory: "6793299677c235cc0ea85a8e",
  //           viewSubCategory: ["67b3293391a8bde78bdf4b41"],
  //           viewSubSubCategory: ["67e5937fd9b8c24257aa3501"],
  //           isVideoPreviewAvailable: false,
  //           titleOfFirstSemesterSolvedPaper: "",
  //           linkOfFirstSemesterSolvedPaper: "",
  //           titleOfSecondSemesterSolvedPaper: "",
  //           linkOfSecondSemesterSolvedPaper: "",
  //           paperBackOriginalPrice: "300",
  //           eBookOriginalPrice: "1",
  //           paperBackDiscountedPrice: "150",
  //           eBookDiscountedPrice: "",
  //           eBookIsDownloadable: "no",
  //           assignments: [],
  //           solvedSamplePapers: null,
  //           whatYouGetInBook: "",
  //           slug: "european-classic-literature",
  //           theoreticalExplanationOfChapters: [
  //             {
  //               title: "Book Description",
  //               content:
  //                 "<h3>Book Code: BEGC-102</h3><h3><br></h3><h3>Book Name: European Classic Literature</h3><h3><br></h3><h3>Medium: English</h3><h3><br></h3><h3>Course: IGNOU BA (English)</h3><h3><br></h3><h3>ISBN: 1234567891234</h3><h3><br></h3><h3>For Session: 2025 Exam</h3><h3><br></h3><h3>Published By: Neeraj Publications</h3><h3><br></h3><h3>Type: Paperback Printed Book (E-Book also Available)</h3>",
  //               _id: "68554a244655c950714c9e7a",
  //             },
  //             {
  //               title: "Chapter-wise Reference Book",
  //               content:
  //                 "<p>These reference books contain a chapter-wise bifurcation of the courses based on the IGNOU syllabus. This format allows for Easy Study of each chapter/unit of this subject.</p>",
  //               _id: "68567f7a7651e3097f2cda01",
  //             },
  //             {
  //               title: "Solved Sample Question Papers",
  //               content:
  //                 "<p>Our Neeraj Books include Many Solved Sample Question Papers based on previous year question papers of IGNOU. This feature of our Neeraj Book is beneficial for Exam Preparation, giving students an idea of the type and format of questions asked in exams and how to prepare their answers.</p>",
  //               _id: "68567f7a7651e3097f2cda02",
  //             },
  //             {
  //               title: "Theoretical Explanation of Every Chapter",
  //               content:
  //                 "<p>Every chapter has a brief theory section that explains that particular topic in easy and reader-friendly language.</p>",
  //               _id: "68567f7a7651e3097f2cda03",
  //             },
  //             {
  //               title: "Important Questions with Answers",
  //               content:
  //                 "<p>Each chapter includes answers to terminal questions based on IGNOU Study Material as well as some other important questions with their answers, which gives extended knowledge of that particular chapter/unit.</p>",
  //               _id: "68567f7a7651e3097f2cda04",
  //             },
  //           ],
  //           categories: ["67e5937fd9b8c24257aa3501"],
  //           averageRating: 0,
  //           weight: "0.230",
  //           commonLine:
  //             "Most Trusted Chapter-Wise Reference Book for IGNOU, including Many Solved Sample Papers",
  //           edition: "2025 Exam",
  //           stock: "91",
  //           bookCode: "BEGC-102",
  //           isBestSeller: "yes",
  //           active: true,
  //           sort: 1,
  //           addEbookPrice: "70",
  //           brand: "Neeraj",
  //           isbn: "9789353796259",
  //           metaTitle: "BEGC-102 IGNOU Guide including solved sample papers",
  //           metaDescription: "",
  //           _id: "68554a244655c950714c9e79",
  //           quiz: [
  //             {
  //               question: "Accusantium non ut n",
  //               options: [
  //                 "Excepteur irure et m",
  //                 "Est corporis est dol",
  //                 "Sed ipsum minus ist",
  //                 "Odio aut tempora vol",
  //               ],
  //               answer: "Excepteur irure et m",
  //               _id: "6866188f1e6d5acad036f550",
  //             },
  //             {
  //               question: "Repudiandae quam sun",
  //               options: [
  //                 "Voluptate exercitati",
  //                 "Sunt qui quae conse",
  //                 "Temporibus aliquip q",
  //                 "Proident consequunt",
  //               ],
  //               answer: "Voluptate exercitati",
  //               _id: "6866188f1e6d5acad036f551",
  //             },
  //             {
  //               question: "Quos modi anim quis ",
  //               options: [
  //                 "Consequatur dolore ",
  //                 "Est totam non elit ",
  //                 "Rerum maxime facilis",
  //                 "Voluptas non eiusmod",
  //               ],
  //               answer: "Consequatur dolore ",
  //               _id: "6866188f1e6d5acad036f552",
  //             },
  //             {
  //               question: "Architecto aliquid q",
  //               options: [
  //                 "Quos ipsum odio mag",
  //                 "Dolores aperiam dese",
  //                 "Officiis sit id labo",
  //                 "Magna amet asperior",
  //               ],
  //               answer: "Quos ipsum odio mag",
  //               _id: "6866188f1e6d5acad036f553",
  //             },
  //             {
  //               question: "Suscipit esse quos ",
  //               options: [
  //                 "Laborum Cupidatat s",
  //                 "Nam voluptatem Sint",
  //                 "Hic culpa quae qui o",
  //                 "Ipsa sequi voluptas",
  //               ],
  //               answer: "Laborum Cupidatat s",
  //               _id: "6866188f1e6d5acad036f554",
  //             },
  //             {
  //               question: "Id eum est sapiente",
  //               options: [
  //                 "Dolor voluptatem vol",
  //                 "Earum numquam molest",
  //                 "In est libero optio",
  //                 "Rerum ea quia ut ut ",
  //               ],
  //               answer: "Dolor voluptatem vol",
  //               _id: "6866188f1e6d5acad036f555",
  //             },
  //             {
  //               question: "Dignissimos est min",
  //               options: [
  //                 "Et Nam odit lorem hi",
  //                 "Maiores sit corpori",
  //                 "Non quibusdam elit ",
  //                 "In magnam quaerat de",
  //               ],
  //               answer: "Et Nam odit lorem hi",
  //               _id: "6866188f1e6d5acad036f556",
  //             },
  //             {
  //               question: "Culpa ipsum volupta",
  //               options: [
  //                 "Consequat Sit est ",
  //                 "Est adipisci ut illu",
  //                 "Ipsum quos officia ",
  //                 "Rerum nihil et molli",
  //               ],
  //               answer: "Consequat Sit est ",
  //               _id: "6866188f1e6d5acad036f557",
  //             },
  //             {
  //               question: "Distinctio Sed est ",
  //               options: [
  //                 "Sed totam necessitat",
  //                 "Corrupti sed fugiat",
  //                 "Sequi non voluptatem",
  //                 "Autem aperiam quod a",
  //               ],
  //               answer: "Sed totam necessitat",
  //               _id: "6866188f1e6d5acad036f558",
  //             },
  //             {
  //               question: "Non voluptatum labor",
  //               options: [
  //                 "Suscipit deleniti Na",
  //                 "Voluptate eu volupta",
  //                 "Odio qui eos eiusmod",
  //                 "Aut quae sit omnis v",
  //               ],
  //               answer: "Suscipit deleniti Na",
  //               _id: "6866188f1e6d5acad036f559",
  //             },
  //             {
  //               question: "Exercitationem in ve",
  //               options: [
  //                 "Deleniti animi veli",
  //                 "Voluptas sit rem ea",
  //                 "Ipsum cum nostrum co",
  //                 "Officiis odio at con",
  //               ],
  //               answer: "Deleniti animi veli",
  //               _id: "6866188f1e6d5acad036f55a",
  //             },
  //             {
  //               question: "Tempor quo atque qui",
  //               options: [
  //                 "Doloribus magni eos ",
  //                 "Suscipit totam place",
  //                 "Magni anim fugit ex",
  //                 "Molestias adipisicin",
  //               ],
  //               answer: "Doloribus magni eos ",
  //               _id: "6866188f1e6d5acad036f55b",
  //             },
  //             {
  //               question: "Aut elit qui doloru",
  //               options: [
  //                 "Consectetur dolorib",
  //                 "Fuga Mollitia ut mo",
  //                 "Optio quibusdam ea ",
  //                 "Sed eum velit dolore",
  //               ],
  //               answer: "Consectetur dolorib",
  //               _id: "6866188f1e6d5acad036f55c",
  //             },
  //             {
  //               question: "Vel ea qui quia face",
  //               options: [
  //                 "Voluptas laudantium",
  //                 "In expedita voluptat",
  //                 "Omnis tenetur vero o",
  //                 "Sunt ut nesciunt n",
  //               ],
  //               answer: "Voluptas laudantium",
  //               _id: "6866188f1e6d5acad036f55d",
  //             },
  //             {
  //               question: "Esse veniam commod",
  //               options: [
  //                 "Magna consequatur d",
  //                 "Occaecat incidunt a",
  //                 "Et explicabo Nulla ",
  //                 "Est repellendus As",
  //               ],
  //               answer: "Magna consequatur d",
  //               _id: "6866188f1e6d5acad036f55e",
  //             },
  //             {
  //               question: "Praesentium sequi qu",
  //               options: [
  //                 "Porro ullam quia lab",
  //                 "Tempor aliquid deser",
  //                 "Tenetur placeat pra",
  //                 "Sed natus exercitati",
  //               ],
  //               answer: "Porro ullam quia lab",
  //               _id: "6866188f1e6d5acad036f55f",
  //             },
  //             {
  //               question: "Nemo quis laboris si",
  //               options: [
  //                 "Sed autem cum praese",
  //                 "Architecto ipsa sit",
  //                 "Eiusmod quod facere ",
  //                 "Et alias non ea ab v",
  //               ],
  //               answer: "Sed autem cum praese",
  //               _id: "6866188f1e6d5acad036f560",
  //             },
  //             {
  //               question: "Laboris et ullamco i",
  //               options: [
  //                 "Eius enim sit qui ad",
  //                 "Harum id unde tenetu",
  //                 "Tempor laudantium p",
  //                 "Laboris sed laborum",
  //               ],
  //               answer: "Eius enim sit qui ad",
  //               _id: "6866188f1e6d5acad036f561",
  //             },
  //             {
  //               question: "Dolor nihil incidunt",
  //               options: [
  //                 "Sint ea dolor fuga",
  //                 "Illo explicabo Ulla",
  //                 "Ea nulla beatae unde",
  //                 "Dolorem quidem ipsa",
  //               ],
  //               answer: "Sint ea dolor fuga",
  //               _id: "6866188f1e6d5acad036f562",
  //             },
  //             {
  //               question: "Vel quis incidunt d",
  //               options: [
  //                 "Error do harum unde ",
  //                 "Ea qui laudantium a",
  //                 "Ullam sint deserunt",
  //                 "Pariatur Recusandae",
  //               ],
  //               answer: "Error do harum unde ",
  //               _id: "6866188f1e6d5acad036f563",
  //             },
  //           ],
  //           reviews: [],
  //           previousYearExtracted:
  //             '[\n  {\n    "question": "What do you mean by Accounting Principles? Discuss the significance of accounting principles.",\n    "answer": "Accounting principles are the rules and procedures that businesses and other entities must adhere to when reporting financial data and information. Typically, accounting principles are based on underlying concepts and assumptions and provide a framework for classifying and interpreting financial data based on GAAP. They are important because they help maintain accurate and consistent accounting records and aid all stakeholders in making informed decisions. Accounting principles are important when recording financial data. As mentioned above, by using set rules, accounting principles can help record consistent, standardised and accurate data. This helps stakeholders compare financial performance over the years and with different companies. Accounting principles can help detect errors, increasing the accuracy of the data recorded. Accounting principles can also ensure that the data recorded is in compliance with the law of the country and can be used in case of legal issues or actions. Accounting principles help provide a standard framework for preparing and reporting financial data. This can help investors, creditors, and other stakeholders compare the financial performance of different companies and businesses. Accounting principles ensure that the financial reporting of data is clear, reliable and accurate. This can aid decision-making. Accounting principles can help stakeholders make company growth projections by analysing trends and patterns observed in presented data. Accounting principles can help prevent fraud and data discrepancies. As these principles work on set standards, they minimise irregularities and data mismanagement. (June-2023 Q.1a, Ref. Chap.4 p.34-35 Q.1 & Q.2 for significance)"\n  },\n  {\n    "question": "Explain the steps involved in the Accounting process.",\n    "answer": "Ref.: See Chapter-2, Page No. 15, Q. No. 1. (Dec-2023 Q.1b, Dec-2022 Q.1a)"\n  },\n  {\n    "question": "What do you understand by a Trial Balance? Discuss the main objectives and limitations of the Trial Balance.",\n    "answer": "Ref.: See Chapter-7, Page No. 103, \'What is a Trial Balance?\' and Page No. 109, \'Limitations of the Trial Balance\'. Also Add: Objectives of a Trial Balance: 1. Check the Arithmetic Accuracy of the Ledger: The primary objective of a trial balance is to verify the mathematical accuracy of the ledger accounts. Since every debit has a corresponding credit in double-entry accounting, the total of all debit balances should equal the total of all credit balances. If they match, it indicates that the ledger entries are arithmetically correct. 2. Preparation of Financial Statements: The trial balance provides a summary of all account balances, which is useful in preparing the financial statements like the income statement, balance sheet, and cash flow statement. 3. Detect Errors: While it doesn\'t catch all types of errors, the trial balance helps to detect certain types of mistakes, such as: • Errors in ledger posting (e.g., posting a debit as a credit). • Errors in totaling the ledger accounts. • Errors in transferring the ledger balances to the trial balance. 4. Provide a Summary of Accounts: The trial balance gives an overview of the organization\'s financial position by summarizing all the accounts, making it easier for management to analyze the balances of different accounts. 5. Facilitates Adjustments: The trial balance helps in identifying accounts that need adjustments for accruals, prepayments, depreciation, etc., before preparing the final financial statements. (June-2024 Q.2b)"\n  },\n  {\n    "question": "What do you understand by depreciation? Describe the various methods of depreciation. Explain the need for providing depreciation in book of accounts.",\n    "answer": "Ref.: See Chapter-8, Page No. 146, Q. No. 1, Page No. 141, \'Methods for Providing Depreciation\' and Page No. 149, Q. No. 5. (June-2024 Q.4)"\n  },\n  {\n    "question": "What is the difference between \'Hire Purchase System\' and \'Instalment Purchase System\'?",\n    "answer": "Here is a table comparing the Hire Purchase System and Instalment Purchase System: Basis of Comparison: Ownership Transfer: Hire Purchase System: Ownership is transferred after payment of the last instalment. Instalment Purchase System: Ownership is transferred immediately at the time of the agreement. Risk and Rewards: Hire Purchase System: The seller bears the risk until the final payment is made. Instalment Purchase System: The buyer bears the risk from the date of the agreement. Default on Payments: Hire Purchase System: If the buyer defaults, the seller can repossess the goods. Instalment Purchase System: If the buyer defaults, the seller cannot repossess the goods, but can take legal action to recover dues. Accounting Treatment: Hire Purchase System: Goods are treated as an asset only after the last instalment is paid. Instalment Purchase System: Goods are treated as an asset from the date of the agreement. Depreciation: Hire Purchase System: Depreciation is not charged by the buyer until ownership is transferred. Instalment Purchase System: Depreciation is charged by the buyer from the date of purchase. Interest: Hire Purchase System: Interest is charged on the outstanding balance for each instalment. Instalment Purchase System: Interest is charged on the total amount of the purchase from the beginning. Nature of Agreement: Hire Purchase System: It is a bailment until the final instalment is paid. Instalment Purchase System: It is a sale from the outset. Legal Title: Hire Purchase System: The legal title remains with the seller until the final instalment is paid. Instalment Purchase System: The legal title is transferred to the buyer immediately. Right to Return the Goods: Hire Purchase System: The buyer can return the goods if they no longer wish to purchase. Instalment Purchase System: The buyer cannot return the goods after purchase. Down Payment: Hire Purchase System: Usually requires an initial down payment. Instalment Purchase System: No down payment is usually required, but depends on the agreement. (Dec-2023 Q.4a)"\n  },\n  {\n    "question": "Describe in detail the accounting procedures to be adopted with regard to Hire Purchase System.",\n    "answer": "Accounting Procedures for Hire Purchase System: In a Hire Purchase system, goods are sold on credit where the buyer agrees to pay the seller in installments over a period. Ownership of the goods is transferred to the buyer only after the final installment is paid. This system involves specific accounting procedures for both the buyer (hire purchaser) and the seller (hire vendor) due to the split payment structure and the retention of ownership until the full payment is made. The following sections provide a detailed overview of the accounting procedures to be adopted under the Hire Purchase system. 1. Accounting Treatment for the Buyer (Hire Purchaser): The buyer uses the goods and pays in installments, but the ownership is transferred only upon full payment. The accounting treatment for the buyer includes the recognition of the purchase, installment payments, interest, and the final transfer of ownership. (a) Recognition of Assets (at Cash Price): When the goods are purchased under a hire purchase agreement, the asset is recorded at the cash price of the asset, i.e., the price that would have been paid had the asset been purchased outright at the time of the agreement. Journal Entry: Asset Account (e.g., Machinery) Dr. To Hire Vendor Account (Being the asset acquired under hire purchase recorded at cash price) (b) Installment Payment: Each installment paid by the buyer includes both principal (payment toward the cost of the asset) and interest (hire charges). The portion of the installment that reduces the principal is debited to the vendor\'s account, and the interest is charged as an expense. Journal Entry (for installment payment): Hire Vendor Account Dr. Interest Account Dr. To Bank/Cash Account (Being installment paid, including interest and principal) • The interest portion is debited to the interest account, while the principal portion is credited to the hire vendor account. (c) Interest on Hire Purchase: Interest is charged on the outstanding balance of the asset, and it diminishes as the installments are paid off. The interest component must be treated as an expense in the profit and loss account. Journal Entry: Interest Account Dr. To Hire Vendor Account (Being interest for the period charged on the hire purchase) (d) Depreciation on Assets: Depreciation is charged on the asset purchased under hire purchase as if the buyer owns it, even though legal ownership is retained by the seller. The depreciation is calculated on the cash price of the asset, and it is charged based on the company\'s depreciation policy. Journal Entry: Depreciation Account Dr. To Asset Account (e.g., Machinery Account) (Being depreciation charged on hire purchased asset) (e) Transfer of Ownership (Final Payment): When the final installment is paid, ownership of the asset is transferred to the buyer. No additional journal entry is required for the ownership transfer, as the asset has already been recorded in the books. 2. Accounting Treatment for the Seller (Hire Vendor): The seller retains ownership of the goods until all installments are paid. For the vendor, the accounting treatment focuses on the recording of sales, interest income, and the receipt of installment payments. (a) Recording of Sale: At the beginning of the hire purchase agreement, the vendor does not immediately recognize the full sale but records a hire purchase receivable for the total amount due from the buyer (including both principal and interest). The revenue is recognized over the period of the hire purchase. Journal Entry (for recognizing hire purchase receivable): Hire Purchase Debtor Account Dr. To Sales Account (for cash price) To Hire Purchase Interest Account (for total interest) (Being the recognition of a hire purchase sale and interest receivable) (b) Installment Payment: When the buyer makes installment payments, the vendor reduces the hire purchase debtor account and recognizes interest income. Journal Entry (for installment payment): Bank/Cash Account Dr. To Hire Purchase Debtor Account (Being receipt of installment payment) (c) Interest Income: The interest earned from the buyer\'s installments is recognized as income in the vendor\'s profit and loss account. Journal Entry: Hire Purchase Debtor Account Dr. To Interest Income Account (Being interest income on hire purchase recognized) (d) Repossession of Asset (if default occurs): If the buyer defaults on the agreement and the seller repossesses the asset, the following entries are made: Journal Entry (on repossession): Asset Account Dr. (repossessed asset at fair value) To Hire Purchase Debtor Account (Being asset repossessed due to default on hire purchase) • Any loss on repossession is debited to the Loss on Repossession Account, while any gain is credited to Profit on Repossession Account. 3. Disclosure in Financial Statements For the Buyer (Hire Purchaser): (a) Balance Sheet: • The asset is shown under fixed assets (at cash price) less accumulated depreciation. • Any outstanding liability to the vendor is shown under current or long-term liabilities. (b) Profit and Loss Account: • Interest paid is shown as an expense. • Depreciation on the asset is charged as an expense. For the Seller (Hire Vendor): (a) Balance Sheet: • Hire purchase debtors are shown under current assets (net of any installment received). • Interest income is recorded as a receivable. (b) Profit and Loss Account: • Interest income from hire purchase transactions is shown under revenue or other income. Also Add: Ref.: See Chapter-11, Page No.189-192, \'Illustration 4 and 5\'. (Dec-2023 Q.4b)"\n  },\n  {\n    "question": "Describe the procedure for keeping joint venture accounts when a complete set of double-entry books is separately maintained for this purpose.",\n    "answer": "Ref.: See Chapter-17, Page No. 310, Q. No. 4. (Dec-2023 Q.7, June-2023 Q.7)"\n  },\n  {\n    "question": "Mr. Sita Ram, the consignor, consigned 1000 kg of wheat @20 per kg to Radheyshyam. Sita Ram paid freight ₹2,500; dock charges ₹1,500 and insurance ₹1,000. An accident in transit destroyed 200 kg of wheat. Insurance Company admitted an insurance claim of ₹3,500; 720 kg of wheat was sold by Radheyshyam @₹30 per kg. He incurred clearing charges ₹1,800, carrying charges ₹1,200 realise; godown rent ₹1,500 and selling expenses ₹1,000. Radheyshyam is to receive an ordinary commission @ 8% on sales. He could not realise ₹2,000 from debtors and it was proved bad. Radheyshyam remits ₹10,000 by bankdraft of Sita Ram. Show the Consignment Account in the books of consignor.",\n    "answer": "The solution provides the Consignment A/c and Radheyshyam Consignee A/c for this problem. (See full detailed accounts in the source PDF, Page 18, December-2023 Q.8)."\n  },\n  {\n    "question": "Write explanatory notes on the following: (a) Tally and its components",\n    "answer": "Ref.: See Chapter-18, Page No. 319, \'Introduction to Tally ERP.9\', Page No. 320, \'Component of Tally\'. (Dec-2023 Q.9a, June-2023 Q.9a)"\n  },\n  {\n    "question": "Write explanatory notes on the following: (b) Preparation of Reports",\n    "answer": "Ref.: See Chapter-21, Page No. 361, Q. No. 1. (Dec-2023 Q.9b, June-2023 Q.9b)"\n  },\n  {\n    "question": "Discuss various types of Vouchers. Explain the use of post-dated vouchers.",\n    "answer": "Ref.: See Chapter-20, Page No. 353, Q. No. 1 and Q. No. 3. (Dec-2022 Q.7b)"\n  }\n]\n',
  //           previousYearStructured: [
  //             {
  //               question:
  //                 "What do you mean by Accounting Principles? Discuss the significance of accounting principles.",
  //               answer:
  //                 "Accounting principles are the rules and procedures that businesses and other entities must adhere to when reporting financial data and information. Typically, accounting principles are based on underlying concepts and assumptions and provide a framework for classifying and interpreting financial data based on GAAP. They are important because they help maintain accurate and consistent accounting records and aid all stakeholders in making informed decisions. Accounting principles are important when recording financial data. As mentioned above, by using set rules, accounting principles can help record consistent, standardised and accurate data. This helps stakeholders compare financial performance over the years and with different companies. Accounting principles can help detect errors, increasing the accuracy of the data recorded. Accounting principles can also ensure that the data recorded is in compliance with the law of the country and can be used in case of legal issues or actions. Accounting principles help provide a standard framework for preparing and reporting financial data. This can help investors, creditors, and other stakeholders compare the financial performance of different companies and businesses. Accounting principles ensure that the financial reporting of data is clear, reliable and accurate. This can aid decision-making. Accounting principles can help stakeholders make company growth projections by analysing trends and patterns observed in presented data. Accounting principles can help prevent fraud and data discrepancies. As these principles work on set standards, they minimise irregularities and data mismanagement. (June-2023 Q.1a, Ref. Chap.4 p.34-35 Q.1 & Q.2 for significance)",
  //               _id: "6856acab7651e3097f2d5a1e",
  //             },
  //             {
  //               question:
  //                 "Explain the steps involved in the Accounting process.",
  //               answer:
  //                 "Ref.: See Chapter-2, Page No. 15, Q. No. 1. (Dec-2023 Q.1b, Dec-2022 Q.1a)",
  //               _id: "6856acab7651e3097f2d5a1f",
  //             },
  //             {
  //               question:
  //                 "What do you understand by a Trial Balance? Discuss the main objectives and limitations of the Trial Balance.",
  //               answer:
  //                 "Ref.: See Chapter-7, Page No. 103, 'What is a Trial Balance?' and Page No. 109, 'Limitations of the Trial Balance'. Also Add: Objectives of a Trial Balance: 1. Check the Arithmetic Accuracy of the Ledger: The primary objective of a trial balance is to verify the mathematical accuracy of the ledger accounts. Since every debit has a corresponding credit in double-entry accounting, the total of all debit balances should equal the total of all credit balances. If they match, it indicates that the ledger entries are arithmetically correct. 2. Preparation of Financial Statements: The trial balance provides a summary of all account balances, which is useful in preparing the financial statements like the income statement, balance sheet, and cash flow statement. 3. Detect Errors: While it doesn't catch all types of errors, the trial balance helps to detect certain types of mistakes, such as: • Errors in ledger posting (e.g., posting a debit as a credit). • Errors in totaling the ledger accounts. • Errors in transferring the ledger balances to the trial balance. 4. Provide a Summary of Accounts: The trial balance gives an overview of the organization's financial position by summarizing all the accounts, making it easier for management to analyze the balances of different accounts. 5. Facilitates Adjustments: The trial balance helps in identifying accounts that need adjustments for accruals, prepayments, depreciation, etc., before preparing the final financial statements. (June-2024 Q.2b)",
  //               _id: "6856acab7651e3097f2d5a20",
  //             },
  //             {
  //               question:
  //                 "What do you understand by depreciation? Describe the various methods of depreciation. Explain the need for providing depreciation in book of accounts.",
  //               answer:
  //                 "Ref.: See Chapter-8, Page No. 146, Q. No. 1, Page No. 141, 'Methods for Providing Depreciation' and Page No. 149, Q. No. 5. (June-2024 Q.4)",
  //               _id: "6856acab7651e3097f2d5a21",
  //             },
  //             {
  //               question:
  //                 "What is the difference between 'Hire Purchase System' and 'Instalment Purchase System'?",
  //               answer:
  //                 "Here is a table comparing the Hire Purchase System and Instalment Purchase System: Basis of Comparison: Ownership Transfer: Hire Purchase System: Ownership is transferred after payment of the last instalment. Instalment Purchase System: Ownership is transferred immediately at the time of the agreement. Risk and Rewards: Hire Purchase System: The seller bears the risk until the final payment is made. Instalment Purchase System: The buyer bears the risk from the date of the agreement. Default on Payments: Hire Purchase System: If the buyer defaults, the seller can repossess the goods. Instalment Purchase System: If the buyer defaults, the seller cannot repossess the goods, but can take legal action to recover dues. Accounting Treatment: Hire Purchase System: Goods are treated as an asset only after the last instalment is paid. Instalment Purchase System: Goods are treated as an asset from the date of the agreement. Depreciation: Hire Purchase System: Depreciation is not charged by the buyer until ownership is transferred. Instalment Purchase System: Depreciation is charged by the buyer from the date of purchase. Interest: Hire Purchase System: Interest is charged on the outstanding balance for each instalment. Instalment Purchase System: Interest is charged on the total amount of the purchase from the beginning. Nature of Agreement: Hire Purchase System: It is a bailment until the final instalment is paid. Instalment Purchase System: It is a sale from the outset. Legal Title: Hire Purchase System: The legal title remains with the seller until the final instalment is paid. Instalment Purchase System: The legal title is transferred to the buyer immediately. Right to Return the Goods: Hire Purchase System: The buyer can return the goods if they no longer wish to purchase. Instalment Purchase System: The buyer cannot return the goods after purchase. Down Payment: Hire Purchase System: Usually requires an initial down payment. Instalment Purchase System: No down payment is usually required, but depends on the agreement. (Dec-2023 Q.4a)",
  //               _id: "6856acab7651e3097f2d5a22",
  //             },
  //             {
  //               question:
  //                 "Describe in detail the accounting procedures to be adopted with regard to Hire Purchase System.",
  //               answer:
  //                 "Accounting Procedures for Hire Purchase System: In a Hire Purchase system, goods are sold on credit where the buyer agrees to pay the seller in installments over a period. Ownership of the goods is transferred to the buyer only after the final installment is paid. This system involves specific accounting procedures for both the buyer (hire purchaser) and the seller (hire vendor) due to the split payment structure and the retention of ownership until the full payment is made. The following sections provide a detailed overview of the accounting procedures to be adopted under the Hire Purchase system. 1. Accounting Treatment for the Buyer (Hire Purchaser): The buyer uses the goods and pays in installments, but the ownership is transferred only upon full payment. The accounting treatment for the buyer includes the recognition of the purchase, installment payments, interest, and the final transfer of ownership. (a) Recognition of Assets (at Cash Price): When the goods are purchased under a hire purchase agreement, the asset is recorded at the cash price of the asset, i.e., the price that would have been paid had the asset been purchased outright at the time of the agreement. Journal Entry: Asset Account (e.g., Machinery) Dr. To Hire Vendor Account (Being the asset acquired under hire purchase recorded at cash price) (b) Installment Payment: Each installment paid by the buyer includes both principal (payment toward the cost of the asset) and interest (hire charges). The portion of the installment that reduces the principal is debited to the vendor's account, and the interest is charged as an expense. Journal Entry (for installment payment): Hire Vendor Account Dr. Interest Account Dr. To Bank/Cash Account (Being installment paid, including interest and principal) • The interest portion is debited to the interest account, while the principal portion is credited to the hire vendor account. (c) Interest on Hire Purchase: Interest is charged on the outstanding balance of the asset, and it diminishes as the installments are paid off. The interest component must be treated as an expense in the profit and loss account. Journal Entry: Interest Account Dr. To Hire Vendor Account (Being interest for the period charged on the hire purchase) (d) Depreciation on Assets: Depreciation is charged on the asset purchased under hire purchase as if the buyer owns it, even though legal ownership is retained by the seller. The depreciation is calculated on the cash price of the asset, and it is charged based on the company's depreciation policy. Journal Entry: Depreciation Account Dr. To Asset Account (e.g., Machinery Account) (Being depreciation charged on hire purchased asset) (e) Transfer of Ownership (Final Payment): When the final installment is paid, ownership of the asset is transferred to the buyer. No additional journal entry is required for the ownership transfer, as the asset has already been recorded in the books. 2. Accounting Treatment for the Seller (Hire Vendor): The seller retains ownership of the goods until all installments are paid. For the vendor, the accounting treatment focuses on the recording of sales, interest income, and the receipt of installment payments. (a) Recording of Sale: At the beginning of the hire purchase agreement, the vendor does not immediately recognize the full sale but records a hire purchase receivable for the total amount due from the buyer (including both principal and interest). The revenue is recognized over the period of the hire purchase. Journal Entry (for recognizing hire purchase receivable): Hire Purchase Debtor Account Dr. To Sales Account (for cash price) To Hire Purchase Interest Account (for total interest) (Being the recognition of a hire purchase sale and interest receivable) (b) Installment Payment: When the buyer makes installment payments, the vendor reduces the hire purchase debtor account and recognizes interest income. Journal Entry (for installment payment): Bank/Cash Account Dr. To Hire Purchase Debtor Account (Being receipt of installment payment) (c) Interest Income: The interest earned from the buyer's installments is recognized as income in the vendor's profit and loss account. Journal Entry: Hire Purchase Debtor Account Dr. To Interest Income Account (Being interest income on hire purchase recognized) (d) Repossession of Asset (if default occurs): If the buyer defaults on the agreement and the seller repossesses the asset, the following entries are made: Journal Entry (on repossession): Asset Account Dr. (repossessed asset at fair value) To Hire Purchase Debtor Account (Being asset repossessed due to default on hire purchase) • Any loss on repossession is debited to the Loss on Repossession Account, while any gain is credited to Profit on Repossession Account. 3. Disclosure in Financial Statements For the Buyer (Hire Purchaser): (a) Balance Sheet: • The asset is shown under fixed assets (at cash price) less accumulated depreciation. • Any outstanding liability to the vendor is shown under current or long-term liabilities. (b) Profit and Loss Account: • Interest paid is shown as an expense. • Depreciation on the asset is charged as an expense. For the Seller (Hire Vendor): (a) Balance Sheet: • Hire purchase debtors are shown under current assets (net of any installment received). • Interest income is recorded as a receivable. (b) Profit and Loss Account: • Interest income from hire purchase transactions is shown under revenue or other income. Also Add: Ref.: See Chapter-11, Page No.189-192, 'Illustration 4 and 5'. (Dec-2023 Q.4b)",
  //               _id: "6856acab7651e3097f2d5a23",
  //             },
  //             {
  //               question:
  //                 "Describe the procedure for keeping joint venture accounts when a complete set of double-entry books is separately maintained for this purpose.",
  //               answer:
  //                 "Ref.: See Chapter-17, Page No. 310, Q. No. 4. (Dec-2023 Q.7, June-2023 Q.7)",
  //               _id: "6856acab7651e3097f2d5a24",
  //             },
  //             {
  //               question:
  //                 "Mr. Sita Ram, the consignor, consigned 1000 kg of wheat @20 per kg to Radheyshyam. Sita Ram paid freight ₹2,500; dock charges ₹1,500 and insurance ₹1,000. An accident in transit destroyed 200 kg of wheat. Insurance Company admitted an insurance claim of ₹3,500; 720 kg of wheat was sold by Radheyshyam @₹30 per kg. He incurred clearing charges ₹1,800, carrying charges ₹1,200 realise; godown rent ₹1,500 and selling expenses ₹1,000. Radheyshyam is to receive an ordinary commission @ 8% on sales. He could not realise ₹2,000 from debtors and it was proved bad. Radheyshyam remits ₹10,000 by bankdraft of Sita Ram. Show the Consignment Account in the books of consignor.",
  //               answer:
  //                 "The solution provides the Consignment A/c and Radheyshyam Consignee A/c for this problem. (See full detailed accounts in the source PDF, Page 18, December-2023 Q.8).",
  //               _id: "6856acab7651e3097f2d5a25",
  //             },
  //             {
  //               question:
  //                 "Write explanatory notes on the following: (a) Tally and its components",
  //               answer:
  //                 "Ref.: See Chapter-18, Page No. 319, 'Introduction to Tally ERP.9', Page No. 320, 'Component of Tally'. (Dec-2023 Q.9a, June-2023 Q.9a)",
  //               _id: "6856acab7651e3097f2d5a26",
  //             },
  //             {
  //               question:
  //                 "Write explanatory notes on the following: (b) Preparation of Reports",
  //               answer:
  //                 "Ref.: See Chapter-21, Page No. 361, Q. No. 1. (Dec-2023 Q.9b, June-2023 Q.9b)",
  //               _id: "6856acab7651e3097f2d5a27",
  //             },
  //             {
  //               question:
  //                 "Discuss various types of Vouchers. Explain the use of post-dated vouchers.",
  //               answer:
  //                 "Ref.: See Chapter-20, Page No. 353, Q. No. 1 and Q. No. 3. (Dec-2022 Q.7b)",
  //               _id: "6856acab7651e3097f2d5a28",
  //             },
  //           ],
  //           addDiscount: "no",
  //           course: "",
  //           description: "",
  //           descriptionPara: "abcd",
  //           metaTag: "",
  //           authorName: "AUTHOR",
  //           totalNoOfPapers: "",
  //           totalPages: "410",
  //           youtubeQuestionPaperVideo: "https://youtu.be/nRPrbQNKwWE",
  //           youtubeVideoPreview: "https://youtu.be/baBh1jyysms",
  //           bookContents:
  //             "<h3>Approaching The Iliad, The Epic and The Homeric Tradition</h3><h3><br></h3><h3>The Iliad is an epic poem by Greek poet Homer that narrates the events of the final weeks of the Trojan War, fought between the Greeks and the Trojans</h3><h3><br></h3><h3>THE STORY OF THE ILIAD</h3><h3><br></h3><h3>The Trojan War, fought between the city of Troy and the Achaeans (Greeks) after Paris of Troy abducted Helen, wife of Menelaus, the King of Sparta, is one of the most important events in Greek mythology</h3><h3><br></h3><h3>The Iliad can be compared with the Ramayana and the Mahabharata, which also have themes of wars</h3><h3><br></h3><h3>EPICS IN WESTERN LITERATURE</h3><h3><br></h3><h3>Epics in Western Literature have been composed in different genres</h3><h3><br></h3><h3>The term ‘classic’ denotes something exemplary, of first rank or the highest class, something of demonstrably enduring quality</h3><h3><br></h3><h3>Classics in most of the World Literature relate to the most highly developed stage of an earlier civilisation and its culture</h3><h3><br></h3><h3>In ancient Greece and Rome, they are often associated with works of antiquity</h3><h3><br></h3><h3>They show the value of order, harmony and beauty in a strife-torn world</h3><h3><br></h3><h3>The attributes of an epic are given below:</h3><h3><br></h3><h3>Themes: Epics have exalted theme covering the heroic deeds of a great man and shows the greatness of the divine power</h3><h3><br></h3><h3>Genre: Epics were written in verse in ancient times and in modern times epic novels and epic plays have used the prose form</h3><h3><br></h3><h3>Subject matter: Epics narrate heroic ideals like courage, honour, sacrifice, patriotism and kindness</h3><h3><br></h3><h3>Language: Epics use ornamental language</h3><h3><br></h3><h3>Poetic inspiration: Epics have been composed with a high degree of imaginative power, called poetic inspiration and an equally high degree of consciousness of technique</h3><h3><br></h3><h3>Unity of action: Epics have the Unity of action, which means that there should be one action and sub-plots should be minimal</h3><h3><br></h3><h3>Starting: Epics generally state the theme or subject of the story in the starting</h3><h3><br></h3><h3>Invocation to the Muse: After the statement of the theme, epics generally have an invocation to the Muse for divine inspiration</h3><h3><br></h3><h3>Start in the middle: Epics generally start in the middle of the story</h3><h3><br></h3><h3>Story of great valour: Epics narrate the deeds of great valour and show superhuman courage</h3><h3><br></h3><h3>Long list of characters: Epics have long lists of people, objects and places</h3><h3><br></h3><h3>The Homeric tradition where the ideal is to fight to be the best, to take away women from the defeated enemy camp as the legitimate due of a victor, and to live as long as one possibly can through one’s own strength and power</h3><h3><br></h3><h3>Hector and Achilles are the heroes of their respective nations</h3><h3><br></h3><h3>Hector’s victorious onslaught over the Greeks takes place when Achilles withdraws from the war</h3><h3><br></h3><h3>Hector shows his commitment to his country</h3><h3><br></h3><h3>Hector is an example of a hero whose great feats on the battlefield are a measure of his loyalty to his society</h3><h3><br></h3><h3>Achilles and Hector have a unique place in their respective kingdoms</h3><h3><br></h3><h3>Hector agrees to fight the Greeks who in their vengeful fury were over running his country</h3><h3><br></h3><h3>Hector plays his role as the defender of Troy</h3><h3><br></h3><h3>Hector is an example of a hero whose great feats on the battlefield are a measure of his loyalty to his society</h3><h3><br></h3><h3>Hector shows his character by willing to enter the battlefield though he recognises the inevitability of defeat and the subsequent suffering of his wife and his son</h3><h3><br></h3><h3>Hector’s relationship and attitude towards women and children is deeply embedded in Homeric culture</h3><h3><br></h3><h3>Hector fights valiantly till the end, but his glory is muted because of his initial fear</h3><h3><br></h3><h3>Achilles is quite unconcerned and decides to come to Troy for eternal glory</h3><h3><br></h3><h3>Hector fights for his country and not for his glory</h3><h3><br></h3><h3>Hector’s refusal to flee even in the face of vastly superior forces makes him the most tragic figure</h3><h3><br></h3><h3>The heroic attributes in the Homeric world, according to Cole D Lemme, are:</h3><h3><br></h3><h3>Honor refers to one’s reputation, glory, upright character, integrity, dignity and pride</h3><h3><br></h3><h3>Hector shows uprightness of character by fighting the war</h3><h3><br></h3><h3>He fights unto death because of his unflinching loyalty and devotion to his country</h3><h3><br></h3><h3>He is a family man with deep love for his wife and child</h3><h3><br></h3><h3>Achilles is vengeful, first against Agamemnon and later against Hector</h3><h3><br></h3><h3>His anger characterises his every action</h3><h3><br></h3><h3>Achilles lives and swears by war and violence</h3><h3><br></h3><h3>Hector and Achilles are the fiercest warriors</h3><h3><br></h3><h3>Hector agrees to fight the Greeks who in their vengeful fury were over running his country</h3><h3><br></h3><h3>Hector’s role as the defender of Troy</h3><h3><br></h3><h3>Hector’s relationship and attitude towards women and children is deeply embedded in Homeric culture</h3><h3><br></h3><h3>Hector fights valiantly till the end, but his glory is muted because of his initial fear</h3><h3><br></h3><h3>Achilles is quite unconcerned and decides to come to Troy for eternal glory</h3><h3><br></h3><h3>Hector’s victory over Patroclus regarded as an ecstasy of power, brings great and unforgettable pain to Achilles</h3><h3><br></h3><h3>Hector’s approach is altruistic and humanistic</h3><h3><br></h3><h3>Hector is concerned for his wife and child</h3><h3><br></h3><h3>Hector is an example of a hero whose great feats on the battlefield are a measure of his loyalty to his society</h3><h3><br></h3><h3>Achilles and Hector have a unique place in their respective kingdoms</h3><h3><br></h3><h3>Achilles shows his pride and when he feels humiliated after Agamemnon takes his war prize a Trojan girl, he feels humiliated and stops fighting</h3><h3><br></h3><h3>Achilles is driven primarily by a thirst for glory</h3><h3><br></h3><h3>Achilles’ victory causes heart wrenching pain to Priam, Hector’s father</h3><h3><br></h3><h3>Achilles’ victory over Hector causes unforgettable pain to Achilles</h3><h3><br></h3><h3>Achilles becomes grief-stricken and argues with himself over his slain friend</h3><h3><br></h3><h3>His grief turns into wrath and he enters the battlefield to avenge his friend’s death</h3><h3><br></h3><h3>Achilles’ shows his inhuman brutality</h3><h3><br></h3><h3>Achilles’ anger against Agamemnon makes him remain selfishly deaf to the cries of the soldiers and the pleas of his comrades</h3><h3><br></h3><h3>Hector’s readiness to confront Achilles</h3><h3><br></h3><h3>Hector’s dilemma of fighting for his family or for the city</h3><h3><br></h3><h3>Hector recognizes the power of Zeus and the gods</h3><h3><br></h3><h3>Hector’s death is a tragedy of pride and heroism</h3><h3><br></h3><h3>The play depicts the fall of a hero because of his tragic flaw</h3><h3><br></h3><h3>In Greek tragedy, the hero’s downfall is often due to his hamartia</h3><h3><br></h3><h3>Hector’s respect for the gods up to his death</h3><h3><br></h3><h3>Achilles’ disrespect for the dead Hector</h3><h3><br></h3><h3>Achilles’ rage and wrath and their consequences</h3><h3><br></h3><h3>Achilles’ grief and his capacity for compassion</h3><h3><br></h3><h3>Achilles’ act of returning Hector’s body to Priam</h3><h3><br></h3><h3>The story of the death and recognition of Oedipus and his fall due to hubris</h3><h3><br></h3><h3>Oedipus’ act of blinding himself symbolizes his guilt and responsibility</h3><h3><br></h3><h3>The role of fate and necessity in Greek tragedy</h3><h3><br></h3><h3>Oedipus’ fate is predetermined by prophecy</h3><h3><br></h3><h3>Oedipus’ responsibility for his downfall</h3><h3><br></h3><h3>Oedipus’ pride and arrogance are tragic flaws</h3><h3><br></h3><h3>Oedipus’ realization of his guilt and his self-punishment</h3><h3><br></h3><h3>The tragic effect of the contrast between divine power and human effort</h3><h3><br></h3><h3>The inevitability of fate and the limitations of human free will</h3><h3><br></h3><h3>The significance of the three unities in Greek tragedy</h3><h3><br></h3><h3>Oedipus’ movement from ignorance to knowledge and recognition</h3><h3><br></h3><h3>Oedipus’ act of self-blinding and exile as a moral act</h3><h3><br></h3><h3>The ending of Oedipus as a reflection of tragic catharsis</h3><h3><br></h3><h3>The modern understanding of tragedy and the influence of Greek drama</h3><h3><br></h3><h3>The differences between classical and modern tragedy</h3><h3><br></h3><h3>The influence of Horace’s Ars Poetica on literary criticism</h3><h3><br></h3><h3>The importance of moderation, style, and tradition in Horace’s theory</h3><h3><br></h3><h3>Horace’s views on poetry, style, and moral purpose</h3><h3><br></h3><h3>The role of Greek models and metaphors in Horace’s poetry</h3><h3><br></h3><h3>Horace’s self-presentation and attitude towards critics</h3><h3><br></h3><h3>Horace’s influence on later literature and the development of satire</h3><h3><br></h3><h3>The evolution of Latin literature from Greek influence to independent tradition</h3><h3><br></h3><h3>The course of Horace’s literary career and political engagement</h3><h3><br></h3><h3>The themes of Horace’s poetry including contentment, morality, and social criticism</h3><h3><br></h3><h3>The background and significance of the Metamorphoses as a collection of transformation stories</h3><h3><br></h3><h3>The central theme of metamorphosis and its symbolic meaning in classical myth</h3><h3><br></h3><h3>The influence of Ovid’s Metamorphoses on Western literature and art</h3><h3><br></h3><h3>The story of Pyramus and Thisbe and its symbolic meaning of love and tragedy</h3><h3><br></h3><h3>The story of Philomela and Procne and themes of revenge and transformation</h3><h3><br></h3><h3>The myth of how the mulberry fruit acquired its colour</h3><h3><br></h3><h3>The stories of Actaeon, Sémele, Narcissus, and their symbolic meanings</h3><h3><br></h3><h3>The myth of Bacchus and the clash with Pentheus</h3><h3><br></h3><h3>The story of the rape of Sémele and the death of her son</h3><h3><br></h3><h3>The myth of Narcissus and its psychological symbolism</h3><h3><br></h3><h3>The story of Tereus, Procne, Philomela, and their transformations</h3><h3><br></h3><h3>The importance of transformation, love, revenge, and divine justice in Ovid’s stories</h3><h3><br></h3>",
  //           bookColour: "doubleColour",
  //           bookPages: "300",
  //           bookSize: "small-hos",
  //           bookType: "guide",
  //           editorRevisor: "editor",
  //           first: "first ",
  //           noOfForms: "25",
  //           reprint: "reprint",
  //           revisedUpdated: "reviese",
  //           startPages: "10",
  //           quesPaperPages: "100",
  //           previousYearPdfPath:
  //             "/home/neerajtest/neerajBooks/Documents/All_Product_PreviousYearPdf/68554a244655c950714c9e78/english/1752480675763_1733559277_BEGC-102-EM-Question_Papers.pdf",
  //         },
  //       },
  //       localizedId: "68554a244655c950714c9e79",
  //       price: 300,
  //       qty: 1,
  //       language: "english",
  //       discount1: 0,
  //       discount2: 0,
  //       discount3: 0,
  //       localizedData: {
  //         title: "European Classic Literature",
  //         viewParentCategory: "6793299677c235cc0ea85a8e",
  //         viewSubCategory: ["67b3293391a8bde78bdf4b41"],
  //         viewSubSubCategory: ["67e5937fd9b8c24257aa3501"],
  //         isVideoPreviewAvailable: false,
  //         titleOfFirstSemesterSolvedPaper: "",
  //         linkOfFirstSemesterSolvedPaper: "",
  //         titleOfSecondSemesterSolvedPaper: "",
  //         linkOfSecondSemesterSolvedPaper: "",
  //         paperBackOriginalPrice: "300",
  //         eBookOriginalPrice: "1",
  //         paperBackDiscountedPrice: "150",
  //         eBookDiscountedPrice: "",
  //         eBookIsDownloadable: "no",
  //         assignments: [],
  //         solvedSamplePapers: null,
  //         whatYouGetInBook: "",
  //         slug: "european-classic-literature",
  //         theoreticalExplanationOfChapters: [
  //           {
  //             title: "Book Description",
  //             content:
  //               "<h3>Book Code: BEGC-102</h3><h3><br></h3><h3>Book Name: European Classic Literature</h3><h3><br></h3><h3>Medium: English</h3><h3><br></h3><h3>Course: IGNOU BA (English)</h3><h3><br></h3><h3>ISBN: 1234567891234</h3><h3><br></h3><h3>For Session: 2025 Exam</h3><h3><br></h3><h3>Published By: Neeraj Publications</h3><h3><br></h3><h3>Type: Paperback Printed Book (E-Book also Available)</h3>",
  //             _id: "68554a244655c950714c9e7a",
  //           },
  //           {
  //             title: "Chapter-wise Reference Book",
  //             content:
  //               "<p>These reference books contain a chapter-wise bifurcation of the courses based on the IGNOU syllabus. This format allows for Easy Study of each chapter/unit of this subject.</p>",
  //             _id: "68567f7a7651e3097f2cda01",
  //           },
  //           {
  //             title: "Solved Sample Question Papers",
  //             content:
  //               "<p>Our Neeraj Books include Many Solved Sample Question Papers based on previous year question papers of IGNOU. This feature of our Neeraj Book is beneficial for Exam Preparation, giving students an idea of the type and format of questions asked in exams and how to prepare their answers.</p>",
  //             _id: "68567f7a7651e3097f2cda02",
  //           },
  //           {
  //             title: "Theoretical Explanation of Every Chapter",
  //             content:
  //               "<p>Every chapter has a brief theory section that explains that particular topic in easy and reader-friendly language.</p>",
  //             _id: "68567f7a7651e3097f2cda03",
  //           },
  //           {
  //             title: "Important Questions with Answers",
  //             content:
  //               "<p>Each chapter includes answers to terminal questions based on IGNOU Study Material as well as some other important questions with their answers, which gives extended knowledge of that particular chapter/unit.</p>",
  //             _id: "68567f7a7651e3097f2cda04",
  //           },
  //         ],
  //         categories: ["67e5937fd9b8c24257aa3501"],
  //         averageRating: 0,
  //         weight: "0.230",
  //         commonLine:
  //           "Most Trusted Chapter-Wise Reference Book for IGNOU, including Many Solved Sample Papers",
  //         edition: "2025 Exam",
  //         stock: "91",
  //         bookCode: "BEGC-102",
  //         isBestSeller: "yes",
  //         active: true,
  //         sort: 1,
  //         addEbookPrice: "70",
  //         brand: "Neeraj",
  //         isbn: "9789353796259",
  //         metaTitle: "BEGC-102 IGNOU Guide including solved sample papers",
  //         metaDescription: "",
  //         _id: "68554a244655c950714c9e79",
  //         quiz: [
  //           {
  //             question: "Accusantium non ut n",
  //             options: [
  //               "Excepteur irure et m",
  //               "Est corporis est dol",
  //               "Sed ipsum minus ist",
  //               "Odio aut tempora vol",
  //             ],
  //             answer: "Excepteur irure et m",
  //             _id: "6866188f1e6d5acad036f550",
  //           },
  //           {
  //             question: "Repudiandae quam sun",
  //             options: [
  //               "Voluptate exercitati",
  //               "Sunt qui quae conse",
  //               "Temporibus aliquip q",
  //               "Proident consequunt",
  //             ],
  //             answer: "Voluptate exercitati",
  //             _id: "6866188f1e6d5acad036f551",
  //           },
  //           {
  //             question: "Quos modi anim quis ",
  //             options: [
  //               "Consequatur dolore ",
  //               "Est totam non elit ",
  //               "Rerum maxime facilis",
  //               "Voluptas non eiusmod",
  //             ],
  //             answer: "Consequatur dolore ",
  //             _id: "6866188f1e6d5acad036f552",
  //           },
  //           {
  //             question: "Architecto aliquid q",
  //             options: [
  //               "Quos ipsum odio mag",
  //               "Dolores aperiam dese",
  //               "Officiis sit id labo",
  //               "Magna amet asperior",
  //             ],
  //             answer: "Quos ipsum odio mag",
  //             _id: "6866188f1e6d5acad036f553",
  //           },
  //           {
  //             question: "Suscipit esse quos ",
  //             options: [
  //               "Laborum Cupidatat s",
  //               "Nam voluptatem Sint",
  //               "Hic culpa quae qui o",
  //               "Ipsa sequi voluptas",
  //             ],
  //             answer: "Laborum Cupidatat s",
  //             _id: "6866188f1e6d5acad036f554",
  //           },
  //           {
  //             question: "Id eum est sapiente",
  //             options: [
  //               "Dolor voluptatem vol",
  //               "Earum numquam molest",
  //               "In est libero optio",
  //               "Rerum ea quia ut ut ",
  //             ],
  //             answer: "Dolor voluptatem vol",
  //             _id: "6866188f1e6d5acad036f555",
  //           },
  //           {
  //             question: "Dignissimos est min",
  //             options: [
  //               "Et Nam odit lorem hi",
  //               "Maiores sit corpori",
  //               "Non quibusdam elit ",
  //               "In magnam quaerat de",
  //             ],
  //             answer: "Et Nam odit lorem hi",
  //             _id: "6866188f1e6d5acad036f556",
  //           },
  //           {
  //             question: "Culpa ipsum volupta",
  //             options: [
  //               "Consequat Sit est ",
  //               "Est adipisci ut illu",
  //               "Ipsum quos officia ",
  //               "Rerum nihil et molli",
  //             ],
  //             answer: "Consequat Sit est ",
  //             _id: "6866188f1e6d5acad036f557",
  //           },
  //           {
  //             question: "Distinctio Sed est ",
  //             options: [
  //               "Sed totam necessitat",
  //               "Corrupti sed fugiat",
  //               "Sequi non voluptatem",
  //               "Autem aperiam quod a",
  //             ],
  //             answer: "Sed totam necessitat",
  //             _id: "6866188f1e6d5acad036f558",
  //           },
  //           {
  //             question: "Non voluptatum labor",
  //             options: [
  //               "Suscipit deleniti Na",
  //               "Voluptate eu volupta",
  //               "Odio qui eos eiusmod",
  //               "Aut quae sit omnis v",
  //             ],
  //             answer: "Suscipit deleniti Na",
  //             _id: "6866188f1e6d5acad036f559",
  //           },
  //           {
  //             question: "Exercitationem in ve",
  //             options: [
  //               "Deleniti animi veli",
  //               "Voluptas sit rem ea",
  //               "Ipsum cum nostrum co",
  //               "Officiis odio at con",
  //             ],
  //             answer: "Deleniti animi veli",
  //             _id: "6866188f1e6d5acad036f55a",
  //           },
  //           {
  //             question: "Tempor quo atque qui",
  //             options: [
  //               "Doloribus magni eos ",
  //               "Suscipit totam place",
  //               "Magni anim fugit ex",
  //               "Molestias adipisicin",
  //             ],
  //             answer: "Doloribus magni eos ",
  //             _id: "6866188f1e6d5acad036f55b",
  //           },
  //           {
  //             question: "Aut elit qui doloru",
  //             options: [
  //               "Consectetur dolorib",
  //               "Fuga Mollitia ut mo",
  //               "Optio quibusdam ea ",
  //               "Sed eum velit dolore",
  //             ],
  //             answer: "Consectetur dolorib",
  //             _id: "6866188f1e6d5acad036f55c",
  //           },
  //           {
  //             question: "Vel ea qui quia face",
  //             options: [
  //               "Voluptas laudantium",
  //               "In expedita voluptat",
  //               "Omnis tenetur vero o",
  //               "Sunt ut nesciunt n",
  //             ],
  //             answer: "Voluptas laudantium",
  //             _id: "6866188f1e6d5acad036f55d",
  //           },
  //           {
  //             question: "Esse veniam commod",
  //             options: [
  //               "Magna consequatur d",
  //               "Occaecat incidunt a",
  //               "Et explicabo Nulla ",
  //               "Est repellendus As",
  //             ],
  //             answer: "Magna consequatur d",
  //             _id: "6866188f1e6d5acad036f55e",
  //           },
  //           {
  //             question: "Praesentium sequi qu",
  //             options: [
  //               "Porro ullam quia lab",
  //               "Tempor aliquid deser",
  //               "Tenetur placeat pra",
  //               "Sed natus exercitati",
  //             ],
  //             answer: "Porro ullam quia lab",
  //             _id: "6866188f1e6d5acad036f55f",
  //           },
  //           {
  //             question: "Nemo quis laboris si",
  //             options: [
  //               "Sed autem cum praese",
  //               "Architecto ipsa sit",
  //               "Eiusmod quod facere ",
  //               "Et alias non ea ab v",
  //             ],
  //             answer: "Sed autem cum praese",
  //             _id: "6866188f1e6d5acad036f560",
  //           },
  //           {
  //             question: "Laboris et ullamco i",
  //             options: [
  //               "Eius enim sit qui ad",
  //               "Harum id unde tenetu",
  //               "Tempor laudantium p",
  //               "Laboris sed laborum",
  //             ],
  //             answer: "Eius enim sit qui ad",
  //             _id: "6866188f1e6d5acad036f561",
  //           },
  //           {
  //             question: "Dolor nihil incidunt",
  //             options: [
  //               "Sint ea dolor fuga",
  //               "Illo explicabo Ulla",
  //               "Ea nulla beatae unde",
  //               "Dolorem quidem ipsa",
  //             ],
  //             answer: "Sint ea dolor fuga",
  //             _id: "6866188f1e6d5acad036f562",
  //           },
  //           {
  //             question: "Vel quis incidunt d",
  //             options: [
  //               "Error do harum unde ",
  //               "Ea qui laudantium a",
  //               "Ullam sint deserunt",
  //               "Pariatur Recusandae",
  //             ],
  //             answer: "Error do harum unde ",
  //             _id: "6866188f1e6d5acad036f563",
  //           },
  //         ],
  //         reviews: [],
  //         previousYearExtracted:
  //           '[\n  {\n    "question": "What do you mean by Accounting Principles? Discuss the significance of accounting principles.",\n    "answer": "Accounting principles are the rules and procedures that businesses and other entities must adhere to when reporting financial data and information. Typically, accounting principles are based on underlying concepts and assumptions and provide a framework for classifying and interpreting financial data based on GAAP. They are important because they help maintain accurate and consistent accounting records and aid all stakeholders in making informed decisions. Accounting principles are important when recording financial data. As mentioned above, by using set rules, accounting principles can help record consistent, standardised and accurate data. This helps stakeholders compare financial performance over the years and with different companies. Accounting principles can help detect errors, increasing the accuracy of the data recorded. Accounting principles can also ensure that the data recorded is in compliance with the law of the country and can be used in case of legal issues or actions. Accounting principles help provide a standard framework for preparing and reporting financial data. This can help investors, creditors, and other stakeholders compare the financial performance of different companies and businesses. Accounting principles ensure that the financial reporting of data is clear, reliable and accurate. This can aid decision-making. Accounting principles can help stakeholders make company growth projections by analysing trends and patterns observed in presented data. Accounting principles can help prevent fraud and data discrepancies. As these principles work on set standards, they minimise irregularities and data mismanagement. (June-2023 Q.1a, Ref. Chap.4 p.34-35 Q.1 & Q.2 for significance)"\n  },\n  {\n    "question": "Explain the steps involved in the Accounting process.",\n    "answer": "Ref.: See Chapter-2, Page No. 15, Q. No. 1. (Dec-2023 Q.1b, Dec-2022 Q.1a)"\n  },\n  {\n    "question": "What do you understand by a Trial Balance? Discuss the main objectives and limitations of the Trial Balance.",\n    "answer": "Ref.: See Chapter-7, Page No. 103, \'What is a Trial Balance?\' and Page No. 109, \'Limitations of the Trial Balance\'. Also Add: Objectives of a Trial Balance: 1. Check the Arithmetic Accuracy of the Ledger: The primary objective of a trial balance is to verify the mathematical accuracy of the ledger accounts. Since every debit has a corresponding credit in double-entry accounting, the total of all debit balances should equal the total of all credit balances. If they match, it indicates that the ledger entries are arithmetically correct. 2. Preparation of Financial Statements: The trial balance provides a summary of all account balances, which is useful in preparing the financial statements like the income statement, balance sheet, and cash flow statement. 3. Detect Errors: While it doesn\'t catch all types of errors, the trial balance helps to detect certain types of mistakes, such as: • Errors in ledger posting (e.g., posting a debit as a credit). • Errors in totaling the ledger accounts. • Errors in transferring the ledger balances to the trial balance. 4. Provide a Summary of Accounts: The trial balance gives an overview of the organization\'s financial position by summarizing all the accounts, making it easier for management to analyze the balances of different accounts. 5. Facilitates Adjustments: The trial balance helps in identifying accounts that need adjustments for accruals, prepayments, depreciation, etc., before preparing the final financial statements. (June-2024 Q.2b)"\n  },\n  {\n    "question": "What do you understand by depreciation? Describe the various methods of depreciation. Explain the need for providing depreciation in book of accounts.",\n    "answer": "Ref.: See Chapter-8, Page No. 146, Q. No. 1, Page No. 141, \'Methods for Providing Depreciation\' and Page No. 149, Q. No. 5. (June-2024 Q.4)"\n  },\n  {\n    "question": "What is the difference between \'Hire Purchase System\' and \'Instalment Purchase System\'?",\n    "answer": "Here is a table comparing the Hire Purchase System and Instalment Purchase System: Basis of Comparison: Ownership Transfer: Hire Purchase System: Ownership is transferred after payment of the last instalment. Instalment Purchase System: Ownership is transferred immediately at the time of the agreement. Risk and Rewards: Hire Purchase System: The seller bears the risk until the final payment is made. Instalment Purchase System: The buyer bears the risk from the date of the agreement. Default on Payments: Hire Purchase System: If the buyer defaults, the seller can repossess the goods. Instalment Purchase System: If the buyer defaults, the seller cannot repossess the goods, but can take legal action to recover dues. Accounting Treatment: Hire Purchase System: Goods are treated as an asset only after the last instalment is paid. Instalment Purchase System: Goods are treated as an asset from the date of the agreement. Depreciation: Hire Purchase System: Depreciation is not charged by the buyer until ownership is transferred. Instalment Purchase System: Depreciation is charged by the buyer from the date of purchase. Interest: Hire Purchase System: Interest is charged on the outstanding balance for each instalment. Instalment Purchase System: Interest is charged on the total amount of the purchase from the beginning. Nature of Agreement: Hire Purchase System: It is a bailment until the final instalment is paid. Instalment Purchase System: It is a sale from the outset. Legal Title: Hire Purchase System: The legal title remains with the seller until the final instalment is paid. Instalment Purchase System: The legal title is transferred to the buyer immediately. Right to Return the Goods: Hire Purchase System: The buyer can return the goods if they no longer wish to purchase. Instalment Purchase System: The buyer cannot return the goods after purchase. Down Payment: Hire Purchase System: Usually requires an initial down payment. Instalment Purchase System: No down payment is usually required, but depends on the agreement. (Dec-2023 Q.4a)"\n  },\n  {\n    "question": "Describe in detail the accounting procedures to be adopted with regard to Hire Purchase System.",\n    "answer": "Accounting Procedures for Hire Purchase System: In a Hire Purchase system, goods are sold on credit where the buyer agrees to pay the seller in installments over a period. Ownership of the goods is transferred to the buyer only after the final installment is paid. This system involves specific accounting procedures for both the buyer (hire purchaser) and the seller (hire vendor) due to the split payment structure and the retention of ownership until the full payment is made. The following sections provide a detailed overview of the accounting procedures to be adopted under the Hire Purchase system. 1. Accounting Treatment for the Buyer (Hire Purchaser): The buyer uses the goods and pays in installments, but the ownership is transferred only upon full payment. The accounting treatment for the buyer includes the recognition of the purchase, installment payments, interest, and the final transfer of ownership. (a) Recognition of Assets (at Cash Price): When the goods are purchased under a hire purchase agreement, the asset is recorded at the cash price of the asset, i.e., the price that would have been paid had the asset been purchased outright at the time of the agreement. Journal Entry: Asset Account (e.g., Machinery) Dr. To Hire Vendor Account (Being the asset acquired under hire purchase recorded at cash price) (b) Installment Payment: Each installment paid by the buyer includes both principal (payment toward the cost of the asset) and interest (hire charges). The portion of the installment that reduces the principal is debited to the vendor\'s account, and the interest is charged as an expense. Journal Entry (for installment payment): Hire Vendor Account Dr. Interest Account Dr. To Bank/Cash Account (Being installment paid, including interest and principal) • The interest portion is debited to the interest account, while the principal portion is credited to the hire vendor account. (c) Interest on Hire Purchase: Interest is charged on the outstanding balance of the asset, and it diminishes as the installments are paid off. The interest component must be treated as an expense in the profit and loss account. Journal Entry: Interest Account Dr. To Hire Vendor Account (Being interest for the period charged on the hire purchase) (d) Depreciation on Assets: Depreciation is charged on the asset purchased under hire purchase as if the buyer owns it, even though legal ownership is retained by the seller. The depreciation is calculated on the cash price of the asset, and it is charged based on the company\'s depreciation policy. Journal Entry: Depreciation Account Dr. To Asset Account (e.g., Machinery Account) (Being depreciation charged on hire purchased asset) (e) Transfer of Ownership (Final Payment): When the final installment is paid, ownership of the asset is transferred to the buyer. No additional journal entry is required for the ownership transfer, as the asset has already been recorded in the books. 2. Accounting Treatment for the Seller (Hire Vendor): The seller retains ownership of the goods until all installments are paid. For the vendor, the accounting treatment focuses on the recording of sales, interest income, and the receipt of installment payments. (a) Recording of Sale: At the beginning of the hire purchase agreement, the vendor does not immediately recognize the full sale but records a hire purchase receivable for the total amount due from the buyer (including both principal and interest). The revenue is recognized over the period of the hire purchase. Journal Entry (for recognizing hire purchase receivable): Hire Purchase Debtor Account Dr. To Sales Account (for cash price) To Hire Purchase Interest Account (for total interest) (Being the recognition of a hire purchase sale and interest receivable) (b) Installment Payment: When the buyer makes installment payments, the vendor reduces the hire purchase debtor account and recognizes interest income. Journal Entry (for installment payment): Bank/Cash Account Dr. To Hire Purchase Debtor Account (Being receipt of installment payment) (c) Interest Income: The interest earned from the buyer\'s installments is recognized as income in the vendor\'s profit and loss account. Journal Entry: Hire Purchase Debtor Account Dr. To Interest Income Account (Being interest income on hire purchase recognized) (d) Repossession of Asset (if default occurs): If the buyer defaults on the agreement and the seller repossesses the asset, the following entries are made: Journal Entry (on repossession): Asset Account Dr. (repossessed asset at fair value) To Hire Purchase Debtor Account (Being asset repossessed due to default on hire purchase) • Any loss on repossession is debited to the Loss on Repossession Account, while any gain is credited to Profit on Repossession Account. 3. Disclosure in Financial Statements For the Buyer (Hire Purchaser): (a) Balance Sheet: • The asset is shown under fixed assets (at cash price) less accumulated depreciation. • Any outstanding liability to the vendor is shown under current or long-term liabilities. (b) Profit and Loss Account: • Interest paid is shown as an expense. • Depreciation on the asset is charged as an expense. For the Seller (Hire Vendor): (a) Balance Sheet: • Hire purchase debtors are shown under current assets (net of any installment received). • Interest income is recorded as a receivable. (b) Profit and Loss Account: • Interest income from hire purchase transactions is shown under revenue or other income. Also Add: Ref.: See Chapter-11, Page No.189-192, \'Illustration 4 and 5\'. (Dec-2023 Q.4b)"\n  },\n  {\n    "question": "Describe the procedure for keeping joint venture accounts when a complete set of double-entry books is separately maintained for this purpose.",\n    "answer": "Ref.: See Chapter-17, Page No. 310, Q. No. 4. (Dec-2023 Q.7, June-2023 Q.7)"\n  },\n  {\n    "question": "Mr. Sita Ram, the consignor, consigned 1000 kg of wheat @20 per kg to Radheyshyam. Sita Ram paid freight ₹2,500; dock charges ₹1,500 and insurance ₹1,000. An accident in transit destroyed 200 kg of wheat. Insurance Company admitted an insurance claim of ₹3,500; 720 kg of wheat was sold by Radheyshyam @₹30 per kg. He incurred clearing charges ₹1,800, carrying charges ₹1,200 realise; godown rent ₹1,500 and selling expenses ₹1,000. Radheyshyam is to receive an ordinary commission @ 8% on sales. He could not realise ₹2,000 from debtors and it was proved bad. Radheyshyam remits ₹10,000 by bankdraft of Sita Ram. Show the Consignment Account in the books of consignor.",\n    "answer": "The solution provides the Consignment A/c and Radheyshyam Consignee A/c for this problem. (See full detailed accounts in the source PDF, Page 18, December-2023 Q.8)."\n  },\n  {\n    "question": "Write explanatory notes on the following: (a) Tally and its components",\n    "answer": "Ref.: See Chapter-18, Page No. 319, \'Introduction to Tally ERP.9\', Page No. 320, \'Component of Tally\'. (Dec-2023 Q.9a, June-2023 Q.9a)"\n  },\n  {\n    "question": "Write explanatory notes on the following: (b) Preparation of Reports",\n    "answer": "Ref.: See Chapter-21, Page No. 361, Q. No. 1. (Dec-2023 Q.9b, June-2023 Q.9b)"\n  },\n  {\n    "question": "Discuss various types of Vouchers. Explain the use of post-dated vouchers.",\n    "answer": "Ref.: See Chapter-20, Page No. 353, Q. No. 1 and Q. No. 3. (Dec-2022 Q.7b)"\n  }\n]\n',
  //         previousYearStructured: [
  //           {
  //             question:
  //               "What do you mean by Accounting Principles? Discuss the significance of accounting principles.",
  //             answer:
  //               "Accounting principles are the rules and procedures that businesses and other entities must adhere to when reporting financial data and information. Typically, accounting principles are based on underlying concepts and assumptions and provide a framework for classifying and interpreting financial data based on GAAP. They are important because they help maintain accurate and consistent accounting records and aid all stakeholders in making informed decisions. Accounting principles are important when recording financial data. As mentioned above, by using set rules, accounting principles can help record consistent, standardised and accurate data. This helps stakeholders compare financial performance over the years and with different companies. Accounting principles can help detect errors, increasing the accuracy of the data recorded. Accounting principles can also ensure that the data recorded is in compliance with the law of the country and can be used in case of legal issues or actions. Accounting principles help provide a standard framework for preparing and reporting financial data. This can help investors, creditors, and other stakeholders compare the financial performance of different companies and businesses. Accounting principles ensure that the financial reporting of data is clear, reliable and accurate. This can aid decision-making. Accounting principles can help stakeholders make company growth projections by analysing trends and patterns observed in presented data. Accounting principles can help prevent fraud and data discrepancies. As these principles work on set standards, they minimise irregularities and data mismanagement. (June-2023 Q.1a, Ref. Chap.4 p.34-35 Q.1 & Q.2 for significance)",
  //             _id: "6856acab7651e3097f2d5a1e",
  //           },
  //           {
  //             question: "Explain the steps involved in the Accounting process.",
  //             answer:
  //               "Ref.: See Chapter-2, Page No. 15, Q. No. 1. (Dec-2023 Q.1b, Dec-2022 Q.1a)",
  //             _id: "6856acab7651e3097f2d5a1f",
  //           },
  //           {
  //             question:
  //               "What do you understand by a Trial Balance? Discuss the main objectives and limitations of the Trial Balance.",
  //             answer:
  //               "Ref.: See Chapter-7, Page No. 103, 'What is a Trial Balance?' and Page No. 109, 'Limitations of the Trial Balance'. Also Add: Objectives of a Trial Balance: 1. Check the Arithmetic Accuracy of the Ledger: The primary objective of a trial balance is to verify the mathematical accuracy of the ledger accounts. Since every debit has a corresponding credit in double-entry accounting, the total of all debit balances should equal the total of all credit balances. If they match, it indicates that the ledger entries are arithmetically correct. 2. Preparation of Financial Statements: The trial balance provides a summary of all account balances, which is useful in preparing the financial statements like the income statement, balance sheet, and cash flow statement. 3. Detect Errors: While it doesn't catch all types of errors, the trial balance helps to detect certain types of mistakes, such as: • Errors in ledger posting (e.g., posting a debit as a credit). • Errors in totaling the ledger accounts. • Errors in transferring the ledger balances to the trial balance. 4. Provide a Summary of Accounts: The trial balance gives an overview of the organization's financial position by summarizing all the accounts, making it easier for management to analyze the balances of different accounts. 5. Facilitates Adjustments: The trial balance helps in identifying accounts that need adjustments for accruals, prepayments, depreciation, etc., before preparing the final financial statements. (June-2024 Q.2b)",
  //             _id: "6856acab7651e3097f2d5a20",
  //           },
  //           {
  //             question:
  //               "What do you understand by depreciation? Describe the various methods of depreciation. Explain the need for providing depreciation in book of accounts.",
  //             answer:
  //               "Ref.: See Chapter-8, Page No. 146, Q. No. 1, Page No. 141, 'Methods for Providing Depreciation' and Page No. 149, Q. No. 5. (June-2024 Q.4)",
  //             _id: "6856acab7651e3097f2d5a21",
  //           },
  //           {
  //             question:
  //               "What is the difference between 'Hire Purchase System' and 'Instalment Purchase System'?",
  //             answer:
  //               "Here is a table comparing the Hire Purchase System and Instalment Purchase System: Basis of Comparison: Ownership Transfer: Hire Purchase System: Ownership is transferred after payment of the last instalment. Instalment Purchase System: Ownership is transferred immediately at the time of the agreement. Risk and Rewards: Hire Purchase System: The seller bears the risk until the final payment is made. Instalment Purchase System: The buyer bears the risk from the date of the agreement. Default on Payments: Hire Purchase System: If the buyer defaults, the seller can repossess the goods. Instalment Purchase System: If the buyer defaults, the seller cannot repossess the goods, but can take legal action to recover dues. Accounting Treatment: Hire Purchase System: Goods are treated as an asset only after the last instalment is paid. Instalment Purchase System: Goods are treated as an asset from the date of the agreement. Depreciation: Hire Purchase System: Depreciation is not charged by the buyer until ownership is transferred. Instalment Purchase System: Depreciation is charged by the buyer from the date of purchase. Interest: Hire Purchase System: Interest is charged on the outstanding balance for each instalment. Instalment Purchase System: Interest is charged on the total amount of the purchase from the beginning. Nature of Agreement: Hire Purchase System: It is a bailment until the final instalment is paid. Instalment Purchase System: It is a sale from the outset. Legal Title: Hire Purchase System: The legal title remains with the seller until the final instalment is paid. Instalment Purchase System: The legal title is transferred to the buyer immediately. Right to Return the Goods: Hire Purchase System: The buyer can return the goods if they no longer wish to purchase. Instalment Purchase System: The buyer cannot return the goods after purchase. Down Payment: Hire Purchase System: Usually requires an initial down payment. Instalment Purchase System: No down payment is usually required, but depends on the agreement. (Dec-2023 Q.4a)",
  //             _id: "6856acab7651e3097f2d5a22",
  //           },
  //           {
  //             question:
  //               "Describe in detail the accounting procedures to be adopted with regard to Hire Purchase System.",
  //             answer:
  //               "Accounting Procedures for Hire Purchase System: In a Hire Purchase system, goods are sold on credit where the buyer agrees to pay the seller in installments over a period. Ownership of the goods is transferred to the buyer only after the final installment is paid. This system involves specific accounting procedures for both the buyer (hire purchaser) and the seller (hire vendor) due to the split payment structure and the retention of ownership until the full payment is made. The following sections provide a detailed overview of the accounting procedures to be adopted under the Hire Purchase system. 1. Accounting Treatment for the Buyer (Hire Purchaser): The buyer uses the goods and pays in installments, but the ownership is transferred only upon full payment. The accounting treatment for the buyer includes the recognition of the purchase, installment payments, interest, and the final transfer of ownership. (a) Recognition of Assets (at Cash Price): When the goods are purchased under a hire purchase agreement, the asset is recorded at the cash price of the asset, i.e., the price that would have been paid had the asset been purchased outright at the time of the agreement. Journal Entry: Asset Account (e.g., Machinery) Dr. To Hire Vendor Account (Being the asset acquired under hire purchase recorded at cash price) (b) Installment Payment: Each installment paid by the buyer includes both principal (payment toward the cost of the asset) and interest (hire charges). The portion of the installment that reduces the principal is debited to the vendor's account, and the interest is charged as an expense. Journal Entry (for installment payment): Hire Vendor Account Dr. Interest Account Dr. To Bank/Cash Account (Being installment paid, including interest and principal) • The interest portion is debited to the interest account, while the principal portion is credited to the hire vendor account. (c) Interest on Hire Purchase: Interest is charged on the outstanding balance of the asset, and it diminishes as the installments are paid off. The interest component must be treated as an expense in the profit and loss account. Journal Entry: Interest Account Dr. To Hire Vendor Account (Being interest for the period charged on the hire purchase) (d) Depreciation on Assets: Depreciation is charged on the asset purchased under hire purchase as if the buyer owns it, even though legal ownership is retained by the seller. The depreciation is calculated on the cash price of the asset, and it is charged based on the company's depreciation policy. Journal Entry: Depreciation Account Dr. To Asset Account (e.g., Machinery Account) (Being depreciation charged on hire purchased asset) (e) Transfer of Ownership (Final Payment): When the final installment is paid, ownership of the asset is transferred to the buyer. No additional journal entry is required for the ownership transfer, as the asset has already been recorded in the books. 2. Accounting Treatment for the Seller (Hire Vendor): The seller retains ownership of the goods until all installments are paid. For the vendor, the accounting treatment focuses on the recording of sales, interest income, and the receipt of installment payments. (a) Recording of Sale: At the beginning of the hire purchase agreement, the vendor does not immediately recognize the full sale but records a hire purchase receivable for the total amount due from the buyer (including both principal and interest). The revenue is recognized over the period of the hire purchase. Journal Entry (for recognizing hire purchase receivable): Hire Purchase Debtor Account Dr. To Sales Account (for cash price) To Hire Purchase Interest Account (for total interest) (Being the recognition of a hire purchase sale and interest receivable) (b) Installment Payment: When the buyer makes installment payments, the vendor reduces the hire purchase debtor account and recognizes interest income. Journal Entry (for installment payment): Bank/Cash Account Dr. To Hire Purchase Debtor Account (Being receipt of installment payment) (c) Interest Income: The interest earned from the buyer's installments is recognized as income in the vendor's profit and loss account. Journal Entry: Hire Purchase Debtor Account Dr. To Interest Income Account (Being interest income on hire purchase recognized) (d) Repossession of Asset (if default occurs): If the buyer defaults on the agreement and the seller repossesses the asset, the following entries are made: Journal Entry (on repossession): Asset Account Dr. (repossessed asset at fair value) To Hire Purchase Debtor Account (Being asset repossessed due to default on hire purchase) • Any loss on repossession is debited to the Loss on Repossession Account, while any gain is credited to Profit on Repossession Account. 3. Disclosure in Financial Statements For the Buyer (Hire Purchaser): (a) Balance Sheet: • The asset is shown under fixed assets (at cash price) less accumulated depreciation. • Any outstanding liability to the vendor is shown under current or long-term liabilities. (b) Profit and Loss Account: • Interest paid is shown as an expense. • Depreciation on the asset is charged as an expense. For the Seller (Hire Vendor): (a) Balance Sheet: • Hire purchase debtors are shown under current assets (net of any installment received). • Interest income is recorded as a receivable. (b) Profit and Loss Account: • Interest income from hire purchase transactions is shown under revenue or other income. Also Add: Ref.: See Chapter-11, Page No.189-192, 'Illustration 4 and 5'. (Dec-2023 Q.4b)",
  //             _id: "6856acab7651e3097f2d5a23",
  //           },
  //           {
  //             question:
  //               "Describe the procedure for keeping joint venture accounts when a complete set of double-entry books is separately maintained for this purpose.",
  //             answer:
  //               "Ref.: See Chapter-17, Page No. 310, Q. No. 4. (Dec-2023 Q.7, June-2023 Q.7)",
  //             _id: "6856acab7651e3097f2d5a24",
  //           },
  //           {
  //             question:
  //               "Mr. Sita Ram, the consignor, consigned 1000 kg of wheat @20 per kg to Radheyshyam. Sita Ram paid freight ₹2,500; dock charges ₹1,500 and insurance ₹1,000. An accident in transit destroyed 200 kg of wheat. Insurance Company admitted an insurance claim of ₹3,500; 720 kg of wheat was sold by Radheyshyam @₹30 per kg. He incurred clearing charges ₹1,800, carrying charges ₹1,200 realise; godown rent ₹1,500 and selling expenses ₹1,000. Radheyshyam is to receive an ordinary commission @ 8% on sales. He could not realise ₹2,000 from debtors and it was proved bad. Radheyshyam remits ₹10,000 by bankdraft of Sita Ram. Show the Consignment Account in the books of consignor.",
  //             answer:
  //               "The solution provides the Consignment A/c and Radheyshyam Consignee A/c for this problem. (See full detailed accounts in the source PDF, Page 18, December-2023 Q.8).",
  //             _id: "6856acab7651e3097f2d5a25",
  //           },
  //           {
  //             question:
  //               "Write explanatory notes on the following: (a) Tally and its components",
  //             answer:
  //               "Ref.: See Chapter-18, Page No. 319, 'Introduction to Tally ERP.9', Page No. 320, 'Component of Tally'. (Dec-2023 Q.9a, June-2023 Q.9a)",
  //             _id: "6856acab7651e3097f2d5a26",
  //           },
  //           {
  //             question:
  //               "Write explanatory notes on the following: (b) Preparation of Reports",
  //             answer:
  //               "Ref.: See Chapter-21, Page No. 361, Q. No. 1. (Dec-2023 Q.9b, June-2023 Q.9b)",
  //             _id: "6856acab7651e3097f2d5a27",
  //           },
  //           {
  //             question:
  //               "Discuss various types of Vouchers. Explain the use of post-dated vouchers.",
  //             answer:
  //               "Ref.: See Chapter-20, Page No. 353, Q. No. 1 and Q. No. 3. (Dec-2022 Q.7b)",
  //             _id: "6856acab7651e3097f2d5a28",
  //           },
  //         ],
  //         addDiscount: "no",
  //         course: "",
  //         description: "",
  //         descriptionPara: "abcd",
  //         metaTag: "",
  //         authorName: "AUTHOR",
  //         totalNoOfPapers: "",
  //         totalPages: "410",
  //         youtubeQuestionPaperVideo: "https://youtu.be/nRPrbQNKwWE",
  //         youtubeVideoPreview: "https://youtu.be/baBh1jyysms",
  //         bookContents:
  //           "<h3>Approaching The Iliad, The Epic and The Homeric Tradition</h3><h3><br></h3><h3>The Iliad is an epic poem by Greek poet Homer that narrates the events of the final weeks of the Trojan War, fought between the Greeks and the Trojans</h3><h3><br></h3><h3>THE STORY OF THE ILIAD</h3><h3><br></h3><h3>The Trojan War, fought between the city of Troy and the Achaeans (Greeks) after Paris of Troy abducted Helen, wife of Menelaus, the King of Sparta, is one of the most important events in Greek mythology</h3><h3><br></h3><h3>The Iliad can be compared with the Ramayana and the Mahabharata, which also have themes of wars</h3><h3><br></h3><h3>EPICS IN WESTERN LITERATURE</h3><h3><br></h3><h3>Epics in Western Literature have been composed in different genres</h3><h3><br></h3><h3>The term ‘classic’ denotes something exemplary, of first rank or the highest class, something of demonstrably enduring quality</h3><h3><br></h3><h3>Classics in most of the World Literature relate to the most highly developed stage of an earlier civilisation and its culture</h3><h3><br></h3><h3>In ancient Greece and Rome, they are often associated with works of antiquity</h3><h3><br></h3><h3>They show the value of order, harmony and beauty in a strife-torn world</h3><h3><br></h3><h3>The attributes of an epic are given below:</h3><h3><br></h3><h3>Themes: Epics have exalted theme covering the heroic deeds of a great man and shows the greatness of the divine power</h3><h3><br></h3><h3>Genre: Epics were written in verse in ancient times and in modern times epic novels and epic plays have used the prose form</h3><h3><br></h3><h3>Subject matter: Epics narrate heroic ideals like courage, honour, sacrifice, patriotism and kindness</h3><h3><br></h3><h3>Language: Epics use ornamental language</h3><h3><br></h3><h3>Poetic inspiration: Epics have been composed with a high degree of imaginative power, called poetic inspiration and an equally high degree of consciousness of technique</h3><h3><br></h3><h3>Unity of action: Epics have the Unity of action, which means that there should be one action and sub-plots should be minimal</h3><h3><br></h3><h3>Starting: Epics generally state the theme or subject of the story in the starting</h3><h3><br></h3><h3>Invocation to the Muse: After the statement of the theme, epics generally have an invocation to the Muse for divine inspiration</h3><h3><br></h3><h3>Start in the middle: Epics generally start in the middle of the story</h3><h3><br></h3><h3>Story of great valour: Epics narrate the deeds of great valour and show superhuman courage</h3><h3><br></h3><h3>Long list of characters: Epics have long lists of people, objects and places</h3><h3><br></h3><h3>The Homeric tradition where the ideal is to fight to be the best, to take away women from the defeated enemy camp as the legitimate due of a victor, and to live as long as one possibly can through one’s own strength and power</h3><h3><br></h3><h3>Hector and Achilles are the heroes of their respective nations</h3><h3><br></h3><h3>Hector’s victorious onslaught over the Greeks takes place when Achilles withdraws from the war</h3><h3><br></h3><h3>Hector shows his commitment to his country</h3><h3><br></h3><h3>Hector is an example of a hero whose great feats on the battlefield are a measure of his loyalty to his society</h3><h3><br></h3><h3>Achilles and Hector have a unique place in their respective kingdoms</h3><h3><br></h3><h3>Hector agrees to fight the Greeks who in their vengeful fury were over running his country</h3><h3><br></h3><h3>Hector plays his role as the defender of Troy</h3><h3><br></h3><h3>Hector is an example of a hero whose great feats on the battlefield are a measure of his loyalty to his society</h3><h3><br></h3><h3>Hector shows his character by willing to enter the battlefield though he recognises the inevitability of defeat and the subsequent suffering of his wife and his son</h3><h3><br></h3><h3>Hector’s relationship and attitude towards women and children is deeply embedded in Homeric culture</h3><h3><br></h3><h3>Hector fights valiantly till the end, but his glory is muted because of his initial fear</h3><h3><br></h3><h3>Achilles is quite unconcerned and decides to come to Troy for eternal glory</h3><h3><br></h3><h3>Hector fights for his country and not for his glory</h3><h3><br></h3><h3>Hector’s refusal to flee even in the face of vastly superior forces makes him the most tragic figure</h3><h3><br></h3><h3>The heroic attributes in the Homeric world, according to Cole D Lemme, are:</h3><h3><br></h3><h3>Honor refers to one’s reputation, glory, upright character, integrity, dignity and pride</h3><h3><br></h3><h3>Hector shows uprightness of character by fighting the war</h3><h3><br></h3><h3>He fights unto death because of his unflinching loyalty and devotion to his country</h3><h3><br></h3><h3>He is a family man with deep love for his wife and child</h3><h3><br></h3><h3>Achilles is vengeful, first against Agamemnon and later against Hector</h3><h3><br></h3><h3>His anger characterises his every action</h3><h3><br></h3><h3>Achilles lives and swears by war and violence</h3><h3><br></h3><h3>Hector and Achilles are the fiercest warriors</h3><h3><br></h3><h3>Hector agrees to fight the Greeks who in their vengeful fury were over running his country</h3><h3><br></h3><h3>Hector’s role as the defender of Troy</h3><h3><br></h3><h3>Hector’s relationship and attitude towards women and children is deeply embedded in Homeric culture</h3><h3><br></h3><h3>Hector fights valiantly till the end, but his glory is muted because of his initial fear</h3><h3><br></h3><h3>Achilles is quite unconcerned and decides to come to Troy for eternal glory</h3><h3><br></h3><h3>Hector’s victory over Patroclus regarded as an ecstasy of power, brings great and unforgettable pain to Achilles</h3><h3><br></h3><h3>Hector’s approach is altruistic and humanistic</h3><h3><br></h3><h3>Hector is concerned for his wife and child</h3><h3><br></h3><h3>Hector is an example of a hero whose great feats on the battlefield are a measure of his loyalty to his society</h3><h3><br></h3><h3>Achilles and Hector have a unique place in their respective kingdoms</h3><h3><br></h3><h3>Achilles shows his pride and when he feels humiliated after Agamemnon takes his war prize a Trojan girl, he feels humiliated and stops fighting</h3><h3><br></h3><h3>Achilles is driven primarily by a thirst for glory</h3><h3><br></h3><h3>Achilles’ victory causes heart wrenching pain to Priam, Hector’s father</h3><h3><br></h3><h3>Achilles’ victory over Hector causes unforgettable pain to Achilles</h3><h3><br></h3><h3>Achilles becomes grief-stricken and argues with himself over his slain friend</h3><h3><br></h3><h3>His grief turns into wrath and he enters the battlefield to avenge his friend’s death</h3><h3><br></h3><h3>Achilles’ shows his inhuman brutality</h3><h3><br></h3><h3>Achilles’ anger against Agamemnon makes him remain selfishly deaf to the cries of the soldiers and the pleas of his comrades</h3><h3><br></h3><h3>Hector’s readiness to confront Achilles</h3><h3><br></h3><h3>Hector’s dilemma of fighting for his family or for the city</h3><h3><br></h3><h3>Hector recognizes the power of Zeus and the gods</h3><h3><br></h3><h3>Hector’s death is a tragedy of pride and heroism</h3><h3><br></h3><h3>The play depicts the fall of a hero because of his tragic flaw</h3><h3><br></h3><h3>In Greek tragedy, the hero’s downfall is often due to his hamartia</h3><h3><br></h3><h3>Hector’s respect for the gods up to his death</h3><h3><br></h3><h3>Achilles’ disrespect for the dead Hector</h3><h3><br></h3><h3>Achilles’ rage and wrath and their consequences</h3><h3><br></h3><h3>Achilles’ grief and his capacity for compassion</h3><h3><br></h3><h3>Achilles’ act of returning Hector’s body to Priam</h3><h3><br></h3><h3>The story of the death and recognition of Oedipus and his fall due to hubris</h3><h3><br></h3><h3>Oedipus’ act of blinding himself symbolizes his guilt and responsibility</h3><h3><br></h3><h3>The role of fate and necessity in Greek tragedy</h3><h3><br></h3><h3>Oedipus’ fate is predetermined by prophecy</h3><h3><br></h3><h3>Oedipus’ responsibility for his downfall</h3><h3><br></h3><h3>Oedipus’ pride and arrogance are tragic flaws</h3><h3><br></h3><h3>Oedipus’ realization of his guilt and his self-punishment</h3><h3><br></h3><h3>The tragic effect of the contrast between divine power and human effort</h3><h3><br></h3><h3>The inevitability of fate and the limitations of human free will</h3><h3><br></h3><h3>The significance of the three unities in Greek tragedy</h3><h3><br></h3><h3>Oedipus’ movement from ignorance to knowledge and recognition</h3><h3><br></h3><h3>Oedipus’ act of self-blinding and exile as a moral act</h3><h3><br></h3><h3>The ending of Oedipus as a reflection of tragic catharsis</h3><h3><br></h3><h3>The modern understanding of tragedy and the influence of Greek drama</h3><h3><br></h3><h3>The differences between classical and modern tragedy</h3><h3><br></h3><h3>The influence of Horace’s Ars Poetica on literary criticism</h3><h3><br></h3><h3>The importance of moderation, style, and tradition in Horace’s theory</h3><h3><br></h3><h3>Horace’s views on poetry, style, and moral purpose</h3><h3><br></h3><h3>The role of Greek models and metaphors in Horace’s poetry</h3><h3><br></h3><h3>Horace’s self-presentation and attitude towards critics</h3><h3><br></h3><h3>Horace’s influence on later literature and the development of satire</h3><h3><br></h3><h3>The evolution of Latin literature from Greek influence to independent tradition</h3><h3><br></h3><h3>The course of Horace’s literary career and political engagement</h3><h3><br></h3><h3>The themes of Horace’s poetry including contentment, morality, and social criticism</h3><h3><br></h3><h3>The background and significance of the Metamorphoses as a collection of transformation stories</h3><h3><br></h3><h3>The central theme of metamorphosis and its symbolic meaning in classical myth</h3><h3><br></h3><h3>The influence of Ovid’s Metamorphoses on Western literature and art</h3><h3><br></h3><h3>The story of Pyramus and Thisbe and its symbolic meaning of love and tragedy</h3><h3><br></h3><h3>The story of Philomela and Procne and themes of revenge and transformation</h3><h3><br></h3><h3>The myth of how the mulberry fruit acquired its colour</h3><h3><br></h3><h3>The stories of Actaeon, Sémele, Narcissus, and their symbolic meanings</h3><h3><br></h3><h3>The myth of Bacchus and the clash with Pentheus</h3><h3><br></h3><h3>The story of the rape of Sémele and the death of her son</h3><h3><br></h3><h3>The myth of Narcissus and its psychological symbolism</h3><h3><br></h3><h3>The story of Tereus, Procne, Philomela, and their transformations</h3><h3><br></h3><h3>The importance of transformation, love, revenge, and divine justice in Ovid’s stories</h3><h3><br></h3>",
  //         bookColour: "doubleColour",
  //         bookPages: "300",
  //         bookSize: "small-hos",
  //         bookType: "guide",
  //         editorRevisor: "editor",
  //         first: "first ",
  //         noOfForms: "25",
  //         reprint: "reprint",
  //         revisedUpdated: "reviese",
  //         startPages: "10",
  //         quesPaperPages: "100",
  //         previousYearPdfPath:
  //           "/home/neerajtest/neerajBooks/Documents/All_Product_PreviousYearPdf/68554a244655c950714c9e78/english/1752480675763_1733559277_BEGC-102-EM-Question_Papers.pdf",
  //       },
  //     },
  //     {
  //       product: {
  //         _id: "6874b8be72813e7d8f249964",
  //         english: {
  //           title: "Indian Writing In English",
  //           viewParentCategory: "6793299677c235cc0ea85a8e",
  //           viewSubCategory: ["67b3293391a8bde78bdf4b41"],
  //           viewSubSubCategory: [],
  //           isVideoPreviewAvailable: false,
  //           titleOfFirstSemesterSolvedPaper: "",
  //           linkOfFirstSemesterSolvedPaper: "",
  //           titleOfSecondSemesterSolvedPaper: "",
  //           linkOfSecondSemesterSolvedPaper: "",
  //           paperBackOriginalPrice: "300",
  //           eBookOriginalPrice: "200",
  //           paperBackDiscountedPrice: "150",
  //           eBookDiscountedPrice: "100",
  //           eBookIsDownloadable: "no",
  //           assignments: [],
  //           solvedSamplePapers: null,
  //           whatYouGetInBook: "",
  //           slug: "indian-writing-in-english",
  //           theoreticalExplanationOfChapters: [
  //             {
  //               title: "chapter 1",
  //               content: "<p>Chapter 1 description</p>",
  //               _id: "6874b8be72813e7d8f249966",
  //             },
  //             {
  //               title: "chapter 2 ",
  //               content: "<p>chapter 2 description</p>",
  //               _id: "6874b8be72813e7d8f249967",
  //             },
  //           ],
  //           categories: ["67b3293391a8bde78bdf4b41"],
  //           averageRating: 0,
  //           weight: "0.25",
  //           commonLine: "common line",
  //           edition: "For 2025 Exam",
  //           stock: "26",
  //           bookCode: "BEGC-103 (INDIAN WRITING IN ENGLISH",
  //           isBestSeller: "yes",
  //           active: true,
  //           sort: 1,
  //           addEbookPrice: "50",
  //           brand: "Neeraj",
  //           isbn: "ISBN",
  //           metaTitle: "",
  //           metaDescription: "",
  //           totalPages: "30",
  //           totalNoOfPapers: "",
  //           authorName: "",
  //           youtubeVideoPreview: "",
  //           youtubeQuestionPaperVideo: "",
  //           startPages: "10",
  //           quesPaperPages: "10",
  //           bookPages: "10",
  //           noOfForms: "3",
  //           editorRevisor: "",
  //           bookType: "guide",
  //           bookSize: "medium-regular",
  //           bookColour: "",
  //           first: "",
  //           revisedUpdated: "",
  //           reprint: "",
  //           _id: "6874b8be72813e7d8f249965",
  //           quiz: [],
  //           reviews: [],
  //           previousYearStructured: [],
  //         },
  //       },
  //       localizedId: "6874b8be72813e7d8f249965",
  //       price: 300,
  //       qty: 1,
  //       language: "english",
  //       discount1: 0,
  //       discount2: 0,
  //       discount3: 0,
  //       localizedData: {
  //         title: "Indian Writing In English",
  //         viewParentCategory: "6793299677c235cc0ea85a8e",
  //         viewSubCategory: ["67b3293391a8bde78bdf4b41"],
  //         viewSubSubCategory: [],
  //         isVideoPreviewAvailable: false,
  //         titleOfFirstSemesterSolvedPaper: "",
  //         linkOfFirstSemesterSolvedPaper: "",
  //         titleOfSecondSemesterSolvedPaper: "",
  //         linkOfSecondSemesterSolvedPaper: "",
  //         paperBackOriginalPrice: "300",
  //         eBookOriginalPrice: "200",
  //         paperBackDiscountedPrice: "150",
  //         eBookDiscountedPrice: "100",
  //         eBookIsDownloadable: "no",
  //         assignments: [],
  //         solvedSamplePapers: null,
  //         whatYouGetInBook: "",
  //         slug: "indian-writing-in-english",
  //         theoreticalExplanationOfChapters: [
  //           {
  //             title: "chapter 1",
  //             content: "<p>Chapter 1 description</p>",
  //             _id: "6874b8be72813e7d8f249966",
  //           },
  //           {
  //             title: "chapter 2 ",
  //             content: "<p>chapter 2 description</p>",
  //             _id: "6874b8be72813e7d8f249967",
  //           },
  //         ],
  //         categories: ["67b3293391a8bde78bdf4b41"],
  //         averageRating: 0,
  //         weight: "0.25",
  //         commonLine: "common line",
  //         edition: "For 2025 Exam",
  //         stock: "26",
  //         bookCode: "BEGC-103 (INDIAN WRITING IN ENGLISH",
  //         isBestSeller: "yes",
  //         active: true,
  //         sort: 1,
  //         addEbookPrice: "50",
  //         brand: "Neeraj",
  //         isbn: "ISBN",
  //         metaTitle: "",
  //         metaDescription: "",
  //         totalPages: "30",
  //         totalNoOfPapers: "",
  //         authorName: "",
  //         youtubeVideoPreview: "",
  //         youtubeQuestionPaperVideo: "",
  //         startPages: "10",
  //         quesPaperPages: "10",
  //         bookPages: "10",
  //         noOfForms: "3",
  //         editorRevisor: "",
  //         bookType: "guide",
  //         bookSize: "medium-regular",
  //         bookColour: "",
  //         first: "",
  //         revisedUpdated: "",
  //         reprint: "",
  //         _id: "6874b8be72813e7d8f249965",
  //         quiz: [],
  //         reviews: [],
  //         previousYearStructured: [],
  //       },
  //     },
  //   ],
  //   shipping: {
  //     weight: 0.48,
  //     length: 24,
  //     width: 18,
  //     height: 2,
  //     shippingCharges: 53.5,
  //     paymentMode: "cod",
  //     total: 500.85,
  //   },
  //   discount1: 0,
  //   discount2: 0,
  //   discount3: 0,
  //   adjustmentPlus: 100,
  //   adjustmentMinus: 10,
  //   plusRemark: "add remark",
  //   minusRemark: "minus remark",
  //   grandTotal: 644.35,
  //   paymentStatus: "Pending",
  //   orderStatus: "Shipped",
  //   createdAt: "2025-07-16T10:02:48.462Z",
  //   updatedAt: "2025-07-16T11:48:35.868Z",
  //   __v: 0,
  //   awb_code: "I76613895",
  //   shipment_id: "893142010",
  //   shipment_order_id: "896826185",
  //   courier: "DTDC Air 500gm",
  // };

  // Terms content
  const terms = [
    "All terms, matters and disputes are subject to DELHI jurisdiction only.",
    "The amount of this bill is payable in full at Delhi and all cheques are accepted subject to realisation.",
    "All goods are delivered entirely at buyer’s risk. Sellers are not responsible for any damage or shortage seen after delivery or dispatch from their godowns.",
    "Goods once sold cannot be taken back or exchanged under any circumstance.",
    "All goods are subject to availability.",
    "Right to accept the order or reject the order, and the right to execute the order or not to execute the order remains completely with Neeraj Publications/NeerajBooks.com.",
    "In case the packets are dishonoured/refused/unclaimed by the customer, the customer shall have to bear the entire expenses.",
    "Complaints will be entertained if filed within 7 days after receipt of goods at official email id info@neerabooks.com only.",
    "Any type of ONLINE Sale, Resale & Display of 'NEERAJ IGNOU BOOKS/NEERAJ BOOKS' on any websites is strictly not permitted without prior written permission from Neeraj Publications.",
    "Printed books are shipped via third-party courier service. Sellers are not responsible for damages or shortages after delivery or dispatch.",
    "Any such online Sale, Resale & Display activity by any party will be termed ILLEGAL and will invite legal action.",
  ];

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

  // console.log("items in pdf ", data);

  const summary = useBulkOrderSummary(
    data.books,
    data,
    data?.adjustmentPlus,
    data?.adjustmentMinus,
    data?.shipping?.shippingCharges
  );

  // if (summary) {
  //   console.log("No of Books:", summary?.noOfBooks);
  //   console.log("Total Price:", summary?.totalPrice);
  //   console.log("Total Discount %:", summary?.totalDiscountPercent);
  //   console.log("Discount Amount:", summary?.discountAmount);
  //   console.log("Final Amount:", summary?.finalAmount);
  //   console.log("Shipping Charges:", summary?.shippingCharges);
  //   console.log("Adjustment Plus:", summary?.adjustmentPlus);
  //   console.log("Adjustment Minus:", summary?.adjustmentMinus);
  //   console.log("Grand Total:", summary?.grandTotal);
  // }

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

  const totalDiscount = data?.books?.reduce((acc, book) => {
    const d1 = parseFloat(book.discount1) || 0;
    const d2 = parseFloat(book.discount2) || 0;
    return acc + d1 + d2;
  }, 0);

  const grandTotal = data?.books?.reduce((acc, book) => {
    const price = parseFloat(book.price) || 0;
    const qty = parseFloat(book.qty) || 0;
    return acc + price * qty;
  }, 0);

  const calculateGrandTotal = (data) => {
    const bookTotal = data.books.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);

    return bookTotal;
  };

  const totalAmountCalculated = calculateGrandTotal(data);
  console.log("Calculated Grand Total:", totalAmount);

  {
    /* table */
  }
  const hasDiscount1 = data?.books?.some((p) => p.discount1);
  const hasDiscount2 = data?.books?.some((p) => p.discount2);
  const hasDiscount3 = data?.books?.some((p) => p.discount3);

  // calculate totals before return
  let totalQty = 0;
  let totalGross = 0;
  let totalFinal = 0;

  data?.books?.forEach((product) => {
    const price = product.price || 0;
    const qty = product.qty || 0;
    let gross = price * qty;
    let amount = gross; // after discount

    if (hasDiscount1) amount -= (amount * (product.discount1 || 0)) / 100;
    if (hasDiscount2) amount -= (amount * (product.discount2 || 0)) / 100;
    if (hasDiscount3) amount -= (amount * (product.discount3 || 0)) / 100;

    totalQty += qty;
    totalGross += gross;
    totalFinal += amount;
  });

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
            flexGrow: 1,
            // paddingBottom: 170, // Ensure content doesn't overlap footer
          }}
        >
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 5,
              backgroundColor: "#efefef",
            }}
          >
            <Text style={{ fontSize: 12 }}>
              Bulk Order Details (HSN Code - 49011010)
            </Text>
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
                {data?.date ? format(new Date(data?.date), "dd/MM/yyyy") : ""}
              </Text>
              <Text style={{ fontSize: "9px", paddingTop: "3px" }}>
                Time -{" "}
                {data?.date ? format(new Date(data?.date), "hh:mm:ss a") : ""}
              </Text>
            </View>

            <View
              style={{
                width: "200px",
                borderRight: 1,
                borderColor: "#efefef",
                textAlign: "left",
                paddingVertical: 5,
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {/* <Text style={{ fontSize: "9px" }}>
                  Payment Mode - {paymentMode}
                </Text>
                {paymentMode === "Prepaid" && (
                  <>
                    <Text style={{ fontSize: "9px" }}>Txn ID: - {txnid}</Text>
                    <Text style={{ fontSize: "9px" }}>Mode: - UPI</Text>
                  </>
                )} */}

              <Text style={{ fontSize: "9px" }}>
                Net Payable - Rs. {Math.round(summary?.grandTotal)}
                /-
              </Text>
              <Text style={{ fontSize: "9px" }}>
                Mode -{" "}
                {data?.shipping?.paymentMode === "cod"
                  ? "Cash On Delivery"
                  : "Prepaid"}
              </Text>
              {data.orderStatus && (
                <Text style={{ fontSize: "9px" }}>
                  Status - {data?.orderStatus}
                </Text>
              )}
              {data?.courier && (
                <Text style={{ fontSize: "9px" }}>
                  Courier - {data?.courier}
                </Text>
              )}

              {data?.awb_code && (
                <Text style={{ fontSize: "9px" }}>AWB - {data?.awb_code}</Text>
              )}
            </View>

            {/* Right: Order Info */}
            <View
              style={{
                width: "500px",
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
                    textAlign: "right",
                    paddingTop: "2px",
                  }}
                >
                  Ship To
                </Text>
                <Text
                  style={{
                    fontSize: "9px",
                    textAlign: "right",
                    paddingTop: "2px",
                    textTransform: "capitalize",
                  }}
                >
                  Company Name - {data?.client?.companyName}
                </Text>
                
                  <Text
                    style={{
                      fontSize: "9px",
                      textAlign: "right",
                      paddingTop: "2px",
                    }}
                  >
                    Address - {data?.client?.addressLine1} ,{" "}
                    {data?.client?.addressLine2}
                  </Text>
                
                
                    <Text
                      style={{
                        fontSize: "9px",
                        textAlign: "right",
                        paddingTop: "2px",
                      }}
                    >
                      {data?.client?.city} , {data?.client?.state} ,{" "}
                      {data?.client?.pincode}
                    </Text>
                  

                
                  <Text
                    style={{
                      fontSize: "9px",
                      textAlign: "right",
                      paddingTop: "2px",
                    }}
                  >
                    Phone - {data?.client?.mobile}
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
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 5,
              backgroundColor: "#efefef",
              marginTop: "20px",
            }}
          >
            <Text style={{ fontSize: "12px", textAlign: "left" }}>Books</Text>
          </View>

          {/* Table Header */}
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
            {/* S.No */}
            <Text
              style={{
                fontSize: 10,
                width: "6%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              S.No
            </Text>

            {/* Book Code & Name */}
            <Text
              style={{
                fontSize: 10,
                width: "28%",
                paddingLeft: 4,
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              Book Code & Name
            </Text>

            {/* Price */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              Price
            </Text>

            {/* Qty */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              Qty
            </Text>

            {/* Gross Amount */}
            <Text
              style={{
                fontSize: 10,
                width: "12%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              Gross Amount
            </Text>

            {/* Discount 1 */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              Dis 1
            </Text>

            {/* Discount 2 */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              Dis 2
            </Text>

            {/* Discount 3 */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              Dis 3
            </Text>

            {/* Amount */}
            <Text
              style={{
                fontSize: 10,
                width: "10%",
                textAlign: "right",
                paddingVertical: 6,
              }}
            >
              Amount
            </Text>
          </View>

          {/* Table Body */}
          {data?.books?.map((product, index) => {
            const price = product.price || 0;
            const qty = product.qty || 0;
            let amount = price * qty;
            const bookLanguage = product?.language;

            if (hasDiscount1)
              amount -= (amount * (product.discount1 || 0)) / 100;
            if (hasDiscount2)
              amount -= (amount * (product.discount2 || 0)) / 100;
            if (hasDiscount3)
              amount -= (amount * (product.discount3 || 0)) / 100;

            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderWidth: 1,
                  borderColor: "#000",
                  // marginTop: 10,
                  // backgroundColor: "#efefef",
                  paddingHorizontal: 4,
                  marginBottom: "-6px",
                }}
              >
                {/* S.No */}
                <Text
                  style={{
                    fontSize: 10,
                    width: "6%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  {index + 1}
                </Text>

                {/* Book Code & Name */}
                <Text
                  style={{
                    fontSize: 10,
                    width: "28%",
                    paddingLeft: 4,
                    paddingRight: 5,
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  {product?.product?.[bookLanguage]?.bookCode ??
                    product?.product?.bookCode}{" "}
                  - ({product?.language === "english" ? "English" : "Hindi"})
                  {"\n"}
                  {product?.product?.[bookLanguage]?.title ??
                    product?.product?.title}
                  {/* {product?.product[bookLanguage].title} */}
                </Text>

                {/* Price */}
                <Text
                  style={{
                    fontSize: 10,
                    width: "8%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  {price}
                </Text>

                {/* Qty */}
                <Text
                  style={{
                    fontSize: 10,
                    width: "8%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  {qty}
                </Text>

                {/* Gross Amount */}
                <Text
                  style={{
                    fontSize: 10,
                    width: "12%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  {price * qty}
                </Text>

                {/* Discount 1 */}
                <Text
                  style={{
                    fontSize: 10,
                    width: "8%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  {/* {product.discount1 ?? "-"}% */}
                  {product.discount1 != null && product.discount1 !== undefined
                    ? `${product.discount1}%`
                    : "-"}
                </Text>

                {/* Discount 2 */}
                <Text
                  style={{
                    fontSize: 10,
                    width: "8%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  {/* {product.discount2 ?? "-"}% */}
                  {product.discount2 != null && product.discount2 !== undefined
                    ? `${product.discount2}%`
                    : "-"}
                </Text>

                {/* Discount 3 */}
                <Text
                  style={{
                    fontSize: 10,
                    width: "8%",
                    textAlign: "center",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    paddingVertical: 6,
                  }}
                >
                  {product.discount3 != null && product.discount3 !== undefined
                    ? `${product.discount3}%`
                    : "-"}
                </Text>

                {/* Amount */}
                <Text
                  style={{
                    fontSize: 10,
                    width: "10%",
                    textAlign: "right",
                    paddingVertical: 6,
                  }}
                >
                  {Math.round(amount)}
                </Text>
              </View>
            );
          })}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#000",
              // marginTop: 10,
              backgroundColor: "#efefef",
              paddingHorizontal: 4,
              marginBottom: "-6px",
            }}
          >
            {/* Book Code & Name */}
            <Text
              style={{
                fontSize: 10,
                width: "34.5%",
                paddingLeft: 4,
                borderRightWidth: 1,
                borderColor: "#000",
                textAlign: "center",
                paddingVertical: 6,
              }}
            >
              SUB TOTAL
            </Text>

            {/* Price */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              {/* Price */}
            </Text>

            {/* Qty */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              {totalQty}
            </Text>

            {/* Gross Amount */}
            <Text
              style={{
                fontSize: 10,
                width: "12%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              {Math.round(totalGross)}
            </Text>

            {/* Discount 1 */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              -
            </Text>

            {/* Discount 2 */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              -
            </Text>

            {/* Discount 3 */}
            <Text
              style={{
                fontSize: 10,
                width: "8%",
                textAlign: "center",
                borderRightWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
              }}
            >
              -
            </Text>

            {/* Amount */}
            <Text
              style={{
                fontSize: 10,
                width: "10%",
                textAlign: "right",
                paddingVertical: 6,
              }}
            >
              {Math.round(totalFinal)}
            </Text>
          </View>

          {data?.adjustmentPlus && (
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
              <Text
                style={{
                  fontSize: 10,
                  width: "89.5%",
                  paddingRight: 8,
                  borderRightWidth: 1,
                  borderColor: "#000",
                  textAlign: "right",
                  paddingVertical: 6,
                }}
              >
                Adjustment (+) - ({data?.plusRemark})
              </Text>

              {/* Amount */}
              <Text
                style={{
                  fontSize: 10,
                  width: "10%",
                  textAlign: "right",
                  paddingVertical: 6,
                }}
              >
                {/* {totalFinal} */}
                Rs. {data?.adjustmentPlus?.toLocaleString("en-IN")}
              </Text>
            </View>
          )}

          {data?.adjustmentMinus && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderWidth: 1,
                borderColor: "#000",
                // marginTop: 10,
                backgroundColor: "#efefef",
                paddingHorizontal: 4,
                marginBottom: "-6px",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  width: "89.5%",
                  paddingRight: 8,
                  borderRightWidth: 1,
                  borderColor: "#000",
                  textAlign: "right",
                  paddingVertical: 6,
                }}
              >
                Adjustment (-) - ({data?.minusRemark})
              </Text>

              {/* Amount */}
              <Text
                style={{
                  fontSize: 10,
                  width: "10%",
                  textAlign: "right",
                  paddingVertical: 6,
                }}
              >
                Rs. {data?.adjustmentMinus?.toLocaleString("en-IN")}
              </Text>
            </View>
          )}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#000",
              // marginTop: 10,
              backgroundColor: "#efefef",
              paddingHorizontal: 4,
              marginBottom: "-6px",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                width: "89.5%",
                paddingRight: 8,
                borderRightWidth: 1,
                borderColor: "#000",
                textAlign: "right",
                paddingVertical: 6,
              }}
            >
              Shipping and Handling Charges (+)
            </Text>

            {/* Amount */}
            <Text
              style={{
                fontSize: 10,
                width: "10%",
                textAlign: "right",
                paddingVertical: 6,
              }}
            >
              {/* {totalFinal} */}
              Rs. {data?.shipping?.shippingCharges}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#000",
              // marginTop: 10,
              backgroundColor: "#efefef",
              paddingHorizontal: 4,
              marginBottom: "-6px",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                width: "89.5%",
                paddingRight: 8,
                borderRightWidth: 1,
                borderColor: "#000",
                textAlign: "right",
                paddingVertical: 6,
              }}
            >
              Net Amount
            </Text>

            {/* Amount */}
            <Text
              style={{
                fontSize: 10,
                width: "10%",
                textAlign: "right",
                paddingVertical: 6,
              }}
            >
              Rs. {summary?.grandTotal?.toLocaleString("en-IN")}
              /-
            </Text>
          </View>

          {/* <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 5,
                backgroundColor: "#efefef",
                marginTop: "18px",
              }}
            >
              <Text style={{ fontSize: 12 }}>Shipping Info</Text>
            </View> */}
          {/* <View
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
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>Length</Text>
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                {data?.shipping?.length} cm
              </Text>
            </View> */}
          {/* <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "3px",
                marginBottom: "-5px",
                paddingHorizontal: "5px",
                backgroundColor: "#efefef",
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>Width</Text>
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                {data?.shipping?.width} cm
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "#000",
                paddingVertical: "3px",
                marginBottom: "-5px",
                paddingHorizontal: "5px",
                backgroundColor: "#efefef",
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>Height</Text>
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                {data?.shipping?.height} cm
              </Text>
            </View>
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
                borderLeft: 1,
                borderRight: 1,
                borderBottom: 1,
              }}
            >
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>Weight</Text>
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                {data?.shipping?.weight} kg
              </Text>
            </View>
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
                Rs. {summary?.totalPrice?.toLocaleString("en-IN")}
              </Text>
            </View>
            {summary?.discountAmount && (
              <>
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
                    borderLeft: 1,
                    borderRight: 1,
                  }}
                >
                  <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                    Total Discount
                  </Text>
                  <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                    Rs. {summary?.discountAmount}
                  </Text>
                </View>

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
                    borderLeft: 1,
                    borderRight: 1,
                  }}
                >
                  <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                    Total
                  </Text>
                  <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                    Rs. {summary?.finalAmount}
                  </Text>
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
                marginBottom: "-5px",
                borderLeft: 1,
                borderRight: 1,
              }}
            >
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                Shipping & Handling Charges
              </Text>
              <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                Rs. {data?.shipping?.shippingCharges}
              </Text>
            </View>
            {data?.plusRemark && (
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
                  borderLeft: 1,
                  borderRight: 1,
                }}
              >
                <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                  ADJ + ({data?.plusRemark})
                </Text>
                <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                  ADJ + ({data?.plusRemark})

                  Rs. {data?.adjustmentPlus?.toLocaleString("en-IN")}
                </Text>
              </View>
            )}
            {data?.minusRemark && (
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
                  borderLeft: 1,
                  borderRight: 1,
                }}
              >
                <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                  ADJ - ({data?.minusRemark})
                </Text>
                <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                  Rs. {data?.adjustmentMinus?.toLocaleString("en-IN")}
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
                Rs. {Math.round(summary?.grandTotal?.toLocaleString("en-IN"))}
                /-
              </Text>
            </View> */}
        </View>
        {/* Footer */}
        <View
          fixed
          style={{
            paddingTop: 20,
            position: "fixed",
            bottom: 10,
            left: 20,
            right: 20,
            fontSize: 7,
            color: "grey",
            backgroundColor: "#FFF",
          }}
        >
          <Text style={styles.footerTitle}>TERMS & CONDITIONS</Text>
          {terms.map((term, idx) => (
            <View style={styles.bulletRow} key={idx}>
              <View style={styles.bullet} />
              <Text style={styles.bulletPoint}>{term}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default BulkClientInvoice;
