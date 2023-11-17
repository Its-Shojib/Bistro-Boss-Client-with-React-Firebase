import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Section_Title from "../../Shared Components/Section_Title";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name, category, recipe, price, _id} = useLoaderData();
    let navigate = useNavigate()

    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // 
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount > 0){
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-middle",
                    icon: "success",
                    title: `${data.name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/manage-item')
            }
        }
        console.log( 'with image url', res.data);
    };
    
    
    return (
        <div>
            <Section_Title title="Update an Item" subTitle="Refresh info"></Section_Title>
            <div className="w-10/12 mx-auto bg-white p-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={price}
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea defaultValue={recipe} {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Update menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;