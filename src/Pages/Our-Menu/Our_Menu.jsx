import { Helmet } from "react-helmet-async";
import Section_Cover from "../../Shared Components/Section_Cover";
import img1 from '../../assets/menu/banner3.jpg'

const Our_Menu = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Bistro Boss | Menu
                </title>
            </Helmet>
            <section>
                <Section_Cover img={img1} title='OUR MENU' desc='Would you like to try a dish?' />
            </section>
        </div>
    )
}
export default Our_Menu;