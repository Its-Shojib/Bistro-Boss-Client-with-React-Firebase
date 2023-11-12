import { Link } from "react-router-dom";
import { BsTwitter, BsLinkedin, BsFacebook } from 'react-icons/bs';
const Footer = () => {
    return (
        <div className="bg-[#314b5c] text-white mt-10">
            <footer className="footer p-10">
                <Link>
                    <img className="w-20" src="/log.png" alt="" />
                    <p className="text-lg">Meal Miracle Limited.<br />Serving good food since 2000</p>
                </Link>
                <nav>
                    <header className="footer-title">Services</header>
                    <Link className="link link-hover">Branding</Link>
                    <Link className="link link-hover">Design</Link>
                    <Link className="link link-hover">Marketing</Link>
                    <Link className="link link-hover">Advertisement</Link>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <Link className="link link-hover">About us</Link>
                    <Link className="link link-hover">Contact</Link>
                    <Link className="link link-hover">Jobs</Link>
                    <Link className="link link-hover">Press kit</Link>
                </nav>
                <nav>
                    <header className="footer-title pl-5">Join Us</header>
                    <div className="flex gap-5">
                        <Link to='https://www.facebook.com/mdshojib.hossain.7927' className="link link-hover"><BsFacebook className="text-3xl mt-2"></BsFacebook></Link>
                        <Link to='https://www.linkedin.com/in/md-shojib-hossain/' className="link link-hover"><BsLinkedin className="text-3xl mt-2"></BsLinkedin></Link>
                        <Link to='https://twitter.com/Its_Shojib' className="link link-hover"><BsTwitter className="text-3xl mt-2"></BsTwitter></Link>
                    </div>
                </nav>

            </footer>
            <p className="text-center text-lg pb-3">All right reserved by &copy; Md Shojib Hossain || 2023</p>
        </div>
    )
}
export default Footer;