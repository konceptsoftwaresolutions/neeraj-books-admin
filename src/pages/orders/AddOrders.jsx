import React, { useEffect, useMemo, useState, useCallback } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/features/books";

function AddOrders() {
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProductsData = useCallback(() => {
    dispatch(
      getAllProducts((success, data) => {
        if (success) {
          setAllProducts(data);
        }
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchAllProductsData();
  }, [fetchAllProductsData]);

  const generateDropdownOptions = (bookData) => {
    const options = [];

    if (bookData.english) {
      options.push({
        label: `${bookData.english.title} - ${bookData.english.bookCode}`,
        value: bookData.english._id,
      });
    }

    if (bookData.hindi) {
      options.push({
        label: `${bookData.hindi.title} - ${bookData.hindi.bookCode}`,
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
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      client: "",
      date: "",
      books: [
        {
          product: "",
          price: "",
          qty: "",
          discount1: "",
          discount2: "",
          amt: "",
        },
      ],
      weight: "",
      length: "",
      width: "",
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

  useEffect(() => {
    let total = 0;

    books.forEach((book, index) => {
      const price = parseFloat(book.price) || 0;
      const qty = parseFloat(book.qty) || 0;
      const d1 = parseFloat(book.discount1) || 0;
      const d2 = parseFloat(book.discount2) || 0;

      const amt = +(price * qty - d1 - d2).toFixed(2); // final amount
      total += amt;

      const currentAmt = parseFloat(book.amt) || 0;

      // Only update amt if it has changed
      if (amt !== currentAmt) {
        setValue(`books.${index}.amt`, amt.toFixed(2), {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
    });

    const grandTotal = +total.toFixed(2);
    const currentGrandTotal = parseFloat(books?.grandTotal) || 0;

    if (grandTotal !== currentGrandTotal) {
      setValue("grandTotal", grandTotal.toFixed(2), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [books, setValue]);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  const handleAddBook = () =>
    append({
      product: "",
      price: "",
      qty: "",
      discount1: "",
      discount2: "",
      amt: "",
    });

  const handleRemoveBook = (index) => remove(index);

  return (
    <PageCont>
      <Heading text="Add Order" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {/* Client Information */}
        <Section title="Client Information">
          <Grid>
            <InputField
              control={control}
              errors={errors}
              name="client"
              label="Client"
              type="option"
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
        <Section
          title="Book Information"
          actionText="+ Add Book"
          onAction={handleAddBook}
        >
          {fields.map((item, index) => (
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
              <Grid columns={4}>
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.product`}
                  label="Product"
                  type="select"
                  mode="single"
                  options={productOptions}
                />
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
                  label="Discount 1"
                  type="number"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.discount2`}
                  label="Discount 2"
                  type="number"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`books.${index}.amt`}
                  label="Amount"
                  type="number"
                  disabled
                />
              </Grid>
            </div>
          ))}
        </Section>

        {/* Shipping Info */}
        <Section title="Shipping Information">
          <Grid columns={3}>
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
            />
          </Grid>
        </Section>

        {/* Total */}
        <Section title="Total">
          <Grid columns={3}>
            <InputField
              control={control}
              errors={errors}
              name="grandTotal"
              label="Grand Total"
              type="number"
              disabled
            />
          </Grid>
        </Section>

        <Button type="submit" className="primary-gradient mt-6 capitalize">
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
