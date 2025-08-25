import React, { useEffect } from "react";
import { Drawer, Form, Input, Button, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const AffiliateFilterDrawer = ({
  isVisible,
  onClose,
  onApplyFilter,
  onCancelFilter,
  initialFilters = {},
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isVisible) {
      const transformed = {
        ...initialFilters,
        date: initialFilters.date ? dayjs(initialFilters.date) : undefined,
      };
      form.setFieldsValue(transformed);
    }
  }, [isVisible, initialFilters, form]);

  const onFinishFilter = (values) => {
    const filterPayload = {
      name: values.name || undefined,
      email: values.email || undefined,
      status: values.status || undefined,
      date: values.date ? values.date.format("YYYY-MM-DD") : undefined,
    };

    console.log(filterPayload);
    onApplyFilter(filterPayload);
    // onClose();
  };

  const handleReset = () => {
    form.resetFields();
    onCancelFilter(); // clear filters in parent
    onClose();
  };

  return (
    <Drawer
      title="Filter Affiliates"
      placement="right"
      onClose={onClose}
      open={isVisible}
      width={350}
    >
      <Form layout="vertical" onFinish={onFinishFilter} form={form}>
        <Form.Item name="name" label="Affiliate Name">
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input placeholder="Enter email" />
        </Form.Item>

        {/* <Form.Item name="status" label="Status">
          <Select placeholder="Select status" allowClear>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </Form.Item> */}

        {/* 🔹 New Date Filter */}
        <Form.Item name="date" label="Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <div className="flex justify-end gap-2">
          <Button onClick={handleReset} className="bg-gray-400 text-white">
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-cstm-blue text-white"
          >
            Apply
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default AffiliateFilterDrawer;
