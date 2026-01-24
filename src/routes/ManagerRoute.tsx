import ManagerLayout form '../layouts/ManagerLayout';
import { Outlet } from "react-router-dom";

const ManagerRoute: React.FC = () => {
    return(
        <ManagerLayout>
            <Outlet />
        </ManagerLayout>
    )
}

ManagerRoute.prototype = {}
export default ManagerRoute;