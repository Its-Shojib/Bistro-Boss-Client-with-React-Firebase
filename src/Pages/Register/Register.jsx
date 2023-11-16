
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFillPersonFill, BsFillFileImageFill } from 'react-icons/bs';
import { useContext, useState } from "react";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import animation from '../../assets/SignUpAnimation.json'
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthProvider";

import { useForm } from "react-hook-form"
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {

    let [showPassword, setShowPassword] = useState(false);
    let { createUser, googleSignIn, updateUserProfile } = useContext(AuthContext);
    let axiosPublic = useAxiosPublic();

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = (data) => {
        createUser(data?.email, data?.password)
            .then(() => {
                updateUserProfile(data?.name, data?.img)
                    .then(() => {
                        let user = {
                            name: data?.name,
                            email: data?.email
                        }
                        axiosPublic.post('/users', user)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "top",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                })
            })

    };

    let navigate = useNavigate()
    let handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: 'Success!',
                    text: 'User Created Successfully',
                    icon: 'Success',
                    confirmButtonText: 'Cool'
                })
                navigate('/')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                })
            })

    }
    return (
        <div className="flex flex-col md:flex-row gap-5 px-2 justify-center items-center mt-5">
            <Helmet>
                <title>Meal Miracle | Register</title>
            </Helmet>
            <div className="bg-gray-400 w-full md:w-5/12 text-center p-10 rounded-lg">
                <h2 className="text-3xl font-bold mb-2">Register Now!</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">User Name</p>
                        <BsFillPersonFill className="absolute bottom-4 left-2"></BsFillPersonFill>
                        <input className="w-full p-2 pl-7 text-black rounded-lg my-1"
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Type your name"
                        />
                        {errors?.name && <span className='text-red-600'>Name is required</span>}
                    </div>
                    <hr className="my-2" />
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">Image Url</p>
                        <BsFillFileImageFill className="absolute bottom-4 left-2"></BsFillFileImageFill>
                        <input className="w-full p-2 pl-7 text-black rounded-lg my-1"
                            type="text"
                            {...register("img", { required: true })}
                            placeholder="Paste Image Url"
                        />
                        {errors?.img && <span className='text-red-600'>Image is required</span>}
                    </div>
                    <hr className="my-2" />
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">User Email</p>
                        <AiOutlineMail className="absolute bottom-4 left-2"></AiOutlineMail>
                        <input className="w-full p-2 pl-7 text-black rounded-lg my-1"
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Type your email"
                        />
                        {errors?.email && <span className='text-red-600'>Email is required</span>}
                    </div>
                    <hr className="my-2" />
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">Password</p>
                        <RiLockPasswordFill className="absolute bottom-4 left-2"></RiLockPasswordFill>
                        <input className="w-full p-2 pl-6 text-black rounded-lg my-1"
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
                            })}
                            placeholder="Type your password"
                        />
                        {errors.password?.type === "required" && (
                            <span className='text-red-600'>Password is required</span>
                        )}
                        {errors?.password?.type === 'minLength' && <span className='text-red-600'>Password must be 6 character long</span>}
                        {errors.password?.type === "pattern" && (
                            <span className='text-red-600'>Password must have one uppercase, lowercase,special symbol and a digit</span>
                        )}
                        {errors?.password?.type === 'maxLength' && <span className='text-red-600'>Password must be less than 20 character</span>}
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-4">{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                    </div>
                    <hr className="my-2" />
                    <button
                        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full py-2 text-white font-semibold text-lg rounded-xl" type="submit">
                        Register</button>

                </form>

                <p className="mt-3">Or Sign up using</p>
                <div className="flex gap-3 justify-center my-3">
                    <img onClick={handleGoogleLogin} className="w-8 cursor-pointer" src="/google.jpg" alt="" />
                </div>
                <div className="flex gap-3 justify-center mt-3">
                    <p>Already have an account?</p>
                    <Link className="underline text-lg text-blue-600" to='/login'>Login now</Link>
                </div>
            </div>
            <div className="">
                <Lottie className="h-[630px] w-full md:w-10/12 " animationData={animation} ></Lottie>
            </div>
        </div>
    );
};

export default Register;