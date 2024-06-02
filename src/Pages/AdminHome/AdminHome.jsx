import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Section_Title from "../../Shared Components/Section_Title";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMenu from "../../Hooks/useMenu";
import { PieChart, Pie, Cell, Legend } from 'recharts';

const AdminHome = () => {
    let { user } = useAuth();
    let axiosSecure = useAxiosSecure();
    let [menu] = useMenu();
    let totalProduct = menu.reduce((total, item) => total + item.totalProduct, 0);

    let { data: stats = {}, isPending: isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            let res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });
    let { data: inventory = {}, isPending } = useQuery({
        queryKey: ['inventory-stats'],
        queryFn: async () => {
            let res = await axiosSecure.get('/product-status');
            return res.data;
        }
    });

    let payment = inventory?.payment;
    let returned = inventory?.returned;
    let returnedPrice = returned?.reduce((acc, item) => acc + item.priceBack, 0);
    let totalSell = payment?.reduce((total, item) => total + item.quantity + item.freeItems, 0)
    let totalReturned = returned?.reduce((total, item) => total + item.itemReturned, 0)

    let dessert = menu?.filter(item => item.category === 'dessert');
    let drinks = menu?.filter(item => item.category === 'drinks');
    let salad = menu?.filter(item => item.category === 'salad');
    let pizza = menu?.filter(item => item.category === 'pizza');
    let soup = menu?.filter(item => item.category === 'soup');


    const data = [
        { name: 'Desert', value: dessert?.length },
        { name: 'Drinks', value: drinks?.length },
        { name: 'Salad', value: salad?.length },
        { name: 'Pizza', value: pizza?.length },
        { name: 'Soup', value: soup?.length },
    ];
    const COLORS = ['#2f1e37', '#7b6645', '#5a2636', '#253951', '#1e3931'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-full mx-auto">
            <Section_Title title={`${user.displayName}`} subTitle={'Welcome Back'}></Section_Title>
            {
                isLoading || isPending ? <div className="h-screen justify-center items-center flex">
                    <span className="loading loading-spinner loading-lg"></span>
                </div> : <div>
                    <div className="stats shadow grid grid-cols-1 md:grid-cols-5">
                        <div className="stat place-items-center">
                            <div className="stat-title">Revenue</div>
                            <div className="stat-value text-green-950">${(stats?.revenue - returnedPrice).toFixed(2)}</div>
                            <div className="stat-desc">From December 1st to June 3rd</div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Users</div>
                            <div className="stat-value text-secondary">{stats?.users}</div>
                            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Menu Items</div>
                            <div className="stat-value text-blue-900">{stats?.menuItems}</div>
                            <div className="stat-desc">↘︎ 90 (14%)</div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Total Product</div>
                            <div className="stat-value">5400</div>
                            <div className="stat-desc">June 3rd</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Current Product</div>
                            <div className="stat-value">{totalProduct}</div>
                            <div className="stat-desc">↘︎ 90 (14%)</div>
                        </div>

                    </div>
                    <div className="stats shadow flex flex-row">
                        <div className="stat place-items-center">
                            <div className="stat-title">Orders</div>
                            <div className="stat-value text-secondary">{stats?.orders}</div>
                            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Total Sell</div>
                            <div className="stat-value">{totalSell}</div>
                            <div className="stat-desc">June 1st to June 3rd</div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Total Returned</div>
                            <div className="stat-value text-secondary">{totalReturned}</div>
                            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                        </div>
                        
                        <div className="stat place-items-center">
                            <div className="stat-title">Order Returned</div>
                            <div className="stat-value text-red-900">{returned?.length}</div>
                            <div className="stat-desc">↘︎ 90 (14%)</div>
                        </div>

                    </div>
                    <div className="w-6/12 mx-auto mb-5">
                        <PieChart width={500} height={300}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend></Legend>
                        </PieChart>
                    </div>
                </div>
            }

        </div>
    )
}
export default AdminHome;