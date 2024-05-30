import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";


const Navbar = () => {
    let { user, Logout } = useContext(AuthContext);
    let [isAdmin] = useAdmin();
    let [cart]=useCart();
    let links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/our-menu'>Our Menu</NavLink></li>
        <li><NavLink to='/our-shop/salad'>Our Shop</NavLink></li>
        {
            user && isAdmin && <li><NavLink to='/dashboard/admin-home'>DashBoard</NavLink></li>
        }
        {
            user && !isAdmin && <li><NavLink to='/dashboard/user-home'>DashBoard</NavLink></li>
        }
        <li>
            <Link to='/dashboard/myCart'><AiOutlineShoppingCart className="text-xl"></AiOutlineShoppingCart>
                <div className="badge badge-secondary">+{cart.length}</div>
            </Link>
        </li>
        <li><NavLink to='/contact-us'>Contact Us</NavLink></li>
    </>
    return (
        <div className="navbar fixed z-10 bg-black bg-opacity-30 text-white max-w-screen-2xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <h1 className="text-3xl uppercase font-bold text-white">Bistro Boss</h1>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end text-white">
                {
                    user && <>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-500 rounded-box w-28">
                                <li>{user.displayName}</li>
                            </ul>
                        </div>
                    </>
                }
                {
                    user ? <button onClick={() => Logout().then().catch(() => { })} className="bg-red-600 px-4 py-2 rounded-md font-semibold">Log Out</button> : <button className=" bg-green-600 px-4 py-2 rounded-md font-semibold"><NavLink to='/login'>Login</NavLink></button>
                }

            </div>
        </div>
    )
}
export default Navbar;

