import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Section_Title from "../../Shared Components/Section_Title";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMenu from "../../Hooks/useMenu";


const AdminHome = () => {
    let { user } = useAuth();
    let axiosSecure = useAxiosSecure();

    let { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            let res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });
    let [menu] = useMenu();

    let dessert = menu.filter(item => item.category === 'dessert');
    let drinks = menu.filter(item => item.category === 'drinks');
    let salad = menu.filter(item => item.category === 'salad');
    let pizza = menu.filter(item => item.category === 'pizza');
    let soup = menu.filter(item => item.category === 'soup');


    return (
        <div>
            <Section_Title title={`${user.displayName}`} subTitle={'Welcome Back'}></Section_Title>
            <div className="w-full md:w-11/12 mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-xl">
                <div className="bg-[#BB34F5] p-5 text-white rounded-xl">Revenue: ${stats?.revenue}</div>
                <div className="bg-[#D3A256] p-5 text-white rounded-xl">Users: {stats?.users}</div>
                <div className="bg-[#FE4880] p-5 text-white rounded-xl">Products: {stats?.menuItems}</div>
                <div className="bg-[#6AAEFF] p-5 text-white rounded-xl">Orders: {stats?.orders}</div>
                <div className="bg-[#6AAEFF] p-5 text-white rounded-xl">Salad: {salad.length}</div>
                <div className="bg-[#6AAEFF] p-5 text-white rounded-xl">Pizza: {pizza.length}</div>
                <div className="bg-[#6AAEFF] p-5 text-white rounded-xl">Dessert: {dessert.length}</div>
                <div className="bg-[#6AAEFF] p-5 text-white rounded-xl">Drinks: {drinks.length}</div>
                <div className="bg-[#6AAEFF] p-5 text-white rounded-xl">Soup: {soup.length}</div>
            </div>
        </div>
    )
}
export default AdminHome;