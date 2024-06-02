import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Section_Title from './../../Shared Components/Section_Title';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    let [maxreturn, setMaxReturn] = useState(0);
    let [paymentInfo, setPaymentInfo] = useState([]);

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    });

    let handleReturn = (payment) => {
        setPaymentInfo(payment);
        setMaxReturn(payment.quantity);
        return document.getElementById('my_modal').showModal();
    }
    let handleReturnSubmit = async (data) => {
        if (data.amount < 0 || data.amount > maxreturn) {
            return toast.warn('Enter Valid Amount!');
        }
        let returnRequest = {
            requestedAmount: parseInt(data.amount),
            payment: paymentInfo,
        }
        let res = await axiosSecure.post('/returned-request', returnRequest);
        if (res.data.result) {
            return toast.success('Request Send Successfully!');
        } else {
            return toast.error('Something Went Wrong!');
        }


    }

    return (
        <div>
            <Section_Title title={'Here are payment'} subTitle={'Payment History'}></Section_Title>
            <h2 className="text-3xl text-center">Total Payments: {payments.length}</h2>
            <div className="w-11/12 mx-auto my-5">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="text-center">
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Price</th>
                                {/* <th>Transaction Id</th> */}
                                <th>Offer Type</th>
                                <th>Threshold</th>
                                <th>Quantity</th>
                                <th>Bonus</th>
                                <th>Returned</th>
                                <th>Returned Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center ">
                            {payments.map((payment, index) => <tr className="space-y-2" key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment?.date.split('T')[0]}</td>
                                <td>${payment?.price.toFixed(2)}</td>

                                {/* <td>{payment?.transactionId}</td> */}
                                <td>{payment?.offerType}</td>
                                <td>{payment?.buyAmount}{payment.offerType == 'percentage' ? '%' : ''}</td>
                                <td>{payment?.quantity}</td>
                                <td>{payment?.freeItems}</td>
                                <td>{payment?.itemReturned || 0}</td>
                                <td>{payment?.priceBack || 0}</td>
                                <td>
                                    <button onClick={() => handleReturn(payment)}
                                        disabled={payment.returned ? true : false}
                                        className="btn btn-outline"
                                    >{payment.returned ? 'Returned' : 'Return'}</button>
                                </td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
                {/* Modal */}
                <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit(handleReturnSubmit)} >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title">Wanna Return?</h3>
                                </div>
                                <div className="flex flex-col">
                                    <input className="w-full p-2 text-black rounded-lg my-1"
                                        type="number"
                                        placeholder="Enter Number of Amount"
                                        {...register("amount", { required: true })}
                                    />
                                </div>
                            </div>
                            <button type="submit"
                                className=" bg-sky-950 text-white px-3 py-2 rounded-md">Confirm</button>
                        </form>
                    </div>
                </dialog>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Zoom />
        </div>
    );
}
export default PaymentHistory;