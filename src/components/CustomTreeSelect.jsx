import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TreeSelect, Button } from "antd";

const mapCategoriesToTreeData = (categories) => {
  return categories?.map((category) => ({
    key: category._id, // Unique key
    value: category._id,
    title: category.name,
    children: category.subcategories.length
      ? mapCategoriesToTreeData(category.subcategories)
      : undefined,
  }));
};

const CustomTreeSelect = ({ data, control, name, defaultValue }) => {
  const [expandedKeys, setExpandedKeys] = useState([]); // Manage expanded nodes

  return (
    <>
      <p className="mb-2">Select Category</p>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || []} // Set default value
        className=""
        render={({ field }) => (
          <TreeSelect
            showSearch
            className="testing ant-dropdown-test "
            style={{ width: "100%" }}
            value={field.value || []} // Ensure the value is an array for multi-select
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Select Category"
            allowClear
            treeExpandedKeys={expandedKeys} // Control which nodes are expanded
            onTreeExpand={setExpandedKeys} // Update expanded nodes
            onChange={(value) => field.onChange(value)} // Update value when a selection is made
            treeData={mapCategoriesToTreeData(data)}
            filterTreeNode={(search, node) =>
              node.title.toLowerCase().includes(search.toLowerCase())
            } // Enable searching
            multiple // Enable multi-select mode
          />
        )}
      />
    </>
  );
};

export default CustomTreeSelect;
