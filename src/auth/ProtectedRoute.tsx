import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserFromToken } from "../utils/auth";

interface ProtectedRouteProps {
    role: string[];
}

const ProctedRouted: React.FC<ProtectedRouteProps> = ({ role }) => {
    // TODO: Implement real authentication check


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    const user = getUserFromToken();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2️⃣ Sai role → home
    if (!role.includes(user.role)) {
        return <Navigate to="/home" replace />;
    }

    // 3️⃣ OK → cho vào
    return <Outlet />;
};

export default ProctedRouted;