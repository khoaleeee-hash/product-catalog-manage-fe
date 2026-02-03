import Sidebar from "../components/layouts/Sidebar";
import type { MainLayoutProps } from "../types/MainLayoutProps.tsx";

const AdminLayout = ({ children }: MainLayoutProps) => {
  

  return (   

      <div className="flex flex-1">
        <Sidebar userRole="admin" />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
  );
};

export default AdminLayout;
