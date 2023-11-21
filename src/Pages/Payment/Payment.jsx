import { loadStripe } from '@stripe/stripe-js';
import Section_Title from './../../Shared Components/Section_Title';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';

const StripePromese = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const Payment = () => {
    return (
        <div>
            <Section_Title title={'Payment'} subTitle={'Please Pay'}></Section_Title>
            <div className='w-10/12 mx-auto'>
                <Elements stripe={StripePromese}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    )
}
export default Payment;