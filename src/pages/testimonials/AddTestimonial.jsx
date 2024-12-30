import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";

const AddTestimonial = () => {
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
      <Heading text="Testimonial" />
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid py-6 gap-y-3 gap-x-3 grid-cols-2 md:grid-cols-2 ">
            <InputField
              control={control}
              errors={errors}
              name="stdName"
              label="Name"
            />
            <InputField
              control={control}
              errors={errors}
              name="stdCourse"
              label="Course Name"
            />
            <InputField
              control={control}
              errors={errors}
              name="stdReview"
              label="Detailed Review"
              type="description"
            />
            <InputField
              control={control}
              errors={errors}
              name="stdImg"
              label="Student Image"
              type="file"
            />
          </div>
          <Button type="submit" className="primary-gradient">
            Add
          </Button>
        </form>
      </div>
    </PageCont>
  );
};

export default AddTestimonial;
