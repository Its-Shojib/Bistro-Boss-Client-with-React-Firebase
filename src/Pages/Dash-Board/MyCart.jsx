
import Section_Title from './../../Shared Components/Section_Title';
import useCart from './../../Hooks/useCart';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';

const MyCart = () => {
    let [cart, refetch] = useCart();
    // let [discount, setDiscount] = useState(0)
    let axiosSecure = useAxiosSecure()
    // let [weekDay, setWeekDay] = useState('');
    let totalPrice = cart.reduce((total, item) => total + (item.offer != 0 ? item.offer : item.price), 0);
    let goto = useNavigate();



    // const currentPrice = useMemo(() => {
    //     const date = new Date();
    //     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     const currentDayOfWeek = daysOfWeek[date.getDay()];
    //     setWeekDay(currentDayOfWeek);

    //     if (currentDayOfWeek === 'Saturday' || currentDayOfWeek === 'Friday') {
    //         return totalPrice - (10 / 100) * totalPrice;
    //     } else {
    //         return totalPrice - (5 / 100) * totalPrice;
    //     }
    // }, [totalPrice]);

    // useEffect(() => {
    //     const date = new Date();
    //     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     const currentDayOfWeek = daysOfWeek[date.getDay()];

    //     if (currentDayOfWeek === 'Saturday' || currentDayOfWeek === 'Friday') {
    //         setDiscount(10);
    //     } else {
    //         setDiscount(5);
    //     }
    // }, []);

    let handleDeleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
    return (
        <div>
            <section>
                <Section_Title title='WANNA ADD MORE?' subTitle={'My Cart'}></Section_Title>
            </section>

            <section>
                <div className='w-11/12 mx-auto bg-base-100 p-10'>
                    {/* <div className='flex justify-center items-center gap-20 pb-10 font-semibold'> */}
                        {/* <div className='bg-emerald-950 text-white text-2xl rounded-md p-5'>
                            Day: {weekDay}
                        </div> */}
                        {/* <div className='bg-blue-950 text-white text-2xl rounded-md p-5'>
                            Discount: {discount}%
                        </div> */}
                    {/* </div> */}
                    <div className='flex justify-between items-center gap-5'>
                        <h1 className='text-2xl font-bold'>Total Order: {cart.length}</h1>
                        <h2 className='text-2xl font-bold'>Total Price: ${totalPrice}</h2>
                        {/* <h2 className='text-2xl font-bold'>Discounted Price: ${currentPrice.toFixed(2)}</h2> */}
                        {
                            cart.length > 0 ? <Link to='/dashboard/payment'>
                                <button className='btn bg-[#D1A054] text-white '>Pay Now</button>
                            </Link> : <button disabled className='btn bg-[#D1A054] text-white'>Pay Now</button>
                        }
                    </div>
                    <div className="overflow-x-auto my-10">
                        <table className="table table-zebra">
                            <thead className='bg-[#D1A054] text-white text-lg'>
                                <tr>
                                    <th>Index</th>
                                    <th>Item Image</th>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Delete</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart?.map((item, index) => <tr key={item._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-16 h-16">
                                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>$ {item.offer? item.offer: item.price}</td>
                                        <th><button onClick={() => handleDeleteItem(item._id)} className="btn btn-circle btn-outline h-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button></th>
                                        <td>
                                            <button 
                                            onClick={()=>goto(`cart/item/${item.menuId}`)}
                                            className='btn btn-outline'>
                                                Pay Now</button>
                                        </td>
                                    </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default MyCart;