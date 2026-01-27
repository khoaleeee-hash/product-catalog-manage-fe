import React, { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import { getProducts, deleteProduct } from '../../services/ProductService';
import ProductTable from '../../components/product/ProductTable';
import EmptyState from '../../components/product/EmptyState';
import { useNavigate } from "react-router-dom";


const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(); 
      console.log("PRODUCT DATA FROM API:", data);
      setProducts(data);
    } catch (error) {
      console.error('Fetch products failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
  if (!window.confirm('Do you want to delete this product?')) return;

  try {
    await deleteProduct(productId);

    setProducts(prev =>
      Array.isArray(prev)
        ? prev.filter(p => p.id !== productId)
        : []
    );
  } catch (error) {
    console.error('Delete product failed:', error);
    alert('Failed to delete product');
  }
};

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your product catalog
          </p>
        </div>
      </div>

 
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => navigate("/admin/products/createProduct")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Product
          </button>

          <button
            onClick={fetchProducts}
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Refresh
          </button>
        </div>


        {loading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Loading products...</p>
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <ProductTable
            products={filteredProducts}
            onDelete={handleDeleteProduct}
          />
        )}

        {!loading && products.length > 0 && filteredProducts.length === 0 && (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">No products match your search</p>
          </div>
        )}

        {!loading && products.length === 0 && <EmptyState />}
      </div>
    </div>
  );
};

export default ProductPage;
