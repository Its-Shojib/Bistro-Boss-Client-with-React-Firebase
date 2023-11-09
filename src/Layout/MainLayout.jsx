import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div>
            <div></div>
            <div>
                <Outlet></Outlet>
            </div>
            <div></div>
        </div>
    )
}
export default MainLayout;