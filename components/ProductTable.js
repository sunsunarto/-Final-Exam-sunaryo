import { Button, Image, Tag, Space, Modal, Descriptions, Card, Row, Col } from 'antd';
import { useState } from 'react';

export default function ProductCards({ data, onEdit, onDelete }) {
  const [viewing, setViewing] = useState(null);

  const renderCard = (item) => (
    <Col key={item.id || item.name} xs={24} sm={12} md={8} style={{ marginBottom: 16 }}>
      <Card
        hoverable
        cover={
          item.image ? (
            <Image src={item.image} alt="product" width="100%" height={200} style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{ height: 200, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tag color="default">No Image</Tag>
            </div>
          )
        }
      >
        <Card.Meta
          title={item.name || <Tag color="default">No name</Tag>}
          description={
            <>
              <div><strong>Category:</strong> {item.category || <Tag color="default">Uncategorized</Tag>}</div>
              <div><strong>Price:</strong> {typeof item.price === 'number' ? `Rp ${Intl.NumberFormat('id-ID').format(item.price)}` : <Tag color="default">N/A</Tag>}</div>
              <div><strong>Stock:</strong> {item.stock === 0 ? <Tag color="red">Out of stock</Tag> : item.stock ?? <Tag>N/A</Tag>}</div>
              <Space style={{ marginTop: 12 }}>
                <Button size="small" onClick={() => onEdit(item)}>Edit</Button>
                <Button
                  size="small"
                  danger
                  onClick={() =>
                    Modal.confirm({
                      title: 'Delete product?',
                      content: 'This will permanently remove the product.',
                      okText: 'Confirm',
                      onOk: () => onDelete(item),
                    })
                  }
                >
                  Delete
                </Button>
                <Button size="small" type="link" onClick={() => setViewing(item)}>
                  View Details
                </Button>
              </Space>
            </>
          }
        />
      </Card>
    </Col>
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        {Array.isArray(data) ? data.map(renderCard) : null}
      </Row>

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
                ? `Rp ${Intl.NumberFormat('id-ID').format(viewing.price)}`
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
