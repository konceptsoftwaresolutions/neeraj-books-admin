import React, { useState } from "react";
import PageCont from "../../components/PageCont";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { mediumOptions } from "../../constant/options";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getCategoryById,
  getSingleCategoryBySearch,
} from "../../redux/features/category";
import CategoryTree from "./CategoryTree";
import { Tag } from "antd";
import { setDummyCat } from "../../redux/features/dummyCat";

import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import ImageField from "../../common/fields/ImageField";
import { Plus } from "lucide-react";
import ParentCatModal from "./ParentCatModal";

const categoryData = {
  _id: "1",
  name: "IGNOU",
  description: "this is the description",
  subcategories: [
    {
      _id: "2",
      name: "Distance Education",
      description: "Subcategory focused on distance learning programs",
      subcategories: [
        {
          _id: "9",
          name: "Tech",
          description: "Courses related to technology and IT",
          subcategories: [],
        },
      ],
    },
    {
      _id: "3",
      name: "Education",
      description: "Subcategory focused on distance learning programs",
      subcategories: [
        {
          _id: "4",
          name: "English",
          description: "Courses related to technology and IT",
          subcategories: [],
        },
        {
          _id: "5",
          name: "Maths",
          description: "Courses related to technology and IT",
          subcategories: [],
        },
      ],
    },
    {
      _id: "6",
      name: "Online Courses",
      description: "Subcategory focused on online courses and certifications",
      subcategories: [
        {
          _id: "7",
          name: "Technology",
          description: "Courses related to technology and IT",
          subcategories: [],
        },
      ],
    },
  ],
};
console.log(categoryData);

const AddCategory = () => {
  const dispatch = useDispatch();
  const { allCategory, categoryForHeirarchy } = useSelector(
    (state) => state.category
  );
  const { allParentCategory } = useSelector((state) => state.dummy);

  console.log(allCategory);
  const [activeCategory, setActiveCategory] = useState("");
  const [showParentModal, setShowParentModal] = useState(false);
  console.log("active is ", activeCategory);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  // for api
  const onSubmit = (data) => {
    const { name, description1, description2, categoryFile } = data;
    console.log(data);

    const imageFile = categoryFile[0].file;
    const slug = name.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase & replace spaces with "-"

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description1", description1);
    formData.append("description2", description2);
    formData.append("categoryFile", imageFile);
    formData.append("parent", null);
    formData.append("slug", slug);
    const payload = {
      ...data,
      parent: null,
      slug,
    };

    dispatch(addCategory(formData));
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  //   const payload = {
  //     ...data,
  //     _id: uuidv4(),
  //   };
  //   console.log(payload);
  //   toast.success("Created successfully", {
  //     duration: 5000, // Duration for the toast to remain on screen
  //   });
  //   dispatch(setDummyCat(payload));
  //   reset({
  //     name: "",
  //     description: "", // Reset description and other fields as needed
  //   });
  // };

  //for api
  // const handleTagClick = (name) => {
  //   console.log(`Category ID: ${name}`);
  //   const payload = {
  //     name: name,
  //   };
  //   dispatch(getSingleCategoryBySearch(payload));
  //   setActiveCategory(_id);
  // };

  const [dummyHeirarchy, setDummyHeirarchy] = useState();
  const handleTagClick = (name) => {
    console.log(`Category ID: ${name}`);
    setActiveCategory(name);
    // Filter the category based on the name
    const filteredCategory = allCategory?.find(
      (category) => category.name === name
    );
    console.log("filtered category is ", filteredCategory);
    setDummyHeirarchy(filteredCategory);
  };

  return (
    <PageCont>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <Heading text="Add Category" />
        <Button
          type="submit"
          variant="filled"
          className="text-white py-[8px] px-[16px] font-bold text-md rounded-md flex items-center capitalize justify-center bg-cstm-blue"
          onClick={() => setShowParentModal(!showParentModal)}
        >
          <Plus className="pr-1" />
          Parent Category
        </Button>
      </div>

      <div className="mt-4  pt-3">
        <div className="mb-4">
          {/* <p className="text-black-800 text-[20px] font-semibold border-b mb-3">
            Al Parent Category
          </p> */}
          {/* for api */}
          <div className="flex gap-2">
            {allCategory?.map((category) => (
              <p
                key={category._id}
                onClick={() => handleTagClick(category.name)} // Handle tag click
                className={`inline-block py-2 px-3 rounded-md `}
                style={{
                  cursor: "pointer",
                  fontSize: "16px",
                  color: activeCategory === category._id ? "#fff" : "#000",
                  backgroundColor:
                    activeCategory === category._id ? "#1890ff" : "#f0f0f0", // Change background color of active tag
                }}
              >
                {category?.name}
              </p>
            ))}
          </div>
          {/* <div>
            {allParentCategory?.map((category) => (
              <p
                key={category._id}
                onClick={() => handleTagClick(category.name)} // Handle tag click
                className="inline-block py-2 px-3 rounded-md mr-2"
                style={{
                  cursor: "pointer",
                  fontSize: "16px",
                  color: activeCategory === category._id ? "#fff" : "#000",
                  backgroundColor:
                    activeCategory === category._id ? "#1890ff" : "#f0f0f0", // Change background color of active tag
                }}
              >
                {category?.name}
              </p>
            ))}
          </div> */}
        </div>
        {/* for api */}
        {/* <CategoryTree
          category={categoryForHeirarchy}
          activeCategory={activeCategory}
        /> */}
        {/* <CategoryTree
          category={dummyHeirarchy}
          activeCategory={activeCategory}
        /> */}
      </div>
      <ParentCatModal
        showParentModal={showParentModal}
        setShowParentModal={setShowParentModal}
      />
    </PageCont>
  );
};

export default AddCategory;
