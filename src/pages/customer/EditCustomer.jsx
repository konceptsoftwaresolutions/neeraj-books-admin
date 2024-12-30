import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";

function EditCustomer(props) {
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
            <Heading text="Edit Customer" />
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
                            name="email"
                            label="Email"
                            // type="option"
                            options={mediumOptions}
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="Address"
                            label="Address"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="Pincode"
                            label="Pincode"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="city"
                            label="City"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="category"
                            label="Category"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="country"
                            label="Country"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="state"
                            label="State"
                            type="text"
                        />
                    </div>
                    <Button type="submit" className="primary-gradient mt-4">
                        Add
                    </Button>
                </form>
            </div>
        </PageCont>
    );
}

export default EditCustomer;