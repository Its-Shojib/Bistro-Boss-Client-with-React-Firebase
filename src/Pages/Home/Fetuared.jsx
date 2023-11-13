import Section_Title from '../../Shared Components/Section_Title';
import img1 from '../../assets/home/featured.jpg'
import './featured.css'

const Fetuared = () => {
    return (
        <div>
            <div className="freatured-item min-h-[500px] w-11/12 md:w-10/12 mx-auto my-10 text-white bg-fixed">
                <div className='bg-black bg-opacity-40 py-10'>
                    <Section_Title title={'FROM OUR MENU'} subTitle={'Check it out'}></Section_Title>
                    <div className='flex justify-center items-center'>
                        <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
                            <img className='max-w-xs' src={img1} alt="" />
                            <div className='max-w-[500px] mx-auto space-y-3 px-5'>
                                <p>March 20, 2023</p>
                                <h2>WHERE CAN I GET SOME?</h2>
                                <p className='text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                                <button className='btn btn-outline border-0 border-b-4 text-white'>Read More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Fetuared;