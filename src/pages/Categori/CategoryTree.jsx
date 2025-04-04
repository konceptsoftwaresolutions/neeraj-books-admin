import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Modal, Tooltip } from "antd";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { Button } from "@material-tailwind/react";
import {
  addCategory,
  handleCategoryOrder,
} from "../../redux/features/category";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../constant/validations";
import ImageField from "../../common/fields/ImageField";
import EditCategoryModal from "./EditCategoryModal";

const CategoryTree = ({ category, showEdit = false, showAdd = true }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State to track collapsed categories
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  // Toggle collapse state for a category
  const toggleCollapse = (categoryId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategorySort = (categoryId, sort) => {
    const payload = {
      categoryId,
      sort,
    };
    console.log(payload);
    dispatch(handleCategoryOrder(payload));
  };

  // Recursive function to render categories and subcategories
  const renderCategory = (category, depth = 0) => {
    const levelBackgroundColors = [
      "#1f437f", // Level 0
      "#118ab2", // Level 1
      "#06d6a0", // Level 2
      "#ffd166", // Level 3
      "#ef476f", // Level 4
    ];

    const backgroundColor =
      levelBackgroundColors[depth] ||
      levelBackgroundColors[levelBackgroundColors.length - 1];

    const isCollapsed = collapsedCategories[category?._id];

    return (
      <div key={category?._id}>
        {/* Category Heading */}
        <div className="flex mb-3" style={{ marginLeft: `${depth * 20}px` }}>
          {/* Toggle Arrow */}
          <div className="leftdiv min-w-[23px] flex items-center">
            {category?.subcategories?.length > 0 && (
              <button
                className="mr-2 focus:outline-none h-full"
                onClick={() => toggleCollapse(category._id)}
              >
                {isCollapsed ? (
                  <IoIosArrowForward size={18} />
                ) : (
                  <IoIosArrowDown size={18} />
                )}
              </button>
            )}
          </div>

          <h4
            className="w-[500px] p-3 border bg-[#fafafa] flex gap-2 justify-between items-center"
            style={{ backgroundColor }}
          >
            <p className="inline-block text-white font-semibold">
              {category?.name}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* <button
                className="flex items-center gap-2 border border-dashed px-2 py-1 rounded text-black bg-[#fafafa] hover:bg-gray-200"
                onClick={() => {
                  setSelectedCategory(category);
                  setShowEditModal(true);
                }}
              >
                <FaEdit size={16} /> Edit
              </button> */}
              <Tooltip title="Set Order">
                <input
                  type="text"
                  className="flex items-center gap-2 text-center max-w-[40px] border border-dashed px-2 py-1 rounded text-black bg-[#fafafa] hover:bg-gray-200"
                  defaultValue={category?.sort}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // console.log(e.target.value, category);
                      handleCategorySort(category._id, e.target.value);
                    }
                  }}
                />
              </Tooltip>
              {showEdit && (
                <button
                  className="flex items-center gap-2 border border-dashed px-2 py-1 rounded text-black bg-[#fafafa] hover:bg-gray-200"
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowEditModal(true);
                  }}
                >
                  <FaEdit size={16} /> Edit
                </button>
              )}
              {showAdd && (
                <Tooltip title="Add Subcategory">
                  <button
                    className="flex items-center gap-2 border border-dashed px-2 py-1 rounded text-black bg-[#fafafa] hover:bg-gray-200"
                    onClick={() => handleAddCategory(category._id)}
                  >
                    <IoIosAddCircle size={18} /> Add
                  </button>
                </Tooltip>
              )}
            </div>
          </h4>
        </div>

        {/* Render subcategories if not collapsed */}
        {!isCollapsed && category?.subcategories?.length > 0 && (
          <div>
            {category.subcategories.map((subcat) => (
              <div key={subcat._id}>{renderCategory(subcat, depth + 1)}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleAddCategory = (parentId) => {
    setParentCategoryId(parentId);
    setIsModalVisible(true);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewCategoryName("");
    reset({
      name: "",
      description1: "",
      description2: "",
    });
  };

  const onSubmitHandler = (data) => {
    const { name, description1, description2, categoryFile, order } = data;
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const imageFile = categoryFile[0].file;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description1", description1);
    formData.append("description2", description2);
    formData.append("categoryFile", imageFile);
    formData.append("parent", parentCategoryId);
    formData.append("slug", slug);
    formData.append("order", order);

    dispatch(addCategory(formData));
    reset({ name: "", description1: "", description2: "", order: "" });
    setIsModalVisible(false);
  };

  return (
    <div>
      {renderCategory(category)}

      {/* Add Category Modal */}
      <Modal
        title="Add Category"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form
          className="grid grid-cols-1 gap-3"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <ImageField
            control={control}
            errors={errors}
            name="categoryFile"
            maxFiles={1}
            label="Category Image (330px X 150px)"
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              control={control}
              errors={errors}
              name="name"
              label="Category Name"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="description1"
              label="Description1"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="description2"
              label="Description2"
              type="text"
            />
            <InputField
              control={control}
              errors={errors}
              name="order"
              label="Order"
              type="number"
            />
          </div>
          <Button type="submit" className="primary-gradient mt-4">
            Add
          </Button>
        </form>
      </Modal>

      {/* Edit Category Modal */}
      <EditCategoryModal
        visible={showEditModal}
        onClose={handleCloseModal}
        category={selectedCategory}
      />
    </div>
  );
};

export default CategoryTree;
