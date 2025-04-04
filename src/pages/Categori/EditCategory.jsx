import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Heading from "../../components/Heading";
import PageCont from "../../components/PageCont";
import { useDispatch, useSelector } from "react-redux";
import CategoryTree from "./CategoryTree";
import { getCategoryById } from "../../redux/features/category";

const EditCategory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const category = location.state?.category; // Access the passed category data
  console.log(category);

  const { allCategory } = useSelector((state) => state.category);

  console.log(allCategory);

  const filteredCategory = allCategory.find((cat) => cat._id === category?._id);
  console.log(filteredCategory);

  // useEffect(() => {
  //   console.log(category._id)
  //   const id = category?._id
  //   dispatch(getCategoryById(id));

  // }, []);

  return (
    <PageCont>
      <Heading text="Category Details" />
      <div className="mt-6">
        <CategoryTree
          category={filteredCategory}
          //   activeCategory={activeCategory}
          showEdit={true}
          showAdd={true}
        />
      </div>
    </PageCont>
  );
};

export default EditCategory;
