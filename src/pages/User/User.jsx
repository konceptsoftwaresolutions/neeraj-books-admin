import React from "react";
import PageCont from "../../components/PageCont";

import Heading from "../../components/Heading";
import { Button } from "@material-tailwind/react";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";
import { useForm } from "react-hook-form";

function User(props) {

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
            <Heading text="All User" />
            <div className="mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <InputField
                            control={control}
                            errors={errors}
                            name="userEmail"
                            label="Email"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="userName"
                            label="Name"
                            // type="opti"
                            options={mediumOptions}
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="userMobile"
                            label="Mobile"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="userProfile"
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
                    <Button type="submit" className=" mt-5  primary-gradient mb-5">
                        Update
                    </Button>
                </form>
            </div>
        </PageCont>
    );
}

export default User;