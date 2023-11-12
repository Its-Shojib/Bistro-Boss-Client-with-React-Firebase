import { Helmet } from "react-helmet-async";
import Banner from "../../Shared Components/Banner";
import Section_Title from "../../Shared Components/Section_Title";
import Category from "./Category";
import Chef_Service from "./Chef_Service";
import Popular from "../../Shared Components/Popular";
import Section_Title from './../../Shared Components/Section_Title';


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
                
            </section>
        </div>
    )
}
export default Home;