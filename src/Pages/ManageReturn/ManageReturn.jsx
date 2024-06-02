import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Section_Title from "../../Shared Components/Section_Title";


const ManageReturn = () => {
    let axiosSecure = useAxiosSecure();
    const { data: requests = [], isPending } = useQuery({
        queryKey: ['return-request'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-return-request`);
            return res.data;
        }
    });

    console.log(requests);

    let handleReturnConfirm = (data)=>{
        console.log(data);
    }



    return (
        <div className="w-full md:w-11/12 mx-auto">
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
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>OfferType</th>
                                    <th>Threshold</th>
                                    <th>Free Item</th>
                                    <th>Return Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center ">
                                {requests.map((request, index) => <tr className="space-y-2" key={request._id}>
                                    <th>{index + 1}</th>
                                    <td>{request?.payment?.email}</td>
                                    <td>{request?.payment?.date.split('T')[0]}</td>
                                    <td>{request?.payment?.quantity}</td>
                                    <td>{request?.payment?.price}</td>
                                    <td>{request?.payment?.offerType}</td>
                                    <td>{request?.payment?.buyAmount}{request.payment.offerType == 'percentage'? '%': ''}</td>
                                    <td>{request?.payment?.freeItems}</td>
                                    <td>{request?.requestedAmount}</td>
                                    <td
                                        onClick={() => handleReturnConfirm(request)}
                                        className="btn btn-outline">Confirm</td>
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