import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const MainLayout = () => {
    useEffect(() => {
        AOS.init();
        // Refresh AOS to ensure it runs after the page load
        AOS.refresh();
      }, []);
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div className="min-h-screen">
                <Outlet/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default MainLayout;