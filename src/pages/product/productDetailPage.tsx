import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../../types/Product';
import { getProductById } from '../../services/ProductService';
import './ProductDetailPage.css';
import { resolveImageUrl } from '../../utils/image';


const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductById(Number(id))
        .then(setProduct)
        .catch(() => setError('Không thể tải sản phẩm'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (error || !product) {
    return <div className="error-container"><p>{error || 'Sản phẩm không tồn tại'}</p></div>;
  }

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <div className="product-detail-container">
        {/* LEFT: IMAGE */}
        <div className="product-image-section">
          <div className="product-image-wrapper">
            <img
                  src={resolveImageUrl(product.imageUrl ?? "")}
                  alt={product.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/no-image.png";
                  }}
                />
          </div>
        </div>

        {/* RIGHT: INFO */}
        <div className="product-info-section">
          <div className="product-header">
            <h1>{product.name}</h1>
            <div className="price-badge">{product.price.toLocaleString()} VND</div>
          </div>

          <div className="category-badge">
             {product.category?.categoryName || 'Không xác định'}
          </div>

          <div className="divider"></div>

          <div className="description-section">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description || 'Chưa có mô tả'}</p>
          </div>

          <div className="action-buttons">
            {product.stockQuantity > 0 ? (
              <button className="btn btn-primary"> Thêm vào giỏ hàng</button>
            ) : (
              <div className="text-center py-4 px-6 bg-red-100 border-2 border-red-400 rounded-lg">
                <p className="text-red-600 font-bold text-lg">Out of stock</p>
              </div>
            )}
            {/* <button className="btn btn-secondary"> Yêu thích</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
