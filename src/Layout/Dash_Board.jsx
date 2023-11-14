
import { FaBook, FaCalendar, FaCartArrowDown, FaHome, FaPaypal, FaRecordVinyl } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const Dash_Board = () => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto flex">
                <div className="w-64 min-h-screen bg-[#D1A054]">
                    <div className='text-center my-10'>
                        <h1 className='text-3xl font-bold'>Bistro Boss</h1>
                        <p className='text-xl'>Restaurants</p>
                    </div>
                    <ul className='flex flex-col mt-20 px-6 space-y-3'>
                        <li><NavLink to='/' className='flex items-center gap-2 text-xl'><FaHome></FaHome> User Home</NavLink></li>

                        <li><NavLink className='flex items-center gap-2 text-xl'><FaCalendar></FaCalendar> Reservation</NavLink></li>

                        <li><NavLink className='flex items-center gap-2 text-xl'><FaPaypal></FaPaypal>Payment History</NavLink></li>

                        <li><NavLink to='/dashboard/myCart' className='flex items-center gap-2 text-xl'><FaCartArrowDown></FaCartArrowDown>My Cart</NavLink></li>

                        <li><NavLink className='flex items-center gap-2 text-xl'><FaRecordVinyl></FaRecordVinyl>Add Review</NavLink></li>

                        <li><NavLink className='flex items-center gap-2 text-xl'><FaBook></FaBook>My Bookings</NavLink></li>
                    </ul>
                        <hr className='divider divider-horizontal w-full my-5' />
                </div>
                <div className="flex-1 bg-gray-200">
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    )
}
export default Dash_Board;