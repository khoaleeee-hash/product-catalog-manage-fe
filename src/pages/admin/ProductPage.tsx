import React, {useEffect, useState} from 'react';
import type { Product } from '../../types/Product';
import { getProducts } from '../../services/ProductService';
import ProductTable from '../../components/product/ProductTable';
import EmptyState from '../../components/product/EmptyState';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

    return (
       <div className="p-6 bg-gray-100 min-h-screen"    >
          <h1 className="text-2xl font-bold text-blue-700 mb-6">
            PRODUCT MANAGEMENT
          </h1>

          {
            loading &&(
                <div className="bg-white p-6 rounded text-center">
                    Loading...
                </div>
            )
          }

          {
            !loading && products.length > 0 && (
                <ProductTable products={products} />
            )
          }

          {
            !loading && products.length === 0 && (
                <EmptyState />
            )
          }
       </div>
    );
};

export default ProductPage;