import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import 'animate.css';
import useCart from '../Hooks/useCart';

const FoodCard = ({ item }) => {
    let { name, image, price, recipe, _id } = item;

    let { user } = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let axiosSecure = useAxiosSecure();
    let [,refetch] = useCart()

    let handleAddToCart = () => {
        if (user && user?.email) {
            let cartItem = {
                menuId: _id,
                email: user?.email,
                name,
                image,
                price,
                recipe,
            }
            axiosSecure.post('/carts',cartItem)
            .then(res=>{
                if(res.data.insertedId){
                    Swal.fire({
                        title: `${name} Added to your Carts`,
                        showClass: {
                          popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                        },
                        hideClass: {
                          popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                        }
                      });
                    refetch();
                }
            });
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please Login to add to the Cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }
    return (
        <div className="card bg-gray-200">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <p className="absolute right-14 bg-black p-1 rounded top-12 text-white">$ {price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCart()}
                        className="btn btn-outline text-yellow-500 border-0 border-b-2">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
FoodCard.propTypes = {
    item: PropTypes.object,
}
export default FoodCard;