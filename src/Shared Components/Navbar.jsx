import { NavLink } from "react-router-dom";
// import img from '../assets/icon/Icon.png'
// import img2 from '../assets/icon/151-1511569_cart-notifications-free-shopping-cart-favicon-hd-png-removebg-preview.png'

const Navbar = () => {
    let links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/contact-us'>Contact Us</NavLink></li>
        <li><NavLink to='/dash-board'>Dash Board</NavLink></li>
        <li><NavLink to='/our-menu'>Our Menu</NavLink></li>
        <li><NavLink to='/our-shop'>Our Shop</NavLink></li>
        {/* <li><NavLink to='myCart'><img className="w-8 " src={img2} alt="" /></NavLink></li> */}
        <li><NavLink to='/login'>Sign Up</NavLink></li>
        {/* <li><NavLink to='/logout'>Sign Out</NavLink></li> */}

    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-black opacity-30 text-white max-w-screen-xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown md:hidden">
                        <label tabIndex={0} className="btn btn-ghost ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <h1 className="text-3xl uppercase font-bold text-white">Bistro Boss</h1>
                </div>
                <div className="navbar-end hidden md:flex">
                    <ul className="menu menu-horizontal px-1 text-white">
                        {links}
                    </ul>
                </div>
                {/* <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={img} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
                </div> */}
                
            </div>
        </div>
    )
}
export default Navbar;