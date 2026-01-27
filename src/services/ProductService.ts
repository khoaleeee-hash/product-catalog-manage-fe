import type {Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch("/api/admin/products");
    return response.json();
};