import React  from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  ManagerRoute from "./ManagerRoute";
import Dashboard from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";

const MainRoute: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element ={<ManagerRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Dashboard />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

MainRoute.prototype = {}
export default MainRoute;