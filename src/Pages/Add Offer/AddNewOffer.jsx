import { useForm, Controller } from 'react-hook-form';
import Section_Title from '../../Shared Components/Section_Title';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useMenu from '../../Hooks/useMenu';


const AddNewOffer = () => {
    const { handleSubmit, control, watch, formState: { errors }, reset } = useForm();
    const watchOfferType = watch('offerType', 'percentage');
    const watchGlobalOffer = watch('globalOffer', 'all');
    const watchFoodType = watch('foodType', '');
    const axiosSecure = useAxiosSecure();

    const [menu] = useMenu();
    const filteredItems = menu.filter(item => item.category === watchFoodType);

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.put('/add-offer', data);
            if (res.data.result) {
                Swal.fire({
                    title: "Added!",
                    text: "Your offer has been added.",
                    icon: "success"
                });
                reset();
            } else {
                Swal.fire({
                    title: "Failed!",
                    text: "Your offer has not been added.",
                    icon: "error"
                });
                reset();
            }
        } catch (error) {
            console.error('Failed to add offer:', error);
            Swal.fire({
                title: "Error!",
                text: "There was an error adding your offer.",
                icon: "error"
            });
        }
    };

    return (
        <div>
            <Section_Title title="Add an Offer" subTitle="What's new?" />
            <div className="w-10/12 mx-auto my-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Global Offer*</span>
                        </label>
                        <Controller
                            name="globalOffer"
                            control={control}
                            defaultValue="all"
                            render={({ field }) => (
                                <select {...field} className="select select-bordered w-full">
                                    <option value="all">All Food</option>
                                    <option value="specific">Specific Food Type</option>
                                    <option value="single">Single Food Item</option>
                                </select>
                            )}
                        />
                    </div>

                    {watchGlobalOffer === 'specific' && (
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Food Type*</span>
                            </label>
                            <Controller
                                name="foodType"
                                control={control}
                                rules={{ required: 'Food type is required' }}
                                render={({ field }) => (
                                    <select {...field} className="select select-bordered w-full">
                                        <option value="">Select Food Type</option>
                                        <option value="salad">Salad</option>
                                        <option value="pizza">Pizza</option>
                                        <option value="soup">Soup</option>
                                        <option value="dessert">Dessert</option>
                                        <option value="drinks">Drinks</option>
                                    </select>
                                )}
                            />
                            {errors.foodType && <p className="text-red-500">{errors.foodType.message}</p>}
                        </div>
                    )}

                    {watchGlobalOffer === 'single' && (
                        <>
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Food Type*</span>
                                </label>
                                <Controller
                                    name="foodType"
                                    control={control}
                                    rules={{ required: 'Food type is required' }}
                                    render={({ field }) => (
                                        <select {...field} className="select select-bordered w-full">
                                            <option value="">Select Food Type</option>
                                            <option value="salad">Salad</option>
                                            <option value="pizza">Pizza</option>
                                            <option value="soup">Soup</option>
                                            <option value="dessert">Dessert</option>
                                            <option value="drinks">Drinks</option>
                                        </select>
                                    )}
                                />
                                {errors.foodType && <p className="text-red-500">{errors.foodType.message}</p>}
                            </div>

                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Specific Item*</span>
                                </label>
                                <Controller
                                    name="specificItem"
                                    control={control}
                                    rules={{ required: 'Specific item is required' }}
                                    render={({ field }) => (
                                        <select {...field} className="select select-bordered w-full">
                                            <option value="">Select Item</option>
                                            {filteredItems.map(item => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.specificItem && <p className="text-red-500">{errors.specificItem.message}</p>}
                            </div>
                        </>
                    )}

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Offer Type*</span>
                        </label>
                        <Controller
                            name="offerType"
                            control={control}
                            defaultValue="percentage"
                            render={({ field }) => (
                                <select {...field} className="select select-bordered w-full">
                                    <option value="percentage">Percentage</option>
                                    <option value="buyOffer">Buy Offer</option>
                                </select>
                            )}
                        />
                    </div>

                    {watchOfferType !== 'buyOffer' && (
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Offer Value*</span>
                            </label>
                            <Controller
                                name="buyAmount"
                                control={control}
                                rules={{ required: 'Offer value is required' }}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        placeholder={`Enter ${watchOfferType} offer value`}
                                        {...field}
                                        className="input input-bordered w-full"
                                    />
                                )}
                            />
                            {errors.buyAmount && <p className="text-red-500">{errors.buyAmount.message}</p>}
                        </div>
                    )}

                    {watchOfferType === 'buyOffer' && (
                        <div className='flex justify-center items-center gap-10'>
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Buy Amount*</span>
                                </label>
                                <Controller
                                    name="buyAmount"
                                    control={control}
                                    rules={{ required: 'Buy amount is required' }}
                                    render={({ field }) => (
                                        <input
                                            type="number"
                                            min="1"
                                            placeholder="Enter Buy Amount"
                                            {...field}
                                            className="input input-bordered w-full"
                                        />
                                    )}
                                />
                                {errors.buyAmount && <p className="text-red-500">{errors.buyAmount.message}</p>}
                            </div>
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Get Free Amount*</span>
                                </label>
                                <Controller
                                    name="getFreeAmount"
                                    control={control}
                                    rules={{ required: 'Free amount is required' }}
                                    render={({ field }) => (
                                        <input
                                            type="number"
                                            min="1"
                                            placeholder="Enter Free Amount"
                                            {...field}
                                            className="input input-bordered w-full"
                                        />
                                    )}
                                />
                                {errors.getFreeAmount && <p className="text-red-500">{errors.getFreeAmount.message}</p>}
                            </div>
                        </div>
                    )}

                    <button className="btn bg-[#B58130]">
                        Add Offer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewOffer;