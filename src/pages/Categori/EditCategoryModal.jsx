import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import ImageField from "../../common/fields/ImageField";
import InputField from "../../common/fields/InputField";
import { useDispatch } from "react-redux";
import {
  deleteCategory,
  editCategory,
  getCategoryImage,
} from "../../redux/features/category";
import { Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { categorySchema, editCategorySchema } from "../../constant/validations";
import { yupResolver } from "@hookform/resolvers/yup";

const EditCategoryModal = ({ visible, onClose, category }) => {
  const [imageUrl, setImageUrl] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(editCategorySchema),
  });

  useEffect(() => {
    setImageUrl(null);
    reset({
      name: category?.name,
      description1: category?.description1,
      description2: category?.description2,
      sort: category?.sort,
      discountPercentage: category?.discountPercentage,
      amount: category?.amount,
      tagline: category?.tagline,
      sidebarDescription: category?.sidebarDescription,
    });
    if (category?.name) {
      const payload = {
        name: category?.name,
      };
      dispatch(
        getCategoryImage(payload, setLoading, (imageUrl) => {
          if (imageUrl) {
            console.log(imageUrl);
            setImageUrl(imageUrl);
          }
        })
      );
    }
  }, [category]);

  const onSubmit = (data) => {
    console.log(data);

    const {
      name,
      description1,
      description2,
      categoryFile,
      discountPercentage,
      amount,
      tagline,
      sidebarDescription,
    } = data;

    const slug = name.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase & replace spaces with "-"

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description1", description1);
    formData.append("description2", description2);
    formData.append("categoryId", category._id);
    formData.append("slug", slug);
    if (!category?.parent) {
      formData.append("tagline", tagline);
      formData.append("discountPercentage", discountPercentage);
      formData.append("amount", amount);
      formData.append("sidebarDescription", sidebarDescription);
    }
    if (categoryFile) {
      const imageFile = categoryFile[0]?.file;
      formData.append("categoryFile", imageFile);
    }
    formData.append("parent", category.parent);

    dispatch(editCategory(formData));
    reset(); // Reset the form after submission
    onClose();
    setIsEditable(false);
  };

  const handleDelete = () => {
    console.log(category._id);
    const id = category?._id;
    dispatch(deleteCategory(id));
    onClose();
  };

  return (
    <Modal
      //   title="Edit Category"
      open={visible}
      onCancel={() => {
        onClose();
        setIsEditable(false);
      }}
      footer={null}
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {loading ? (
              <p className="text-center">Loading image ...</p>
            ) : imageUrl ? (
              <img src={imageUrl} alt="Preview" />
            ) : (
              <p className="text-center">No image found</p>
            )}

            {isEditable && (
              <ImageField
                control={control}
                errors={errors}
                name="categoryFile"
                maxFiles={1}
                label="Category Image (330px X 150px)"
              />
            )}
            <div className="grid grid-cols-2 gap-3">
              <InputField
                control={control}
                errors={errors}
                name="name"
                label="Category Name"
                type="text"
                disabled={!isEditable}
              />

              {!category?.parent && (
                <InputField
                  control={control}
                  errors={errors}
                  name="sidebarDescription"
                  label="Sidebar Description"
                  type="text"
                  disabled={!isEditable}
                />
              )}
              <InputField
                control={control}
                errors={errors}
                name="description1"
                label="Description1"
                type="description"
                disabled={!isEditable}
              />
              <InputField
                control={control}
                errors={errors}
                name="description2"
                label="Description2"
                type="description"
                disabled={!isEditable}
              />
              {!category?.parent && (
                <InputField
                  control={control}
                  errors={errors}
                  name="tagline"
                  label="Tagline"
                  type="description"
                  disabled={!isEditable}
                />
              )}
              {/* <InputField
                control={control}
                errors={errors}
                name="sort"
                label="Order"
                type="numeric"
                disabled={!isEditable}
              /> */}
              {!category?.parent && (
                <InputField
                  control={control}
                  errors={errors}
                  name="discountPercentage"
                  label="Discount Percentage"
                  type="numeric"
                  disabled={!isEditable}
                />
              )}
              {!category?.parent && (
                <InputField
                  control={control}
                  errors={errors}
                  name="amount"
                  label="Amount"
                  type="numeric"
                  disabled={!isEditable}
                />
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" className="primary-gradient mt-4 text-white">
              Save
            </Button>

            <Button
              type="button"
              className="primary-gradient mt-4 text-white"
              onClick={() => setIsEditable(!isEditable)}
            >
              Edit
            </Button>
            <Button
              type="button"
              className="primary-gradient mt-4 text-white"
              onClick={handleDelete}
            >
              <MdDelete size={20} />
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
