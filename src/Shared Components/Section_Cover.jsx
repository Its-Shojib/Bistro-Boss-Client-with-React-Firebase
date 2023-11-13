import { Parallax, Background } from 'react-parallax';

const Section_Cover = ({ img, title, desc }) => {
    return (
        <div className='mb-10'>
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={img}
                bgImageAlt="the dog"
                strength={-200}
            >
                {/* style={{ backgroundImage: `url(${img})` }} */}
               <div  className="flex justify-center items-center min-h-[500px] bg-cover mb-10 text-white">
                    <div className="bg-black bg-opacity-60 w-8/12 mx-auto text-center py-20 uppercase">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p>{desc}</p>
                    </div>
                </div>
            </Parallax>
        </div>
    )
}
export default Section_Cover;