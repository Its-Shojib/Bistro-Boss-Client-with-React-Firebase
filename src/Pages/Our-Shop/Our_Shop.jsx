import { useState } from 'react';
import Section_Cover from '../../Shared Components/Section_Cover';
import img1 from '../../assets/shop/banner2.jpg'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/useMenu';
import FoodCard from '../../Shared Components/FoodCard';
import { useParams } from 'react-router-dom';

const Our_Shop = () => {
    let categories = ['salad','pizza','soup','dessert','drinks'];
    let { category } = useParams();
    let initialIndex = categories.indexOf(category);
    let[tabIndex, setTabIndex] = useState(initialIndex);
    let [menu] = useMenu();

    let dessert = menu.filter(item => item.category === 'dessert');
    let drinks = menu.filter(item => item.category === 'drinks');
    let salad = menu.filter(item => item.category === 'salad');
    let pizza = menu.filter(item => item.category === 'pizza');
    let soup = menu.filter(item => item.category === 'soup');
    return (
        <div>
            <Section_Cover img={img1} title='OUR SHOP' desc='Would you like to try a dish?' />

            <Tabs className={'text-center w-full md:w-10/12 mx-auto'} defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10'>
                        {
                            salad.map(item => <FoodCard
                                key={item._id}
                                item={item}>

                            </FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10'>
                        {
                            pizza.map(item => <FoodCard
                                key={item._id}
                                item={item}>

                            </FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10'>
                        {
                            soup.map(item => <FoodCard
                                key={item._id}
                                item={item}>

                            </FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10'>
                        {
                            dessert.map(item => <FoodCard
                                key={item._id}
                                item={item}>

                            </FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10'>
                        {
                            drinks.map(item => <FoodCard
                                key={item._id}
                                item={item}>

                            </FoodCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}
export default Our_Shop;