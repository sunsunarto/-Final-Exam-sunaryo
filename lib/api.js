function normalizeProductsResponse(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.body?.data)) return data.body.data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data?.body?.data && typeof data.body.data === 'object') return [data.body.data];
  if (data?.data && typeof data.data === 'object') return [data.data];
  return [];
}

export async function fetchProducts() {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return normalizeProductsResponse(data);
}
export async function createProduct(payload) {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create product');
  const data = await res.json();
  return normalizeProductsResponse(data);
}

export async function updateProduct(id, payload, existingProduct = {}) {
  const fullPayload = { ...existingProduct, ...payload };

  const res = await fetch(`/api/products?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fullPayload),
  });
  if (!res.ok) throw new Error('Failed to update product');
  const data = await res.json();
  return normalizeProductsResponse(data);
}
export async function setProductOutOfStock(id, fullProduct) {
  const payload = { ...fullProduct, stock: 0 };

  const res = await fetch(`/api/products?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to set product inactive');
  const data = await res.json();
  return normalizeProductsResponse(data);
}
export async function deleteProduct(id) {
  const res = await fetch(`/api/products?id=${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to delete product');
  const data = await res.json();
  return data.body?.data || true;
}
export async function fetchProductById(id) {
  const products = await fetchProducts();
  return products.find(p => String(p.id) === String(id)) || null;
}
