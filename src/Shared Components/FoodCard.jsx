

const FoodCard = ({item}) => {
    let {name,image,price,recipe} = item;
    return (
        <div className="card bg-gray-200">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <p className="absolute right-14 bg-black p-1 rounded top-12 text-white">$ {price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button className="btn btn-outline text-yellow-500 border-0 border-b-2">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
export default FoodCard;