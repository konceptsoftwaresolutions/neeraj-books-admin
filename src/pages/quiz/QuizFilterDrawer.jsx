import React from "react";
import { Drawer, Form, Input, Button } from "antd";

const QuizFilterDrawer = ({
  isVisible,
  onClose,
  onApplyFilter,
  onCancelFilter,
  initialFilters = {},
}) => {
  const [form] = Form.useForm();

  // Set initial values when drawer opens
  React.useEffect(() => {
    if (isVisible) {
      form.setFieldsValue(initialFilters);
    }
  }, [isVisible, initialFilters, form]);

  const onFinishFilter = (values) => {
    const filterPayload = {
      bookName: values.bookName || undefined,
      bookCode: values.bookCode || undefined, 
    };
    onApplyFilter(filterPayload);
    onClose();
  };

  const handleReset = () => {
    form.resetFields();
    onCancelFilter();
    onClose();
  };

  return (
    <Drawer
      title="Filter Quizzes"
      placement="right"
      onClose={onClose}
      open={isVisible}
      width={300}
    >
      <Form layout="vertical" onFinish={onFinishFilter} form={form}>
        <Form.Item name="bookName" label="Book Name">
          <Input placeholder="Enter book name" />
        </Form.Item>

        <Form.Item name="bookCode" label="Book Code">
          <Input placeholder="Enter book code" />
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

export default QuizFilterDrawer;
