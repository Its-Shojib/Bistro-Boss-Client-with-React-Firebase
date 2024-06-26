import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared Components/Navbar";
import Footer from './../Shared Components/Footer';


const MainLayout = () => {
    let location = useLocation();
    let noHedFoot = location.pathname.includes('/login') || location.pathname.includes('/register');
    return (
        <div>
            {noHedFoot || <div className="max-w-screen-2xl mx-auto">
                <Navbar></Navbar>
            </div>}
            <div className="max-w-screen-2xl mx-auto">
                <Outlet></Outlet>
            </div>
            {noHedFoot || <div className="max-w-screen-2xl mx-auto">
                <Footer></Footer>
            </div>}
        </div>
    )
}
export default MainLayout;