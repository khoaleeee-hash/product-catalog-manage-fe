import type { ApiResponse } from "../types/ApiResponse";
import axios from "../api/axios";
import type { Cart } from "../types/Cart";

export const addToCart = (productId: number, quantity = 1) =>
  axios.post("/api/cart/add", null, {
    params: { productId, quantity },
  });

export const getCart = () =>
  axios.get<Cart>("/api/cart");

export const deleteCartItem = (id: number) =>
  axios.delete(`/api/cart/item/${id}`);