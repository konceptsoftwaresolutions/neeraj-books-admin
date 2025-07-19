import React, { useEffect } from "react";
import { Drawer, Form, Input, Button, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { setOrderFilters } from "../../redux/features/orders";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const FilterDrawer = ({
  isVisible,
  onClose,
  onApplyFilter,
  onCancelFilter,
  initialFilters = {},
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVisible) {
      const values = {
        ...initialFilters,
        createdAtRange:
          initialFilters.startDate && initialFilters.endDate
            ? [dayjs(initialFilters.startDate), dayjs(initialFilters.endDate)]
            : null,
      };
      form.setFieldsValue(values);
    }
  }, [isVisible, initialFilters, form]);

  const onFinishFilter = (values) => {
    const trimmedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    const filterPayload = {
      name: trimmedValues.name || undefined,
      state: trimmedValues.state || undefined,
      companyName: trimmedValues.companyName || undefined,
      mobile: trimmedValues.mobile || undefined,
      city: trimmedValues.city || undefined,
      notes: trimmedValues.notes || undefined,
    };

    if (trimmedValues.createdAtRange) {
      filterPayload.startDate = trimmedValues.createdAtRange[0].format("YYYY-MM-DD");
      filterPayload.endDate = trimmedValues.createdAtRange[1].format("YYYY-MM-DD");
    }

    onApplyFilter(filterPayload);
    onClose();
  };

  const handleReset = () => {
    form.resetFields();
    dispatch(setOrderFilters({}));
    onCancelFilter();
    onClose();
  };

  return (
    <Drawer
      title="Filter Clients"
      placement="right"
      onClose={onClose}
      open={isVisible}
      width={350}
    >
      <Form layout="vertical" onFinish={onFinishFilter} form={form}>
        <Form.Item name="name" label="Customer Name">
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item name="companyName" label="Company Name">
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item name="mobile" label="Mobile">
          <Input placeholder="Enter mobile number" />
        </Form.Item>

        <Form.Item name="city" label="City">
          <Input placeholder="Enter city" />
        </Form.Item>

        <Form.Item name="state" label="State">
          <Input placeholder="Enter state" />
        </Form.Item>

        <Form.Item name="notes" label="Notes">
          <Input placeholder="Enter notes" />
        </Form.Item>

        <Form.Item name="createdAtRange" label="Created Date Range">
          <RangePicker className="w-full" />
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

export default FilterDrawer;
