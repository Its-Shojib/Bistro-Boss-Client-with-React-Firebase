
import { FaBook, FaCalendar, FaCartArrowDown, FaHome, FaPaypal, FaRecordVinyl } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';

const Dash_Board = () => {
    let [isAdmin] = useAdmin();
    return (
        <div>
            <div className="max-w-screen-xl mx-auto flex">
                <div className="w-64 min-h-screen bg-[#D1A054]">
                    <div className='text-center my-10'>
                        <h1 className='text-3xl font-bold'>Bistro Boss</h1>
                        <p className='text-xl'>Restaurants</p>
                    </div>
                    {
                        isAdmin ? <>
                            <ul className='flex flex-col mt-10 px-6 space-y-3'>
                                <li><NavLink to='/' className='flex items-center gap-2 text-xl'><FaHome></FaHome> Admin Home</NavLink></li>

                                <li><NavLink className='flex items-center gap-2 text-xl'><FaCalendar></FaCalendar> Add Item</NavLink></li>

                                <li><NavLink className='flex items-center gap-2 text-xl'><FaPaypal></FaPaypal>Manage Item</NavLink></li>

                                <li><NavLink to='/dashboard' className='flex items-center gap-2 text-xl'><FaCartArrowDown></FaCartArrowDown>Manage Booking</NavLink></li>

                                <li><NavLink to='/dashboard/all-user' className='flex items-center gap-2 text-xl'><FaRecordVinyl></FaRecordVinyl>All User</NavLink></li>
                            </ul>
                        </> : <>
                            <ul className='flex flex-col mt-10 px-6 space-y-3'>
                                <li><NavLink to='/' className='flex items-center gap-2 text-xl'><FaHome></FaHome> User Home</NavLink></li>

                                <li><NavLink className='flex items-center gap-2 text-xl'><FaCalendar></FaCalendar> Reservation</NavLink></li>

                                <li><NavLink className='flex items-center gap-2 text-xl'><FaPaypal></FaPaypal>Payment History</NavLink></li>

                                <li><NavLink to='/dashboard/myCart' className='flex items-center gap-2 text-xl'><FaCartArrowDown></FaCartArrowDown>My Cart</NavLink></li>

                                <li><NavLink className='flex items-center gap-2 text-xl'><FaRecordVinyl></FaRecordVinyl>Add Review</NavLink></li>

                                <li><NavLink className='flex items-center gap-2 text-xl'><FaBook></FaBook>My Bookings</NavLink></li>
                            </ul>
                        </>
                    }

                    <hr className='divider divider-horizontal w-full my-5' />

                    <ul className='flex flex-col px-6 space-y-3'>
                        <li><NavLink to='/' className='flex items-center gap-2 text-xl'><FaHome></FaHome>Home</NavLink></li>

                        <li><NavLink className='flex items-center gap-2 text-xl'><FaCalendar></FaCalendar> Menu</NavLink></li>

                        <li><NavLink className='flex items-center gap-2 text-xl'><FaPaypal></FaPaypal>Shop</NavLink></li>

                        <li><NavLink to='/' className='flex items-center gap-2 text-xl'><FaCartArrowDown></FaCartArrowDown>Contact</NavLink></li>
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