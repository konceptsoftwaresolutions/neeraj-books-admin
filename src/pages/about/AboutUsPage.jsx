import React, { useEffect, useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import InputField from "../../common/fields/InputField";
import ImageField from "../../common/fields/ImageField";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createAboutSection,
  uploadPhotoAboutSection,
  getAboutSectionData,
  getSectionPhoto,
} from "../../redux/features/sliders";
import { toast } from "react-toastify";
import AboutSectionEditor from "./AboutSectionEditor";

const AboutUsPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState();
  const [sectionImages, setSectionImages] = useState({});

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(
      getAboutSectionData((success, data) => {
        if (success) {
          setPageData(data);

          // Map API data to field structure
          reset({
            generalDescription: data.generalDescription || "",
            bottomDescription: data.bottomDescription || "",
            greatGrandFatherDescription:
              data.greatGrandFather?.description || "",
            greatGrandFatherName: data.greatGrandFather?.name || "",
            grandFatherDescription: data.grandFather?.description || "",
            grandFatherName: data.grandFather?.name || "",
            fatherDescription: data.father?.description || "",
            fatherName: data.father?.name || "",
            sonDescription: data.son?.description || "",
            sonName: data.son?.name || "",
          });
        }
      })
    );
  }, [dispatch, reset]);

  const sections = ["greatGrandFather", "grandFather", "father", "son"];

  useEffect(() => {
    sections.forEach((section) => {
      dispatch(
        getSectionPhoto({ section }, (success, url) => {
          if (success) {
            setSectionImages((prev) => ({
              ...prev,
              [section]: [{ url }],
            }));
          }
        })
      );
    });
  }, [dispatch]); // Empty array ensures this runs only once on mount

  const onSubmit = (data) => {
    console.log(data);

    // Great Grandfather
    if (data.greatGrandFatherPhoto?.[0]?.file) {
      const formData = new FormData();
      formData.append("section", "greatGrandFather");
      formData.append("photo", data.greatGrandFatherPhoto[0].file);
      dispatch(uploadPhotoAboutSection(formData));
    }

    // Grandfather
    if (data.grandFatherPhoto?.[0]?.file) {
      const formData = new FormData();
      formData.append("section", "grandFather");
      formData.append("photo", data.grandFatherPhoto[0].file);
      dispatch(uploadPhotoAboutSection(formData));
    }

    // Father
    if (data.fatherPhoto?.[0]?.file) {
      const formData = new FormData();
      formData.append("section", "father");
      formData.append("photo", data.fatherPhoto[0].file);
      dispatch(uploadPhotoAboutSection(formData));
    }

    // Son
    if (data.sonPhoto?.[0]?.file) {
      const formData = new FormData();
      formData.append("section", "son");
      formData.append("photo", data.sonPhoto[0].file);
      dispatch(uploadPhotoAboutSection(formData));
    }

    // Log or submit other text fields if needed
    dispatch(createAboutSection(data));
  };


  return (
    <PageCont>
      <div className="flex justify-between items-center mb-4">
        <Heading text="About Page" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Top Section */}
        <InputField
          type="textEditor"
          control={control}
          errors={errors}
          label="Top Description"
          name="generalDescription"
        />

        {/* About Sections */}
        {["greatGrandFather", "grandFather", "father", "son"].map((section) => (
          <div key={section} className="mt-4 p-3 rounded-lg bg-gray-100">
            <p className="font-semibold mb-2 capitalize">
              {section.replace(/([A-Z])/g, " $1")}
            </p>

            <img
              src={sectionImages?.[section]?.[0]?.url}
              alt="image"
              className="w-[100px] md:w-[100px] rounded-md"
            />

            <ImageField
              control={control}
              errors={errors}
              name={`${section}Photo`}
              maxFiles={1}
              label="Select Image"
              defaultValue={
                pageData?.[section]?.imagePath
                  ? [{ url: pageData[section].imagePath }]
                  : []
              }
            />

            <InputField
              type="textEditor"
              control={control}
              errors={errors}
              label="Description"
              name={`${section}Description`}
            />

            <InputField
              type="text"
              control={control}
              errors={errors}
              label="Name"
              name={`${section}Name`}
            />
          </div>
        ))}

        {/* Bottom Section */}
        <InputField
          type="textEditor"
          control={control}
          errors={errors}
          label="Bottom Description"
          name="bottomDescription"
        />

        <Button
          type="submit"
          className="primary-gradient mt-6 text-white capitalize"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save All"}
        </Button>
      </form>
      {/* <AboutSectionEditor /> */}
    </PageCont>
  );
};

export default AboutUsPage;
