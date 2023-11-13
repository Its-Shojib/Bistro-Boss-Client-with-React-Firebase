import { Helmet } from "react-helmet-async";
import Banner from "../../Shared Components/Banner";
import Section_Title from "../../Shared Components/Section_Title";
import Category from "./Category";
import Chef_Service from "./Chef_Service";
import Popular from "../../Shared Components/Popular";
import Fetuared from "./Fetuared";
import Testimonials from './Testimonials';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Bistro Boss | Home
                </title>
            </Helmet>
            <section>
                <Banner></Banner>
            </section>
            <section >
                <Section_Title title={'ORDER ONLINE'} subTitle={'From 11:00am to 10:00pm'}></Section_Title>
                <Category></Category>
            </section>
            <section>
                <Chef_Service></Chef_Service>
            </section>
            <section>
                <Section_Title title={'FROM OUR MENU'} subTitle={'Check it out'}></Section_Title>
                <Popular></Popular>
            </section>
            <section>
                <div className="bg-black text-white flex justify-center items-center w-10/12 mx-auto h-48 my-10">
                    <h1 className="text-3xl font-medium">Call Us: +8801790407979</h1>
                </div>
            </section>
            <section>
                <Fetuared></Fetuared>
            </section>
            <section>
                <Section_Title title={'TESTIMONIALS'} subTitle={'What Our Clients Say'}></Section_Title>
                <Testimonials></Testimonials>
            </section>
        </div>
    )
}
export default Home;