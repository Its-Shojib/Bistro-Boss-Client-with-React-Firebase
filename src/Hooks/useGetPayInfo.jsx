import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useGetPayInfo = () => {
    let axiosSecure = useAxiosSecure();
    let { user } = useAuth();
    const { data: payInfo = [], refetch } = useQuery({
        queryKey: ['payinfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payinfo/${user?.email}`);
            return res.data;
        }
    })
    return [payInfo, refetch];
}
export default useGetPayInfo;