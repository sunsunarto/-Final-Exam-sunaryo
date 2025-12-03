import { useEffect, useMemo, useState } from 'react';
import { Button, Input, Select, Space, Skeleton, message } from 'antd';
import { fetchProducts, createProduct, updateProduct, setProductOutOfStock } from '../../lib/api';
import ProductTable from '../../components/ProductTable';
import ProductModal from '../../components/ProductModal';
import { useApp } from '../../context/AppContext';

export async function getServerSideProps() {
  try {
    const products = await fetchProducts();
    return { props: { initialProducts: products } };
  } catch (e) {
    return { props: { initialProducts: [] } };
  }
}

export default function ProductsPage({ initialProducts }) {
  const { selectedCategory, setSelectedCategory } = useApp();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = [p.name, p.description, p.category]
        .filter(Boolean)
        .some(field => field.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const refresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      message.success('Products refreshed');
    } catch {
      message.error('Failed to refresh products');
    } finally {
      setRefreshing(false);
    }
  };

  const handleCreate = async (payload) => {
    try {
      await createProduct(payload);
      message.success('Product created');
      setModalOpen(false);
      refresh();
    } catch {
      message.error('Failed to create product');
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      await updateProduct(id, payload); // full payload required
      message.success('Product updated');
      setEditProduct(null);
      refresh();
    } catch {
      message.error('Failed to update product');
    }
  };

  const handleSetInactive = async (product) => {
    try {
      await setProductOutOfStock(product.id, product);
      message.success('Product set inactive');
      refresh();
    } catch {
      message.error('Failed to set inactive');
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space wrap>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 240 }}
        />
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categories.map(c => ({ label: c, value: c }))}
          style={{ width: 200 }}
        />
        <Button onClick={refresh}>Refresh</Button>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add Product
        </Button>
      </Space>

      {refreshing ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <ProductTable
          data={filtered}
          onEdit={setEditProduct}
          onDelete={handleSetInactive}
        />
      )}

      <ProductModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleCreate}
      />

      {editProduct && (
        <ProductModal
          open={!!editProduct}
          initialValues={editProduct}
          onCancel={() => setEditProduct(null)}
          onSubmit={(payload) => handleUpdate(editProduct.id, payload)}
        />
      )}
    </Space>
  );
}
