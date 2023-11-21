import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckOutForm = () => {

    let [payError, setPayError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    let [clientSecret, setClientSecet] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    let { user } = useAuth();
    let goto = useNavigate();

    let axiosSecure = useAxiosSecure();
    let [cart, refetch] = useCart();
    let totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data?.clientSecret);
                    setClientSecet(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

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

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('Confirm error :', confirmError);
        } else {
            console.log('Payment intent :', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                axiosSecure.post('/payment', payment)
                    .then(res => {
                        console.log(res.data);
                        refetch();
                        if (res.data?.paymentResult?.insertedId) {
                            Swal.fire({
                                position: "top-middle",
                                icon: "success",
                                title: "Thank you for the taka paisa",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            goto('/dashboard/payment-history')
                        }
                    })


            }

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
                <button className="btn btn-outline" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-500">{payError}</p>
                {
                    transactionId && <p>Tranxaction Id: {transactionId}</p>
                }
            </form>
        </div>
    )
}
export default CheckOutForm;