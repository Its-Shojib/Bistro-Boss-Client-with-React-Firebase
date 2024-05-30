import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Section_Title from "../../Shared Components/Section_Title";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const AdminHome = () => {
    let { user } = useAuth();
    let axiosSecure = useAxiosSecure();

    let { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            let res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })
    return (
        <div>
            <Section_Title title={`${user.displayName}`} subTitle={'Welcome Back'}></Section_Title>
            <div className="w-11/12 mx-auto grid grid-cols-4 gap-10 text-2xl">
                <div className="bg-[#BB34F5] p-5 text-white rounded-xl">Revenue: ${stats?.revenue}</div>
                <div className="bg-[#D3A256] p-5 text-white rounded-xl">Users: {stats?.users}</div>
                <div className="bg-[#FE4880] p-5 text-white rounded-xl">Products: {stats?.menuItems}</div>
                <div className="bg-[#6AAEFF] p-5 text-white rounded-xl">Orders: {stats?.orders}</div>
            </div>
        </div>
    )
}
export default AdminHome;