import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCart = () => {
    let axiosSecure = useAxiosSecure();
    let {user} = useAuth();
    const {  data: cart = [], refetch } = useQuery({
        queryKey: ['cart',user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    })
    return [cart,refetch]
}
export default useCart;