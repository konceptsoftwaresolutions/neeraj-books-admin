import React, { useEffect } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";

function AddOrders(props) {
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
      grandTotal: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "books",
  });

  const books = useWatch({
    control,
    name: "books",
  });

  // Auto-calculate amounts and grand total
  useEffect(() => {
    let total = 0;
    books.forEach((book, index) => {
      const price = parseFloat(book.price) || 0;
      const qty = parseFloat(book.qty) || 0;
      const d1 = parseFloat(book.discount1) || 0;
      const d2 = parseFloat(book.discount2) || 0;

      const amt = price * qty - d1 - d2;
      total += amt;

      setValue(`books.${index}.amt`, amt.toFixed(2));
    });

    setValue("grandTotal", total.toFixed(2));
  }, [books, setValue]);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <PageCont>
      <Heading text="Add Order" />
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Client Information */}
          <div className="bg-gray-100 rounded-md p-4 mb-6">
            <p className="font-semibold text-lg mb-3">Client Information</p>
            <div className="w-full grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
            </div>
          </div>

          {/* Book Information */}
          <div className="bg-gray-100 rounded-md p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-lg">Book Information</p>
              <Button
                type="button"
                className="capitalize"
                onClick={() =>
                  append({
                    product: "",
                    price: "",
                    qty: "",
                    discount1: "",
                    discount2: "",
                    amt: "",
                  })
                }
                variant="outlined"
              >
                + Add Book
              </Button>
            </div>

            {fields.map((item, index) => (
              <div
                key={item.id}
                className="relative w-full bg-white border rounded-md p-4 mb-4"
              >
                <div className="flex justify-end">
                  <Button
                    onClick={() => remove(index)}
                    variant="outlined"
                    size="sm"
                    color="red"
                    className="capitalize"
                  >
                    <RxCross2 color="red" />
                  </Button>
                </div>

                <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                  <InputField
                    control={control}
                    errors={errors}
                    name={`books.${index}.product`}
                    label="Product"
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
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-100 rounded-md p-4 mb-6">
            <p className="font-semibold text-lg mb-3">Shipping Information</p>
            <div className="w-full grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-100 rounded-md p-4 mb-6">
            <p className="font-semibold text-lg mb-3">Total</p>
            <div className="w-full grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              <InputField
                control={control}
                errors={errors}
                name="grandTotal"
                label="Grand Total"
                type="number"
                disabled
              />
            </div>
          </div>

          <Button type="submit" className="primary-gradient mt-6 capitalize">
            Create Order
          </Button>
        </form>
      </div>
    </PageCont>
  );
}

export default AddOrders;
