import img1 from '../../assets/home/chef-service.jpg'

const Chef_Service = () => {
    return (
        <div className="hero h-[500px] w-10/12 mx-auto my-10" style={{ backgroundImage: 'url(/src/assets/home/chef-service.jpg)' }}>
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="w-10/12 py-10 md:px-20 text-black bg-white">
                    <h1 className="mb-5 text-4xl uppercase">Bistro Boss</h1>
                    <p className="mb-5 w-full md:max-w-5/12 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                </div>
            </div>
        </div>
    )
}
export default Chef_Service;