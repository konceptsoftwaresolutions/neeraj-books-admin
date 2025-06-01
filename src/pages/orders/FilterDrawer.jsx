import React from "react";
import { Drawer, Form, Input, Select, DatePicker, Button } from "antd";

const { Option } = Select;

const FilterDrawer = ({
  isVisible,
  onClose,
  onApplyFilter,
  onCancelFilter,
}) => {
  const [form] = Form.useForm();

  const onFinishFilter = (values) => {
    const filterPayload = {
      orderId: values.orderId || undefined,
      orderStatus: values.orderStatus || undefined,
      fromDate: values.fromDate
        ? values.fromDate.format("YYYY-MM-DD")
        : undefined,
      toDate: values.toDate ? values.toDate.format("YYYY-MM-DD") : undefined,
      name: values.name || undefined,
      state: values.state || undefined,
      total: values.total || undefined,
    };

    onApplyFilter(filterPayload);
    onClose();
  };

  return (
    <Drawer
      title="Filter Orders"
      placement="right"
      onClose={onClose}
      open={isVisible}
      width={350}
    >
      <Form layout="vertical" onFinish={onFinishFilter} form={form}>
        <Form.Item name="orderId" label="Order ID">
          <Input placeholder="Enter order ID" />
        </Form.Item>

        <Form.Item name="orderStatus" label="Order Status">
          <Select placeholder="Select order status" allowClear>
            <Option value="Pending">Pending</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </Form.Item>

        <Form.Item name="fromDate" label="From Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="toDate" label="To Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="name" label="Customer Name">
          <Input placeholder="Enter customer name" />
        </Form.Item>

        <Form.Item name="state" label="State">
          <Input placeholder="Enter shipping state" />
        </Form.Item>

        <Form.Item name="total" label="Total Amount">
          <Input type="number" placeholder="Enter total amount" />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              onClose();
              onCancelFilter();
            }}
            className="bg-gray-400 text-white"
          >
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

export default FilterDrawer;
