import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/ProductService";

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select image");
      return;
    }

    const product = {
      productName,        
      description,
      price,              
      stockQuantity,      
      categoryId,         
    };

    const formData = new FormData();

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], {
        type: "application/json",
      })
    );

    formData.append("imageFile", imageFile);

    try {
      await createProduct(formData);
      alert("Create success");
      navigate("/admin/product");
    } catch (error) {
      console.error(error);
      alert("Create failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        min={1}
        required
      />

      <input
        type="number"
        placeholder="Stock Quantity"
        value={stockQuantity}
        onChange={(e) => setStockQuantity(Number(e.target.value))}
        min={0}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        required
      />

      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProductPage;
