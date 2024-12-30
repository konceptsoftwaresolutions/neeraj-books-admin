import React from 'react';
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";


function AddMembers(props) {
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
            <Heading text="Add Members" />
            <div className="mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <InputField
                            control={control}
                            errors={errors}
                            name="name"
                            label="Name"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="email"
                            label="Email"
                            options={mediumOptions}
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="mobial"
                            label="Mobial"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="profile"
                            label="Profile"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="userPassword"
                            label="Password"
                            type="text"
                        />
                    </div>
                    <Button type="submit" className="primary-gradient mt-4 mb-4">
                        Submit
                    </Button>
                </form>
            </div>
        </PageCont>
    );
}

export default AddMembers;