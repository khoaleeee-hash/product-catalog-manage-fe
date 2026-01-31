import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import type { GetCategoryResponse } from "../../types/Category";
import { getProductById, updateProduct } from "../../services/ProductService";
import CategoryService from "../../services/CategoryService";
import { resolveImageUrl } from "../../utils/image";
import "./ProductForm.css";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<GetCategoryResponse[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    loadProductAndCategories();
  }, [id]);

  const loadProductAndCategories = async () => {
    try {
      const productRes = await getProductById(Number(id));
      setProduct(productRes);
      setImagePreview(resolveImageUrl(productRes?.imageUrl || ""));

      const categoriesRes = await CategoryService.getCategories();
      setCategories(categoriesRes.data.payload || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load product data");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!product) return;

    const { name, value, type } = e.target;

    if (name === "categoryId") {
      const selectedCategory = categories.find(
        c => c.categoryId === Number(value)
      );
      if (!selectedCategory) return;

      setProduct({
        ...product,
        category: selectedCategory
      });
      return;
    }

    setProduct({
      ...product,
      [name]:
        type === "number"
          ? Number(value)
          : value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !id) return;

    setLoading(true);

    const productRequest = {
      productName: product.name, 
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      categoryId: Number(product.category.categoryId)
    };

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(productRequest)], {
        type: "application/json"
      })
    );

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      await updateProduct(Number(id), formData);
      alert("Product updated successfully");
      navigate("/admin/product");
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-form-container">
      <div className="form-wrapper">
        <h1>Update Product</h1>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                id="price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                step="0.01"
                min={1}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity">Stock Quantity *</label>
              <input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                value={product.stockQuantity}
                onChange={handleChange}
                min={0}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category *</label>
            <select
              id="categoryId"
              name="categoryId"
              value={product.category.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Category --</option>
              {categories.map((c) => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <div className="image-section">
              <div className="image-preview">
                <img src={imagePreview} alt="Product" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <small>Leave empty to keep current image</small>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
            <button 
              type="button" 
              onClick={() => navigate("/admin/product")}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
