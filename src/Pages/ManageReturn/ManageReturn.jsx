import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Section_Title from "../../Shared Components/Section_Title";
import Swal from "sweetalert2";


const ManageReturn = () => {
    let axiosSecure = useAxiosSecure();
    const { data: requests = [], isPending, refetch } = useQuery({
        queryKey: ['return-request'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-return-request`);
            return res.data;
        }
    });


    let handleReturnConfirm = (data) => {
        Swal.fire({
            title: "Are you sure to Confirm?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm It!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await axiosSecure.put('/returned-confirm', data)
                if (res.data.result) {
                    Swal.fire({
                        title: "Returned!",
                        text: "Product has been returned.",
                        icon: "success"
                    });
                    refetch();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            }
        });
    }



    return (
        <div className="w-full mx-auto">
            <Section_Title title={'Manage Requsts'} subTitle={'Product Return'}></Section_Title>
            {
                isPending ? <div className="h-screen flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div> : <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead className="text-center">
                                <tr>
                                    <th>Index</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>OfferType</th>
                                    <th>Threshold</th>
                                    <th>Free Item</th>
                                    <th>Quantity</th>
                                    <th>Bonus</th>
                                    <th>Return Requst</th>
                                    <th>Price Back</th>
                                    <th>Returned</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center ">
                                {requests.map((request, index) => <tr className="space-y-2" key={request._id}>
                                    <th>{index + 1}</th>
                                    <td>{request?.payment?.email}</td>
                                    <td>{request?.payment?.date.split('T')[0]}</td>
                                    <td>${request?.payment?.price.toFixed(2)}</td>
                                    <td>{request?.payment?.offerType}</td>
                                    <td>{request?.payment?.buyAmount}{request.payment.offerType == 'percentage' ? '%' : ''}</td>
                                    <td>{request?.payment?.getFreeAmount}</td>
                                    <td>{request?.payment?.quantity}</td>
                                    <td>{request?.payment?.freeItems}</td>
                                    <td>{request?.requestedAmount}</td>
                                    <td>${request?.priceBack}</td>
                                    <td>{request?.itemReturned}</td>
                                    <td>
                                        <button onClick={() => handleReturnConfirm(request)}
                                        disabled={request.returned ? true : false}
                                            className="btn btn-outline"
                                        >{request.returned ? 'Returned' : 'Confirm'}</button>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    );
};

export default ManageReturn;