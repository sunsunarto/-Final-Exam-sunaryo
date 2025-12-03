// /pages/products/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Image, Skeleton, Space, Tag } from 'antd';
import { fetchProductById } from '../../lib/api';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(id)
      .then(p => setProduct(p || null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button onClick={() => router.back()}>Back</Button>
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : product ? (
        <Card title={product.name}>
          {product.image ? <Image src={product.image} width={240} /> : null}
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> {Intl.NumberFormat('id-ID').format(product.price)}</p>
          <p>
            <strong>Stock:</strong>{' '}
            {product.stock === 0 ? <Tag color="red">Out of stock</Tag> : product.stock}
          </p>
        </Card>
      ) : (
        <Card>Product not found.</Card>
      )}
    </Space>
  );
}
