import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import HomePage from "../pages/home/HomePage";
import CategoryPage from "../pages/admin/CategoryPage";
import ProductPage from "../pages/admin/ProductPage";
import ProtectedRoute from "../auth/ProtectedRoute"; // ← Đổi tên cho đúng
import LoginPage from "../pages/LoginPage";
import ProductDetailPage from "../pages/product/productDetailPage";
import CreateProductPage from "../pages/admin/CreateProductPage";
import UpdateProductPage from "../pages/admin/UpdateProductPage";
import RegisterPage from "../pages/RegisterPage";

const MainRoute: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* PRODUCT DETAIL */}
                <Route path="/products/:id" element={<ProductDetailPage />} />

                {/* User routes */}
                <Route element={<UserRoute />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute role={["admin", "ADMIN"]} />}>
            <Route path="/admin" element={<AdminRoute />}>
                <Route index element={<Navigate to="/admin/category" replace />} />
                <Route path="category" element={<CategoryPage />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="products/createProduct" element={<CreateProductPage />} />
                <Route path="products/:id" element={<UpdateProductPage />} />
            </Route>
        </Route>
    </Routes>
</BrowserRouter>

    );
};

export default MainRoute;
