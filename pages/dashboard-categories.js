import { Card, Tag } from 'antd';

export async function getStaticProps() {
  const res = await fetch('https://course.summitglobal.id/products');
  const data = await res.json();
  const products = data.body?.data || [];
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  return { props: { categories }, revalidate: 60 };
}

export default function DashboardCategories({ categories }) {
  return (
    <Card title="Categories (SSG)">
      {categories.length ? categories.map(c => <Tag key={c}>{c}</Tag>) : 'No categories'}
    </Card>
  );
}
