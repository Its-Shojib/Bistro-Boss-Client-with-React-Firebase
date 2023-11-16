
import { useQuery } from '@tanstack/react-query';
import Section_Title from './../../Shared Components/Section_Title';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const All_User = () => {
    let axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    let handleDeleteUser = (id) => {
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
                axiosSecure.delete(`/users/${id}`)
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
    let HandleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure to make Admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user?._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: `${user?.name} become Admin now!.`,
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
                <Section_Title title={"Manage All User"} subTitle={'How Many?'}></Section_Title>
            </section>
            <section>
                <div className='w-10/12 mx-auto bg-base-100 p-10'>
                    <div>
                        <h1 className='text-2xl font-bold'>Total User: {users.length}</h1>

                    </div>
                    <div className="overflow-x-auto my-10">
                        <table className="table">
                            <thead className='bg-[#D1A054] text-white text-lg'>
                                <tr>
                                    <th>Index</th>
                                    <th>User Name</th>
                                    <th>Item Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map((item, index) => <tr key={item?._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            {item?.name}
                                        </td>
                                        <td>{item?.email}</td>
                                        <td>
                                            {item.role ==='admin'? 'Admin' : <>
                                            <button className='btn bg-[#D1A054] text-white text-xl' onClick={() => HandleMakeAdmin(item)}><FaUsers></FaUsers></button>
                                            </>
                                            }
                                        </td>
                                        <th><button onClick={() => handleDeleteUser(item?._id)} className="btn btn-circle btn-outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button></th>
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
export default All_User;