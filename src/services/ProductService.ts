import type { Product } from "../types/Product";
import type { ApiResponse } from "../types/ApiResponse";
import axios from "../api/axios";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get<ApiResponse<Product[]>>("/api/products");
  console.log("RAW RESPONSE:", res.data);
  return res.data.payload ?? [];
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await axios.delete(
    `/api/products/${productId}`
  );
};

