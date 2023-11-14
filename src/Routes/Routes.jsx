import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error-Page/Error";
import Contact_Us from './../Pages/Contact-Us/Contact_Us';
import Our_Menu from "../Pages/Our-Menu/Our_Menu";
import Our_Shop from "../Pages/Our-Shop/Our_Shop";
import Register from "../Pages/Register/Register";
import Login from './../Pages/Login/Login';
import Dash_Board from './../Layout/Dash_Board';
import MyCart from "../Pages/Dash-Board/MyCart";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/contact-us',
                element: <Contact_Us></Contact_Us>
            },
            {
                path: '/our-menu',
                element: <Our_Menu></Our_Menu>
            },
            {
                path: '/our-shop/:category',
                element: <Our_Shop></Our_Shop>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path:'/dashboard',
        element: <Dash_Board></Dash_Board>,
        children:[
            {
                path:'/dashboard/myCart',
                element: <MyCart></MyCart>
            }
        ]
    }
]);

export default router;