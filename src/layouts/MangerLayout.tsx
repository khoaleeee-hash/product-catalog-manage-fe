import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import type { ManagerLayoutProp } from "../interface/ManagerLayoutProp";

const ManagerLayout = ({ children }: ManagerLayoutProp) => {

    return (
        <div className="min-h-screen flex flex-col text-gray-900 overflow-x-hidden">
            <Header/>

            <div className="flex flex-1">
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
