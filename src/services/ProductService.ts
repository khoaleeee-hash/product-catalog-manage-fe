import type { Product } from "../types/Product";
import type { ApiResponse } from "../types/ApiResponse";
import axios from "../api/axios";

// export const getProducts = async (): Promise<Product[]> => {
//   const res = await axios.get<ApiResponse<Product[]>>("/api/products");
//   return res.data.payload ?? [];
// };

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:8080/api/products");
  const json = await res.json();
  return json.payload; 
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await axios.delete(
    `/api/products/${productId}`
  );
};

export const getProductById = async (id: number): Promise<Product | null> => 
{
  const res = await axios.get<ApiResponse<Product>>(`/api/products/${id}`);
  return res.data.payload ?? null;
};

export const createProduct = async (
  formData: FormData
): Promise<Product> => {
  const res = await axios.post<ApiResponse<Product>>(
    "/api/products/createProduct",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (!res.data.payload) {
    throw new Error("Create product failed");
  }

  return res.data.payload;
};
