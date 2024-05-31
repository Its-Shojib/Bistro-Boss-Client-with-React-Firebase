import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Section_Title from "../../Shared Components/Section_Title";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ItemCart = () => {
    let { user } = useAuth();
    let axiosSecure = useAxiosSecure();
    let goto = useNavigate();
    let item = useLoaderData();
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(item.offer != 0 ? item.price * (1 - item.offer / 100) : item.price);

    const [freeItems, setFreeItems] = useState(0);

    const updateQuantity = (newQuantity) => {
        if (newQuantity < 1) return;
        setQuantity(newQuantity);
    };

    useEffect(() => {
        const newPrice = item.offer != 0 ? item.offer : item.price;
        setTotalPrice(newPrice * quantity);

        if (item.buyAmount && item.getFreeAmount) {
            const free = Math.floor(quantity / item.buyAmount) * item.getFreeAmount;
            setFreeItems(free);
        } else {
            setFreeItems(0);
        }
    }, [quantity, item]);

    const handlePayNow = async() => {
        if(quantity+freeItems> item.totalProduct){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can not buy more than available product',
            })
        }
        
        let payinfo = {
            email: user.email,
            id: item._id,
            totalPrice,
            quantity,
            offerType: item.offerType,
            buyAmount: item.buyAmount,
            getFreeAmount:item.getFreeAmount,
            freeItems,
        }
        let res = await axiosSecure.post('/add/payinfo', payinfo);
        if(res.data.result){
            goto('/dashboard/payment');
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    };

    return (
        <div className="w-10/12 mx-auto ">
            <Section_Title title='WANNA ADD MORE?' subTitle={'Add Item Dynamically'}></Section_Title>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                <div className="flex-1">
                    <img src={item.image} alt={item.name} className=" object-cover rounded mb-4" />
                </div>
                <div className="p-1 border rounded text-xl flex-1 space-y-3">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <h2 className="text-lg">{item.recipe}</h2>
                    <p className="text-gray-800 mb-4">Price: ${item.offer ? item.offer : item.price}</p>
                    {item.offer != 0 && <p className="text-green-600 mb-4">Offer: {item.buyAmount}% off</p>}
                    <div className="flex justify-start mb-4">
                        <button
                            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => updateQuantity(quantity - 1)}
                        >
                            -
                        </button>
                        <span className="mx-4">{quantity}</span>
                        <button
                            className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={() => updateQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <p className="text-gray-800 mb-2 font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
                    {freeItems > 0 && <p className="text-blue-600 my-2">You get {freeItems} free items!</p>}
                    <button
                        className="px-4 py-2 bg-fuchsia-950 text-white rounded hover:bg-green-900"
                        onClick={handlePayNow}
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCart;
