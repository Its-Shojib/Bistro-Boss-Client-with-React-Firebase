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
import PrivateRoutes from './PrivateRoutes';
import All_User from "../Pages/Dash-Board/All_User";
import AddItem from './../Pages/AddItem/AddItem';
import ManageItem from './../Pages/ManageItem/ManageItem';
import ManageBooking from './../Pages/ManageBooking/ManageBooking';
import Menu from './../Pages/Menu/Menu';
import Shop from './../Pages/Shop/Shop';
import Contact from './../Pages/Contact/Contact';
import Payment from "../Pages/Payment/Payment";
import Reservation from "../Pages/Reservation/Reservation";
import AddReview from "../Pages/AddReview/AddReview";
import MyBooking from "../Pages/MyBookings/MyBooking";
import AdminRoute from './AdminRoute';
import UpdateItem from "../Pages/UpdateItem/UpdateItem";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import AdminHome from "../Pages/AdminHome/AdminHome";
import UserHome from "../Pages/UserHome/UserHome";



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
        path: '/dashboard',
        element: <PrivateRoutes><Dash_Board></Dash_Board></PrivateRoutes>,
        children: [
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'user-home',
                element: <PrivateRoutes><UserHome></UserHome></PrivateRoutes>
            },
            {
                path: 'myCart',
                element: <MyCart></MyCart>
            },
            {
                path: 'all-user',
                element: <AdminRoute><All_User></All_User></AdminRoute>
            },
            {
                path: 'add-item',
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            },
            {
                path: 'manage-item',
                element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
            },
            {
                path: 'manage-booking',
                element: <AdminRoute><ManageBooking></ManageBooking></AdminRoute>
            },
            {
                path: 'menu',
                element: <PrivateRoutes><Menu></Menu></PrivateRoutes>
            },
            {
                path: 'shop',
                element: <PrivateRoutes><Shop></Shop></PrivateRoutes>
            },
            {
                path: 'contact',
                element: <PrivateRoutes><Contact></Contact></PrivateRoutes>
            },
            {
                path: 'payment',
                element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
            },
            {
                path: 'payment-history',
                element: <PrivateRoutes><PaymentHistory></PaymentHistory></PrivateRoutes>
            },
            {
                path: 'reservation',
                element: <PrivateRoutes><Reservation></Reservation></PrivateRoutes>
            },
            {
                path: 'add-review',
                element: <PrivateRoutes><AddReview></AddReview></PrivateRoutes>
            },
            {
                path: 'my-booking',
                element: <PrivateRoutes><MyBooking></MyBooking></PrivateRoutes>
            },
            {
                path: '/dashboard/updateItem/:id',
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
        ]
    }
]);

export default router;