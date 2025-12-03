// /pages/dashboard.js
import { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton, Tag, Typography } from 'antd';

export async function getServerSideProps() {
  try {
    const res = await fetch('https://course.summitglobal.id/products');
    const data = await res.json();
    const products = data.body?.data || [];
    const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    return { props: { products, categories } };
  } catch {
    return { props: { products: [], categories: [] } };
  }
}

const { Title } = Typography;

export default function DashboardPage({ products, categories }) {
  const total = products.length;
  const [randomLoading, setRandomLoading] = useState(true);
  const [randomProduct, setRandomProduct] = useState(null);

  useEffect(() => {
    let active = true;
    fetch('/api/products')
      .then(res => res.json())
      .then(ps => {
        if (!active) return;
        if (ps.length) {
          const idx = Math.floor(Math.random() * ps.length);
          setRandomProduct(ps[idx]);
        }
      })
      .finally(() => setRandomLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Total products (SSR)">
            <h2>{total}</h2>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Categories (SSR)">
            {categories.length ? categories.map(c => <Tag key={c}>{c}</Tag>) : <Skeleton active />}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Random product (Client)">
            {randomLoading ? (
              <Skeleton active />
            ) : randomProduct ? (
              <>
                <p><strong>{randomProduct.name}</strong></p>
                <p>{randomProduct.category}</p>
                <p>
                  {randomProduct.stock === 0 ? (
                    <Tag color="red">Out of stock</Tag>
                  ) : (
                    <Tag color="green">In stock: {randomProduct.stock}</Tag>
                  )}
                </p>
              </>
            ) : (
              'No products available'
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
