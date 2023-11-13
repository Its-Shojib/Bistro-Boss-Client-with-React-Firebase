import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error-Page/Error";
import Login from "../Pages/Login/Login";
import Contact_Us from './../Pages/Contact-Us/Contact_Us';
import Our_Menu from "../Pages/Our-Menu/Our_Menu";
import Our_Shop from "../Pages/Our-Shop/Our_Shop";
import Dash_Board from "../Pages/Dash-Board/Dash_Board";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/contact-us',
                element: <Contact_Us></Contact_Us>
            },
            {
                path:'/our-menu',
                element: <Our_Menu></Our_Menu>
            },
            {
                path:'/our-shop/:category',
                element: <Our_Shop></Our_Shop>
            },
            {
                path:'/dash-board',
                element: <Dash_Board></Dash_Board>
            },
        ]
    },
    {
        path: '/login',
        element:<Login></Login>
    }
]);

export default router;