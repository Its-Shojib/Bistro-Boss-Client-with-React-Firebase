
import { FaBook, FaCalendar, FaCartArrowDown, FaHome, FaPaypal, FaRecordVinyl, FaSave } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useCart from '../Hooks/useCart';


const Dash_Board = () => {
    let [isAdmin] = useAdmin();
    let [cart] = useCart()
    return (
        <div>
            <div className="max-w-screen-2xl mx-auto flex">
                <div className="w-64 min-h-screen bg-[#D1A054]">
                    <div className='text-center my-10'>
                        <h1 className='text-3xl font-bold'>Bistro Boss</h1>
                        <p className='text-xl'>Restaurants</p>
                    </div>
                    {
                        isAdmin ? <>
                            <ul className='menu flex flex-col mt-10 px-6 space-y-3'>
                                <li><NavLink to='/dashboard/admin-home'><FaHome></FaHome> Admin Home</NavLink></li>

                                <li><NavLink to='/dashboard/add-item'><FaCalendar></FaCalendar> Add Item</NavLink></li>

                                <li><NavLink to='/dashboard/manage-item'><FaPaypal></FaPaypal>Manage Item</NavLink></li>

                                <li><NavLink to='/dashboard/add-new-offer'><FaSave></FaSave>Add New Offer</NavLink></li>

                                <li><NavLink to='/dashboard/return-request' ><FaCartArrowDown></FaCartArrowDown>Return Request</NavLink></li>

                                <li><NavLink to='/dashboard/all-user' ><FaRecordVinyl></FaRecordVinyl>All User</NavLink></li>
                            </ul>
                        </> : <>
                            <ul className='menu flex flex-col mt-10 px-6 space-y-3'>
                                <li><NavLink to='/' ><FaHome></FaHome> User Home</NavLink></li>

                                <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar> Reservation</NavLink></li>

                                <li><NavLink to='/dashboard/payment'><FaCalendar></FaCalendar> Payment</NavLink></li>

                                <li><NavLink to='/dashboard/payment-history'><FaPaypal></FaPaypal>Payment History</NavLink></li>

                                <li><NavLink to='/dashboard/myCart' ><FaCartArrowDown></FaCartArrowDown>{`My Cart (${cart.length})`}</NavLink></li>

                                <li><NavLink to='/dashboard/add-review'><FaRecordVinyl></FaRecordVinyl>Add Review</NavLink></li>

                                <li><NavLink to='/dashboard/my-booking'><FaBook></FaBook>My Bookings</NavLink></li>
                            </ul>
                        </>
                    }

                    <hr className='divider divider-horizontal w-full my-5' />

                    <ul className='menu flex flex-col px-6 space-y-3'>
                        <li><NavLink to='/' ><FaHome></FaHome>Home</NavLink></li>

                        <li><NavLink to='/dashboard/menu'><FaCalendar></FaCalendar> Menu</NavLink></li>

                        <li><NavLink to='/dashboard/shop'><FaPaypal></FaPaypal>Shop</NavLink></li>

                        <li><NavLink to='/dashboard/contact' ><FaCartArrowDown></FaCartArrowDown>Contact</NavLink></li>
                    </ul>
                </div>
                <div className="flex-1 bg-gray-200">
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    )
}
export default Dash_Board;