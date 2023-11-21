import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";


const CheckOutForm = () => {

    let [payError, setPayError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    let axiosSecure = useAxiosSecure();
    let [cart] = useCart();
    let totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent',{price: totalPrice})
        .then(res=>{
            console.log(res.data);
        })
    },[axiosSecure,totalPrice])

    let handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        let card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        let { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('error :', error);
            setPayError(error.message)
        } else {
            console.log('PaymentMethod :', paymentMethod);
            setPayError('')
        }

    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '18px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#255255255255',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="mt-2 px-4 py-2 text-white bg-black rounded-md" type="submit" disabled={!stripe}>
                    Pay
                </button>
                <p className="text-red-500">{payError}</p>
            </form>
        </div>
    )
}
export default CheckOutForm;