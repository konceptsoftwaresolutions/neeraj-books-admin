import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/features/books";
import {
  generateSingleBulkOrder,
  getShippingCharges,
} from "../../redux/features/orders";
import { useNavigate } from "react-router-dom";
import { paymentModeOptions } from "../../constant/options";
import {
  getAllBulkClient,
  getBulkClientById,
} from "../../redux/features/customers";

function AddOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const { bulkClientOptions } = useSelector((state) => state.customer);
  const [isLoading, setIsLoading] = useState(false);
  const [totalWithoutShipping, setTotalWithoutShipping] = useState();
  const [clientPincode, setClientPincode] = useState();
  const [amountAfterAllDiscount, setAmountAfterAllDiscounts] = useState();
  const [shippingValue, setShippingValue] = useState(null);

  const prevShippingPayload = useRef({
    totalBooks: null,
    totalWithoutShipping: null,
  });

  const [totalBooks, setTotalBooks] = useState();
  const [totalWeight, setTotalWeight] = useState();

  const fetchAllProductsData = useCallback(() => {
    dispatch(
      getAllProducts((success, data) => {
        if (success) {
          setAllProducts(data);
        }
      })
    );
    dispatch(getAllBulkClient());
  }, [dispatch]);

  useEffect(() => {
    fetchAllProductsData();
  }, [fetchAllProductsData]);

  const generateDropdownOptions = (bookData) => {
    const options = [];
    if (bookData.english) {
      options.push({
        label: `${bookData.english.title} - ${bookData.english.bookCode} - (English)`,
        value: bookData.english._id,
      });
    }

    if (bookData.hindi) {
      options.push({
        label: `${bookData.hindi.title} - ${bookData.hindi.bookCode} - (Hindi)`,
        value: bookData.hindi._id,
      });
    }

    return options;
  };

  const productOptions = useMemo(() => {
    return allProducts.flatMap(generateDropdownOptions);
  }, [allProducts]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      client: "",
      date: new Date().toISOString().split("T")[0], // ⬅️ sets today's date in "YYYY-MM-DD"
      books: [
        {
          product: "",
          price: "",
          qty: "",
          discount1: "",
          discount2: "",
          discount3: "",
          amt: "",
        },
      ],
      weight: "",
      length: "24",
      width: "18",
      height: "",
      shipping: "",
      grandTotal: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "books",
  });

  const books = useWatch({ control, name: "books" });
  const adjustmentPlus = useWatch({ control, name: "adjustmentPlus" });
  const adjustmentMinus = useWatch({ control, name: "adjustmentMinus" });
  const enteredShipping = watch("shipping");
  const paymentMode = useWatch({ control, name: "paymentMode" });
  const client = watch("client");

  useEffect(() => {
    if (client) {
      dispatch(
        getBulkClientById({ id: client }, (success, data) => {
          if (success && data) {
            console.log(data);
            setClientPincode(data.pincode);
          }
        })
      );
    }
  }, [client]);

  useEffect(() => {
    let total = 0;
    let totalBooks = 0;
    let totalWeight = 0;

    books?.forEach((book, index) => {
      // 🟡 Auto-fill price & qty when product is selected
      let matchedProduct;
      if (book.product) {
        matchedProduct = allProducts.find(
          (prod) =>
            prod?.english?._id === book.product ||
            prod?.hindi?._id === book.product
        );

        const selected =
          matchedProduct?.english?._id === book.product
            ? matchedProduct?.english
            : matchedProduct?.hindi;

        if (selected) {
          const selectedPrice = selected.paperBackOriginalPrice?.toString();

          if (
            selectedPrice &&
            (book.price === "" ||
              book.price === undefined ||
              book.price === null)
          ) {
            setValue(`books.${index}.price`, selectedPrice, {
              shouldValidate: false,
              shouldDirty: true,
            });
          }

          if (!book.qty) {
            setValue(`books.${index}.qty`, "1", {
              shouldValidate: false,
              shouldDirty: true,
            });
          }
        }
      }

      const price = parseFloat(book.price) || 0;
      const qty = parseFloat(book.qty) || 0;

      const weight =
        parseFloat(
          matchedProduct?.english?.weight || matchedProduct?.hindi?.weight
        ) || 0;

      totalWeight += weight * qty;

      const d1 = parseFloat(book.discount1) || 0;
      const d2 = parseFloat(book.discount2) || 0;
      const d3 = parseFloat(book.discount3) || 0;
      // ✅ Progressive discount logic
      let amt = price * qty;
      amt -= (amt * d1) / 100;
      amt -= (amt * d2) / 100;
      amt -= (amt * d3) / 100;

      amt = +amt.toFixed(2);
      total += amt;
      totalBooks += qty;
      setTotalBooks(totalBooks);
      setValue("height", totalBooks);

      const currentAmt = parseFloat(book.amt) || 0;

      if (amt !== currentAmt) {
        setValue(`books.${index}.amt`, amt.toFixed(2), {
          shouldValidate: false,
          shouldDirty: false,
        });
      }

      setValue("weight", totalWeight.toFixed(3), {
        shouldValidate: false,
        shouldDirty: true,
      });
      setTotalWeight(totalWeight.toFixed(3));
    });

    const shipping = parseFloat(enteredShipping) || 0;
    const plus = parseFloat(adjustmentPlus) || 0;
    const minus = parseFloat(adjustmentMinus) || 0;
    const bookTotalAmount = total;
    setTotalWithoutShipping(bookTotalAmount);

    const grandTotal = +(bookTotalAmount + shipping + plus - minus).toFixed(2);
    setValue("grandTotal", grandTotal);
  }, [
    books,
    setValue,
    allProducts,
    enteredShipping,
    adjustmentPlus,
    adjustmentMinus,
  ]);

  // ----------------------------------------function for calculating the shipping charges
  useEffect(() => {
    if (
      !totalBooks ||
      !totalWeight ||
      !totalWithoutShipping ||
      !paymentMode ||
      !clientPincode
    ) {
      return;
    }

    const booksCount = Number(totalBooks);
    const orderTotal = Number(totalWithoutShipping);

    const payload = {
      deliveryPincode: clientPincode,
      isCod: paymentMode === "cod",
      noOfBooksWithoutEbook: booksCount,
      orderWeight: Number(totalWeight),
      totalOrderValueAfterDiscount: orderTotal,
    };

    dispatch(
      getShippingCharges(payload, (success, data) => {
        if (success) {
          setShippingValue(data);
          setValue("shipping", data, {
            shouldValidate: false,
            shouldDirty: true,
          });
          setValue("grandTotal", data + orderTotal);
        }
      })
    );
  }, [
    totalBooks,
    totalWeight,
    clientPincode,
    totalWithoutShipping,
    paymentMode,

    dispatch,
    setValue,
  ]);

  const onSubmit = (data) => {
    const transformedBooks = data.books.map((book) => {
      const matchedProduct = allProducts.find(
        (prod) =>
          prod?.english?._id === book.product ||
          prod?.hindi?._id === book.product
      );

      let localizedId = "";
      let language = "";
      let productId = "";

      if (matchedProduct?.english?._id === book.product) {
        localizedId = matchedProduct.english._id;
        language = "english";
        productId = matchedProduct._id;
      } else if (matchedProduct?.hindi?._id === book.product) {
        localizedId = matchedProduct.hindi._id;
        language = "hindi";
        productId = matchedProduct._id;
      }

      return {
        product: productId,
        localizedId,
        language,
        price: parseFloat(book.price),
        qty: parseFloat(book.qty),
        hsnCode: book.hsnCode,

        ...(book.discount1 && { discount1: parseFloat(book.discount1) }),
        ...(book.discount2 && { discount2: parseFloat(book.discount2) }),
        ...(book.discount3 && { discount3: parseFloat(book.discount3) }),
      };
    });

    const finalPayload = {
      // ...data,
      client: data.client,
      date: data.date,
      shipping: {
        height: data.height,
        length: data.length,
        shippingCharges: data.shipping,
        weight: data.weight,
        width: data.width,
        total: totalWithoutShipping,
        paymentMode: data.paymentMode,
      },
      grandTotal: data.grandTotal,
      adjustmentMinus: data.adjustmentMinus,
      adjustmentPlus: data.adjustmentPlus,
      plusRemark: data.plusRemark,
      minusRemark: data.minusRemark,
      books: transformedBooks,
    };

    // console.log(finalPayload);

    dispatch(
      generateSingleBulkOrder(finalPayload, setIsLoading, (success) => {
        if (success) {
          navigate(-1);
        }
      })
    );
    // submit finalPayload to API
  };

  const handleAddBook = () =>
    append({
      product: "",
      price: "",
      qty: "",
      discount1: "",
      discount2: "",
      discount3: "",
      hsnCode: "49011010",
      amt: "",
    });

  const handleRemoveBook = (index) => remove(index);

  const getShippingRate = (totalBooks, grandTotal) => {
    const payload = {
      deliveryPincode: "110009",
      isCod: true,
      noOfBooksWithoutEbook: totalBooks,
      orderWeight: 2.3,
      totalOrderValueAfterDiscount: grandTotal,
    };
    dispatch(
      getShippingCharges(payload, (success, data) => {
        if (success) {
          setValue("shipping", data);
        }
      })
    );
  };

  return (
    <PageCont>
      <Heading text="Add Orders" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {/* Client Information */}
        <Section title="Client Information">
          <Grid>
            <InputField
              control={control}
              errors={errors}
              name="client"
              label="Client"
              type="select"
              mode="single"
              options={bulkClientOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="date"
              label="Date"
              type="date"
            />
          </Grid>
        </Section>

        {/* Book Information */}
        <Section title="Book Information">
          {fields?.map((item, index) => (
            <div
              key={item.id}
              className="relative w-full bg-white border rounded-md p-4 mb-4"
            >
              <div className="flex justify-end mb-2">
                <Button
                  onClick={() => handleRemoveBook(index)}
                  variant="outlined"
                  size="sm"
                  color="red"
                  className="capitalize"
                >
                  <RxCross2 color="red" />
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="col-span-full">
                  <InputField
                    control={control}
                    errors={errors}
                    name={`books.${index}.product`}
                    label="Product"
                    type="select"
                    mode="single"
                    options={productOptions}
                  />
                </div>
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.price`}
                  label="Price"
                  type="number"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.qty`}
                  label="Qty"
                  type="number"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.discount1`}
                  label="Discount 1 (%)"
                  type="number"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.discount2`}
                  label="Discount 2 (%)"
                  type="number"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.discount3`}
                  label="Discount 3 (%)"
                  type="number"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.hsnCode`}
                  label="HSN"
                  defaultValue="49011010"
                  type="text"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.amt`}
                  label="Amount"
                  type="number"
                  disabled
                />
              </div>
            </div>
          ))}

          {/* Button at bottom-right */}
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleAddBook}
              variant="contained"
              color="primary"
              className="capitalize"
            >
              + Add Book
            </Button>
          </div>
        </Section>

        {/* Shipping Info */}
        <Section title="Shipping Information">
          <Grid columns={3}>
            <InputField
              control={control}
              errors={errors}
              name="paymentMode"
              label="Payment Mode"
              type="option"
              options={paymentModeOptions}
            />
            <InputField
              control={control}
              errors={errors}
              name="weight"
              label="Weight (in kg)"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="length"
              label="Length (in cm)"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="width"
              label="Width (in cm)"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="height"
              label="Height (in cm)"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="shipping"
              label="Shipping Charges"
              type="number"
              disabled={true}
            />
          </Grid>
        </Section>

        {/* Total */}
        <Section title="Total">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              control={control}
              errors={errors}
              name="adjustmentPlus"
              label="ADJ +"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="plusRemark"
              label="Remark"
              type="description"
            />
            <InputField
              control={control}
              errors={errors}
              name="adjustmentMinus"
              label="ADJ -"
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              name="minusRemark"
              label="Remark"
              type="description"
            />
          </div>
          <div className="mt-3 grid grid-cols-2">
            <InputField
              control={control}
              errors={errors}
              name="grandTotal"
              label="Grand Total"
              type="number"
              disabled
              className=""
            />
          </div>
        </Section>

        <Button
          loading={isLoading}
          type="submit"
          className="primary-gradient mt-6 capitalize"
        >
          Create Order
        </Button>
      </form>
    </PageCont>
  );
}

// Reusable layout components
const Section = ({ title, children, actionText, onAction }) => (
  <div className="bg-gray-100 rounded-md p-4 mb-6">
    <div className="flex justify-between items-center mb-4">
      <p className="font-semibold text-lg">{title}</p>
      {actionText && (
        <Button
          type="button"
          variant="outlined"
          onClick={onAction}
          className="capitalize"
        >
          {actionText}
        </Button>
      )}
    </div>
    {children}
  </div>
);

const Grid = ({ children, columns = 3 }) => {
  const gridClass = `w-full grid gap-3 grid-cols-2 md:grid-cols-${columns} lg:grid-cols-${columns}`;
  return <div className={gridClass}>{children}</div>;
};

export default AddOrders;
