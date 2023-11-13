import { Helmet } from "react-helmet-async";
import Section_Cover from "../../Shared Components/Section_Cover";
import useMenu from "../../Hooks/useMenu";
import Section_Title from './../../Shared Components/Section_Title';
import MenuItem from "../../Shared Components/MenuItem";
import { Link } from "react-router-dom";
import img1 from '../../assets/menu/banner3.jpg'
import img2 from '../../assets/menu/dessert-bg.jpeg'
import img3 from '../../assets/menu/pizza-bg.jpg'
import img4 from '../../assets/menu/salad-bg.jpg'
import img5 from '../../assets/menu/soup-bg.jpg'

const Our_Menu = () => {
    let [menu] = useMenu();

    let dessert = menu.filter(item => item.category === 'dessert');
    let offered = menu.filter(item => item.category === 'offered');
    let salad = menu.filter(item => item.category === 'salad');
    let pizza = menu.filter(item => item.category === 'pizza');
    let soup = menu.filter(item => item.category === 'soup');
    return (
        <div>
            <Helmet>
                <title>
                    Bistro Boss | Menu
                </title>
            </Helmet>
            <section className="mb-10">
                <Section_Cover img={img1} title='OUR MENU' desc='Would you like to try a dish?' />
                <Section_Title title={`TODAY'S OFFER`} subTitle={`Don't miss`} />
                <div className="grid grid-cols-1 md:grid-cols-2 w-10/12 mx-auto gap-10">
                    {
                        offered.map(item => <MenuItem
                            key={item._id}
                            item={item}>
                        </MenuItem>)
                    }
                </div>
                <Link to='/our-shop/salad'><button className="btn btn-outline border-0 border-b-4 block mx-auto mt-10">Order your favorite food</button></Link>
                
            </section>
            {/* Dessert */}
            <section className="mb-10">
                <Section_Cover img={img2} title='DESSERTS' desc='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' />
                <div className="grid grid-cols-1 md:grid-cols-2 w-10/12 mx-auto gap-10">
                    {
                        dessert.map(item => <MenuItem
                            key={item._id}
                            item={item}>
                        </MenuItem>)
                    }
                </div>
                <Link to='/our-shop/dessert'><button className="btn btn-outline border-0 border-b-4 block mx-auto mt-10">Order your favorite food</button></Link>
            </section>
            {/* PIZZA */}
            <section className="mb-10">
                <Section_Cover img={img3} title='PIZZAS' desc='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' />
                <div className="grid grid-cols-1 md:grid-cols-2 w-10/12 mx-auto gap-10">
                    {
                        pizza.map(item => <MenuItem
                            key={item._id}
                            item={item}>
                        </MenuItem>)
                    }
                </div>
                <Link to='/our-shop/pizza'><button className="btn btn-outline border-0 border-b-4 block mx-auto mt-10">Order your favorite food</button></Link>
            </section>
            {/* Salad */}
            <section className="mb-10">
                <Section_Cover img={img4} title='Salads' desc='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' />
                <div className="grid grid-cols-1 md:grid-cols-2 w-10/12 mx-auto gap-10">
                    {
                        salad.map(item => <MenuItem
                            key={item._id}
                            item={item}>
                        </MenuItem>)
                    }
                </div>
                <Link to='/our-shop/salad'><button className="btn btn-outline border-0 border-b-4 block mx-auto mt-10">Order your favorite food</button></Link>
            </section>
            {/* Soups */}
            <section className="mb-10">
                <Section_Cover img={img5} title='Soups' desc='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' />
                <div className="grid grid-cols-1 md:grid-cols-2 w-10/12 mx-auto gap-10">
                    {
                        soup.map(item => <MenuItem
                            key={item._id}
                            item={item}>
                        </MenuItem>)
                    }
                </div>
                <Link to='/our-shop/soup'><button className="btn btn-outline border-0 border-b-4 block mx-auto mt-10">Order your favorite food</button></Link>
            </section>
        </div>
    )
}
export default Our_Menu;