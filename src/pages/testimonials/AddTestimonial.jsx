import React from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import { testimonialSchema } from "../../constant/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { addTestimonial } from "../../redux/features/testimonials";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddTestimonial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(testimonialSchema),
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    if (!data?.testimonialUserImg || !data?.testimonialUserImg[0]) {
      toast.error("Image Required");
      return;
    }

    formData.append("file", data?.testimonialUserImg[0]);
    formData.append("name", data?.name);
    formData.append("designation", data?.course);
    formData.append("rating", data?.rating);
    formData.append("paragraph", data?.review);

    dispatch(
      addTestimonial({ formData }, (success) => {
        if (success) {
          navigate(-1)
        }
      })
    );
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
              name="name"
              label="Name"
            />
            <InputField
              control={control}
              errors={errors}
              name="course"
              label="Course Name"
            />
            <InputField
              control={control}
              errors={errors}
              name="review"
              label="Detailed Review"
              type="description"
            />
            <InputField
              control={control}
              errors={errors}
              name="testimonialUserImg"
              label="Student Image"
              type="file"
            />
            <InputField
              control={control}
              errors={errors}
              name="rating"
              label="Rating"
              type="numeric"
              max={5}
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
