
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFillPersonFill, BsFillFileImageFill } from 'react-icons/bs';
import { useContext, useState } from "react";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import { updateProfile } from 'firebase/auth'
import animation from '../../assets/SignUpAnimation.json'
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import auth from "../../Firebase/Firebase.config";



const Register = () => {

    let [showPassword, setShowPassword] = useState(false);
    let { user,setUser,createUser, googleSignIn } = useContext(AuthContext);

    let navigate = useNavigate()
    let handleCreateUser = (e) => {
        e.preventDefault();
        let myname = e.target.name.value;
        let myphoto = e.target.image.value;
        let email = e.target.email.value;
        let password = e.target.password.value;

        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be more than 6 character',
            })
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must at-least one Capital letter',
            })
            return;
        }
        // eslint-disable-next-line no-useless-escape
        else if (!/.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-].*/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must at-least one Special Charecter',
            })
            return;
        }


        createUser(email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: myname, photoURL: myphoto
                })
                    .then(() => {
                        setUser({...user, photoURL: myphoto,displayName:myname});
                        Swal.fire({
                            title: 'Success!',
                            text: 'User Created Successfully',
                            icon: 'Success',
                            confirmButtonText: 'Cool'
                        })
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
                <form onSubmit={handleCreateUser}>
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">User Name</p>
                        <BsFillPersonFill className="absolute bottom-4 left-2"></BsFillPersonFill>
                        <input className="w-full p-2 pl-7 text-black rounded-lg my-1"
                            type="text"
                            name="name"
                            placeholder="Type your name" required
                        />
                    </div>
                    <hr className="my-2" />
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">Image Url</p>
                        <BsFillFileImageFill className="absolute bottom-4 left-2"></BsFillFileImageFill>
                        <input className="w-full p-2 pl-7 text-black rounded-lg my-1"
                            type="text"
                            name="image"
                            placeholder="Paste Image Url" required
                        />
                    </div>
                    <hr className="my-2" />
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">User Email</p>
                        <AiOutlineMail className="absolute bottom-4 left-2"></AiOutlineMail>
                        <input className="w-full p-2 pl-7 text-black rounded-lg my-1"
                            type="email"
                            name="email"
                            placeholder="Type your email"
                            required />
                    </div>
                    <hr className="my-2" />
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">Password</p>
                        <RiLockPasswordFill className="absolute bottom-4 left-2"></RiLockPasswordFill>
                        <input className="w-full p-2 pl-6 text-black rounded-lg my-1"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Type your password" required
                        />
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