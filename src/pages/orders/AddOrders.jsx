import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";

function AddOrders(props) {
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <PageCont>
            <Heading text="Orders Details" />
            <div className="mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <InputField
                            control={control}
                            errors={errors}
                            name="bookName"
                            label="Name"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="medium"
                            label="Medium"
                            type="option"
                            options={mediumOptions}
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="edition"
                            label="Edition"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="subInfo"
                            label="Sub Info"
                            type="text"
                        />

                        <InputField
                            control={control}
                            errors={errors}
                            name="ebookPrice"
                            label="E-Book Price"
                            type="number"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="paperBookPrice"
                            label="Paperback Book Price"
                            type="number"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="paperBookOldPrice"
                            label="Paperback Book Old Price"
                            type="number"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <InputField
                            control={control}
                            errors={errors}
                            name="shortDescription"
                            label="Short Description"
                            type="description"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="bookDescription"
                            label="Book Description"
                            type="textEditor"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <InputField
                            control={control}
                            errors={errors}
                            name="bookCover"
                            label="Book Cover"
                            type="file"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="previewPdf"
                            label="Preview PDF"
                            type="file"
                        />
                    </div>
                    <div className="mt-3">
                        <InputField
                            control={control}
                            errors={errors}
                            name="suggestedBooks"
                            label="Suggested Books"
                            type="select"
                        />
                    </div>
                    {/* <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <InputField
                            control={control}
                            errors={errors}
                            name="userUser"
                            label="User"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="orderProducts"
                            label="Products"
                            // type="opti"
                            options={mediumOptions}
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="orderTotalAmount"
                            label="TotalAmount"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="orderShippingDetails"
                            label="ShippingDetails"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="orderPaymentDetails"
                            label="PaymentDetails"
                            type="text"
                        />
                    </div> */}
                    <Button type="submit" className="primary-gradient mt-4">
                        Add Orders
                    </Button>
                </form>
            </div>
        </PageCont>
    );
}

export default AddOrders;