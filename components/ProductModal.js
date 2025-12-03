import { Modal, Form, Input, InputNumber } from 'antd';
import { useEffect } from 'react';

const initialShape = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  image: '',
};

export default function ProductModal({ open, onCancel, onSubmit, initialValues }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues || initialShape);
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = { ...initialShape, ...values };
      await onSubmit(payload);
      form.resetFields();
    } catch (e) {
    }
  };

  return (
    <Modal open={open} onCancel={onCancel} onOk={handleOk} title={initialValues ? 'Edit Product' : 'Add Product'}>
      <Form form={form} layout="vertical" initialValues={initialShape}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, type: 'number', min: 0 }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="stock" label="Stock" rules={[{ required: true, type: 'number', min: 0 }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
