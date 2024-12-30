import React from 'react';
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";


function EditMembers(props) {
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
            <Heading text="Edit Members" />
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
                            label="Role"
                            // type="option"
                            options={mediumOptions}
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="edition"
                            label="Email"
                            type="text"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="subInfo"
                            label="Phone"
                            type="text"
                        />

                        <InputField
                            control={control}
                            errors={errors}
                            name="ebookPrice"
                            label="Status"
                            type="number"
                        />
                        <InputField
                            control={control}
                            errors={errors}
                            name="paperBookPrice"
                            label="JoiningDate"
                            type="number"
                        />
                    </div>
                </form>
            </div>
        </PageCont>

    );
}

export default EditMembers;