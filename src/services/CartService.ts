import type { ApiResponse } from "../types/ApiResponse";
import axios from "../api/axios";
import type { CartResponse } from "../types/Cart";

export const addToCart = (productId: number, quantity: number = 1) => {
  return axios.post(
    "/api/cart/add",
    null,
    {
      params: {
        productId,
        quantity,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};

export const getCart = () => {
  const token = localStorage.getItem("accessToken");

  return axios.get<ApiResponse<CartResponse>>(
    "/api/cart",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteCartItem = (id: number) =>
  axios.delete(`/api/cart/item/${id}`);