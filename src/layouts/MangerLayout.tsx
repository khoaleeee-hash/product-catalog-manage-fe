import { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import type { ManagerLayoutProp } from "../interface/ManagerLayoutProp";

const ManagerLayout = ({ children }: ManagerLayoutProp) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col text-gray-900">
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <div className="flex flex-1">
                <SideBar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto px-6 py-8 mt-16 md:mt-8">
                        {children}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default ManagerLayout;
