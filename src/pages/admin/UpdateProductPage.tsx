import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import { getProductById, updateProduct } from "../../services/ProductService";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (!id) return;

    getProductById(Number(id))
      .then(res => {
        console.log("Product from API:", res);
        setProduct(res); 
      })
      .catch(console.error);
  }, [id]);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!product) return;

    setProduct({
      ...product,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value
    });
  };

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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
      alert("Update successful!");
      navigate("/admin/products/edit/" + id);
    } catch (error) {
      console.error(error);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Product</h2>

      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
      />

      <input
        name="stockQuantity"
        type="number"
        value={product.stockQuantity}
        onChange={handleChange}
      />

      <div>
        <p>Current Photo</p>
        <img
          src={product.imageUrl}
          alt="product"
          width={150}
        />
      </div>

      <input type="file" onChange={handleImageChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default ProductEditPage;
