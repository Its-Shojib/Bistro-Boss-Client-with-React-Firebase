import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import img1 from '../../assets/home/slide1.jpg'
import img2 from '../../assets/home/slide2.jpg'
import img3 from '../../assets/home/slide3.jpg'
import img4 from '../../assets/home/slide4.jpg'
import img5 from '../../assets/home/slide5.jpg'

const Category = () => {
    return (
        <div className='w-10/12 mx-auto'>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                // centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={img1} alt="" /> 
                    <p className='text-center uppercase text-3xl text-white -mt-16'>Salad</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="" /> 
                    <p className='text-center uppercase text-3xl text-white -mt-16'>Soup</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="" /> 
                    <p className='text-center uppercase text-3xl text-white -mt-16'>Pizza</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} alt="" /> 
                    <p className='text-center uppercase text-3xl text-white -mt-16'>Dessert</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} alt="" /> 
                    <p className='text-center uppercase text-3xl text-white -mt-16'>Salad</p>
                </SwiperSlide>

            </Swiper>
        </div>
    )
}
export default Category;


