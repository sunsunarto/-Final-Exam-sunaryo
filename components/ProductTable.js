import { Button, Image, Table, Tag, Space, Modal, Descriptions } from 'antd';
import { useState } from 'react';

export default function ProductTable({ data, onEdit, onDelete }) {
  const [viewing, setViewing] = useState(null);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (src) =>
        src ? (
          <Image width={48} src={src} alt="product" />
        ) : (
          <Tag color="default">None</Tag>
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text || <Tag color="default">No name</Tag>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => text || <Tag color="default">Uncategorized</Tag>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (v) =>
        typeof v === 'number'
          ? Intl.NumberFormat('id-ID').format(v)
          : <Tag color="default">N/A</Tag>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (s) =>
        s === 0 ? <Tag color="red">Out of stock</Tag> : s ?? <Tag>N/A</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button
            danger
            onClick={() => {
              Modal.confirm({
                title: 'Delete product?',
                content: 'This will permanently remove the product.',
                okText: 'Confirm',
                onOk: () => onDelete(record),
              });
            }}
          >
            Delete
          </Button>
          <Button type="link" onClick={() => setViewing(record)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey={(record) => record.id || record.name || Math.random()}
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        pagination={{ pageSize: 10 }}
        rowClassName={(record) => (record.stock === 0 ? 'row-out' : '')}
      />

      {/* Details Modal */}
      <Modal
        open={!!viewing}
        title="Product Details"
        footer={null}
        onCancel={() => setViewing(null)}
      >
        {viewing && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Image">
              {viewing.image ? (
                <Image width={100} src={viewing.image} alt="product" />
              ) : (
                <Tag color="default">None</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Name">{viewing.name || '-'}</Descriptions.Item>
            <Descriptions.Item label="Category">{viewing.category || '-'}</Descriptions.Item>
            <Descriptions.Item label="Price">
              {typeof viewing.price === 'number'
                ? Intl.NumberFormat('id-ID').format(viewing.price)
                : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Stock">
              {viewing.stock === 0 ? (
                <Tag color="red">Out of stock</Tag>
              ) : (
                <Tag color="green">In stock: {viewing.stock}</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {viewing.description || '-'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
